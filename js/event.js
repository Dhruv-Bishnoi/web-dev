

setInterval(() => {
    let color = ["red","green","Blue","Brown","black","grey","orange","purple"]
    document.querySelectorAll(".container").forEach( e =>{
    let random = Math.floor(Math.random() * 9);
    e.style.background= color[random]
})
}, 1000);


