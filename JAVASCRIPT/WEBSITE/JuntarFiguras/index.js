const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle="red";
ctx.fillRect(0, 0, 150, 75);

ctx.fillStyle="blue";
ctx.fillRect(160, 85, 150, 75);

ctx.fillStyle="green";
ctx.fillRect(150, 75, 10, 10);