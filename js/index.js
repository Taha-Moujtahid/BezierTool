var draw = SVG('canvas').size(window.innerWidth*0.7, window.innerHeight*0.7);
var vectors   = [];
var cVectors  = [];
var points    = [];
var lines     = [];
let pointRadius = 10;
var calculatedLines   = [];
var calculatedPoints  = [];
var tMax = 10;

document.addEventListener('keydown', function(event) {
    console.log(event.keyCode);
    if(event.keyCode == 8){
      removePoint();
    }else if(event.keyCode == 13){
      calcCurvePoints();
      drawCurveLine();
    }
});

function tChange(){
  tMax = document.getElementById("t").value;
}

function addPoint(event){
  removeCurve();
  event.preventDefault();
  vectors.push(getMousePosition(event));
  var point = draw.circle(pointRadius);
  point.attr({cx : vectors[vectors.length-1].x, cy : vectors[vectors.length-1].y});
  point.fill('#E91E63');
  points.push(point);
  console.log("P: "+JSON.stringify(vectors[vectors.length-1]));
  if(points.length >= 2){
    console.log("plot");
    lines.push(draw.line(vectors[vectors.length-2].x,vectors[vectors.length-2].y,
              vectors[vectors.length-1].x,vectors[vectors.length-1].y).stroke({width: 2}));
  }
}

function removeCurve(){
  cVectors = [];
  for(i = 0; i != calculatedPoints.length; i++){
    calculatedPoints[i].remove();
  }
  calculatedPoints = [];
  for(i = 0; i != calculatedLines.length; i++){
    calculatedLines[i].remove();
  }
  calculatedLines = [];
}

function calcCurvePoints(){
    for(t = 0; t < 1; t+=1/tMax){
      var calculatedVectors = vectors;
      var temp = [];
      while(calculatedVectors.length > 1){
        for(n = 0; n < calculatedVectors.length-1; n++){
            console.log("Point between "+n+" & "+(n+1));
            temp.push(calcPoint(calculatedVectors[n],calculatedVectors[n+1],t));
            console.log(calculatedVectors.length);

        }
        calculatedVectors = temp;
        temp = [];
      }
      cVectors.push(calculatedVectors[0]);
      var point = draw.circle(pointRadius);
      point.attr({cx : calculatedVectors[0].x , cy : calculatedVectors[0].y });
      point.fill('#673AB7');
      calculatedPoints.push(point);
    }
}

function drawCurveLine(){
  for(i = 0; i != cVectors.length-1; i++){
    calculatedLines.push(draw.line(cVectors[i].x,cVectors[i].y,
              cVectors[i+1].x,cVectors[i+1].y).stroke({width: 3}));
  }
}

function clearArray(array){
  for(i = 0; i != array.length; i++){
    array.pop();
  }
}

function calcPoint(startVec,endVec,t){
  sx = startVec.x;
  sy = startVec.y;
  ex = endVec.x;
  ey = endVec.y;
  vec = {x : sx + (sx - ex)*-t, y : sy + (sy - ey)*-t}
  return vec;
}

function removePoint(){
  if(vectors.length > 0){
    console.log("remove Point");
    vectors.pop();
    points[points.length-1].remove();
    points.pop();
    lines[lines.length-1].remove();
    lines.pop();
  }
  removeCurve();
  calcCurvePoints();
  drawCurveLine();
}

function getMousePosition(event){
  var rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
}
