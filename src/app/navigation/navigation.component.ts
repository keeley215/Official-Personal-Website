import { Component } from '@angular/core';
// MatButton not used in template; no need to import
import {MatToolbar} from "@angular/material/toolbar";
import {RouterLink} from "@angular/router";
import {MatIcon} from '@angular/material/icon';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'app-navigation',
  imports: [
    MatToolbar,
    RouterLink,
    MatIcon,
    MatDivider,
  ],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  openResume(): void {
    try {
      window.open('/resume.pdf', '_blank');
    } catch (e) {
      // fallback: navigate in same tab
      location.href = '/resume.pdf';
    }
  }

}
