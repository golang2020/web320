import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-data3d',
  templateUrl: './data3d.component.html',
  styleUrls: ['./data3d.component.scss']
})
export class Data3dComponent implements OnInit {
  static ID : number = 0;
  //wrap the object3d in THREEjs
  private object3d: THREE.Object3D  = new THREE.Object3D();
  // can be found by calling scene.getObjectByName(name)
  constructor() { 
    this.object3d.name = 'Data3dComponent'+Data3dComponent.ID;
    Data3dComponent.ID++;
  }

  ngOnInit(): void {
  }

  getObject3D(): THREE.Object3D {
    return this.object3d;
  }

  getName(): string {
    return this.object3d.name;
  }
}
