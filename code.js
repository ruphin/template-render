const marker = Math.random().toString(36).slice(2).padStart(10, "0");
const templates = new Map();

export const createTemplate = (strings) => {
  const template = document.createElement("template");
  template.innerHTML = strings.join(`<!--${marker}-->`);
  return template;
};

export const findParts = (node, path) => {
  const parts = [];
  if (node.nodeType === Node.COMMENT_NODE) {
    if (node.nodeValue === marker) {
      parts.push({ path });
    }
  }
  const children = node.childNodes;
  const length = children.length;
  for (let i = 0; i < length; i++) {
    parts.push(...findParts(children[i], path.concat([i])));
  }
  return parts;
};

export const getTemplate = (strings) => {
  let template = templates[strings];
  if (template) {
    return template;
  }
  template = createTemplate(strings);
  template.parts = findParts(template.content, []);
  templates.set(strings, template);
  return template;
};

const isSerializable = (value) =>
  typeof value === "string" ||
  typeof value === "number" ||
  typeof value === "boolean";

export class Part {
  constructor(node) {
    this.parent = node.parentNode;
    this.before = node.previousSibling;
    this.after = node.nextSibling;
  }

  render(value) {
    if (value === this.value) {
      return;
    } else if (value == null) {
      this._clear();
    } else if (isSerializable(value)) {
      this.renderText(value);
    } else if (value instanceof Node) {
      this._renderNode(value);
    } else if (value instanceof TemplateResult) {
      this._renderTemplateResult(value);
    }
    this.value = value;
  }

  _renderText(serializable) {
    this._renderNode(document.createTextNode(serializable));
  }

  // Render the given node into this part
  _renderNode(node) {
    this._clear();
    this.parent.insertBefore(node, this.after);
  }

  _renderTemplateResult(template) {
    if (this.value === template) {
    }
    const instance = new TemplateInstance(template);
    if (this.node !== template.fragment) {
      this._clear();
    }
  }

  // Remove all the content of this part
  _clear() {
    let nodeToRemove = this.before?.nextSibling ?? this.parent.firstChild;
    while (nodeToRemove !== this.after) {
      nextNode = nodeToRemove.nextSibling;
      this.parent.removeChild(nodeToRemove);
      nodeToRemove = nextNode;
    }
    this.value = null;
  }
}

class TemplateInstance {
  constructor(template) {
    this.template = template;
    this.fragment = template.content.cloneNode(true);
    this.parts = template.parts.map(({ path }) => {
      const partNode = path.reduce(
        (node, childIndex) => node.childNodes[childIndex],
        this.fragment
      );
      return new Part(partNode);
    });
  }
}
