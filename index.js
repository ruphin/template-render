const marker = `marker$${Math.random().toString(36).slice(5)}$`;

/** @type { Map<String[], HTMLTemplateElement> } */
const templates = new Map();

const isTemplateResult = Symbol("TemplateResult");
const renderPart = Symbol("part");
export const noChange = Symbol("noChange");
export const nothing = Symbol("nothing");

const isPrimitive = (value) =>
  value === null || (typeof value != "object" && typeof value != "function");

/**
 * Recursively search through node and its descendants for part markers
 * @typedef { {path: Number[]} } PartDescription
 *
 * @param { Node } node
 * @param { Number[] } path
 */
const findParts = (node, path) => {
  /** @type PartDescription[] */
  const partDescriptions = [];
  if (node.nodeType === Node.COMMENT_NODE) {
    if (node.nodeValue === marker) {
      partDescriptions.push({ path });
    }
  }
  const children = node.childNodes;
  const length = children.length;
  for (let i = 0; i < length; i++) {
    partDescriptions.push(...findParts(children[i], path.concat([i])));
  }
  return partDescriptions;
};

/**
 * @param { String[] } strings
 * @returns { HTMLTemplateElement }
 */
const getTemplate = (strings) => {
  let template = templates.get(strings);
  if (template) {
    return template;
  }
  template = document.createElement("template");
  template.innerHTML = strings.join(`<!--${marker}-->`);
  template.partDescriptions = findParts(template.content, []);
  templates.set(strings, template);
  return template;
};

export const html = (strings, ...values) => ({
  template: getTemplate(strings),
  values,
  [isTemplateResult]: true,
});

export const render = (value, container) => {
  if (!container[renderPart]) {
    container[renderPart] = new Part(document.createComment(marker));
    container.appendChild(container[renderPart].node);
  }
  container[renderPart].render(value);
};

class Part {
  constructor(node) {
    this.node = node;
    this.after = node?.nextSibling ?? null;
    this.value = null;
    this.renderTemplate = null;
  }

  render(value) {
    if (value?.[isTemplateResult]) {
      this._renderTemplateResult(value);
      this.value = isTemplateResult;
    } else {
      if (value === this.value || value === noChange) {
        return;
      } else if (isPrimitive(value)) {
        if (value === nothing || value == null || value === "") {
          this._clear();
        } else {
          this._renderText(value);
        }
      } else if (value.nodeType) {
        this._renderNode(value);
      } else if (value[Symbol.iterator]) {
        this._renderIterable(value);
        // TODO: Fix rendering the same array object twice with different values
      } else {
        this._renderText(value); // Fallback
      }
      this.value = value;
      this.renderTemplate = null;
    }
  }

  _renderText(text) {
    this._renderNode(document.createTextNode(text));
  }

  // Render the given node into this part
  _renderNode(node) {
    this._clear();
    this.node.parentNode.insertBefore(node, this.after);
  }

  _renderTemplateResult({ template, values }) {
    if (!(this.renderTemplate?.template === template)) {
      this._clear();
      this.renderTemplate = new RenderTemplate(template);
      this._renderNode(this.renderTemplate.fragment);
    }
    this.renderTemplate.renderParts(values);
  }

  _renderIterable(iterable) {
    // TODO
  }

  _clear() {
    const parent = this.node.parentNode;
    let nodeToRemove = this.node.nextSibling;
    while (nodeToRemove !== this.after) {
      const nextNode = nodeToRemove.nextSibling;
      parent.removeChild(nodeToRemove);
      nodeToRemove = nextNode;
    }
    this.value = null;
  }
}

class RenderTemplate {
  constructor(template) {
    this.template = template;
    this.fragment = template.content.cloneNode(true);
    this.parts = template.partDescriptions.map(({ path }) => {
      const node = path.reduce(
        (fragmentNode, childIndex) => fragmentNode.childNodes[childIndex],
        this.fragment
      );
      return new Part(node);
    });
  }
  renderParts(values) {
    this.parts.forEach((part, index) => {
      part.render(values[index]);
    });
  }
}
