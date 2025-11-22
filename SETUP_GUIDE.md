# Angular 19 — From 0 to Hero: Full Setup & Implementation Guide

**Goal:** Build an Angular 19 app with a right-aligned Material toolbar and a dynamic "Projects" page containing hover-reveal cards, starting from nothing. This guide walks you from installing prerequisites to running, testing, and deploying the app.

**Updated:** November 17, 2025

---

## What you'll learn (quick)
- Install and configure Node.js, npm, and Angular CLI
- Create a new Angular 19 project with SCSS and routing
- Add Angular Material and use `mat-toolbar` and `mat-card`
- Implement right-aligned navigation using a flex "spacer"
- Create a dynamic `Projects` page that renders cards from a data object and toggles between an image and project details on hover
- Accessibility, testing and production builds

---

## 1 — Prerequisites (exact)

Minimum versions tested:
- Node.js 18+ (LTS recommended)
- npm 9+
- Angular CLI 19.x

Install or verify (Windows PowerShell):

```powershell
# Install Node (if you don't have it) — visit https://nodejs.org and download installer
# Verify versions
node --version
npm --version

# Install Angular CLI globally
npm install -g @angular/cli@19

# Verify CLI
ng version
```

Recommended tools:
- Visual Studio Code (with Angular Language Service)
- Git for version control

Notes:
- If you use nvm (Node Version Manager) on Windows, ensure you select Node 18+ before creating the project.

---

## 2 — Create the Angular project (zero -> app)

1. Create a new Angular project with routing and SCSS:

```powershell
ng new angular-project --routing --style=scss
cd angular-project
```

2. Add Angular Material (choose a theme and enable global typography & animations when prompted):

```powershell
ng add @angular/material
```

3. Install anything missing (safe to run):

```powershell
npm install
```

Confirm the app runs:

```powershell
ng serve --open
```

This should open `http://localhost:4200`.

---

## 3 — Project plan & file summary (what we'll create)

- `src/app/navigation/*` — update toolbar HTML and styles
- `src/app/projects/*` — new Projects standalone component (TS, HTML, SCSS)
- `src/app/app.routes.ts` — add `/projects` route

We'll use Angular Material `MatToolbar` and `MatCard` components. Cards will show an image by default and reveal structured text when hovered.

---

## 4 — Implement the right-aligned navigation (step-by-step)

Why: Material `mat-toolbar` is already a flex container. Adding a flexible spacer element between left and right groups is the simplest, most robust way to push the nav to the right.

Update the toolbar HTML (file: `src/app/navigation/navigation.component.html`):

```html
<mat-toolbar color="primary">
  <span>KJ</span>
  <mat-divider [inset]="true" [vertical]="true"></mat-divider>
  <!-- Flexible spacer pushes the nav to the right -->
  <span class="spacer"></span>

  <nav>
    <a mat-button routerLink="/" routerLinkActive="active-link">Home</a>
    <a mat-button routerLink="/about" routerLinkActive="active-link">About</a>
    <a mat-button routerLink="/projects" routerLinkActive="active-link">Projects</a>
    <a mat-button routerLink="/contact" routerLinkActive="active-link">Contact</a>
  </nav>
</mat-toolbar>
```

Add a small SCSS change (file: `src/app/navigation/navigation.component.scss`):

```scss
.spacer { flex: 1 1 auto; }
nav { display:flex; gap: 1rem; justify-content: flex-end; }
.active-link { background: white; color: var(--mdc-theme-primary) !important; }
```

Explanation: `.spacer { flex: 1 1 auto }` expands to fill remaining space between the left-side content and the right-side nav, pushing the nav to the right. `nav` uses `display:flex` to lay out link items horizontally and `gap` for spacing.

Accessibility tip: ensure the anchor text is descriptive and include `aria-current="page"` if you need explicit active-state semantics.

---

## 5 — Create the Projects page (detailed)

We'll create a standalone component using the CLI and wire it to routes. The component will:
- Hold a typed `Project` interface & a `projects` array
- Use `*ngFor` to render cards
- Use a single `hoveredCardId` property to show either image or details

CLI (create component):

```powershell
ng generate component projects --standalone
```

Open `src/app/projects/projects.component.ts` and replace with the following (explain inline):

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

