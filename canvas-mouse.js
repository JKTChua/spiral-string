// handle mousedown events
function myDown(e) {
  // tell the browser we're handling this mouse event
  e.preventDefault();
  e.stopPropagation();

  // get the current mouse position
  var mx = parseInt(e.clientX - offsetX);
  var my = parseInt(e.clientY - offsetY);

  // test each shape to see if mouse is inside
  this.dragok = false;
  for (var i = 0; i < this.shapes.length; i++) {
    var s = this.shapes[i];
    // decide if the shape is a rect or circle               
    if (s.width) {
      // test if the mouse is inside this rect
      if (mx > s.position.x && mx < s.position.x + s.width && my > s.position.y && my < s.position.y + s.height) {
        // if yes, set that rects isDragging = true
        this.dragok = true;
        s.isDragging = true;
      }
    } else {
      var dx = s.position.x - mx;
      var dy = s.position.y - my;
      // test if the mouse is inside this circle
      if (dx * dx + dy * dy < s.r * s.r) {
        this.dragok = true;
        s.isDragging = true;
      }
    }
  }
  // save the current mouse position
  startX = mx;
  startY = my;
}


// handle mouseup events
function myUp(e) {
  // tell the browser we're handling this mouse event
  e.preventDefault();
  e.stopPropagation();

  // clear all the dragging flags
  this.dragok = false;
  for (var i = 0; i < this.shapes.length; i++) {
    this.shapes[i].isDragging = false;
  }
}


// handle mouse moves
function myMove(e) {
  // if we're dragging anything...
  if (this.dragok) {
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // get the current mouse position
    var mx = parseInt(e.clientX - offsetX);
    var my = parseInt(e.clientY - offsetY);

    // calculate the distance the mouse has moved
    // since the last mousemove
    var dx = mx - startX;
    var dy = my - startY;

    // move each rect that isDragging 
    // by the distance the mouse has moved
    // since the last mousemove
    for (var i = 0; i < this.shapes.length; i++) {
      var s = this.shapes[i];
      if (s.isDragging) {
        s.move({
          x: s.position.x + dx,
          y: s.position.y + dy
        });
      }
    }

    // redraw the scene with the new rect positions
    draw();

    // reset the starting mouse position for the next mousemove
    startX = mx;
    startY = my;
  }
}
