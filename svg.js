var svgImage = document.getElementById("svgImage");
var width = svgImage.getAttribute("width");
var height = svgImage.getAttribute("height");

var clrBtn = document.getElementById("clearbtn");
var moveBtn = document.getElementById("movebtn");
var stopBtn = document.getElementById("stopbtn");
//var spd = document.getElementById("spd");
var ir = document.getElementById("ir");
var mousex, mousey;
var rid;

svgImage.addEventListener("mousemove", function(e) {
    mousex = e.offsetX;
    mousey = e.offsetY;
});


var clrSVG = function(){
    while (svgImage.hasChildNodes()){
	svgImage.removeChild(svgImage.lastChild);
    }
};

var makeCircle = function(x,y,r){
    
    var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    
    c.setAttribute("cx", x);
    
    c.setAttribute("cy", y);
    
    c.setAttribute("r", r);

    if (x < width / 2) c.setAttribute("side", "-1");
    else c.setAttribute("side", "1");
    
    c.setAttribute("fill", "black");

    c.setAttribute("clickCt", "0");

    if (2 * Math.random() > 1) c.setAttribute("dx", "1");
    else c.setAttribute("dx", "-1");
    if (2 * Math.random() > 1) c.setAttribute("dy", "1");
    else c.setAttribute("dy", "-1");

    c.addEventListener("click", circClickOnce);
    c.addEventListener("click", circClickTwice);
    
    return c;

}

var addCircle = function(x, y){
    if (ir.value)
	svgImage.appendChild(makeCircle(x, y, ir.value));
    else
	svgImage.appendChild(makeCircle(x,y,"20"));
}

var addCircleClick = function(e){
    addCircle(mousex.toString(), mousey.toString());
}

var circClickOnce = function(e){
    if (this.getAttribute("clickCt") == "0"){
	this.setAttribute("fill", "red");
	event.stopImmediatePropagation();
	this.setAttribute("clickCt", "1");
    }
}

var circClickTwice = function(e){
    if (this.getAttribute("clickCt") == "1"){
	svgImage.removeChild(this);
	event.stopPropagation();
	addCircle((Math.random() * width).toString(), (Math.random() * height).toString());
    }
}

var moveAnim = function(){
    
    window.cancelAnimationFrame(rid);
    var speed = 2;
    var xDir, yDir, x, y, r;
    var i;
    console.log(svgImage.childNodes);
    var anim = function(){
	
	for (i = 0; i < svgImage.children.length; i++){

	    var circle = svgImage.childNodes[i];
	    
	    xDir = parseInt(circle.getAttribute("dx"));
	    yDir = parseInt(circle.getAttribute("dy"));
	    x = parseInt(circle.getAttribute("cx")) + speed * xDir;
	    y = parseInt(circle.getAttribute("cy")) + speed * yDir;
	    r = parseInt(circle.getAttribute("r"));
	    
	    circle.setAttribute("cx", x.toString());
	    circle.setAttribute("cy", y.toString());

	    if (x - r <= 0 || x + r >= width){
		xDir *= -1;
	    }
	    if (y - r <= 0 || y + r >= height){
		yDir *= -1;
	    }

	    circle.setAttribute("dx", xDir.toString());
	    circle.setAttribute("dy", yDir.toString());

	    var side = parseInt(circle.getAttribute("side"));
	    if ((x < width / 2 - 2 && side == 1)
		|| (x > width / 2 + 2 && side == -1)){
		//console.log("sidled");
		side *= -1;
		circle.setAttribute("side", side.toString());
		r = r/2;
		if (r < 1) svgImage.removeChild(circle);
		else{
		    circle.setAttribute("r", r.toString());
		    var clone = makeCircle(x,y,r);		  
		    
		    clone.setAttribute("dx", (xDir * -1).toString());
		    clone.setAttribute("dy", (yDir * -1).toString());
		    clone.setAttribute("side", (side * -1).toString());
		    svgImage.appendChild(clone);
		}
	    }
	    
	    
	}
	rid = window.requestAnimationFrame(anim);
	
    }
    
    anim();
    
    
};

var stopAll = function(){
    window.cancelAnimationFrame(rid);
};

stopBtn.addEventListener("click", stopAll);
moveBtn.addEventListener("click", moveAnim);
clrBtn.addEventListener("click", clrSVG);
svgImage.addEventListener("click", addCircleClick);