interface Project { id:number; title:string; subtitle?:string; description:string; technologies:string[]; year?:string; backgroundImage?:string }

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  hoveredCardId: number | null = null; // single source of hover state

  private projectsData: Project[] = [ /* fill with objects or fetch from service */ ];

  ngOnInit(){ this.projects = this.projectsData; }
  onCardHover(id:number){ this.hoveredCardId = id }
  onCardLeave(){ this.hoveredCardId = null }
}
```

Key points:
- Standalone component: imports `CommonModule` and `MatCardModule` so it works without declaring in an `NgModule`.
- `hoveredCardId` is simple and efficient; it avoids storing state per-card.

Template (file: `projects.component.html`) — the important pattern:

```html
<div class="cards-grid">
  <mat-card *ngFor="let p of projects" class="project-card" (mouseenter)="onCardHover(p.id)" (mouseleave)="onCardLeave()">
    <div *ngIf="hoveredCardId !== p.id" class="card-image"><img [src]="p.backgroundImage" alt="{{p.title}}" loading="lazy"></div>
    <div *ngIf="hoveredCardId === p.id" class="card-data">
      <h3>{{p.title}}</h3>
      <p>{{p.description}}</p>
      <div class="tags"><span *ngFor="let t of p.technologies">{{t}}</span></div>
    </div>
  </mat-card>
</div>
```

SCSS highlights (file: `projects.component.scss`):
- Use CSS Grid for responsive layout
- Set `height` on cards and `object-fit: cover` on images
- Add a fade/transform animation for hover

Accessibility & keyboard: add `tabindex="0"` to `mat-card` and handle `(focus)` and `(blur)` to support keyboard users. Example:

```html
<mat-card tabindex="0" (focus)="onCardHover(p.id)" (blur)="onCardLeave()" ...>
```

Optional enhancements:
- Provide a service to fetch project data from an API
- Lazy-load high-resolution images on hover
- Add a click handler to open a modal with full project details

---

## 6 — Routing

Add the `projects` route.

Edit `src/app/app.routes.ts`:

```typescript
import { ProjectsComponent } from './projects/projects.component';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: '**', component: PageNotFoundComponent }
];
```

If your app uses `AppRoutingModule`, add the same entry there.

---

## 7 — Run, test and debug

Start dev server (production config in `package.json` may differ):

```powershell
npm start
# or
ng serve --open
```

Open `http://localhost:4200` and click the Projects link. Use DevTools console for runtime errors.

Unit testing (Karma):

```powershell
npm test
```

Important checks:
- Console should be free of template or DI errors
- Projects page should show cards; hover should toggle image/detail
- Links must navigate and respect active styles

---

## 8 — Production build & deployment

Build for production:

```powershell
npm run build
```

Deploy the contents of `dist/your-app-name` to any static host (Netlify, Vercel, GitHub Pages) or serve from a server. If deploying to a subfolder, ensure baseHref is configured.

Quick GitHub Actions example (skeleton):

```yaml
# .github/workflows/ci.yml
name: Build
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { 'node-version': '18' }
      - run: npm ci
      - run: npm run build
```

---

## 9 — Troubleshooting (concise)

- "Module not found" for Angular Material: run `ng add @angular/material` and `npm install`.
- Blank Projects page: ensure route is registered and template uses `*ngFor` on a non-empty array.
- Styles not applied: check `styleUrls` path and rebuild.

---

## 10 — Advanced recommendations (next steps)

- Convert Projects route to a lazily-loaded module for large lists
- Use an image CDN or pre-signed URLs for private images
- Add keyboard navigation/focus states for accessibility
- Add unit and E2E tests (Cypress) for hover and keyboard behavior

---

## 11 — Quick checklist (0→Hero)

1. Install Node & npm
2. Install Angular CLI
3. ng new ... (routing + SCSS)
4. ng add @angular/material
5. ng generate component projects --standalone
6. Add `projects` route and nav link
7. Implement hover state and styles
8. Run `npm start` and verify
9. Build and deploy

---

If you want, I will now:

- Expand the Projects `projectsData` into a sample JSON and add a service to fetch it
- Add keyboard accessibility handlers for the cards and update unit tests
- Generate a polished PDF from `SETUP_GUIDE.html` and attach it to the workspace

Which of those would you like me to do next?

**Template Features:**
- `*ngFor="let project of projects"` - Loops through project array
- `(mouseenter)` / `(mouseleave)` - Mouse event handlers for hover state
- `*ngIf="hoveredCardId !== project.id"` - Shows image when not hovered
- `*ngIf="hoveredCardId === project.id"` - Shows data when hovered
- Responsive grid that displays project cards

#### Step 2.4: Create Projects Component SCSS

**File:** `src/app/projects/projects.component.scss`

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
  position: relative;
}

