var hour;
var minute;
var second;
var size;
var drawEllipse = true;
var timeFont;
var monthFont;
var bg;

document.ontouchstart = function(e){ 
    e.preventDefault(); 
}

function preload() {
  if(drawText) {
    timeFont = loadFont(timeFontName);
  }
  if(drawMonth) {
    monthFont = loadFont(monthFontName);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  smooth(2);
  size = ((windowWidth >= windowHeight) ? windowHeight : windowWidth);
  bg = loadImage("background.jpg");
}

function draw() {
  size = ((windowWidth >= windowHeight) ? windowHeight : windowWidth);
  canvas.style.transform = size, size;
  //background(bg);
  background(255);
  translate(width / 2, height / 2);
  if (drawEllipse) {
    //image(bg, -(size) / 2, -(size) / 2, size, size);
    stroke(255);
    strokeWeight(size / 2);
    noFill();
    ellipse(0, 0, size + (size / 3), size + (size / 3));
    stroke(0);
    strokeWeight(size / 50);
    strokeCap(SQUARE);
    noFill();
    ellipse(0, 0, size / 11 * 9, size / 11 * 9);
  }
  //hours
  if (drawText) {
      for (var i = 1; i <= 12; i++) {
        noStroke();
        fill(0);
        var place = getTimeVector(i, false, size / 3.7);
        textFont(timeFont);
        textSize(size / 15);
        textAlign(CENTER, CENTER);
        text(i, place.x, place.y);
      }
  }
  
  if (drawMonth) {
      fill(245);
      stroke(30);
      strokeWeight(size / 250);
      rect(-(size) / 15, size / 10, size / 7.5, size / 20, 2);
      line(0, size / 6.57, 0, size / 10);
      textFont(monthFont);
      textSize(size / 25);
      textAlign(LEFT, CENTER);
      fill(30);
      stroke(150);
      text(day(), -(size) / 30, size / 8.5);
      text(month(), size / 30, size / 8.5);
  }

  //minute lines
  for (var i = 1; i <= 60; i++) {
    var len = ((i % 5 === 0) ? ((drawHourLinesSpecial === true) ? size / hourLinesLength : size / minuteLinesLength) : ((drawMinuteLines === true) ? size / minuteLinesLength : 0));
    var place = getTimeVector(i, true, size / 2.6315789 - len);
    stroke(0);
    strokeWeight((i % 5 === 0) ? ((drawHourLinesSpecial === true) ? size / hourLinesWeight : size / minuteLinesWeight) : (size / minuteLinesWeight));
    line(place.x, place.y, place.normalize().mult(size / 2.6315789).x, place.y);
  }
  hourv = getTimeVector(hour() + (minute() / 60) + (second() / 3600), false, size / 4.1666666);
  var date = new Date();
  var millistime = second() + date.getMilliseconds() / 1000;
  millistime = millistime / 58 * 60;
  var fminutepos;
  var addmin;
  if (millistime >= 61.95) {
    addmin = (date.getMilliseconds() % 20) / 15;
  } else {
    addmin = 0;
  }
  fminutepos = minute() + addmin;
  millistime = (millistime <= 60) ? millistime : 60;
  minutev = getTimeVector(fminutepos, true, size / 2.7777777);
  secondv = getTimeVector(millistime, true, size / 3.5714285);
  
  var trueTime;
  var normTime;
  stroke(0, 0, 0);
  strokeWeight(size / 31.25);
  trueTime = hourv.copy();
  normTime = hourv.normalize().mult(size / 20);
  line(-normTime.x, -normTime.y, trueTime.x, trueTime.y);
  strokeWeight(size / 41.6666666);
  trueTime = minutev.copy();
  normTime = minutev.normalize().mult(size / 20);
  line(-normTime.x, -normTime.y, trueTime.x, trueTime.y);
  
  stroke(255, 0, 0);
  fill(255, 0, 0);
  strokeWeight(size / 100);
  trueTime = secondv.copy();
  normTime = secondv.normalize().mult(size / 15);
  line(-normTime.x, -normTime.y, trueTime.x, trueTime.y);
  ellipse(trueTime.x, trueTime.y, size / 20, size / 20);
}

function mouseClicked() {
  drawEllipse = !drawEllipse;
}

function keyPressed() {
  if (keyCode == 83) {
    openSettings();
  }
}

function openSettings() {
  var gui = createGui('Label');
}

function getTimeVector(time, isSixty, createCanvas) {
  var currTime = time;
  var timeVector;
  var timex = cos(radians(360 * currTime / ((isSixty === true) ? 60 : 12))) * 2;
  var timey = sin(radians(360 * currTime / ((isSixty === true) ? 60 : 12))) * 2;
  timeVector = createVector(timex, timey);
  timeVector.rotate(radians(-90));
  timeVector.normalize();
  timeVector.mult(createCanvas);
  return timeVector;
}