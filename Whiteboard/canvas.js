// press mouse
let isPenDown=false;
let undoArr=[];
let redoArr=[];
board.addEventListener("mousedown", function(e){
    ctx.beginPath();
    //move to the mouse pointer location
    let x=e.clientX;
    let y=e.clientY;
    let top=getLocation();
    y=Number(y) - top
    ctx.moveTo(x,y);
    console.log("Mouse down");
    isPenDown=true;
    //mouse down
    //saving all the points in undo stack
    let mdp={
        x,
        y,
        id: "md",
        color: ctx.strokeStyle,
        width:ctx.lineWidth
    }
    undoArr.push(mdp);
})
//on move
board.addEventListener("mousemove", function(e){
    if(isPenDown)
    {
        console.log("Mouse move")
        //line to
        let x=e.clientX;
        let y=e.clientY;
        let top=getLocation();
        y=Number(y) - top
        ctx.lineTo(x,y);
        //stroke
        ctx.stroke();
        let mdp={
            x,
            y,
            id: "mm",
            color: ctx.strokeStyle,
            width:ctx.lineWidth
        }
        undoArr.push(mdp);
    }
})
window.addEventListener("mouseup", function(e){
    //close path
    console.log("Mouse up");
    isPenDown=false;

})
function getLocation(){
    let { top }=board.getBoundingClientRect();
    return top;
}
function undoLast(){
    //pop the last point
    if(undoArr.length>=2)
    {
        for(let i=undoArr.length-1;i>0;i--)
        {
            console.log(undoArr[i]);
            let id=undoArr[i].id;
            if(id=="md")
            {
               redoArr.push(undoArr.pop());
                break;
            }
            else{
                redoArr.push(undoArr.pop());
            }
        }
    // clear canvas
    ctx.clearRect(0, 0, board.width, board.height);
    //redraw
    redraw();
    }
}
function redoLast(){
    if(redoArr.length>=2)
    {
        for(let i=redoArr.length-1;i>0;i--)
        {
            console.log(redoArr[i]);
            let id=redoArr[i].id;
            if(id=="md")
            {
               undoArr.push(redoArr.pop());
                break;
            }
            else{
                undoArr.push(redoArr.pop());
            }
        }
    // clear canvas
    ctx.clearRect(0, 0, board.width, board.height);
    //redraw
    redraw();
    }
}

function redraw(){
    for(let i=0;i<undoArr.length;i++)
    {
        let{x,y,id,color,width} = undoArr[i];
        ctx.strokeStyle=color;
        ctx.lineWidth=width;
        if(id=="md"){
            ctx.beginPath();
            ctx.moveTo(x,y)
        } else if(id=="mm"){
            ctx.lineTo(x,y);
            ctx.stroke();
        }
    }
}