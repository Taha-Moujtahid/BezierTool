class BezierCurve {
  constructor(Start, End) {

    this.Start  = Start;
    this.Cp1    = new ControlPoint({x: Start.position.x, y: Start.position.y+50},Start);
    this.Cp2    = new ControlPoint({x: End.position.x, y: End.position.y-50},End);
    this.End    = End;

    this.points = [];
    this.points.push(this.Start);
    this.points.push(this.Cp1);
    this.points.push(this.Cp2);
    this.points.push(this.End);

    this.lines = [];
  }

  B = function (t){
    var S = this.Start.position;
    var E = this.End.position;
    var Cp1 = this.Cp1.position;
    var Cp2 = this.Cp2.position;
    return {
      x: S.x*Math.pow(1-t,3) + Cp1.x*3*Math.pow(1-t,2)*t + Cp2.x*3*(1-t)*Math.pow(t,2) + E.x*Math.pow(t,3)   ,
      y: S.y*Math.pow(1-t,3) + Cp1.y*3*Math.pow(1-t,2)*t + Cp2.y*3*(1-t)*Math.pow(t,2) + E.y*Math.pow(t,3)
    }
  }

  getMaths = function (){
    var S = this.Start.position;
    var E = this.End.position;
    var Cp1 = this.Cp1.position;
    var Cp2 = this.Cp2.position;
    return " x = \("+S.x+"* (1-t)^3 +"+ Cp1.x +" * 3 * (1-t)^2 *t +" + Cp2.x + "* 3 * (1-t) * t^2 +" + E.x + " * t^3 \) \n"+
    "y = \("+S.y+"* (1-t)^3 +"+ Cp1.y +" * 3 * (1-t)^2 *t +" + Cp2.y + "* 3 * (1-t) * t^2 +" + E.y + " * t^3 \)";
  }

  draw = function(){
    this.remove();
    var curvePoints = [];
    for(var t = 0; t < 1; t+=0.01){ //// TODO: Change 10 to tmax
      curvePoints.push(this.B(t));
    }
    for(var i = 0; i != curvePoints.length-1; i++){
      this.lines.push(draw.line(curvePoints[i].x,curvePoints[i].y,
                curvePoints[i+1].x,curvePoints[i+1].y).stroke({width: 3}));
    }
  }

  onPointDrag = function(mousePosition){
    var changed = false;
    console.log(this.points.length);
    this.points.forEach(function(point){
      if(point.isDragging){
        point.setPosition(mousePosition);
        changed = true;
      }
    });
    if(changed){
      //UPDATE two controlPoints
      this.points[1].update();
      this.points[2].update();
      this.draw();
    }
  }

  onPointDragStart = function(mousePosition){
    var pointTouched = false;
    this.points.forEach(function(point){
      if(point.isTouched(mousePosition)){
        pointTouched = true;
      }
    });
    return pointTouched;
  }

  onPointDragStop = function(mousePosition){
    this.points.forEach(function(point){
      point.isDragging = false;
    });
  }

  remove = function(){
    this.lines.forEach(function(line){
      line.remove();
    });
    this.lines = [];
  }

  delete = function(){
    this.remove();
    this.points[1].remove();
    this.points[2].remove();
    this.points[3].remove();
    this.points = [];
  }


}
