// "metaData": {
//     "name": "Child-1",
//     "fileType": "JavaScript",
//     "category": "Views",
//     "path": "src/child1/child1-2",
//     "example": "https://www.aidantilgner.dev",
//     "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Placerat orci nulla pellentesque dignissim enim sit. Sapien pellentesque habitant morbi tristique senectus et netus. Nibh venenatis cras sed felis eget velit. Nibh cras pulvinar mattis nunc sed blandit. Sed egestas egestas fringilla phasellus faucibus scelerisque eleifend. Consectetur adipiscing elit ut aliquam purus sit amet luctus venenatis. ",
//     "props": [
//       {
//         "name": "routeProps",
//         "description": "This provides information about the given component for routing",
//         "type": "Object"
//       },
//       {
//         "name": "routeProps",
//         "description": "This provides information about the given component for routing",
//         "type": "Object"
//       }
//     ],
//     "state": [
//       {
//         "name": "data",
//         "description": "This is the data of the child-1",
//         "type": "Object"
//       }
//     ],
//     "tags": ["Refactor", "Deprecated", "Bugs"]
//   },
//   "imports": [
//     {
//       "name": "React, { useState, UseEffect }",
//       "from": "react",
//       "type": "dependency",
//       "description": "React is a JavaScript library for building user interfaces.",
//       "notes": "Uses deprecated code"
//     }
//   ],
//   "exports": [],
//   "functions": [
//     {
//       "name": "component/getSomething",
//       "description": "This is a function",
//       "ExternalLocation": "src/components/helpers/helpers.js",
//       "parameters": "(int componentID)",
//       "returns": "(Object something)",
//       "notes": "Needs to be refactored"
//     }
//   ],
//   "connectedFiles": { "parents": [], "children": [], "helpers": [] }
// }

class Component {
  constructor({
    creator,
    name,
    metaData,
    imports,
    exports,
    functions,
    connectedFiles,
  }) {
    this.creator = creator;
    this.name = name;
    this.metaData = metaData;
    this.imports = imports ? imports : [];
    this.exports = exports ? exports : [];
    this.functions = functions ? functions : [];
    this.connectedFiles = connectedFiles
      ? connectedFiles
      : { parents: [], children: [], helpers: [] };
  }
}

export default Component;
