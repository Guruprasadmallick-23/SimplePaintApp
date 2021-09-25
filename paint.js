var canvas,context, dragging = false, dragStartLocation,snapshot;

function getCanvasCoordinates(event){
    var x = event.clientX - canvas.getBoundingClientRect().left,
        y = event.clientY - canvas.getBoundingClientRect().top;
    return {x: x, y: y};
}

function takeSnapshot(){
    snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
}

function restoreSnapshot(){
    context.putImageData(snapshot, 0, 0);
}

function drawPolygon(position, sides, angle) {
    var coordinates = [],
        radius = Math.sqrt(Math.pow((dragStartLocation.x - position.x), 2) + Math.pow((dragStartLocation.y - position.y), 2)),
        index = 0;

    for (index = 0; index < sides; index++) {
        coordinates.push({x: dragStartLocation.x + radius * Math.cos(angle), y: dragStartLocation.y - radius * Math.sin(angle)});
        angle += (2 * Math.PI) / sides;
    }

    context.beginPath();
    context.moveTo(coordinates[0].x, coordinates[0].y);
    for (index = 1; index < sides; index++) {
        context.lineTo(coordinates[index].x, coordinates[index].y);
    }

    context.closePath();
    context.fill();
}

function clearcanvas()
{
    var canvas = document.getElementById('canvas'),
        clear = canvas.getContext("2d");
    clear.clearRect(0, 0, canvas.width, canvas.height);
}

function drawScreen() {
    tricount=0;
    tri = [];
    context.fillStyle = bgColor;
    context.fillRect(0,0,canvas.width,canvas.height);
}	

function dragStart(event){
    dragging = true;
    dragStartLocation = getCanvasCoordinates(event);
    color = "rgb(" + Math.floor(Math.random()*200) + "," + Math.floor(Math.random()*200) + "," + Math.floor(Math.random()*200) +")";
    takeSnapshot();
}

function drag(event){
    var position;
    if(dragging === true){
        restoreSnapshot();
        position = getCanvasCoordinates(event);
        context.fillStyle = color;
        context.fill();
        drawPolygon(position, 3, 12.04);
    }
}

function dragStop(event){
    dragging = false;
    restoreSnapshot();
    var position =getCanvasCoordinates(event);
    context.fillStyle = color;
    context.fill();
    drawPolygon(position, 3, 12.04);
}

function init(){
    canvas = document.getElementById("canvas");
    context = canvas.getContext('2d');
    context.linkWidth = 6;
    context.lineGap = 'round';
    canvas.addEventListener('mousedown', dragStart, false);
    canvas.addEventListener('mousemove', drag, false);
    canvas.addEventListener('mouseup', dragStop, false);
    canvas.addEventListener('dblclick', deleteCircle,false);
}
window.addEventListener('load',init,false);

function togglebtn(){

    if(document.getElementById("btnMve").name == "Draw Shape")
        { 	
    
            canvas.removeEventListener("mousedown", mouseDown, false);
            document.getElementById("btnMve").name = "Move Shape";
    
            canvas.addEventListener('mousedown', dragStart, false);
            canvas.addEventListener('mousemove', drag, false);
            canvas.addEventListener('mouseup', dragStop, false);				
        }
  else if(document.getElementById("btnMve").name == "Move Shape")
  {         
    
            canvas.removeEventListener("mousedown", dragStart, false);
            canvas.removeEventListener("mousemove", drag, false);
            canvas.removeEventListener("mouseup", dragStop, false);
            
            document.getElementById("btnMve").src = "drawButton.jpg";
            document.getElementById("btnMve").name = "Draw Shape";
            document.getElementById("spid").innerHTML="Click here to draw the circles";
            
            canvas.addEventListener('mousedown', mouseDown, false);
   }
}

