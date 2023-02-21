let content=document.getElementById("content"); //get input field
let form=document.querySelector(".qrform")//get the form to add eventlistner
let qrCodeDiv=document.querySelector(".qrcode");
let qrCode;


function generateQRCode(content){
    return new QRCode(qrCodeDiv,{
     text: content,
     width:256,
     height:256,
     colorDark:"#000000",
     colorLight:"#ffffff",
     correctLevel:  QRCode.CorrectLevel.H
    });// create qrcode object ang give the target and text
}







form.addEventListener("submit",function(event){
    event.preventDefault();
    let val=content.value ;//get input field value
    if(qrCode==null){
        qrCode=generateQRCode(val);
        //console.log(JSON.stringify(qrCode));
    }
    else{
        qrCode.makeCode(val); //make another code with different text
        qrCodeDiv.removeChild(qrCodeDiv.lastChild); // if we change the input text and generate qrcode again the previous download button remove
    }
    //create download button
    let download=document.createElement("button");// create button
    download.setAttribute("id","download");//set id so that we add style to it
    qrCodeDiv.appendChild(download); //append to qrcode div

    let download_link=document.createElement("a");
    download_link.setAttribute("download","qr_code_link.png");
    download_link.innerText="Download";

    download.appendChild(download_link); //append the anchor element to button

    if(document.querySelector(".qrcode img").getAttribute("src") == null){
        setTimeout(() => {
            download_link.setAttribute("href", `${document.querySelector("canvas").toDataURL()}`);
        }, 300);
    }
    else{
        setTimeout(()=>{
            download_link.setAttribute("href",`${document.querySelector('.qrcode img').getAttribute("src")}`);
        }, 300);
    }
    
})