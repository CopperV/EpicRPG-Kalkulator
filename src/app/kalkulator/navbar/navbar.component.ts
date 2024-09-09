import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  house = "house-chimney";
  discord = "fa-discord";

  constructor(private library: FaIconLibrary) {
    library.addIconPacks(fas, fab);
  }

  ngOnInit() {
  }

}
