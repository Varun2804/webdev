function createBox(){
    let stickyPad=document.createElement("div");
    let navBar=document.createElement("div");
    let close=document.createElement("div");
    let minimize=document.createElement("div");
    let textbox=document.createElement("div");
    // let textarea=document.createElement("textarea");
    //add class
    stickyPad.setAttribute("class","stickyPad");
    navBar.setAttribute("class"," navBar");
    minimize.setAttribute("class","minimize");
    close.setAttribute("class","close");
    textbox.setAttribute("class","textbox");
    //create subtree
    stickyPad.appendChild(navBar);
    stickyPad.appendChild(textbox);
    navBar.appendChild(minimize);
    navBar.appendChild(close);
    // textbox.appendChild(textarea);
    //add subtree to a page
    document.body.appendChild(stickyPad);
    //close
    close.addEventListener("click",function(){
        stickyPad.remove();
    })
    let isOpen=true;
    //minimize
    minimize.addEventListener("click",function(){
        if(isOpen)
        {
            textbox.style.display="none"
        }else{
            textbox.style.display="block";
        }
        isOpen=!isOpen;
    })
    //move
    let initialX=null;
    let initialY=null;
    let isStickyDown=false;
    navBar.addEventListener("mousedown",function(e){
        initialX=e.clientX;
        initialy=e.clientY;
        isStickyDown=true;
    })
    navBar.addEventListener("mousemove",function(e){
        if(isStickyDown==true)
        {
            let finalX=e.clientX;
            let finalY=e.clientY;
            let dX=finalX-initialX;
            let dY=finalY-initialY;
            let {top, left}=stickyPad.getBoundingClientRect();
            stickyPad.style.top=top+dY+"px";
            stickyPad.style.left=left+dX+"px";
            initialX=finalX;
            initialY=finalY;
        }
    })
//navBar => mouse pointer up
navBar.addEventListener("mouseup", function(e){
    isStickyDown=false;
})
navBar.addEventListener("mouseleave",function(e){
    isStickyDown=false;
})
return textbox;

}