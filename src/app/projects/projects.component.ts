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
      title: 'Created a Music Bot',
      subtitle: 'Python/Discord/Bash/APIs',
      description: 'Wrote a python based bot that takes in links from spotify and youtube and plays them in a discord chat from a bot account.',
      technologies: ['Discord API', 'Python', 'Bash', 'Youtube API', 'Spotify API'],
      category: 'Personal',
      year: '2022',
      backgroundImage: 'https://images.unsplash.com/photo-1460925895917-adf4198db338?w=400&h=300&fit=crop'
    },
    {
      id: 1,
      title: 'Certification as AWS Practicioner',
      subtitle: 'AWS',
      description: 'Completed the AWS Practioner certification.',
      technologies: ['People Management', 'Communication', 'Leadership', 'Team Building'],
      category: 'Personal',
      year: '2022',
      backgroundImage: 'https://images.unsplash.com/photo-1460925895917-adf4198db338?w=400&h=300&fit=crop'
    },
    {
      id: 1,
      title: 'Promoted to Team Lead',
      subtitle: 'Team Lead/Automation Engineer II',
      description: 'Managed communications to and from the team, lead team meetings, scheduled team bonding events, interviewed and trained new hires.',
      technologies: ['People Management', 'Communication', 'Leadership', 'Team Building'],
      category: 'Work',
      year: '2021',
      backgroundImage: 'https://images.unsplash.com/photo-1460925895917-adf4198db338?w=400&h=300&fit=crop'
    },
    {
      id: 1,
      title: 'Built a Linux Server Lab',
      subtitle: 'DevOps/Linux',
      description: 'Physically built 50 linux based servers and set them up to run automation code from provisioning to setting up the code base',
      technologies: ['Linux', 'Chef', 'Physical Hardware', 'Python', 'Bash', 'Networking', 'adb'],
      category: 'Work',
      year: '2021',
      backgroundImage: 'https://images.unsplash.com/photo-1460925895917-adf4198db338?w=400&h=300&fit=crop'
    },
    {
      id: 1,
      title: 'Started at Facebook/Meta',
      subtitle: 'Automation Engineer/SiteOps/Reliability Engineer',
      description: 'Tested production code on portal devices. Monitored, reported, and fixed defects.',
      technologies: ['Linux', 'Chef', 'Physical Hardware', 'Python', 'Bash', 'Selenium', 'adb'],
      category: 'Work',
      year: '2021',  // March 2021
      backgroundImage: 'https://images.unsplash.com/photo-1460925895917-adf4198db338?w=400&h=300&fit=crop'
    },
    {
      id: 1,
      title: 'Selenium Automation Testing',
      subtitle: 'Testing',
      description: 'Helped introduce and develop testing automation using Selenium w/ Cucumber and Gherkin Language.',
      technologies: ['Selenium', 'Cucumber', 'Gherkin', 'Java'],
      category: 'Work',
      year: '2020',
      backgroundImage: 'https://images.unsplash.com/photo-1460925895917-adf4198db338?w=400&h=300&fit=crop'
    },
    {
      id: 1,
      title: 'Personal Portfolio Website',
      subtitle: 'Frontend/Backend',
      description: 'Developed an application from the ground up using VUE.js, CSS, HTML5, axios, git, and Spring Boot. ' +
      'The goal of this project was to create a personal portfolio website to showcase my projects and skills.' +
      ' This was my first attempt at writing the full backend and frontend by myself.',
      technologies: ['Vue.js', 'Java', 'Spring Boot', 'Agile/SCRUM', 'CSS', 'HTML', 'axios', 'git'],
      category: 'Personal',
      year: '2020',
      backgroundImage: 'https://images.unsplash.com/photo-1460925895917-adf4198db338?w=400&h=300&fit=crop'
    },
    {
      id: 1,
      title: 'Medical Software for Doctors',
      subtitle: 'Frontend',
      description: 'Developed an application from the ground up using VUE.js, CSS, HTML5, axios, git, and scrum methodologies. ' +
      'The ask of this project was to design a user-friendly UI for doctors to manage in-patient and out-patient care efficiently. ',
      technologies: ['Vue.js', 'Java', 'Spring Boot', 'Agile/SCRUM', 'CSS', 'HTML', 'axios', 'git'],
      category: '.',
      year: '.',
      backgroundImage: 'https://images.unsplash.com/photo-1460925895917-adf4198db338?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      title: 'Work at Highmark Inc',
      subtitle: 'Java/Frontend/Vue/PEGA',
      description: 'Job as Java/Frontend/PEGA developer. Practiced kanban and agile scrum methadologies. Built projects from the ground up and maintained existing projects.',
      technologies: ['Vue.js', 'Java', 'PEGA', 'Agile', 'CSS', 'HTML'],
      category: 'Work',
      year: '2019',
      backgroundImage: 'https://images.unsplash.com/photo-1555606142-641d02aaeb8f?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'Database Design for Colleges',
      subtitle: 'Database',
      description: 'Designed a relational database to store all the information that was in 3 seperate college catalogs.',
      technologies: ['MySQL', 'Oracle'],
      category: 'School',
      year: '2018',
      backgroundImage: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      title: 'Compiler and Grader',
      subtitle: 'Java',
      description: 'This project takes all the questions and their answers out of a file, and compiles and grades your code/answers.',
      technologies: ['Java'],
      category: 'School',
      year: '2018',
      backgroundImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop'
    },
    {
      id: 5,
      title: 'Cat Facts Spammer',
      subtitle: 'Java/Email',
      description: 'This project sends periodic emails containing random cat facts to a specified phone number. All phone numbers are attached ' +
      'to an email address. For example, to send a text to a Verizon number, the email address would be [number]@vtext.com. ' +
      'The application uses a cron job to schedule the emails at regular intervals and the Gmail API to send the emails securely.',
      technologies: ['Java', 'Cron', 'Gmail API'],
      category: 'Personal',
      year: '2017',
      backgroundImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
    },
    {
      id: 6,
      title: 'Rubic Cube Encryption',
      subtitle: 'Java/Encryption',
      description: 'Music streaming application with playlist management.',
      technologies: ['Java', 'CSS', 'HTML'],
      category: 'School',
      year: '2017',
      backgroundImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=300&fit=crop'
    }
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
