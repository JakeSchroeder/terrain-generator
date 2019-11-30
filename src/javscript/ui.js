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
  startstop: false,
  speed: .025,
  isReversed: false,
  spikiness: 80,
  erosion: 0.22,
  waterlevel: 20,
  terrainColor:[99,119,125],
  waterColor: [78,115,128],
  // energy: energy.bass,
  energy: 'bass',
  // micIn: false,
  terrainColorCycle: false,
  waterColorCycle: false
  // colorCycle = () => { return terrainColor[Math.random(), 200, Math.random()] }
 
};



var updateGUI = function() {

  
  requestAnimationFrame(updateGUI);
  
  

};

window.onload = function() {
  gui = new dat.GUI({name: 'Terrain Controller'});
  let sound = gui.addFolder('SoundControl');
  let f1 = gui.addFolder('Terrain');
  let f2 = gui.addFolder('Water');
  let f3 = gui.addFolder('Sound');
  // let f2 = gui.addFolder('');


  sound.add(TerrainControl, 'startstop');
  sound.open();
  
  f1.add(TerrainControl, 'speed', 0, .1);
  f1.add(TerrainControl, 'isReversed');
  f1.add(TerrainControl, 'spikiness', 10, 120);
  f1.add(TerrainControl, 'erosion', .05, .30);
  f1.addColor(TerrainControl, 'terrainColor').listen();
  f1.add(TerrainControl, 'terrainColorCycle');
  f1.open();

  f2.add(TerrainControl, 'waterlevel', 20, 100);
  f2.addColor(TerrainControl, 'waterColor').listen();
  f2.add(TerrainControl, 'waterColorCycle');
  f2.open();

  // f3.add(TerrainControl, 'energy', {bass: 10, mid: 125, trebel: 300});
  f3.add(TerrainControl, 'energy', { bass: 'bass', mid: 'mid', trebel: 'treble' } );
  // f3.add(TerrainControl, 'micIn');
  f3.open();



};