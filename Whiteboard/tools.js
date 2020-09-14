ctx.lineWidth=5;
ctx.lineCap="round";
ctx.lineJoin='round';
let activeTool="pencil";
let pencil=document.querySelector("#pencil");
let eraser=document.querySelector("#eraser");
let pencilOption=document.querySelector("#pencil-option");
let eraserOption=document.querySelector("#eraser-option");
function handleTool(tool){
    if(tool=="pencil")
    {
        if(activeTool=="pencil")
        {
            pencilOption.classList.add("show");
        }
        else{
            ctx.strokeStyle="black";
            activeTool="pencil";
            eraserOption.classList.remove("show");
        }
    }
    else if(tool=="eraser"){
        
        if(activeTool=="eraser")
        {
            eraserOption.classList.add("show");
        }
        else{
            ctx.strokeStyle="white";
            activeTool="eraser";
            pencilOption.classList.remove("show");
        }
       
    }
    else if(tool=="sticky")
    {
        createSticky();
    }
    else if(tool=="upload")
    {
        uploadFile();
    }
    else if(tool=="undo"){
        undoLast();
    }
    else if(tool=="redo")
    {
        redoLast();
    }
    else if(tool=="download")
    {
        downloadBoard();
    }
}
function changeColor(color)
{
    ctx.strokeStyle=color;
}

let sliders=document.querySelectorAll("input[type='range']");
for(let i=0;i<sliders.length; i++){
sliders[i].addEventListener("change",function(){
let width=sliders[i].value;
ctx.lineWidth=width;
})
}
