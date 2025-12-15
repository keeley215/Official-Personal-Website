import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
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
export class ProjectsComponent implements OnInit, AfterViewInit, OnDestroy {
  projects: Project[] = [];
  hoveredCardId: number | null = null;
  overflowMap: Record<number, boolean> = {}; // true = content overflows
  selectedCategory: 'All' | 'School' | 'Work' | 'Personal' = 'All';
  
  /** Returns the projects filtered by the selected category. Defaults to all projects. */
  get filteredProjects(): Project[] {
    if (this.selectedCategory === 'All') return this.projects;
    return this.projects.filter(p => p.category?.toLowerCase() === this.selectedCategory.toLowerCase());
  }

  selectCategory(category: 'All' | 'Work' | 'School' | 'Personal'): void {
    this.selectedCategory = category;
  }
  private resizeHandler = () => this.measureAllContent();

  private projectsData: Project[] = [
    {
      id: 0,
      title: 'Smart Robot Car Assembly and Testing',
      subtitle: '1st Step in Robotics Journey',
      description: 'This marks the beginning of my journey into robotics. In this project, I put together the Smart Robot Car V4 kit by ELEGOO. This smart car was assembled from scratch, including installing the motors, sensors, and microcontroller. ' +
      'After assembly, I programmed the car to perform basic functions such as line following, obstacle avoidance, and remote control operation. This hands-on experience provided a solid foundation in robotics principles and has sparked my interest in further exploring this exciting field.' ,
      technologies: ['Mechatronics', 'Robotics', 'Arduino', 'C++', 'Sensors', 'Motors'],
      category: 'Personal',
      year: '2025',
       backgroundImage: '//drone.jpg'
    },
    {
      id: 1,
      title: 'Drone Sim and Radio Controller Testing',
      subtitle: 'Beginning of Drone Studies',
      description: 'This marks the beginning of my journey into drone technology. I started experimenting with drone simulators and radio controllers to understand the basics of drone flight dynamics and control systems.' +
      'I used various simulators to practice flying and familiarized myself with different types of radio controllers. The main simulator I used was Liftoff and Liftoff Micro. The main radio controller I used was Radiomaster TX16S MAX II. ' + 
      'Both of these tools provided a solid foundation for understanding drone operations and will pave the way for more advanced studies in drone technology.',
      technologies: ['Liftoff', 'Liftoff Micro', 'Radiomaster TX16S MAX II'],
      category: 'Personal',
      year: '2025',
       backgroundImage: '//drone.jpg'
    },
    {
      id: 2,
      title: 'KBAI Research Project',
      subtitle: 'Making an AI that can pass the Human IQ Test',
      description: 'Creating an AI that can pass and exceed on a human intelligence test. Specifically the Raven\'s Progressive Matrices Test. The AI uses heuristic and machine learning techniques to analyze patterns and solve problems presented in the test.',
      technologies: ['NumPy', 'Agentic AI', 'Heuristic Analysis', 'Machine Learning', 'Python'],
      category: 'School',
      year: '2024',
      backgroundImage: '//neural-net-image.jpg'
    },
    {
      id: 3,
      title: 'Started Master\'s Degree in Computer Science at Georgia Tech',
      subtitle: 'Master in CS, Specializing in AI',
      description: 'I started a Masters in Computer Science at Georgia Tech, specializing in AI. This is through the ' +
      'OMSCS program which allows working professionals to earn a degree online while continuing to work full-time.',
      technologies: ['Python', 'Machine Learning', 'AI', 'Reinforced Learning', 'Algorithms', 'NumPy', 'Robotics'],
      category: 'School',
      year: '2024',
        backgroundImage: '//GT.jpg'
    },
    {
      id: 4,
      title: 'Created a Full Web Application from Scratch',
      subtitle: 'Project Lead/Team Lead/Full Stack Developer',
      description: 'Created, designed, and developed a comprehensive Angular/Spring Boot web application from the ground up. ' +
      'I designed the UI and UX using Angular (with NGRX) and Bootstrap5 components to ensure a responsive and user-friendly interface. ' +
      'I also organized the team, delegated tasks, and ensured effective communication among team members throughout the project lifecycle.' +
      'The backend was developed using Spring Boot, implementing RESTful APIs to handle data operations and business logic. ',
      technologies: ['Angular', 'NGRX', 'Bootstrap5', 'TypeScript', 'Spring Boot', 'RESTful APIs', 'Java', 'MySQL', 'Git', 'Agile/SCRUM', 'JIRA'],
      category: 'Work',
      year: '2025',
        backgroundImage: '//ang2.jpg'
    },
    {
      id: 5,
      title: 'Started at BNY Mellon',
      subtitle: 'Production Support Engineer',
      description: 'Duties include monitoring and supporting critical financial applications, troubleshooting issues, and collaborating with development teams to ensure smooth operations and deployments. ' +
      'I was also a senior technical resource for the team, providing guidance and mentorship to junior team members and interns. I was responsible for training new hires and interns on company processes and procedures. ' +
      'I was also involved in process improvement initiatives, identifying areas for improvement and implementing solutions to enhance team efficiency and effectiveness. ' +
      'Some of the initiatives include revamping the alerting and documentation process, creating an inhouse website for regulating PS API calls and dashboards, and revamping the new-hire training process.',
      technologies: ['Java', 'JIRA', 'Confluence', 'ServiceNow', 'Splunk', 'Grafana', 'Kafka', 'Agile/SCRUM', 'People Management', 'Team Building'],
      category: 'Work',
      year: '2023',
        backgroundImage: '//bny.jpg'
    },
    {
      id: 6,
      title: 'Certification as AWS Practitioner',
      subtitle: 'AWS',
      description: 'Completed the AWS Practitioner certification.',
      technologies: ['AWS', 'Cloud Computing', 'Infrastructure'],
      category: 'Personal',
      year: '2022',
        backgroundImage: '//clous%20infra.jpg'
    },
    {
      id: 7,
      title: 'Promoted to Team Lead',
      subtitle: 'Team Lead/Automation Engineer II',
      description: 'Managed communications to and from the team, lead team meetings, scheduled team bonding events, interviewed and trained new hires.',
      technologies: ['People Management', 'Communication', 'Leadership', 'Team Building'],
      category: 'Work',
      year: '2021',
        backgroundImage: '//team%20collaboration.jpg'
    },
    {
      id: 8,
      title: 'Built a Linux Server Lab',
      subtitle: 'DevOps/Linux',
      description: 'Physically built 50 linux based servers and set them up to run automation code from provisioning to setting up the code base',
      technologies: ['Linux', 'Chef', 'Physical Hardware', 'Python', 'Bash', 'Networking', 'adb'],
      category: 'Work',
      year: '2021',
      backgroundImage: '//server%20room.jpeg'
    },
    {
      id: 9,
      title: 'Started at Facebook/Meta',
      subtitle: 'Automation Engineer/SiteOps/Reliability Engineer',
      description: 'Tested production code on portal devices. Monitored, reported, and fixed defects.',
      technologies: ['Linux', 'Chef', 'Physical Hardware', 'Python', 'Bash', 'Selenium', 'adb'],
      category: 'Work',
      year: '2021',
      backgroundImage: '//meta.jpg'
    },
    {
      id: 10,
      title: 'Selenium Automation Testing',
      subtitle: 'Testing',
      description: 'Helped introduce and develop testing automation using Selenium w/ Cucumber and Gherkin Language.',
      technologies: ['Selenium', 'Cucumber', 'Gherkin', 'Java'],
      category: 'Work',
      year: '2020',
      backgroundImage: '//testing.png'
    },
    {
      id: 11,
      title: 'Personal Portfolio Website',
      subtitle: 'Frontend/Backend',
      description: 'Developed an application from the ground up using VUE.js, CSS, HTML5, axios, git, and Spring Boot. ' +
      'The goal of this project was to create a personal portfolio website to showcase my projects and skills.' +
      ' This was my first attempt at writing the full backend and frontend by myself.',
      technologies: ['Vue.js', 'Java', 'Spring Boot', 'Agile/SCRUM', 'CSS', 'HTML', 'axios', 'git'],
      category: 'Personal',
      year: '2020',
      backgroundImage: '//https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop'
    },
    {
      id: 12,
      title: 'Medical Software for Doctors',
      subtitle: 'Frontend',
      description: 'Developed an application from the ground up using VUE.js, CSS, HTML5, axios, git, and scrum methodologies. ' +
      'The ask of this project was to design a user-friendly UI for doctors to manage in-patient and out-patient care efficiently. ',
      technologies: ['Vue.js', 'Java', 'Spring Boot', 'Agile/SCRUM', 'CSS', 'HTML', 'axios', 'git'],
      category: 'Work',
      year: '2020',
      backgroundImage: '//doctor%20app.jpg'
    },
    {
      id: 13,
      title: 'Work at Highmark Inc',
      subtitle: 'Java/Frontend/Vue/PEGA',
      description: 'Job as Java/Frontend/PEGA developer. Practiced kanban and agile scrum methodologies. Built projects from the ground up and maintained existing projects.',
      technologies: ['Vue.js', 'Java', 'PEGA', 'Agile', 'CSS', 'HTML'],
      category: 'Work',
      year: '2019',
      backgroundImage: '//highmark2.jpg'
    },
    {
      id: 14,
      title: 'Database Design for Colleges',
      subtitle: 'Database',
      description: 'Designed a relational database to store all the information that was in 3 separate college catalogs.',
      technologies: ['MySQL', 'Oracle'],
      category: 'School',
      year: '2018',
      backgroundImage: '//db2.jpeg'
    },
    {
      id: 15,
      title: 'Compiler and Grader',
      subtitle: 'Java',
      description: 'This project takes all the questions and their answers out of a file, and compiles and grades your code/answers.',
      technologies: ['Java'],
      category: 'School',
      year: '2018',
      backgroundImage: '//compiler.jpg'
    },
    {
      id: 16,
      title: 'Cat Facts Spammer',
      subtitle: 'Java/Email',
      description: 'This project sends periodic emails containing random cat facts to a specified phone number. All phone numbers are attached ' +
      'to an email address. For example, to send a text to a Verizon number, the email address would be [number]@vtext.com. ' +
      'The application uses a cron job to schedule the emails at regular intervals and the Gmail API to send the emails securely.',
      technologies: ['Java', 'Cron', 'Gmail API'],
      category: 'Personal',
      year: '2017',
      backgroundImage: '//https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=800&h=600&fit=crop'
    },
    {
      id: 17,
      title: 'Rubik Cube Encryption',
      subtitle: 'Java/Encryption',
      description: 'Implemented an encryption algorithm inspired by Rubik Cube mechanics to demonstrate complex data transformation concepts.',
      technologies: ['Java', 'Encryption', 'Algorithms'],
      category: 'School',
      year: '2017',
      backgroundImage: '//rubik%20cube.jpg'
    }
  ];

  ngOnInit(): void {
    this.projects = this.projectsData;
  }

  ngAfterViewInit(): void {
    // Measure all cards after view renders
    setTimeout(() => this.measureAllContent(), 0);
    window.addEventListener('resize', this.resizeHandler);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeHandler);
  }

  onCardHover(cardId: number): void {
    this.hoveredCardId = cardId;
    // Remeasure on hover to ensure accuracy
    setTimeout(() => this.measureContent(cardId), 0);
  }

  onCardLeave(): void {
    this.hoveredCardId = null;
  }

  private measureAllContent(): void {
    try {
      for (const project of this.projects) {
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
}
