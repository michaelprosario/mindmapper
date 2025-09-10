class MMConstants
{
    static NODE_WIDTH = 100;
    static NODE_HEIGHT = 30;
}

class MindMapNode {
    constructor() {
        this.text = "";
        this.children = [];
        this.parent = null;
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    getPosition() {
        return { x: this.x, y: this.y };
    }

    setSize(width, height) {
        this.width = width;
        this.height = height;
    }

    getSize() {
        return { width: this.width, height: this.height };
    }

    setText(text) {
        this.text = text;
    }

    getText() {
        return this.text;
    }

    addChild(node) {
        node.parent = this;
        this.children.push(node);
    }

    removeChild(node) {
        const index = this.children.indexOf(node);
        if (index > -1) {
            this.children.splice(index, 1);
            node.parent = null;
        }
    }
}

class MindMapDrawer {
    constructor() {
        this.svgNS = "http://www.w3.org/2000/svg"; 
    }

    drawNode(node,svg) {
        const rect = document.createElementNS(this.svgNS, "rect");
        rect.setAttribute("x", node.x);
        rect.setAttribute("y", node.y);
        rect.setAttribute("width", node.width);
        rect.setAttribute("height", node.height);
        rect.setAttribute("fill", "lightblue");
        rect.setAttribute("stroke", "black");
        svg.appendChild(rect);

        const text = document.createElementNS(this.svgNS, "text");
        text.setAttribute("x", node.x + 5);
        text.setAttribute("y", node.y + 15);
        text.textContent = node.text;
        svg.appendChild(text);
    }

    draw(nodeData, divContainerId) {

        const container = document.getElementById(divContainerId);
        if (container) {
            container.innerHTML = "";

            // create an svg element
            const svg = document.createElementNS(this.svgNS, "svg");
            svg.setAttribute("width", "100%");
            svg.setAttribute("height", "100%");
            container.appendChild(svg);
            this.drawNode(nodeData,svg);
        }
    }
}

class MindMap {
    constructor(strDivContainerId) {
        this.root = new MindMapNode();
        this.divContainerId = strDivContainerId;
        this.drawer = new MindMapDrawer();
    }

    setRootNode(aNode) {
        this.root = aNode;
    }

    draw() {
        this.drawer.draw(this.root, this.divContainerId);
    }

    getRootData() {
        return this.root;
    }

}