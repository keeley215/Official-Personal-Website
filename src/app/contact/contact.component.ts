import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-contact',
  imports: [CommonModule, RouterLink, MatButtonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  // City background images
  pittsburghImage = 'pitt4.jpg';
  savannahImage = 'savannah.jpg';

  openEmail(): void {
    const address = 'keeley5456@gmail.com';
    const subject = encodeURIComponent('Inquiry from Portfolio Website');
    const body = encodeURIComponent("Hi Keeley! I would like to get in touch with you regarding...");
    try {
      window.location.href = `mailto:${address}?subject=${subject}&body=${body}`;
    } catch {
      // Fallback
      location.href = `mailto:${address}?subject=${subject}&body=${body}`;
    }
  }
}
