var stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

let gui;

function animate() {

	stats.begin();

	// monitored code goes here

	stats.end();

	requestAnimationFrame( animate );

}

requestAnimationFrame( animate );

var canvas = document.getElementsByTagName('div')[0];
canvas.style.right = '0px';
canvas.style.left = '';
canvas.style.zIndex = '40';
  
console.log(canvas);

let TerrainControl = {
  peaks: 20,
  speed: .025,
  spikiness: 80,
  erosion: 0.22,
  waterlevel: 30,
  terrainColor:[99,119,125],
  waterColor: [78,115,128],
  // energy: energy.bass,
  energy: 'bass',
  terrainColorCycle: false,
  waterColorCycle: false
  // colorCycle = () => { return terrainColor[Math.random(), 200, Math.random()] }
 
};

let r=255,g=0,b=0;

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

var updateGUI = function() {

  requestAnimationFrame(updateGUI);

  if (TerrainControl.terrainColorCycle == true) {
    TerrainControl.terrainColor = [r,g,b];
  }

  if (TerrainControl.waterColorCycle == true) {
    TerrainControl.waterColor = [g,r,b];
  }
  

  // Iterate over all controllers
  

};

window.onload = function() {
  gui = new dat.GUI({name: 'Terrain Controller'});
  let f1 = gui.addFolder('Terrain');
  let f2 = gui.addFolder('Water');
  let f3 = gui.addFolder('Sound');
  // let f2 = gui.addFolder('');

  f1.add(TerrainControl, 'peaks', 15, 25);
  f1.add(TerrainControl, 'speed', .0015, .1);
  f1.add(TerrainControl, 'spikiness', 20, 200);
  f1.add(TerrainControl, 'erosion', .05, .30);
  f1.addColor(TerrainControl, 'terrainColor').listen();
  f1.add(TerrainControl, 'terrainColorCycle');
  f1.open();

  f2.add(TerrainControl, 'waterlevel', 20, 80);
  f2.addColor(TerrainControl, 'waterColor').listen();
  f2.add(TerrainControl, 'waterColorCycle');
  f2.open();

  // f3.add(TerrainControl, 'energy', {bass: 10, mid: 125, trebel: 300});
  f3.add(TerrainControl, 'energy', { bass: 'bass', mid: 'mid', trebel: 'treble' } );
  f3.open();



};