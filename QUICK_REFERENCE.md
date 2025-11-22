# QUICK REFERENCE: CLI Commands & Implementation Order

## 1. INITIAL SETUP

### Create Project
```
ng new Angular-19-example-with-navigation-and-SCSS
cd Angular-19-example-with-navigation-and-SCSS
```
Choose: Routing = YES, Stylesheet = SCSS

### Install Dependencies
```
ng add @angular/material
npm install
```

---

## 2. FILE CHANGES IN ORDER

### PHASE 1: Navigation Component (Right-Align)

#### 2.1 Update: src/app/navigation/navigation.component.html
```html
<mat-toolbar color="primary">
  <span>KJ</span>
  <mat-divider [inset]='true' [vertical]='true'></mat-divider>
  <span class="spacer"></span>
  <nav>
    <a mat-button  mat-button-flat routerLink="/" routerLinkActive="['active-link']"> Home </a>
    <a mat-flat-button routerLink="/about" routerLinkActive="['active-link']"> About </a>
    <a mat-flat-button routerLink="/projects" routerLinkActive="['active-link']"> Projects </a>
    <a mat-flat-button routerLink="/contact" routerLinkActive="['active-link']"> Contact </a>
  </nav>
</mat-toolbar>
```

#### 2.2 Update: src/app/navigation/navigation.component.scss
```scss
nav {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.spacer {
  flex: 1 1 auto;
}

.active-link {
  background-color: white;
  color: var(--mdc-theme-primary) !important;
}

a.mat-button {
  border-radius: 50%;
  padding: 10px 20px;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
}
```

### PHASE 2: Create Projects Component

#### 2.3 Create Component via CLI
```
ng generate component projects --standalone
```

#### 2.4 Create: src/app/projects/projects.component.ts
```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  category: string;
  year: string;
  backgroundImage: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  hoveredCardId: number | null = null;

  private projectsData: Project[] = [
    {
      id: 1,
      title: 'Drone Sim and Radio Controller Testing',
      subtitle: 'Beginning of Drone Studies',
      description: 'Journey into drone technology with simulators and controllers.',
      technologies: ['Liftoff', 'Liftoff Micro', 'Radiomaster TX16S MAX II'],
      category: 'Personal',
      year: '2025',
      backgroundImage: 'https://images.unsplash.com/photo-1460925895917-adf4198db338?w=400&h=300&fit=crop'
    },
    // Add more projects...
  ];

  ngOnInit(): void {
    this.projects = this.projectsData;
  }

  onCardHover(cardId: number): void {
    this.hoveredCardId = cardId;
  }

  onCardLeave(): void {
    this.hoveredCardId = null;
  }
}
```

#### 2.5 Create: src/app/projects/projects.component.html
```html
<div class="projects-container">
  <h1>My Projects</h1>
  <div class="cards-grid">
    <mat-card 
      *ngFor="let project of projects" 
      class="project-card"
      (mouseenter)="onCardHover(project.id)"
      (mouseleave)="onCardLeave()"
    >
      <div class="card-content" [class.hovered]="hoveredCardId === project.id">
        <div class="card-image" *ngIf="hoveredCardId !== project.id">
          <img [src]="project.backgroundImage" [alt]="project.title">
        </div>

        <div class="card-data" *ngIf="hoveredCardId === project.id">
          <h2>{{ project.title }}</h2>
          <p class="subtitle">{{ project.subtitle }}</p>
          <p class="description">{{ project.description }}</p>
          <div class="technologies">
            <span *ngFor="let tech of project.technologies" class="tech-tag">
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
    </mat-card>
  </div>
</div>
```

#### 2.6 Create: src/app/projects/projects.component.scss
```scss
.projects-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2.5rem;
    color: var(--mdc-theme-primary);
  }
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.project-card {
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 300px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }
}

.card-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-image {
  width: 100%;
  height: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.card-data {
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  animation: fadeIn 0.3s ease-in;

  h2 {
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
    font-weight: 600;
  }

  .subtitle {
    margin: 0 0 0.5rem 0;
    font-size: 0.9rem;
    opacity: 0.9;
  }

  .description {
    margin: 0 0 1rem 0;
    font-size: 0.95rem;
    line-height: 1.5;
  }
}

.technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.4);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (max-width: 768px) {
  .projects-container {
    padding: 1rem;
    h1 { font-size: 2rem; }
  }

  .cards-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .project-card {
    height: 250px;
  }
}
```

### PHASE 3: Update Routes

#### 2.7 Update: src/app/app.routes.ts
```typescript
import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {ProjectsComponent} from './projects/projects.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

export const routes: Routes = [
  {path: '', component: HomeComponent, title: 'Home'},
  {path: 'about', component: AboutComponent, title: 'About'},
  {path: 'contact', component: ContactComponent, title: 'Contact Us'},
  {path: 'projects', component: ProjectsComponent, title: 'Projects'},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];
```

---

## 3. RUN THE PROJECT

```
npm start
```

Application opens at: http://localhost:4200

---

## KEY CHANGES EXPLAINED

### Spacer (Navigation)
- `<span class="spacer"></span>` with `flex: 1 1 auto`
- Expands to fill available space, pushing nav to right

### Card Hover Logic
- `hoveredCardId` tracks which card is hovered
- `*ngIf` conditionally shows image or data
- `(mouseenter)` and `(mouseleave)` toggle state

### Responsive Grid
- `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))`
- Auto creates columns as screen allows
- Mobile breakpoint at 768px

---

## CHECKLIST

- [ ] Project created with routing and SCSS
- [ ] Angular Material installed
- [ ] Navigation updated with spacer and Projects link
- [ ] Projects component generated
- [ ] All component files created with correct content
- [ ] Routes updated with Projects route
- [ ] `npm start` runs without errors
- [ ] Navigation links appear on right side
- [ ] Projects page accessible at /projects
- [ ] Cards show images, data on hover
- [ ] Responsive on mobile

---

**Total Implementation Time: ~30 minutes**
