class Node {
  constructor(text, type, children, references) {
    this.text = text;
    this.type = type;
    this.references = references ? references : { parent: null };
    this.children = children
      ? children.map((child) => {
          return new Node(child.text, child.type, child.children, {
            parent: this,
          });
        })
      : null;
    this.open = false;
  }

  addChild(data) {
    this.children.push(new Node(text, type, this, children));
  }
}

export default Node;
