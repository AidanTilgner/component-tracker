class Node {
  constructor(text, type, children, parent) {
    this.text = text;
    this.type = type;
    this.children = children;
    this.parent = parent ? parent : null;
    this.elements = {
      container: null,
      current: null,
      row: null,
    };
  }

  // This function is used to intialize the UI aspects for the node
  init(container) {
    this.drawSelf(container);
    this.addClickListener();
  }

  // This function is used to draw the node itself in a given container
  drawSelf(container) {
    const node = document.createElement("div");
    node.classList.add("node");
    node.classList.add(this.type);
    node.innerText = this.text;
    container.appendChild(node);

    // I need to get the difference between the text length mutliplied by 20, and the nearest multiple of 60
    console.log("Width: ", this.text.length * 20);
    const width = Math.ceil(this.text.length * 20);
    node.style.width = `${width}px`;
    this.width = width;

    // If there is a parent, we need to add a line above the node to show the hierarchy
    if (this.parent) {
      const line = document.createElement("div");
      line.classList.add("line-vertical");
      // If it's a file, top: -78px, else top: -68px
      if (this.type === "file") {
        line.style.top = "-80px";
      } else {
        line.style.top = "-68px";
      }

      node.appendChild(line);
      this.elements.overLine = line;
    }

    this.elements.container = container;
    this.elements.current = node;
  }

  // This function is used to create a new div under the node and draw the children inside that
  drawChildren(container) {
    if (this.children.length < 1) return;

    // First check if any siblings have open rows, if so, remove them
    if (this.parent) {
      const siblings = this.parent.children;
      for (let i = 0; i < siblings.length; i++) {
        if (siblings[i].elements.row) {
          siblings[i].removeChildren();
        }
      }
    }

    this.elements.current.classList.add("open");
    this.width -= 4;
    const row = document.createElement("div");
    row.classList.add("row");
    this.children.forEach((child) => {
      console.log("Child: ", child);
      child.init(row);
    });

    // We need to add a line to the bottom of the node to show the hierarchy
    const line = document.createElement("div");
    line.classList.add("line-vertical");
    // If it's a file, top: 78px, else top: 68px
    if (this.type === "file") {
      line.style.top = "78px";
    } else {
      line.style.top = "68px";
    }

    this.elements.current.appendChild(line);
    this.elements.underLine = line;

    // We need to make a horizontal line at the top of the row
    // If the current elements width is shorter than the first child, the line starts at the middle of that
    // Otherwise, it starts at the middle of the first child
    const start =
      this.width / 2 < this.children[0].width / 2
        ? this.width / 2
        : this.children[0].width / 2;
    const end = () => {
      let sum = 0;
      for (let i = 0; i < this.children.length; i++) {
        sum += this.children[i].width;
      }
      sum += (this.children.length - 1) * 60;
      sum -= this.children[this.children.length - 1].width / 2;
      return sum;
    };

    console.log("Start, ", start, "End, ", end());
    const lineHorizontal = document.createElement("div");
    lineHorizontal.classList.add("line-horizontal");
    lineHorizontal.style.top = "0px";
    lineHorizontal.style.left = `${start}px`;
    lineHorizontal.style.width = `${end() - start}px`;
    row.appendChild(lineHorizontal);

    container.appendChild(row);
    this.elements.row = row;
  }

  // This function is used to remove the children of the node
  removeChildren() {
    this.width += 4;
    this.elements.current.classList.remove("open");
    this.elements.row.remove();
    this.elements.row = null;
    this.elements.underLine.remove();
    this.elements.underLine = null;
  }

  // This function is used to add the click listener to the node
  addClickListener() {
    // If there is a row, remove it, or else draw the children
    if (this.type === "folder") {
      this.elements.current.addEventListener("click", (event) => {
        event.stopPropagation();
        if (this.elements.row) {
          console.log("removing row");
          this.removeChildren();
        } else {
          console.log("drawing children");
          this.drawChildren(this.elements.current);
        }
      });
    }
  }
}

export default Node;
