console.log("Welcome to glassmorphic calculator");
let btn = document.getElementsByClassName("btn");
let display = document.getElementById("display");
let txt = document.querySelector(".txt");
let letter = "Calculator 1.6";
string = " ";
let i = 0;
let n = letter.length;
let remove;



function dlt() {
  txt.innerHTML = letter.substring(0, n);
  n--;
  if (n == -1) {
    i = 0;
    n = letter.length;
    clearInterval(remove);
    clearInterval(write);
    setTimeout(() => {
      write = setInterval(type, 1000);
    }, 3000);
  }
}

let box = document.querySelector(".main");
box.addEventListener("mousemove", (e) => {
  let Bwidth = box.offsetWidth;
  let Bheight = box.offsetHeight;
  let centerX = box.offsetLeft + Bwidth / 2;
  let centerY = box.offsetTop + Bheight / 2;
  let eventX = e.clientX - centerX;
  let eventY = e.clientY - centerY;
  let rotateX = (20 * eventY) / (Bheight / 2);
  let rotateY = (-1 * 20 * eventX) / (Bwidth / 2);
  box.style.transform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  // console.log(val);
  //console.log("eventX:"+eventX,"Bwidth/2:"+ Bwidth/2,"rotateX:"+rotateX);
});

box.addEventListener("mouseenter", () => {
  box.style.transition = "all 0.05s ease";
});

box.addEventListener("mouseleave", () => {
  box.style.transform = `rotateX(${0}deg) rotateY(${0}deg`;
  box.style.transition = "all 0.6s ease";
});
//calculator logic
Array.from(btn).forEach((element) => {
  element.addEventListener("click", (e) => {
    // console.log(element);
    let val = e.target.innerHTML;
    if (val == "=") {
      string = eval(string);
      display.value = string;
      //string = "";
    } else if (val == "DEL") {
      string = "";
      display.value = string;
    } else {
      string = string + val;
      display.value = string;
    }
  });
});

function newFunction() {
  while (n < 5);
}
