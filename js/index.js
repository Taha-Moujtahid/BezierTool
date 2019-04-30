var draw = SVG('canvas').size('100%', '100%');
var points  = [];
let pointRadius = 10;


function addPoint(event){
  event.preventDefault();
  points.push(getMousePosition(event));
  var point = draw.circle(pointRadius);
  point.attr({cx : points[points.length-1].x, cy : points[points.length-1].y});
  point.fill('#E91E63')
  console.log("P: "+JSON.stringify(points[points.length-1]));
  if(points.length >= 2){
    console.log("plot");
    draw.line(points[points.length-2].x,points[points.length-2].y,
              points[points.length-1].x,points[points.length-1].y).stroke({width: 2});
  }
}

function getMousePosition(event){
  var rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
}
