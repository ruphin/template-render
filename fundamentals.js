///////////////////
// Tagged template Strings
/////////

"hello world";

`hello world`;

`hello
horld`;

`hello ${"world"}`;

const world = () => "world";

`hello ${world()}`;

const five = () => 5;

five`hello ${world()}`;

console.log`hello ${world()}`;

console.log`test${1}two${3}four`;

const tag = (strings, ...values) => [strings, values];

tag`test${1}two${3}four`;

///////////////////
// Static string arrays
/////////

const strings = (strings) => strings;
strings`test`;

[] === [];

const arr = () => [];

arr() === arr();

const test = () => strings`test`;

test() === test();

Object.isFrozen(test());

///////////////////
// Templates
/////////

const marker = Math.random().toString(36).slice(2).padStart(10, "0");

const insertMarkers = (strings) => strings.join(`<!--${marker}-->`);

insertMarkers`
<div>
  <h1>Hello ${"World"}</h1>
  <p>${"test"}${5}</p>
</div>
`;

const templates = new Map();

const createTemplate = (strings) => {
  const template = document.createElement("template");
  template.innerHTML = insertMarkers(strings);
  return template;
};

const findParts = (node, path) => {
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

const getTemplate = (strings) => {
  let template = templates[strings];
  if (template) {
    return template;
  }
  template = createTemplate(strings);
  template.parts = findParts(template.content, []);
  return template;
};

getTemplate`<div><p></p><!-- test --><p>Hello ${1}`;
