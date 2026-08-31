import { Component } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive
} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  isMenuOpen = false;


  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }


  closeMenu(): void {
    this.isMenuOpen = false;
  }

}