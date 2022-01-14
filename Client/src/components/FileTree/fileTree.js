import Node from "./Node.js";

export const extractTree = (project) => {
  if (!project.components) return null;
  if (!project.components[0]) return null;

  // First we need an array of all of the names of the components in the project
  let componentNames = project.components.map((component) => {
    return component.metaData.path;
  });

  let tree = new Node(componentNames[0].split("/")[0], "folder", {}, []);
  componentNames.forEach((componentName) => {
    // src/components/child-1.js
    // We need to extract each folder, except the first and add it to the right place in the tree, then add the component to the right place in the tree
    // We also need to make sure that a directory is only added once
    let path = componentName.split("/");
    // Path: ["src", "components", "child-1.js"]
    let currentNode = tree;
    for (let i = 1; i < path.length - 1; i++) {
      // We need to find the node that corresponds to the current directory
      let currentDirectory = path[i];
      let childNode = currentNode.children.find(
        (child) => child.text === currentDirectory
      );
      if (childNode) {
        currentNode = childNode;
      } else {
        let newNode = new Node(currentDirectory, "folder", {}, []);
        currentNode.children.push(newNode);
        currentNode = newNode;
      }
    }
    currentNode.children.push(new Node(path[path.length - 1], "file", {}, []));
  });

  return tree;
};
