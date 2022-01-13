import Node from "./Node.js";

export const extractTree = (project) => {
  if (!project.components) return null;
  if (!project.components[0]) return null;

  // First we need an array of all of the names of the components in the project
  let componentNames = project.components.map((component) => {
    return component.name;
  });

  let tree = new Node(componentNames[0].split("/")[0], "folder", {}, []);
  componentNames.forEach((componentName) => {
    // src/components/child-1.js
    // We need to extract each folder, except the first and add it to the right place in the tree, then add the component to the right place in the tree
    let componentPath = componentName.split("/");
    let currentNode = tree;
    for (let i = 1; i < componentPath.length - 1; i++) {
      let node = currentNode.children.find((child) => {
        return child.name === componentPath[i];
      });
      if (node) {
        currentNode = node;
      } else {
        currentNode.children.push(new Node(componentPath[i], "folder", {}, []));
        currentNode = currentNode.children[currentNode.children.length - 1];
      }
    }
    currentNode.children.push(
      new Node(componentPath[componentPath.length - 1], "file", {}, [])
    );
  });

  return tree;
};