.card-image {
  width: 100%;
  height: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
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
    font-style: italic;
  }

  .description {
    margin: 0 0 1rem 0;
    font-size: 0.95rem;
    line-height: 1.5;
    opacity: 0.95;
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
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .projects-container {
    padding: 1rem;

    h1 {
      font-size: 2rem;
    }
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

**Styling Features:**
- CSS Grid with `auto-fit` for responsive layout
- Smooth transitions on hover (lift and shadow effect)
- Gradient background for data overlay
- Responsive design with mobile breakpoints
- Fade-in animation for data appearance

---

### Phase 3: Update Routes

#### Step 3.1: Update App Routes

**File:** `src/app/app.routes.ts`

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

**Key Changes:**
- Import `ProjectsComponent` from the projects folder
- Add new route: `{path: 'projects', component: ProjectsComponent, title: 'Projects'}`
- Route is now accessible at `/projects` URL

---

## Running the Project

### Start the Development Server

```powershell
npm start
```

Or for development configuration:

```powershell
npm run start-dev
```

The application will automatically open in your default browser at `http://localhost:4200`

### Build for Production

```powershell
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Run Unit Tests

```powershell
npm test
```

Launches Karma test runner and opens Chrome with test results.

---

## Project Structure

```
src/
├── app/
│   ├── projects/
│   │   ├── projects.component.ts        (Component logic & data)
│   │   ├── projects.component.html      (Template with card grid)
│   │   ├── projects.component.scss      (Styles & animations)
│   │   └── projects.component.spec.ts   (Unit tests)
│   ├── navigation/
│   │   ├── navigation.component.ts      (Navigation logic)
│   │   ├── navigation.component.html    (Toolbar with spacer)
│   │   ├── navigation.component.scss    (Spacer & link styles)
│   │   └── navigation.component.css
│   ├── home/
│   ├── about/
│   ├── contact/
│   ├── page-not-found/
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.routes.ts                    (Route configuration)
│   └── app.config.ts
├── index.html
├── main.ts
└── styles.scss
```

---

## File Contents Reference

### Complete File Listing

This section provides the complete content of all modified and created files for reference and reproduction.

#### 1. src/app/navigation/navigation.component.html

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

#### 2. src/app/navigation/navigation.component.scss

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

#### 3. src/app/projects/projects.component.ts

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
    {
      id: 2,
      title: 'KBAI Research Project',
      subtitle: 'Making an AI that can pass the Human IQ Test',
      description: 'Creating an AI to pass Raven\'s Progressive Matrices Test.',
      technologies: ['NumPy', 'Agentic AI', 'Heuristic Analysis', 'Machine Learning', 'Python'],
      category: 'School',
      year: '2024',
      backgroundImage: 'https://images.unsplash.com/photo-1555606142-641d02aaeb8f?w=400&h=300&fit=crop'
    },
    // Additional projects...
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

#### 4. src/app/projects/projects.component.html

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

#### 5. src/app/projects/projects.component.scss

[See Phase 2.4 above for full SCSS content]

#### 6. src/app/app.routes.ts

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

## Troubleshooting

### Issue: "Cannot find module '@angular/material/card'"
**Solution:** Ensure Angular Material is installed:
```powershell
ng add @angular/material
npm install
```

### Issue: Projects page shows blank
**Solution:** 
1. Check browser console for errors (F12)
2. Verify `ProjectsComponent` is imported in `app.routes.ts`
3. Ensure project data is populated in `projectsData` array

### Issue: Navigation links not appearing on right side
**Solution:**
1. Verify `.spacer { flex: 1 1 auto; }` is in `navigation.component.scss`
2. Check that `<span class="spacer"></span>` is in the HTML before `<nav>`
3. Ensure `nav { justify-content: flex-end; }` is applied

### Issue: Hover effect not working
**Solution:**
1. Check that mouse event handlers are bound correctly
2. Verify `hoveredCardId` state management in component
3. Test in different browser if Chrome is having issues

---

## Best Practices Applied

1. **Standalone Components** - Uses modern Angular standalone API for simpler component management
2. **Responsive Design** - CSS Grid with mobile-first approach
3. **Material Design** - Consistent UI using Angular Material components
4. **Data Binding** - Leverages Angular's structural directives (`*ngFor`, `*ngIf`)
5. **Event Handling** - Clean separation of concerns with dedicated methods for hover state
6. **Accessibility** - Semantic HTML and alt attributes for images
7. **Performance** - Conditional rendering only shows necessary DOM elements
8. **SCSS** - Organized styles with nesting and responsive breakpoints

---

## Next Steps & Enhancements

1. **Add project details page** - Click on a card to view full details
2. **Implement lazy loading** - Load route on demand to reduce bundle size
3. **Add keyboard navigation** - Support Tab and Enter keys for accessibility
4. **Image optimization** - Use next-gen image formats or lazy loading
5. **Dark mode support** - Add theme switcher
6. **Search/filter** - Add ability to filter projects by category or year
7. **Add animations** - Entrance animations for cards on page load
8. **Unit tests** - Add Jasmine tests for component logic

---

## Useful Resources

- [Angular Documentation](https://angular.io/docs)
- [Angular Material Components](https://material.angular.io/components)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [SCSS Documentation](https://sass-lang.com/documentation)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**End of Setup Guide**

*For questions or issues, refer to the troubleshooting section or consult the Angular documentation.*
