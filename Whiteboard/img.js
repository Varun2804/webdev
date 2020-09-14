let imgInput=document.querySelector("#acceptImg");
function uploadFile(){
    //dialog box
    imgInput.click();
    imgInput.addEventListener("change",function(){
        //creates arrays of objects
        let imgObj = imgInput.files[0];
        let imgLink=URL.createObjectURL(imgObj);
        let img = document.createElement("img");
        img.setAttribute("class","upload-img");
        img.src=imgLink;
        let textBox=createBox();
        textBox.appendChild(img);
    })
}

function downloadBoard(){
    //create an anchor
    let a=document.createElement("a");
    //set filename to its download attribute
    a.download="file.png";
    //convert board to url
    let url=board.toDataURL("image/png;base64");
    // set as href of anchor
    a.href=url;
    //click the anchor
    a.click();
    // reload behavior does not get triggered
    a.remove();

}