var cols, rows;
var scl;
var w;
var h;

var camZoom;

var flying = 0;

var terrain = [];

var analyzer;

let mic, fft;


function setup() {

 
  scl = 22;

  createCanvas(windowWidth, windowHeight, WEBGL);


  w = width / 2;
  h = height / 2;

  cols = w / scl;
  rows = h / scl;

  mic = new p5.AudioIn();

  // By default, it does not .connect() (to the computer speakers)
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);

  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }




}

function windowResized() {

  resizeCanvas(windowWidth, windowHeight);

}




function draw() {


  colorCycle();
  updateGUI();

  // TerrainControl.updateDisplay();

  //console.log(TerrainControl.terrainColor[0,1,2])

  // if ( TerrainControl.colorCycle == true) {
  //   //tempColor = TerrainControl.terrainColor[0,1,2];
  //   TerrainControl.terrainColor[0,1,2][0] = r;
  //   TerrainControl.terrainColor[0,1,2][1] = g;
  //   TerrainControl.terrainColor[0,1,2][2] = b;

  //   // TerrainControl.updateDisplay();

  // } else {
  //   TerrainControl.terrainColor[0,1,2][0] = tempColor[0];
  //   TerrainControl.terrainColor[0,1,2][1] = tempColor[1];
  //   TerrainControl.terrainColor[0,1,2][2] = tempColor[2];
  // }



  fft.smooth();
  let spectrum = fft.analyze(); 
  let energy = fft.getEnergy(TerrainControl.energy);


//console.log(TerrainControl.energy)
  
  // let waveform = fft.waveform();
  
  // let averages = fft.linAverages();



  background(10);

  let locX = mouseX - height / 2;
  let locY = mouseY - width / 2;



//console.log(TerrainControl.terrainColor)

  camera(0, -800, -400, 0, 0, 0, 0, 10, 0);


  //ambientLight(255, 255, 255 );
  ambientLight(TerrainControl.terrainColor[0], TerrainControl.terrainColor[1], TerrainControl.terrainColor[2]);

  //directionalLight(000, 255, 255, 0, 100, -1);

  pointLight(TerrainControl.terrainColor[0], TerrainControl.terrainColor[1], TerrainControl.terrainColor[2], 500, -970, 200);


  flying += TerrainControl.speed;
  var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, 0, energy + spectrum[x + y] + TerrainControl.spikiness );
      xoff += TerrainControl.erosion;
    }
    yoff += 0.15; //speed
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
  translate((w / 2), (h / 2) - 50, TerrainControl.waterlevel);

  noStroke();

  specularMaterial(TerrainControl.waterColor[0], TerrainControl.waterColor[1], TerrainControl.waterColor[2]);
  

  plane(w - 100, (windowHeight / 2) );






}
