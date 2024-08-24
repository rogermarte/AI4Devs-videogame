###
Which one is the best framework/library for HTML/CSS/Javascript  browser platform game (arkanoid clone)?


###
You are an expert game developer. Your task is to set up the structure for a lightweight Arkanoid clone using Phaser 3, a popular HTML5 game framework. I don't want to white any line of code myself, so please handle all the necessary file creation and setup.

First, create the following project structure:

- arkanoid-RMT/
	- index.html
	- main.js
	- assets/
		- images/
		- audio/

Execute the necessary commands using python to create these directories and files.

Once the structure is created, populate 'index.html' and 'main.js' and verify Phaser js correctly added 

###
phaser.js:77307 Canvas2D: Multiple readback operations using getImageData are faster with the willReadFrequently attribute set to true. See: https://html.spec.whatwg.org/multipage/canvas.html#concept-canvas-will-read-frequently
checkInverseAlpha @ phaser.js:77307
init @ phaser.js:77318
(anonymous) @ phaser.js:77324
__webpack_require__ @ phaser.js:30
(anonymous) @ phaser.js:77208
__webpack_require__ @ phaser.js:30
(anonymous) @ phaser.js:76559
__webpack_require__ @ phaser.js:30
(anonymous) @ phaser.js:156103
__webpack_require__ @ phaser.js:30
(anonymous) @ phaser.js:216929
(anonymous) @ phaser.js:216995
__webpack_require__ @ phaser.js:30
(anonymous) @ phaser.js:94
(anonymous) @ phaser.js:97
webpackUniversalModuleDefinition @ phaser.js:9
(anonymous) @ phaser.js:10
phaser.js:77270 Canvas2D: Multiple readback operations using getImageData are faster with the willReadFrequently attribute set to true. See: https://html.spec.whatwg.org/multipage/canvas.html#concept-canvas-will-read-frequently
yellow.onload @ phaser.js:77270
load (async)
magenta.onload @ phaser.js:77255
load (async)
checkBlendMode @ phaser.js:77251
init @ phaser.js:77317
(anonymous) @ phaser.js:77324
__webpack_require__ @ phaser.js:30
(anonymous) @ phaser.js:77208
__webpack_require__ @ phaser.js:30
(anonymous) @ phaser.js:76559
__webpack_require__ @ phaser.js:30
(anonymous) @ phaser.js:156103
__webpack_require__ @ phaser.js:30
(anonymous) @ phaser.js:216929
(anonymous) @ phaser.js:216995
__webpack_require__ @ phaser.js:30
(anonymous) @ phaser.js:94
(anonymous) @ phaser.js:97
webpackUniversalModuleDefinition @ phaser.js:9
(anonymous) @ phaser.js:10
phaser.js:106124 The AudioContext was not allowed to start. It must be resumed (or created) after a user gesture on the page. https://goo.gl/7K7WLu
createAudioContext @ phaser.js:106124
WebAudioSoundManager @ phaser.js:106050
create @ phaser.js:104177
Game @ phaser.js:162600
window.onload @ main.js:19
load (async)
(anonymous) @ main.js:1
phaser.js:88753      Phaser v3.55.2 (WebGL | Web Audio)  https://phaser.io

###
Uncaught Error: Must set explicit renderType in custom environment
    at CreateRenderer (phaser.js:79560:15)
    at Game.boot (phaser.js:162701:9)
    at DOMContentLoaded (phaser.js:91974:9)
    at new Game (phaser.js:162673:9)
    at HTMLButtonElement.<anonymous> (main.js:21:18)




