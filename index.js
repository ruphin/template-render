const marker = `marker$${Math.random().toString(36).slice(5)}$`;

const templates = new Map();

const isTemplateResult = Symbol("TemplateResult");
const renderPart = Symbol("part");
export const noChange = Symbol("noChange");
export const nothing = Symbol("nothing");

const isNonNullPrimitive = (value) =>
  typeof value !== "object" && typeof value !== "function";

const findParts = (node, path) => {
  if (node.nodeType === Node.COMMENT_NODE && node.nodeValue === marker) {
    return { path };
  }
  return Array.from(node.childNodes)
    .map((childNode, index) => findParts(childNode, [...path, index]))
    .flat();
};

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
  strings,
  values,
  [isTemplateResult]: true,
});

export const render = (value, container) => {
  if (!container[renderPart]) {
    container[renderPart] = new Part(document.createComment(marker));
    container.appendChild(container[renderPart].anchor);
  }
  container[renderPart].render(value);
};

class Part {
  constructor(node) {
    this.anchor = node;
    this.after = node.nextSibling;
    this.value = null;
    this.renderedTemplate = null;
  }

  render(value) {
    if (value === this.value || value === noChange) {
      return;
    }

    if (value?.[isTemplateResult]) {
      this._renderTemplateResult(value);
      this.value = isTemplateResult;
      return;
    }

    if (value === nothing || value == null || value === "") {
      this._clear();
    } else if (isNonNullPrimitive(value)) {
      this._renderText(value);
    } else if (value.nodeType) {
      this._renderNode(value);
    } else {
      this._renderText(value); // Fallback
    }
    this.value = value;
    this.renderedTemplate = null;
  }

  _renderText(text) {
    this._renderNode(document.createTextNode(text));
  }

  _renderNode(node) {
    this._clear();
    this.anchor.parentNode.insertBefore(node, this.after);
  }

  _renderTemplateResult({ strings, values }) {
    const template = getTemplate(strings);
    if (this.renderedTemplate?.template !== template) {
      this._clear();
      this.renderedTemplate = new TemplateInstance(template);
      this._renderNode(this.renderedTemplate.fragment);
    }
    this.renderedTemplate.render(values);
  }

  _clear() {
    const parent = this.anchor.parentNode;
    let nodeToRemove = this.anchor.nextSibling;
    while (nodeToRemove !== this.after) {
      const nextNode = nodeToRemove.nextSibling;
      parent.removeChild(nodeToRemove);
      nodeToRemove = nextNode;
    }
    this.value = null;
  }
}

class TemplateInstance {
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
  render(values) {
    this.parts.forEach((part, index) => {
      part.render(values[index]);
    });
  }
}
