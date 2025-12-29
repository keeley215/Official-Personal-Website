import { Component, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
// MatButton not used in template; no need to import
import {MatToolbar} from "@angular/material/toolbar";
import {RouterLink} from "@angular/router";
import {MatIcon} from '@angular/material/icon';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'app-navigation',
  imports: [
    CommonModule,
    MatToolbar,
    RouterLink,
    MatIcon,
    MatDivider,
  ],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnDestroy {
  private lastScrollTop = 0;
  private scrollThreshold = 5; // Minimum scroll distance to trigger hide/show
  private topThreshold = 100; // Always show navbar when within this distance from top
  isNavbarVisible = true;

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Always show navbar when at the top
    if (currentScrollTop <= this.topThreshold) {
      this.isNavbarVisible = true;
      this.lastScrollTop = currentScrollTop;
      return;
    }
    
    // Check scroll direction and distance
    const scrollDifference = Math.abs(currentScrollTop - this.lastScrollTop);
    
    if (scrollDifference >= this.scrollThreshold) {
      if (currentScrollTop > this.lastScrollTop) {
        // Scrolling down - hide navbar
        this.isNavbarVisible = false;
      } else {
        // Scrolling up - show navbar
        this.isNavbarVisible = true;
      }
      
      this.lastScrollTop = currentScrollTop;
    }
  }

  openResume(): void {
    try {
      window.open('/resume.pdf', '_blank');
    } catch (e) {
      // fallback: navigate in same tab
      location.href = '/resume.pdf';
    }
  }

  ngOnDestroy(): void {
    // Cleanup is handled automatically by @HostListener
  }

}
