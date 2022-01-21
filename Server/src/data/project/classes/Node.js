class Node {
  constructor(text, type, references, children) {
    this.text = text;
    this.type = type;
    this.references = references
      ? references
      : { parent: null, endpoint: null };
    this.children =
      type === "folder" && children !== []
        ? children.map((child) => {
            return new Node(
              child.text,
              child.type,
              {
                parent: this,
                ...child.references,
              },
              child.children
            );
          })
        : null;
    this.open = false;
  }

  addChild(data) {
    this.children.push(new Node(text, type, this, children));
  }
}

export default Node;
