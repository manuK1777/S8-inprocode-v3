import { Component, AfterViewInit, HostListener, OnDestroy } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';

declare let L: any;

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [ MaterialModule ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit, OnDestroy {

  private map!: any; 

  constructor() {} 

  ngAfterViewInit(): void {
    this.initMap();
  
   // Trigger a resize check once the map is initialized
      setTimeout(() => {
        this.map.invalidateSize();
      }, 0);
    }

    private initMap(): void {
      this.map = L.map('map').setView([41.619443, 1.827222], 9);

    // Add OpenStreetMap tiles to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    if (this.map) {
      this.map.invalidateSize();
    }
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }
  

 // var map = L.map('map').setView([51.505, -0.09], 13);
}
