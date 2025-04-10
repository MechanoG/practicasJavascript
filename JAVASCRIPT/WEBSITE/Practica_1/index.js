let miImage = document.querySelector("img");

miImage.onclick = function(){

    let miSrc = miImage.getAttribute("src");

    if (miSrc === "images/chen-touhou-is-having-a-nightmare-v0-s6hwiywkapqe1.webp"){
       
        miImage.setAttribute("src", "images/link-zelda.webp");

    } else {

        miImage.setAttribute("src","images/chen-touhou-is-having-a-nightmare-v0-s6hwiywkapqe1.webp");
    }
}; 


