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

const tag = (strings, ...values) => ({ strings, values });

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

const render = (message) => html`<p>${message}</p>`;
