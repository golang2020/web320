import { Component, OnInit, ViewChild, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';

import * as THREE from 'three';
import { Vector3 } from 'three';
import OrbitControls from 'orbit-controls-es6';
//import { View3dComponent } from '../view3d/view3d.component';

@Component({
  selector: 'app-spinning-cube',
  templateUrl: './spinning-cube.component.html',
  styleUrls: ['./spinning-cube.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SpinningCubeComponent implements OnInit {
  
  @ViewChild('cubeCanvas') cubeCanvas;

  private width = window.innerWidth;
  private height = window.innerHeight;
  private scene: THREE.Scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  //private view3d: View3dComponent;
  private cube: THREE.Mesh;
  private controls: OrbitControls;
  private animationDisplay;
  private nearPlane: number = 0.1;
  private farPlane: number = 1000;
  private fieldView: number = 75;

  constructor(private element: ElementRef, private ngRenderer: Renderer2) { 

  }

  ngOnInit() {
    //this.view3d = new View3dComponent();
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.width, this.height);
    this.camera = new THREE.PerspectiveCamera(this.fieldView, this.width/this.height,
                                              this.nearPlane, this.farPlane);
    //this.topGroup = new THREE.Group();
    
    this.renderer.setPixelRatio(window.devicePixelRatio);
    //
    this.cube = this.createCube(2.5, new THREE.Color('rgb(255,96,70)'));
    this.cube.position.set(0, 0, -0.8);
    this.scene.add(this.cube);
    // line
    let lineMaterial = new THREE.LineBasicMaterial( {
      color: 0x00ff00,
      linewidth: 2
    } );
    let points = [];
    points.push( new THREE.Vector3( -10, 0, 0 ) );
    points.push( new THREE.Vector3( 0, 10, 0 ) );
    points.push( new THREE.Vector3( 10, 0, 0 ) );
    
    let lineGeometry = new THREE.BufferGeometry().setFromPoints( points );
    this.scene.add( new THREE.Line( lineGeometry, lineMaterial ) );
    
    //create a quad geometry
    let geometry = new THREE.Geometry();
    geometry.vertices.push( new THREE.Vector3( -5, -5, 0 ) );
    geometry.vertices.push( new THREE.Vector3(  5, -5, 0 ) );
    geometry.vertices.push( new THREE.Vector3(  5,  5, 0 ) );
    geometry.vertices.push( new THREE.Vector3( -5,  5, 0 ) );
    //create a new face using vertices 0, 1, 2, and 0, 3, 2
    //add the face to the geometry's faces array
    geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
    geometry.faces.push( new THREE.Face3( 0, 3, 2 ) );
    //the face normals and vertex normals can be calculated automatically if not supplied above
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
    let material = new THREE.MeshStandardMaterial( {
      color: 0x0000ff, 
      opacity: 0.8,
      transparent: true,
      side: THREE.DoubleSide,
      //shading: THREE.FlatShading,
      polygonOffset: true,
      polygonOffsetFactor: 1, 
      polygonOffsetUnits: 1
    } );
    let mesh = new THREE.Mesh( geometry, material );
    this.scene.add( mesh );
    //outline of mesh
    let geo = new THREE.EdgesGeometry( geometry ); 
    let mat = new THREE.LineBasicMaterial( { color: 0xff0000, linewidth: 1 } );
    mesh.add( new THREE.LineSegments( geo, mat ) );
    //grid
    this.scene.add( new THREE.GridHelper( 20, 20, 0x0c610c, 0x444444 ) );

    this.scene.add( new THREE.AmbientLight( 0x909090 ) );
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.minDistance = 1;
    this.controls.mazDistance = 1000;
    this.camera.position.z = 15;
    this.camera.lookAt(this.scene.position);
    this.initScene();
      window.addEventListener('resize', () => {
          this.onResize();
      });
  }
  
  initScene() {

    let vrButtonOptions = {
        color: 'white',
        background: false,
        corners: 'square'
    };
    this.ngRenderer.appendChild(this.element.nativeElement, this.renderer.domElement);
    
    this.animationDisplay = window;
    window.requestAnimationFrame(() => {
      this.update();
    });
  }

  update() {

    this.cube.rotateY(0.03);
    this.cube.rotateZ(0.03);
    //this.view3d.render();
    this.renderer.render(this.scene, this.camera);
    this.animationDisplay.requestAnimationFrame(() => {
        this.update();
    });

  }

  onResize() {
    //this.view3d.resize();
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }

  createCube(size, color): THREE.Mesh {

    let geometry = new THREE.BoxGeometry(size, size, size);
    let material = new THREE.MeshBasicMaterial({color});

    return new THREE.Mesh(geometry, material);

  }
  
}
