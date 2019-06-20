var draw = SVG('canvas').size(window.innerWidth*0.99, window.innerHeight*0.7);
var points = [];
var curves = [];

var pointClicked = false;

document.addEventListener('keydown', function(event) {
    console.log(event.keyCode);
    if(event.keyCode == 8){
      removePoint();
    }else if(event.keyCode == 13){
      curves.forEach(function(curve){
        curve.draw();
      });
    }
});

document.getElementById('canvas').addEventListener('mousemove',function(event){
  var mousePosition = getMousePosition(event);
  curves.forEach(function(curve){
    curve.onPointDrag(mousePosition);
  });
});

document.getElementById('canvas').addEventListener('mousedown',function(event){
  var mousePosition = getMousePosition(event);
  var isPointPressed = false;

  curves.forEach(function(curve){
    if(curve.onPointDragStart(mousePosition)){
      isPointPressed = true;
      var equations = "";
      curves.forEach(function(curve){
        equations += curve.getMaths() + " <br> ";
      });
      document.getElementById("mathematics").innerHTML = equations;
    }
  });
  if(!isPointPressed){
    addPoint(mousePosition);
  }
});

document.getElementById('canvas').addEventListener('mouseup',function(event){
  var mousePosition = getMousePosition(event);
  curves.forEach(function(curve){
    curve.onPointDragStop(mousePosition)
  });
});

function pointMouseDown(event){
  console.log("Down!");
  pointClicked = true;
}

function pointMouseUp(event){
  console.log("up!");
  pointClicked = false;
}

function addPoint(mousePosition){
  points.push(new Point(mousePosition));

  if(points.length >= 2){
    addCurve(new BezierCurve(points[points.length-2],points[points.length-1]));
  }

}

function addCurve(nCurve){
  curves.push(nCurve);
  nCurve.draw();
}

function removePoint(){
  if(points.length > 0){
    if(curves.length >= 2){
      curves[curves.length-1].delete();
      curves.pop();
    }else{
      curves[0].points[0].remove();
      curves[0].delete();
      curves.pop();
      points.pop();
    }
    points.pop();
  }
}

function getMousePosition(event){
  var rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

sleep = function(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
