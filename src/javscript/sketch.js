var cols, rows;
var scl;
var w;
var h;

// var camZoom;

var flying = 0;

var terrain = [];

var analyzer;

let mic, fft;

var zoom = -450;
var zoomMin = -1100;
var zoomMax = -410;
var sensativity = 0.15;

let r=255,g=0,b=0;

let spectrum, energy;

const firstColor = TerrainControl.terrainColor;

function setup() {

  scl = 25;

  createCanvas(windowWidth, windowHeight, WEBGL);


  w = width / 2;
  h = height / 2;

  cols = w / scl;
  rows = h / scl;

  mic = new p5.AudioIn();
  // // By default, it does not .connect() (to the computer speakers)
  // mic.stop();

  fft = new p5.FFT();
  fft.setInput(mic);


  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }




}

function colorCycle() {
  if(r > 0 && b == 0){
    r--;
    g++;
  }
  if(g > 0 && r == 0){
    g--;
    b++;
  }
  if(b > 0 && g == 0){
    r++;
    b--;
  }
}

function windowResized() {

  resizeCanvas(windowWidth, windowHeight);

}

function mouseWheel(event) {

  zoom += sensativity * event.delta;
  zoom = constrain(zoom, zoomMin, zoomMax);
  //uncomment to block page scrolling
  console.log(zoom)
  return false;
}




function draw() {

  if(TerrainControl.micIn === true) {
    

    mic.start();

  

  } else {
  
    TerrainControl.micIn = false;
    // console.log(TerrainControl.micIn)
   
    
  
  }

  if (TerrainControl.terrainColorCycle == true) {

    colorCycle();
    TerrainControl.terrainColor[0] = r;
    TerrainControl.terrainColor[1] = g;
    TerrainControl.terrainColor[2] = b;
    updateGUI();
  
  } else {




  } 
  
  if (TerrainControl.waterColorCycle == true) {
   
    colorCycle();
    TerrainControl.waterColor[0] = g;
    TerrainControl.waterColor[1] = b;
    TerrainControl.waterColor[2] = r;
    updateGUI();
  } 


  
  spectrum = fft.analyze(); 
  energy = fft.getEnergy(TerrainControl.energy);
  


  background(20);
  camera(0, zoom, -400, 0, 0, 0, 0, 10, 0);
  ambientLight(TerrainControl.terrainColor[0], TerrainControl.terrainColor[1], TerrainControl.terrainColor[2]);
  pointLight(TerrainControl.terrainColor[0], TerrainControl.terrainColor[1], TerrainControl.terrainColor[2], 500, -970, 200);


  flying += TerrainControl.speed;
  var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, 0, energy + spectrum[x + y] + TerrainControl.spikiness );
      xoff += TerrainControl.erosion;
    }
    if (TerrainControl.isReversed == true) {
      yoff -= 0.15; //speed
    } else {
      yoff += 0.15;
    }
  }


  rotateX(PI / 3);
  translate((-w / 2) + 20, -h + 20);
  strokeWeight(1 / 2);
  stroke(10);
  specularMaterial(TerrainControl.terrainColor[0], TerrainControl.terrainColor[1], TerrainControl.terrainColor[2]);

  for (var y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);

    for (var x = 0; x < cols; x++) {
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }





  //   translate(0, -50);
  translate((w / 2), (h / 2) - 20, TerrainControl.waterlevel);

  noStroke();

  specularMaterial(TerrainControl.waterColor[0], TerrainControl.waterColor[1], TerrainControl.waterColor[2]);
  

  plane(w - 100, (windowHeight / 2) - 100 );






}
