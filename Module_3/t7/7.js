const hoverT = document.getElementById("trigger");

hoverT.addEventListener("mouseenter", () => {
    document.getElementById("target").src = "img/picB.jpg";
});

hoverT.addEventListener("mouseleave", () => {
    document.getElementById("target").src = "img/picA.jpg";
});