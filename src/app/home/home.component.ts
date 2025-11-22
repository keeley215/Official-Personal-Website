import { Component, AfterViewInit, OnDestroy } from '@angular/core';
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
  selector: 'app-home',
  imports: [CommonModule, MatCardModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  hoveredCardId: number | null = null;
  overflowMap: Record<number, boolean> = {};

  featuredProjects: Project[] = [
    {
      id: 2,
      title: 'KBAI Research Project',
      subtitle: 'Making an AI that can pass the Human IQ Test',
      description: 'Creating an AI that can pass and exceed on a human intelligence test. Specifically the Raven\'s Progressive Matrices Test. The AI uses heuristic and machine learning techniques to analyze patterns and solve problems presented in the test.',
      technologies: ['NumPy', 'Agentic AI', 'Heuristic Analysis', 'Machine Learning', 'Python'],
      category: 'School',
      year: '2024',
      backgroundImage: '/neural-net-image.jpg'
    },
    {
      id: 8,
      title: 'Built a Linux Server Lab',
      subtitle: 'DevOps/Linux',
      description: 'Physically built 50 linux based servers and set them up to run automation code from provisioning to setting up the code base',
      technologies: ['Linux', 'Chef', 'Physical Hardware', 'Python', 'Bash', 'Networking', 'adb'],
      category: 'Work',
      year: '2021',
      backgroundImage: '/server%20room.jpeg'
    },
    {
      id: 3,
      title: 'Started Master\'s Degree in Computer Science at Georgia Tech',
      subtitle: 'Master in CS, Specializing in AI',
      description: 'I started a Masters in Computer Science at Georgia Tech, specializing in AI. This is through the OMSCS program which allows working professionals to earn a degree online while continuing to work full-time.',
      technologies: ['Python', 'Machine Learning', 'AI', 'Reinforced Learning', 'Algorithms', 'NumPy', 'Robotics'],
      category: 'School',
      year: '2024',
      backgroundImage: '/GT.jpg'
    },
    {
      id: 1,
      title: 'Drone Sim and Radio Controller Testing',
      subtitle: 'Beginning of Drone Studies',
      description: 'This marks the beginning of my journey into drone technology. I started experimenting with drone simulators and radio controllers to understand the basics of drone flight dynamics and control systems. I used various simulators to practice flying and familiarized myself with different types of radio controllers. The main simulator I used was Liftoff and Liftoff Micro. The main radio controller I used was Radiomaster TX16S MAX II. Both of these tools provided a solid foundation for understanding drone operations and will pave the way for more advanced studies in drone technology.',
      technologies: ['Liftoff', 'Liftoff Micro', 'Radiomaster TX16S MAX II'],
      category: 'Personal',
      year: '2025',
      backgroundImage: '/gpsenabled-drone-boasting-autofollow-technology-as-it-captures-stunning-aerial-imagery-effortlessly-tracking-subjects-produce-striking-visual-content-generated-by-ai_727385-5003-2567072353.jpg'
    }
  ];

  private resizeHandler = () => this.measureAllContent();

  ngAfterViewInit(): void {
    setTimeout(() => this.measureAllContent(), 0);
    window.addEventListener('resize', this.resizeHandler);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeHandler);
  }

  onCardHover(cardId: number): void {
    this.hoveredCardId = cardId;
    setTimeout(() => this.measureContent(cardId), 0);
  }

  onCardLeave(): void {
    this.hoveredCardId = null;
  }

  private measureAllContent(): void {
    try {
      for (const project of this.featuredProjects) {
        this.measureContent(project.id);
      }
    } catch (e) {
      // ignore measurement errors
    }
  }

  private measureContent(id: number): void {
    try {
      const selector = `.project-card[data-id="${id}"] .card-data`;
      const cardData = document.querySelector(selector) as HTMLElement | null;
      if (cardData) {
        const isOverflowing = cardData.scrollHeight > cardData.clientHeight + 4;
        this.overflowMap[id] = isOverflowing;
      } else {
        this.overflowMap[id] = false;
      }
    } catch (e) {
      this.overflowMap[id] = false;
    }
  }

  openResume(): void {
    try {
      window.open('/resume.pdf', '_blank');
    } catch (e) {
      location.href = '/resume.pdf';
    }
  }

}
