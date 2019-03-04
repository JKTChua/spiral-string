const maxDistance = 10;

class Node {
  constructor(position = {x: 0, y: 0}, w = 5, h = 5) {
    this.children = [];
    this.position = position;
    this.width = w;
    this.height = h;
  }

  move(nextPos, prevNode) {
    this.position = nextPos;
    this.children.forEach((n) => {
      if (n === prevNode) return;
      const d = calcDistance(this.position, n.position);
      if (d >= maxDistance) {
        const closest = calcClosestCirclePoint(
          n.position,
          nextPos,
          maxDistance
        );
        n.move({
          x: closest.x,
          y: closest.y
        }, this);
      }
    });
  }
}

function spiralPos(i, a, b) {
  const angle = 0.1 * i;
  return {
    x: (a + b * angle) * Math.cos(angle),
    y: (a + b * angle) * Math.sin(angle)
  };
} 

function calcClosestCirclePoint(pt1, pt2, radius) {
  const delta = calcDelta(pt1, pt2);
  const magV = Math.sqrt(delta.x * delta.x + delta.y * delta.y);
  return {
    x: pt2.x + delta.x / magV * radius,
    y: pt2.y + delta.y / magV * radius
  };
}

function calcDelta(pt1, pt2) {
  const a = pt1.x - pt2.x;
  const b = pt1.y - pt2.y;
  return {x: a, y: b};
}

function calcDistance(pt1, pt2) {
  const d = calcDelta(pt1, pt2);
  return Math.sqrt(d.x * d.x + d.y * d.y);
}

const x = new Node(spiralPos(0, 10, 4), 10, 10);
const allNodes = [x];
for (let i = 1; i < 200; i++) {
  const newNode = new Node(spiralPos(i, 10, 4));
  allNodes[i-1].children.push(newNode);
  newNode.children.push(allNodes[i-1]);
  allNodes.push(newNode);
}

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const rect = canvas.getBoundingClientRect();
const center = {x: 200, y: 200};
const offsetX = center.x + rect.left;
const offsetY = center.y + rect.top;

function eraseCanvas(){
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function initMouseEvents() {
  const mouseEventProps = {
    shapes: allNodes,
    dragok: false
  };
  canvas.onmousedown = myDown.bind(mouseEventProps);
  canvas.onmouseup = myUp.bind(mouseEventProps);
  canvas.onmousemove = myMove.bind(mouseEventProps);
}

function drawNodes(arr) {
  arr.forEach((n) => {
    context.fillStyle = 'red';
    context.fillRect(
      center.x + n.position.x,
      center.y + n.position.y,
      n.width,
      n.height
    );
  });
}

function draw() {
  eraseCanvas();
  drawNodes(allNodes);
}

draw();
initMouseEvents();
