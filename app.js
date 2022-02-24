const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d"); //2d말고도 다양한 컨택스트 존재
const colors = document.querySelectorAll(".jsColor");
const range = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");
const saveBtn = document.querySelector("#jsSave");

const INITIAL_COLOR = "black";
const CANVAS_SIZE = "700"

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE; //pixel modify에 사이즈 지정

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR; //색상 채우기
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;//굵기

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting () {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y); // lineTo -> 마지막 path좌표에서 그리기 시작
        ctx.stroke();
    }
}

function onMouseDown(event) {
    painting = true;
}

function changeColor(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function changeRange(event) {
    const size = event.target.value
    ctx.lineWidth = size;
}

function modeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}
function canvasClick() {
    if(filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event) {
    event.preventDefault(); //우클릭 기능 방지
}

function saveClick(event) {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[🎨]";
    link.click();
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting); // mousedown == click 
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", canvasClick);
    canvas.addEventListener("contextmenu", handleCM);// contextmenu 우클릭
}
colors.forEach(color => color.addEventListener("click", changeColor));

if(range) {
    range.addEventListener("click", changeRange);
}
if(mode) {
    mode.addEventListener("click", modeClick);
}
if(saveBtn) {
    saveBtn.addEventListener("click", saveClick);
}