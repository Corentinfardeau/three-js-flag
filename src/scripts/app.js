/**********************************************************************

APP

**********************************************************************/

window.THREE = require('three');

require('../vendors/TrackballControls.js');
require('gsap');
const _ = require('underscore');

class App {

	constructor(){
		
		_.bindAll(this, 'animate', 'onKeyDown', 'onKeyUp', 'restart', 'onResize');

		this.isKeydown = false;
		
		this.time = 0;

		this.params = {
			text : '9',
			speed: 4.0,
			offset: 20.0,
			fontSize: 1000
		};
		
		let width = window.innerWidth;
		let height = window.innerHeight;

		this.cameraOpts = {
			near : 0.1,
			aspect: width/height,
			far : 10000,
			z: 100
		}
		
		this.planeHeight = 400;
		this.ratio = width/height;
		this.planeWidth = this.planeHeight*this.ratio;

		let fov = 2 * Math.atan( this.planeHeight / ( 2 * this.cameraOpts.z ) ) * ( 180 / Math.PI );
		let container = document.getElementsByClassName('container')[0];

		this.clock = new THREE.Clock();
		this.renderer = new THREE.WebGLRenderer({ antialias: true});

		this.camera = new THREE.PerspectiveCamera(fov, this.cameraOpts.aspect, this.cameraOpts.near, this.cameraOpts.far);


		this.scene = new THREE.Scene();
		this.scene.add(this.camera);

		this.camera.position.z = this.cameraOpts.z;
		//this.camera.position.y = 10;

		this.renderer.setSize(width, height);

		container.appendChild(this.renderer.domElement);
		this.renderer.render(this.scene, this.camera);
		this.renderer.setClearColor( 0x000000, 1);

		this.cameraControls = new THREE.TrackballControls(this.camera, this.renderer.domElement);
		this.cameraControls.target.set(0, 0, 0);

		this.gui = new dat.GUI();
		this.initDat();
		
		this.start();

	}
	
	restart(){
		let texture = new THREE.Texture(this.createText(this.params.text)); 
		texture.needsUpdate = true;
		this.uniforms.texture1.value = texture;
		this.uniforms.speed.value = this.params.speed;
		this.uniforms.offset.value = this.params.offset;
	}

	start(){

		let texture = new THREE.Texture(this.createText(this.params.text)); 
		texture.needsUpdate = true;

	    var vertShader = document.getElementById('vertexShader').innerHTML;
    	var fragShader = document.getElementById('fragmentShader').innerHTML;

		let planeGeometry = new THREE.PlaneGeometry(this.planeWidth, this.planeHeight, 200, 200);
		
		this.uniforms = {
			texture1: { 
				type: 't',
				value: texture 
			},
			time: {
				type: "f",
				value: this.time
			},
			speed: {
				type: "f",
				value: this.params.speed
			},
			offset: {
				type: "f",
				value: this.params.offset
			}
		}

		let planeMaterial = new THREE.ShaderMaterial({ 
			uniforms: this.uniforms,
	        vertexShader: vertShader,
        	fragmentShader: fragShader,
        	wireframe : false,
            wireframeLinewidth : 2,
            transparent : true
		});

		this.plane = new THREE.Mesh(planeGeometry, planeMaterial);
		this.scene.add(this.plane);

		TweenMax.ticker.addEventListener('tick', this.animate);
		document.addEventListener('keydown', this.onKeyDown);
		document.addEventListener('keyup', this.onKeyUp);
		window.addEventListener('resize', this.onResize);
	}

	initDat(){
		this.gui.add(this.params, 'text').onChange(this.restart);
		this.gui.add(this.params, 'fontSize').min(100).max(1000).step(10).onChange(this.restart);
		this.gui.add(this.params, 'speed').min(0).max(10.0).step(1).onChange(this.restart);
		this.gui.add(this.params, 'offset').min(0.0).max(100.0).step(1).onChange(this.restart);
	}

	onKeyDown(e){
		if(e.keyCode == 32){
			this.isKeydown = true;
		}
	}

	onKeyUp(e){
		if(e.keyCode == 32){
			this.isKeydown = false;
		}
	}

	onResize(e){
		this.camera.aspect = window.innerWidth / window.innerHeight;
    	this.camera.updateProjectionMatrix();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.restart();
	}

	createText(text){
		this.canvas = document.createElement( 'canvas' );
		
		this.canvas.height = 2048;
		this.canvas.width = this.canvas.height*this.ratio;
		let context = this.canvas.getContext( '2d' );

		context.font = 'Bold '+ this.params.fontSize +'px Helvetica';
		context.fillStyle = 'white';
		let width = context.measureText(text).width;
		context.fillText(text, this.canvas.width/2 - width/2, this.canvas.height/2 + this.params.fontSize/(2*1.5));
		context.fill();

		return this.canvas;
	}

	animate(){
		let delta = this.clock.getDelta();
		this.cameraControls.update(delta);
		if(!this.isKeydown){
			this.uniforms.time.value += delta;
		}
		this.renderer.render(this.scene, this.camera);
	}

}

new App();