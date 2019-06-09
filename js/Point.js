var pointRadius = 25;
var cPointRadius = 10;

var Point = class{
  constructor(position) {
    this.position = position;
    this.drawable = draw.circle(pointRadius);
    this.drawable.attr({cx : position.x, cy : position.y});
    this.drawable.fill('#E91E63');
    this.drawable.addClass("circle");
    this.isDragging = false;

    this.isTouched = function(mousePosition){
      if(Math.abs(mousePosition.x - this.position.x) < pointRadius){
        if(Math.abs(mousePosition.y - this.position.y) < pointRadius){
          this.isDragging = true;
          console.log("pointClicked");
          return true;
        }else{
          this.isDragging = false;
        }
      }else{
        this.isDragging = false;
      }
      return false;
    };

    this.setPosition = function(position){
      this.position = position;
      this.drawable.attr({cx : position.x, cy : position.y});
    };

    this.remove = function(){
      this.drawable.remove();
    };
  }
};

var ControlPoint = class {
  constructor(position,other) {
    this.other = other;
    this.position = position;
    this.drawable = draw.circle(cPointRadius);
    this.drawable.attr({cx : position.x, cy : position.y});
    this.drawable.fill('#03A9F4');
    this.drawable.addClass("circle");
    this.isDragging = false;

    this.line = draw.line(this.position.x,this.position.y,other.position.x,other.position.y).stroke({width: 2}).fill('#607D8B');

    this.isTouched = function(mousePosition){
      console.log("TEST");
      if(Math.abs(mousePosition.x - this.position.x) < cPointRadius){
        if(Math.abs(mousePosition.y - this.position.y) < cPointRadius){
          this.isDragging = true;
          console.log("pointClicked");
          return true;
        }else{
          this.isDragging = false;
        }
      }else{
        this.isDragging = false;
      }
      return false;
    };

    this.setPosition = function(position){
      this.position = position;
      this.drawable.attr({cx : position.x, cy : position.y});
      this.update();
    };

    this.update = function(){
      this.line.remove();
      this.line = draw.line(this.position.x,this.position.y,other.position.x,other.position.y).stroke({width: 2}).fill('#607D8B');
    };

    this.remove = function(){
      this.line.remove();
      this.drawable.remove();
    };
  }
}
