import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinningCubeComponent } from '../examples/spinning-cube/spinning-cube.component';
import { View3dComponent } from './components/view3d/view3d.component';
import { Data3dComponent } from './components/data3d/data3d.component';
import { MenubarComponent } from './menubar/menubar.component';

@NgModule({
  declarations: [
    AppComponent,
    SpinningCubeComponent,
    View3dComponent,
    Data3dComponent,
    MenubarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
