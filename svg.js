var svgImage = document.getElementById("svgImage");
var width = svgImage.getAttribute("width");
var height = svgImage.getAttribute("height");

var clrBtn = document.getElementById("clearbtn");
var moveBtn = document.getElementById("movebtn");
var stopBtn = document.getElementById("stopbtn");
//var spd = document.getElementById("spd");
var mousex, mousey;
var rid;
var imgLink = "https://upload.wikimedia.org/wikipedia/en/thumb/1/18/Dvd-video-logo.svg/1280px-Dvd-video-logo.svg.png";
//var imgLink = "https://www.sitebuilderreport.com/assets/facebook-stock-up-08c6c9a855df26a3b13a34ac62bb75cc.jpg";


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
    
    c.setAttribute("fill", "black");

    c.setAttribute("clickCt", "0");

    c.setAttribute("dx", "1");

    c.setAttribute("dy", "1");
    //change this to random +- 1
    
    return c;

}

var addCircle = function(e){

    svgImage.appendChild(makeCircle(mousex.toString(), mousey.toString(), "20"));
    
}

var moveAnim = function(){

    clrSVG();
    window.cancelAnimationFrame(rid);
    var speed = 2;
    var xDir, yDir, x, y, r;
    console.log(svgImage.childNodes);
    var anim = function(){
	
	for (circle in svgImage.childNodes){
	    console.log(circle);
	    xDir = circle.getAttribute("dx");
	    yDir = circle.getAttribute("dy");
	    x += speed * xDir;
	    y += speed * yDir;
	    r = circle.getAttribute("y");
	    
	    c.setAttribute("cx", x.toString());
	    c.setAttribute("cy", y.toString());
	    
	    if (x - r <= 0 && x + r >= width){
		xDir *= -1;
	    }
	    if (y - r >= 0 && y + r >= height){
		yDir *= -1;
	    }

	    c.setAttribute("dx", xDir);
	    c.setAttribute("dy", yDir);
	    
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
svgImage.addEventListener("click", addCircle);
