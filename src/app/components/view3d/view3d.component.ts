import { Component, OnInit, Input } from '@angular/core';
import * as THREE from 'three';
import { Vector3 } from 'three';
//npm i orbit-controls-es6 --save
import OrbitControls from 'orbit-controls-es6';

@Component({
  selector: 'app-view3d',
  templateUrl: './view3d.component.html',
  styleUrls: ['./view3d.component.scss']
})
export class View3dComponent implements OnInit {
 
  width: number = 400;
  height: number = 400;
  private scene: THREE.Scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private topGroup: THREE.Group;
  private controls: OrbitControls;
  

  constructor() {
    
  }

  ngOnInit(): void {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.width, this.height);
    this.camera = new THREE.PerspectiveCamera(75, this.width/this.height, 0.1, 1000);
    this.topGroup = new THREE.Group();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    
    this.scene.add(this.topGroup);
    
    // light
    let directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    this.scene.add( directionalLight );
    let targetObject = new THREE.Object3D();//0,0,0
    this.scene.add(targetObject);
    directionalLight.target = targetObject;//default from up to down
    
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.minDistance = 1;
    this.controls.mazDistance = 1000;
    this.camera.position.z = 15;
    this.camera.lookAt(this.scene.position);
    
  }

  public getRender(): THREE.WebGLRenderer {
    return this.renderer;
  }

  public getTopGroup(): THREE.Group {
    return this.topGroup;
  }

  public add(obj3d: THREE.Object3D) {
    this.topGroup.add(obj3d);
  }

  public resize() {
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }
  /**
   * Render the view.
   */
  public render() {
    this.renderer.render(this.scene, this.camera);
    
    //this.controls.update();
  }

  public getControl(): OrbitControls {
    this.controls;
  }

}
