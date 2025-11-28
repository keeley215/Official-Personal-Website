import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-contact',
  imports: [RouterLink, MatButtonModule, MatIcon],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
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
