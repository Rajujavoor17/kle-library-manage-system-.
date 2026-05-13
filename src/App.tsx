import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { 
  Bookmark,
  History,
  Clock,
  Settings,
  BookOpen, 
  Trash2, 
  Edit3, 
  Plus, 
  Gauge, 
  Search,
  ShieldAlert,
  User,
  Briefcase,
  Info,
  HelpCircle,
  Calendar,
  MoreHorizontal,
  Video,
  CheckCircle2,
  ExternalLink,
  Mic,
  MicOff,
  Languages,
  Home,
  Save,
  ChevronRight,
  Star,
  Sun,
  Moon,
  X
} from 'lucide-react';
import { Book, Role, Cluster, Unit, Review } from './types';
import { BookSkeleton, DetailsSkeleton, ClusterSkeleton } from './components/Skeleton';

const INITIAL_CLUSTERS: Cluster[] = [
  { id: 'c1', name: 'Quantum Algorithmic Circle', field: 'Computing', members: 12, active: true, intensity: 85 },
  { id: 'c2', name: 'Neural Network Syndicate', field: 'AI/ML', members: 24, active: true, intensity: 92 },
  { id: 'c3', name: 'Cybersec Protocol Lab', field: 'Security', members: 8, active: false, intensity: 45 },
  { id: 'c4', name: 'Distributed Ledger Group', field: 'Blockchain', members: 15, active: true, intensity: 78 },
  { id: 'c5', name: 'Kernel Optimization Unit', field: 'Systems', members: 10, active: true, intensity: 88 },
];

const INDIAN_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'kn', name: 'Kannada' },
  { code: 'mr', name: 'Marathi' },
  { code: 'ta', name: 'Tamil' },
  { code: 'te', name: 'Telugu' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'bn', name: 'Bengali' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'pa', name: 'Punjabi' }
];

// Let's pretend the backend engineer supplied this mock database because SQL joins are scary.
const INITIAL_BOOKS: Book[] = [
  { 
    id: '1', 
    title: 'Let Us C', 
    author: 'Yashavant Kanetkar', 
    category: 'Programming', 
    coverId: '10', 
    available: true, 
    coverUrl: 'https://m.media-amazon.com/images/I/41-9p8X-tRL._AC_UF1000,1000_QL80_.jpg', 
    publisher: 'BPB Publications', 
    year: 2020, 
    pages: 450, 
    isbn: '978-8183331630', 
    description: 'A complete textbook covering basics to advanced concepts of C programming with practical examples.',
    units: [
      {
        id: 1,
        title: 'Unit I: Getting Started',
        summary: 'Fundamental building blocks of C programming. Constants, variables, and keywords.',
        lessons: [
          { id: 'l1', title: 'Constants, Variables and Keywords', videoUrl: 'https://www.youtube.com/results?search_query=c+programming+basics' },
          { id: 'l2', title: 'First C Program', videoUrl: 'https://www.youtube.com/results?search_query=first+c+program' },
          { id: 'l3', title: 'Compilation and Execution', videoUrl: 'https://www.youtube.com/results?search_query=c+compilation+process' }
        ]
      },
      {
        id: 2,
        title: 'Unit II: Control Instructions',
        summary: 'Directing the flow of program execution using decision and loop control.',
        lessons: [
          { id: 'l4', title: 'The if-else Statement', videoUrl: 'https://www.youtube.com/results?search_query=c+if+else+tutorial' },
          { id: 'l5', title: 'Loop Control (while, for, do-while)', videoUrl: 'https://www.youtube.com/results?search_query=c+loops+tutorial' },
          { id: 'l6', title: 'Case Control (switch)', videoUrl: 'https://www.youtube.com/results?search_query=c+switch+case+tutorial' }
        ]
      }
    ]
  },
  { 
    id: '2', 
    title: 'Introduction to Algorithms', 
    author: 'Thomas H. Cormen', 
    category: 'Computer Science', 
    coverId: '45', 
    available: false, 
    coverUrl: 'https://m.media-amazon.com/images/I/41T0S9S-u-L._AC_UF1000,1000_QL80_.jpg', 
    publisher: 'MIT Press', 
    year: 2009, 
    pages: 1292, 
    isbn: '978-0262033848', 
    description: 'Comprehensive guide to algorithms, data structures, and algorithmic complexity.',
    units: [
      {
        id: 1,
        title: 'Unit I: Foundations',
        summary: 'Mathematical foundations for analyzing algorithm efficiency.',
        lessons: [
          { id: 'l1', title: 'Insertion Sort Analysis', videoUrl: 'https://www.youtube.com/results?search_query=insertion+sort+tutorial' },
          { id: 'l2', title: 'Growth of Functions (Big O)', videoUrl: 'https://www.youtube.com/results?search_query=big+o+notation+tutorial' },
          { id: 'l3', title: 'Recurrences (Master Theorem)', videoUrl: 'https://www.youtube.com/results?search_query=master+theorem+algorithms' }
        ]
      }
    ]
  },
  { id: '3', title: 'Database System Concepts', author: 'Abraham Silberschatz', category: 'DBMS', coverId: '88', available: true, coverUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop', publisher: 'McGraw-Hill', year: 2019, pages: 1376, isbn: '978-0078022159', description: 'Presents the fundamental concepts of database management in a clear and robust manner.' },
  { 
    id: '4', 
    title: 'Java: The Complete Reference', 
    author: 'Herbert Schildt', 
    category: 'Programming', 
    coverId: '22', 
    available: true, 
    coverUrl: 'https://m.media-amazon.com/images/I/71YyMdfU8-L._AC_UF1000,1000_QL80_.jpg', 
    publisher: 'McGraw-Hill', 
    year: 2021, 
    pages: 1248, 
    isbn: '978-1260463415', 
    description: 'The ultimate guide to Java programming, covering syntax, keywords, and fundamental programming principles.',
    units: [
      {
        id: 1,
        title: 'Unit I: Core Java Foundations',
        summary: 'Java language characteristics and primitive data types.',
        lessons: [
          { id: 'l1', title: 'The Evolution of Java', videoUrl: 'https://www.youtube.com/results?search_query=history+of+java' },
          { id: 'l2', title: 'Classes and Objects', videoUrl: 'https://www.youtube.com/results?search_query=java+classes+objects' },
          { id: 'l3', title: 'Inheritance and Polymorphism', videoUrl: 'https://www.youtube.com/results?search_query=java+inheritance+tutorial' }
        ]
      }
    ]
  },
  { id: '5', title: 'Operating System Concepts', author: 'Abraham Silberschatz', category: 'OS', coverId: '61', available: true, coverUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop', publisher: 'Wiley', year: 2018, pages: 976, isbn: '978-1119320913', description: 'Provides a solid theoretical foundation for understanding operating systems.' },
  { id: '6', title: 'Data Structures Using C', author: 'Reema Thareja', category: 'Data Structures', coverId: '99', available: false, coverUrl: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?q=80&w=800&auto=format&fit=crop', publisher: 'Oxford University Press', year: 2014, pages: 560, isbn: '978-0198099307', description: 'Covers essential data structures and algorithms implemented in C.' },
  { id: '7', title: 'Computer Networks', author: 'Andrew S. Tanenbaum', category: 'Networking', coverId: '33', available: true, coverUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop', publisher: 'Pearson', year: 2021, pages: 960, isbn: '978-0132126953', description: 'A classic textbook that explains how networks work from the inside out.' },
  { id: '8', title: 'Software Engineering', author: 'Ian Sommerville', category: 'Computer Science', coverId: '55', available: true, coverUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop', publisher: 'Pearson', year: 2015, pages: 816, isbn: '978-0133943030', description: 'Comprehensive overview of software engineering principles and processes.' },
  { id: '9', title: 'Web Technologies', author: 'Achyut Godbole', category: 'Web Development', coverId: '77', available: true, coverUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop', publisher: 'McGraw-Hill', year: 2013, pages: 704, isbn: '978-1259062681', description: 'Covers HTML, CSS, JavaScript, XML, PHP and other core web technologies.' },
  { id: '10', title: 'Discrete Mathematics', author: 'Kenneth H. Rosen', category: 'Mathematics', coverId: '44', available: false, coverUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop', publisher: 'McGraw-Hill', year: 2018, pages: 1088, isbn: '978-0072899054', description: 'Provides a mathematical foundation for computer science students.' },
  { id: '11', title: 'Python Crash Course', author: 'Eric Matthes', category: 'Programming', coverId: '11', available: true, coverUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bfce8?q=80&w=800&auto=format&fit=crop', publisher: 'No Starch Press', year: 2019, pages: 544, isbn: '978-1593279288', description: 'A hands-on, project-based introduction to programming with Python.' },
  { id: '12', title: 'Artificial Intelligence', author: 'Stuart Russell', category: 'AI & ML', coverId: '12', available: true, coverUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop', publisher: 'Pearson', year: 2020, pages: 1168, isbn: '978-0134610993', description: 'The definitive, comprehensive exploration of the theory and practice of AI.' },
  { id: '13', title: 'Cyber Security Essentials', author: 'Charles J. Brooks', category: 'Security', coverId: '13', available: false, coverUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop', publisher: 'Sybex', year: 2018, pages: 384, isbn: '978-1119564614', description: 'Covers essential concepts and terminology needed to understand cybersecurity.' },
  { id: '14', title: 'Cloud Computing Architecture', author: 'Thomas Erl', category: 'Cloud', coverId: '14', available: true, coverUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop', publisher: 'Prentice Hall', year: 2013, pages: 528, isbn: '978-0133387520', description: 'Architectural concepts and technology mechanisms for building cloud networks.' },
  { id: '15', title: 'Object-Oriented Programming with C++', author: 'E. Balagurusamy', category: 'Programming', coverId: '15', available: true, coverUrl: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=800&auto=format&fit=crop', publisher: 'McGraw-Hill', year: 2020, pages: 576, isbn: '978-9389949186', description: 'Learn the principles of OOP and how to apply them using C++.' },
  { id: '16', title: 'Kannada Sahitya Sampada (BCA I Sem)', author: 'Kuvempu University Board', category: 'Languages', coverId: '16', available: true, coverUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop', publisher: 'Prasaranga', year: 2022, pages: 200, isbn: '978-8195821204', description: 'Curated Kannada literature collection for first-year BCA students.' },
  { id: '17', title: 'English for Communication', author: 'Dr. T. Balasubramanian', category: 'Languages', coverId: '17', available: false, coverUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop', publisher: 'Macmillan', year: 2018, pages: 250, isbn: '978-0333904674', description: 'Comprehensive guide to English phonetics, grammar, and professional communication.' },
  { id: '18', title: 'Fundamentals of Computers', author: 'V. Rajaraman', category: 'Basics', coverId: '18', available: true, coverUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop', publisher: 'PHI Learning', year: 2014, pages: 448, isbn: '978-8120350670', description: 'Introduction to computer hardware, software, and information technology basics.' },
  { id: '19', title: 'Digital Logic and Computer Design', author: 'M. Morris Mano', category: 'Electronics', coverId: '19', available: true, coverUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop', publisher: 'Pearson', year: 2016, pages: 560, isbn: '978-9332542525', description: 'Clear and accessible approach to the basic tools, concepts, and applications of digital design.' },
  { id: '20', title: 'System Analysis and Design', author: 'Elias M. Awad', category: 'SAD', coverId: '20', available: true, coverUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop', publisher: 'Galgotia Publications', year: 2010, pages: 280, isbn: '978-8175156555', description: 'Foundations for system development lifecycle, contextual analysis, and design methodology.' },
  { id: '21', title: 'Computer System Architecture', author: 'M. Morris Mano', category: 'Hardware', coverId: '21', available: true, coverUrl: 'https://images.unsplash.com/photo-1515524738708-327f6b0037a7?q=80&w=800&auto=format&fit=crop', publisher: 'Pearson', year: 2007, pages: 544, isbn: '978-8131700709', description: 'Detailed look at computer architecture, microprogramming, and memory organization.' },
  { id: '22', title: 'Environmental Studies', author: 'Erach Bharucha', category: 'General', coverId: '22', available: false, coverUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop', publisher: 'Universities Press', year: 2021, pages: 320, isbn: '978-9389211610', description: 'Mandatory undergraduate text covering ecology, biodiversity, and environmental conservation.' },
  { id: '23', title: 'UNIX and Shell Programming', author: 'Behrouz A. Forouzan', category: 'OS', coverId: '23', available: true, coverUrl: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=800&auto=format&fit=crop', publisher: 'Cengage Learning', year: 2003, pages: 750, isbn: '978-0534953695', description: 'Deep dive into the UNIX operating system environment and shell scripting.' },
  { id: '24', title: 'Indian Constitution and Human Rights', author: 'Dr. J.N. Pandey', category: 'General', coverId: '24', available: true, coverUrl: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?q=80&w=800&auto=format&fit=crop', publisher: 'Central Law Agency', year: 2023, pages: 900, isbn: '978-9390735822', description: 'Study of the Indian Constitution framework, fundamental rights, and civic duties.' },
  { id: '25', title: 'Mathematics-I (BCA 1st Sem)', author: 'M. V. S. S. N. Prasad', category: 'Mathematics', coverId: '25', available: true, coverUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop', publisher: 'S. Chand', year: 2021, pages: 400, isbn: '978-9352837373', description: 'Core mathematics concepts required for computer science applications in early semesters.' },
  { id: '26', title: 'Financial Accounting (BCA 2nd Sem)', author: 'Arora & Arora', category: 'Management', coverId: '26', available: false, coverUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop', publisher: 'Sultan Chand & Sons', year: 2019, pages: 350, isbn: '978-8180547051', description: 'Basics of financial accounting tailored for non-commerce IT students.' },
  { id: '27', title: 'C# and .NET Framework (BCA 3rd Sem)', author: 'Andrew Troelsen', category: 'Programming', coverId: '27', available: true, coverUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop', publisher: 'Apress', year: 2017, pages: 1300, isbn: '978-1484230176', description: 'Complete reference for C# and the .NET framework environment.' },
  { id: '28', title: 'PHP and MySQL (BCA 4th Sem)', author: 'Luke Welling', category: 'Web Development', coverId: '28', available: true, coverUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=800&auto=format&fit=crop', publisher: 'Addison-Wesley', year: 2016, pages: 1008, isbn: '978-0321833891', description: 'Practical guide to building database-driven Web applications.' },
  { id: '29', title: 'Internet of Things (BCA 5th Sem)', author: 'Raj Kamal', category: 'Networking', coverId: '29', available: true, coverUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop', publisher: 'McGraw-Hill', year: 2017, pages: 450, isbn: '978-9352605224', description: 'Architecture, design principles, and applications of IoT.' },
  { id: '30', title: 'Data Mining (BCA 6th Sem)', author: 'Jiawei Han', category: 'Data Science', coverId: '30', available: false, coverUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop', publisher: 'Morgan Kaufmann', year: 2011, pages: 744, isbn: '978-0123814791', description: 'Concepts and techniques for mining data and developing data warehouses.' },
  { id: '31', title: 'Software Testing (BCA 6th Sem)', author: 'Srinivasan Desikan', category: 'Software Engineering', coverId: '31', available: true, coverUrl: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=800&auto=format&fit=crop', publisher: 'Pearson', year: 2006, pages: 496, isbn: '978-8177581218', description: 'Comprehensive coverage of software testing techniques and tools.' },
  { id: '32', title: 'Computer Graphics (BCA 3rd Sem)', author: 'Donald Hearn', category: 'Graphics', coverId: '32', available: true, coverUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop', publisher: 'Pearson', year: 2010, pages: 864, isbn: '978-9332518711', description: 'In-depth exploration of computer graphics algorithms and multimedia concepts.' },
  { id: '33', title: 'Statistical Methods (BCA 2nd Sem)', author: 'S.S. Sastry', category: 'Mathematics', coverId: '33', available: true, coverUrl: 'https://images.unsplash.com/photo-1596496050827-8299e0220de1?q=80&w=800&auto=format&fit=crop', publisher: 'PHI Learning', year: 2012, pages: 440, isbn: '978-8120345928', description: 'Introductory methods for numerical analysis and statistical computations.' },
  { id: '35', title: 'Quantum Computing: A Gentle Introduction', author: 'Eleanor Rieffel', category: 'Quantum Computing', coverId: '35', available: true, coverUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop', publisher: 'MIT Press', year: 2024, pages: 384, isbn: '978-0262015066', description: 'Comprehensive introduction to quantum computing, qubits, and quantum logic gates for computer scientists.' },
  { id: '36', title: 'Generative AI: Concepts & Architectures', author: 'David Foster', category: 'AI & ML', coverId: '36', available: true, coverUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop', publisher: 'O\'Reilly', year: 2025, pages: 420, isbn: '978-1098134181', description: 'Technical deep-dive into GANs, Transformers, and Diffusion models with practical Python implementations.' },
  { id: '37', title: 'Web 3.0 & Decentralized Identity', author: 'Gavin Wood', category: 'Web 3.0', coverId: '37', available: false, coverUrl: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=800&auto=format&fit=crop', publisher: 'Ethos Press', year: 2026, pages: 290, isbn: '978-8195821211', description: 'Exploring the decentralized web, smart contracts, and the future of user-controlled digital identity.' },
  { id: '38', title: 'Bio-Digital Hybrid Systems', author: 'Dr. Sarah Chen', category: 'Robotics', coverId: '38', available: true, coverUrl: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=800&auto=format&fit=crop', publisher: 'Springer', year: 2026, pages: 550, isbn: '978-9389211622', description: 'Foundational research on interfacing biological neural networks with silicon-based computing architectures.' },
  { id: '39', title: 'AWS Cloud Practitioner Guide', author: 'Amazon Web Services', category: 'Cloud Computing', coverId: '39', available: true, coverUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop', publisher: 'AWS Press', year: 2024, pages: 300, isbn: '978-1940313000', description: 'Official study guide for the AWS Certified Cloud Practitioner exam, covering cloud concepts, security, technology, and billing.' },
  { id: '40', title: 'Data Analytics Professional', author: 'Google Career Certs', category: 'Data Science', coverId: '40', available: true, coverUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop', publisher: 'Google Press', year: 2024, pages: 450, isbn: '978-1492041133', description: 'Foundational guide to data analytics, covering SQL, Tableau, R programming, and data visualization strategies.' },
  { id: '41', title: 'Meta Front-End Developer', author: 'Meta Engineering', category: 'Web Development', coverId: '41', available: true, coverUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=800&auto=format&fit=crop', publisher: 'Meta Press', year: 2024, pages: 500, isbn: '978-1119823438', description: 'Comprehensive roadmap for building modern web interfaces with React, CSS, and UI/UX design principles.' },
  { id: '42', title: 'Mookajjiya Kanasugalu', author: 'Kota Shivarama Karanth', category: 'Literature', coverId: '30', available: true, coverUrl: 'https://m.media-amazon.com/images/I/51wXh-7mS3L._AC_UF1000,1000_QL80_.jpg', publisher: 'SBS Publishers', year: 1968, pages: 320, isbn: 'KANNADA-001', description: 'A Jnanpith award-winning novel that explores the sub-conscious mind and philosophical questions through the character of an old lady named Mookajji.', reviews: [{ id: 'rev-1', userId: 'ext-1', userName: 'Sahitya_Premi', rating: 5, comment: 'A masterpiece of philosophical exploration. Mookajji is an unforgettable character.', timestamp: '2024-03-15T10:00:00Z' }] },
  { id: '43', title: 'Karvalo', author: 'K.P. Poornachandra Tejaswi', category: 'Literature', coverId: '40', available: true, coverUrl: 'https://m.media-amazon.com/images/I/51p8I6+V5HL._AC_UF1000,1000_QL80_.jpg', publisher: 'Pustaka Prakashana', year: 1980, pages: 180, isbn: 'KANNADA-002', description: 'A legendary novel blending adventure, science, and philosophy as a group stays in the Western Ghats searching for a rare flying lizard.' },
  { id: '44', title: 'Malegalalli Madumagalu', author: 'Kuvempu', category: 'Literature', coverId: '50', available: true, coverUrl: 'https://m.media-amazon.com/images/I/91a+M-2+pBL._AC_UF1000,1000_QL80_.jpg', publisher: 'Udayaravi Prakashana', year: 1967, pages: 780, isbn: 'KANNADA-003', description: 'One of the greatest epic novels in Kannada literature, depicting life in the hilly regions of Malnad with intricate cultural detailing.' },
  { id: '45', title: 'Mandra', author: 'S.L. Bhyrappa', category: 'Literature', coverId: '60', available: true, coverUrl: 'https://m.media-amazon.com/images/I/81M7r5V84-L._AC_UF1000,1000_QL80_.jpg', publisher: 'Sahitya Bhandara', year: 2002, pages: 420, isbn: 'KANNADA-004', description: 'A complex novel exploring the world of Hindustani classical music, ethics, and human relationships.' }
];

const GLOBAL_SYLLABUS: Unit[] = [
  {
    id: 1,
    title: 'Unit I: Binary Foundations & Logic',
    summary: 'The bedrock of modern computing. Exploration of Boolean algebra, digital logic circuit design, and the physical realization of abstract logic in silicon processors.',
    lessons: [
      { id: 'l1', title: 'Boolean Calculus', content: 'The algebraic foundation for digital circuit design and logical operations. Example: De Morgan\'s Laws in circuit simplification.', videoUrl: 'https://www.youtube.com/results?search_query=boolean+algebra+basics' },
      { id: 'l2', title: 'Transistor Logic (TTL)', content: 'The physical implementation of logic gates using semiconductor hardware. Example: NAND gate universality in processors.', videoUrl: 'https://www.youtube.com/results?search_query=how+transistors+work' },
      { id: 'l3', title: 'Machine Number Systems', content: 'Representation of data in binary, hexadecimal, and floating-point IEEE 754 formats. Example: Handling overflow in 32-bit integer arithmetic.', videoUrl: 'https://www.youtube.com/results?search_query=binary+number+systems' }
    ]
  },
  {
    id: 2,
    title: 'Unit II: Algorithmic Complexity',
    summary: 'Mathematical analysis of computational efficiency. Master the art of measuring resource consumption (Time & Space) and optimizing codebase for enterprise scalability.',
    lessons: [
      { id: 'l1', title: 'Asymptotic Notation', content: 'Formal language for describing the limit behavior of algorithm runtimes. Example: Analyzing O(n log n) in QuickSort.', videoUrl: 'https://www.youtube.com/results?search_query=big+o+notation+tutorial' },
      { id: 'l2', title: 'NP-Completeness', content: 'The study of computationally hard problems where verification is easy but solution is difficult. Example: The Traveling Salesperson Problem (TSP).', videoUrl: 'https://www.youtube.com/results?search_query=np+completeness+explained' },
      { id: 'l3', title: 'Greedy vs Dynamic Programming', content: 'Contrast between local optimization strategies and memoization-based global solutions. Example: Knapsack problem via dynamic programming.', videoUrl: 'https://www.youtube.com/results?search_query=dynamic+programming+vs+greedy' }
    ]
  },
  {
    id: 3,
    title: 'Unit III: Distributed Systems & Cloud',
    summary: 'Architecting horizontal scaling models. Understanding the CAP theorem, distributed consensus algorithms, and the lifecycle of microservices in a containerized environment.',
    lessons: [
      { id: 'l1', title: 'CAP Theorem', content: 'The fundamental trade-off between Consistency, Availability, and Partition Tolerance. Example: Choosing between DynamoDB and PostgreSQL based on consistency needs.', videoUrl: 'https://www.youtube.com/results?search_query=cap+theorem+distributed+systems' },
      { id: 'l2', title: 'Raft Consensus', content: 'The algorithm used to manage a replicated log and ensure system state agreement. Example: Leader election in Kubernetes clusters.', videoUrl: 'https://www.youtube.com/results?search_query=raft+consensus+algorithm' },
      { id: 'l3', title: 'Serverless Paradigms', content: 'Event-driven computing models that abstract away infrastructure management. Example: Scaling compute with AWS Lambda or Google Cloud Functions.', videoUrl: 'https://www.youtube.com/results?search_query=serverless+architecture' }
    ]
  },
  {
    id: 4,
    title: 'Unit IV: Cyber-Security & Cryptography',
    summary: 'Defensive and offensive security principles. Coverage of asymmetric encryption protocols, social engineering mitigation, and post-quantum cryptographic standards.',
    lessons: [
      { id: 'l1', title: 'Public Key Infrastructure (PKI)', content: 'System for managing digital certificates and public-key encryption. Example: SSL/TLS handshake protocol in HTTPS.', videoUrl: 'https://www.youtube.com/results?search_query=pki+and+digital+certificates' },
      { id: 'l2', title: 'Zero-Trust Architecture', content: 'Security model that requires continuous verification of every user and device. Example: Implementing Multi-Factor Authentication (MFA) across all endpoints.', videoUrl: 'https://www.youtube.com/results?search_query=zero+trust+security+model' },
      { id: 'l3', title: 'Lattice-Based Encryption', content: 'Quantum-resistant cryptographic methods designed to survive Shor\'s algorithm. Example: Crystals-Dilithium signature scheme.', videoUrl: 'https://www.youtube.com/results?search_query=lattice+based+cryptography' }
    ]
  },
  {
    id: 5,
    title: 'Unit V: Neural Synthesis (Deep Learning)',
    summary: 'Advanced machine learning architectures. Transitioning from simple Perceptrons to high-order Transformers, Attention mechanisms, and Generative Adversarial Networks (GANs).',
    lessons: [
      { id: 'l1', title: 'Backpropagation Logic', content: 'The mathematical process of updating weights via gradient descent based on error rates. Example: Training a 50-layer ResNet via Stochastic Gradient Descent.', videoUrl: 'https://www.youtube.com/results?search_query=backpropagation+calculus' },
      { id: 'l2', title: 'Transformer Attention', content: 'Mechanism that allows models to weigh the importance of different parts of input data. Example: Self-attention in Large Language Models like GPT-4.', videoUrl: 'https://www.youtube.com/results?search_query=transformer+attention+mechanism' },
      { id: 'l3', title: 'Latent Space Diffusion', content: 'The generative process of adding and removing noise to synthesize high-fidelity data. Example: DALL-E 3 image generation from text prompts.', videoUrl: 'https://www.youtube.com/results?search_query=diffusion+models+ai' }
    ]
  },
  {
    id: 6,
    title: 'Unit VI: Quantum Computing Architecture',
    summary: 'The next frontier of computation. Understanding superposition, entanglement, and the development of quantum algorithms that break classical limits.',
    lessons: [
      { id: 'l1', title: 'Qubit Superposition', content: 'The ability of a quantum bit to exist in multiple states simultaneously. Example: Bloch Sphere representation of a qubit state.', videoUrl: 'https://www.youtube.com/results?search_query=quantum+superposition+tutorial' },
      { id: 'l2', title: 'Entanglement Protocols', content: 'Quantum phenomenon where particles become correlated regardless of distance. Example: Quantum Teleportation of information states.', videoUrl: 'https://www.youtube.com/results?search_query=quantum+entanglement' },
      { id: 'l3', title: 'Grover\'s Algorithm', content: 'A quantum algorithm for searching unstructured databases with quadratic speedup. Example: Finding a specific entry in an unsorted list of N items in √N steps.', videoUrl: 'https://www.youtube.com/results?search_query=grover+algorithm+explained' }
    ]
  }
];

interface Notification {
  id: string;
  type: 'error' | 'success' | 'info';
  message: string;
}

export default function App() {
  const [view, setView] = useState<'home' | 'app' | 'details' | 'login' | 'clusters' | 'profile'>('home');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem('bookmarks');
    return saved ? JSON.parse(saved) : [];
  });
  const [readingHistory, setReadingHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem('reading_history');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('reading_history', JSON.stringify(readingHistory));
  }, [readingHistory]);

  const toggleBookmark = (id: string) => {
    setBookmarks(prev => {
      const isBookmarked = prev.includes(id);
      if (isBookmarked) {
        showNotification("BOOKMARK_REMOVED", "info");
        return prev.filter(bId => bId !== id);
      } else {
        showNotification("BOOKMARK_SAVED", "success");
        return [...prev, id];
      }
    });
  };

  const addToHistory = (id: string) => {
    setReadingHistory(prev => {
      const filtered = prev.filter(bId => bId !== id);
      return [id, ...filtered].slice(0, 20); // Keep last 20
    });
  };

  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<Notification | null>(null);


  const simulateNeuralLink = (callback: () => void) => {
    setIsLoading(true);
    setTimeout(() => {
      callback();
      setIsLoading(false);
    }, 1200);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light';
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const [role, setRole] = useState<Role>('Student');
  const [books, setBooks] = useState<Book[]>(() => {
    return INITIAL_BOOKS.map(book => ({
      ...book,
      coverUrl: book.coverUrl || `https://picsum.photos/seed/${encodeURIComponent(book.title)}/800/1200`
    }));
  });
  const [clusters, setClusters] = useState<Cluster[]>(INITIAL_CLUSTERS);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [listeningTarget, setListeningTarget] = useState<'search' | 'review' | 'lesson' | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  useEffect(() => {
    let intervalId: any;
    
    const changeLanguage = (langCode: string) => {
      // @ts-ignore
      if (!window.google || !window.google.translate) return false;
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (select) {
        select.value = langCode === 'en' ? '' : langCode;
        select.dispatchEvent(new Event('change'));
        return true;
      }
      return false;
    };

    // Attempt immediately
    const success = changeLanguage(selectedLanguage);
    
    // If failed, poll for a few seconds
    if (!success) {
      let attempts = 0;
      intervalId = setInterval(() => {
        const polledSuccess = changeLanguage(selectedLanguage);
        attempts++;
        if (polledSuccess || attempts > 20) {
          clearInterval(intervalId);
        }
      }, 500);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [selectedLanguage]);

  const [infoModal, setInfoModal] = useState<'about' | 'admission' | 'events' | null>(null);
  const [showSyllabusModal, setShowSyllabusModal] = useState(false);
  const [expandedUnitId, setExpandedUnitId] = useState<number | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [lessonToDelete, setLessonToDelete] = useState<{ unitIdx: number, lessonId: string } | null>(null);
  const [unitToDelete, setUnitToDelete] = useState<number | null>(null);
  
  // Syllabus editing state
  const [editingUnitIdx, setEditingUnitIdx] = useState<number | null>(null);
  const [editingLessonId, setEditingLessonId] = useState<{ unitIdx: number, lessonId: string } | null>(null);
  const [unitDraft, setUnitDraft] = useState({ title: '', summary: '' });
  const [lessonDraft, setLessonDraft] = useState({ title: '', content: '', videoUrl: '' });
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonVideoUrl, setNewLessonVideoUrl] = useState('');
  const [newLessonContent, setNewLessonContent] = useState('');
  const [completedLessons, setCompletedLessons] = useState<Record<string, string[]>>({});
  
  // Bulk selection state
  const [selectedUnits, setSelectedUnits] = useState<number[]>([]); // unit IDs
  const [selectedLessons, setSelectedLessons] = useState<string[]>([]); // lesson IDs
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);
  
  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(books.map(b => b.category)))];
  const [loginData, setLoginData] = useState({ email: 'student@kle.edu', password: 'password123' });
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  // Form State
  const [formData, setFormData] = useState({ 
    title: '', 
    author: '', 
    category: '', 
    coverUrl: '',
    description: '',
    publisher: '',
    year: 0,
    isbn: '',
    pages: 0
  });

  const startVoiceDictation = (target: 'search' | 'review' | 'lesson', onResult: (text: string) => void) => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      showNotification("NEURAL_LINK_FAIL: BROWSER_INCOMPATIBLE", "error");
      return;
    }

    if (isListening) {
      setIsListening(false);
      setListeningTarget(null);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setListeningTarget(target);
        showNotification(`${target.toUpperCase()}_UPLINK_ESTABLISHED`, "info");
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
        setIsListening(false);
        setListeningTarget(null);
        showNotification("TRANSCRIPTION_COMPLETE", "success");
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        setListeningTarget(null);
        showNotification(`UPLINK_ERROR: ${event.error.toUpperCase()}`, "error");
      };

      recognition.onend = () => {
        setIsListening(false);
        setListeningTarget(null);
      };

      recognition.start();
    } catch (err) {
      showNotification("CRITICAL_UPLINK_FAILURE", "error");
      setIsListening(false);
      setListeningTarget(null);
    }
  };

  const toggleVoiceSearch = () => {
    startVoiceDictation('search', (text) => setSearchQuery(text));
  };

  const toggleReviewDictation = () => {
    startVoiceDictation('review', (text) => setReviewComment(prev => prev ? `${prev} ${text}` : text));
  };

  const toggleLessonCompletion = (bookId: string, lessonId: string) => {
    setCompletedLessons(prev => {
      const bookProgress = prev[bookId] || [];
      const isCompleted = bookProgress.includes(lessonId);
      
      const newProgress = isCompleted 
        ? bookProgress.filter(id => id !== lessonId)
        : [...bookProgress, lessonId];
        
      const newState = { ...prev, [bookId]: newProgress };
      
      // Notify user
      if (!isCompleted) {
        showNotification("LESSON_MASTERED", "success");
      }
      
      return newState;
    });
  };

  const getBookProgress = (bookId: string, units?: Unit[]) => {
    const bookCompleted = completedLessons[bookId] || [];
    const allUnits = units || GLOBAL_SYLLABUS;
    const totalLessons = allUnits.reduce((acc, unit) => acc + unit.lessons.length, 0);
    if (totalLessons === 0) return 0;
    return (bookCompleted.length / totalLessons) * 100;
  };

  const isStaff = role === 'Employee' || role === 'Admin';

  const filteredBooks = books.filter(b => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = b.title.toLowerCase().includes(query) || 
                          b.author.toLowerCase().includes(query) ||
                          (b.description?.toLowerCase().includes(query) ?? false);
    const matchesCategory = selectedCategory === 'All' || b.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id: string) => {
    setDeleteConfirmId(id);
  };

  const confirmDelete = () => {
    try {
      if (deleteConfirmId) {
        setBooks(books.filter(b => b.id !== deleteConfirmId));
        if (selectedBook?.id === deleteConfirmId) {
          setSelectedBook(null);
          setView('app');
        }
        setDeleteConfirmId(null);
        showNotification("NODE_ENTRY_TERMINATED", "success");
      }
    } catch (err) {
      showNotification("DELETION_FAILURE: ACCESS_DENIED", "error");
    }
  };

  const showNotification = (message: string, type: 'error' | 'success' | 'info' = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotification({ id, message, type });
    setTimeout(() => {
      setNotification(prev => prev?.id === id ? null : prev);
    }, 5000);
  };

  const handleToggleAvailability = (bookId: string) => {
    try {
      setBooks(prev => prev.map(b => b.id === bookId ? { ...b, available: !b.available } : b));
      if (selectedBook && selectedBook.id === bookId) {
        setSelectedBook(prev => prev ? { ...prev, available: !prev.available } : null);
      }
      showNotification(`NODE_${bookId.slice(0, 4)} STATUS_RECONFIGURED`, 'success');
    } catch (err) {
      showNotification('SYSTEM_FAIL: ACCESS_RECONFIG_DENIED', 'error');
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!selectedBook) throw new Error('NO_NODE_SELECTED');
      if (!reviewComment.trim()) {
        showNotification('INPUT_REQUIRED: METADATA_NULL', 'error');
        return;
      }

      const newReview: Review = {
        id: Math.random().toString(36).substr(2, 9),
        userId: 'user-123',
        userName: role === 'Admin' ? 'Staff_Operator' : 'Entity_774',
        rating: reviewRating,
        comment: reviewComment,
        timestamp: new Date().toISOString()
      };

      setBooks(prev => prev.map(b => 
        b.id === selectedBook.id 
          ? { ...b, reviews: [newReview, ...(b.reviews || [])] } 
          : b
      ));
      
      setSelectedBook(prev => prev ? { ...prev, reviews: [newReview, ...(prev.reviews || [])] } : null);
      setReviewComment('');
      setReviewRating(5);
      showNotification('FEEDBACK_SYCHRONIZED', 'success');
    } catch (err) {
      showNotification('UPLINK_ERROR: TRANSMISSION_FAILED', 'error');
    }
  };

  const handleDeleteUnit = (unitIdx: number) => {
    try {
      if (!selectedBook) return;
      const updatedUnits = [...(selectedBook.units || GLOBAL_SYLLABUS)];
      updatedUnits.splice(unitIdx, 1);
      const updatedBook = { ...selectedBook, units: updatedUnits };
      setBooks(books.map(b => b.id === selectedBook.id ? updatedBook : b));
      setSelectedBook(updatedBook);
      setUnitToDelete(null);
      showNotification("NODE_UNIT_PURGED", "success");
    } catch (err) {
      showNotification("PURGE_PROTOCOL_FAILED", "error");
    }
  };

  const handleDeleteLesson = (unitIdx: number, lessonId: string) => {
    if (!selectedBook) return;
    const updatedUnits = [...(selectedBook.units || GLOBAL_SYLLABUS)];
    updatedUnits[unitIdx] = {
      ...updatedUnits[unitIdx],
      lessons: updatedUnits[unitIdx].lessons.filter(l => l.id !== lessonId)
    };
    const updatedBook = { ...selectedBook, units: updatedUnits };
    setBooks(books.map(b => b.id === selectedBook.id ? updatedBook : b));
    setSelectedBook(updatedBook);
    setLessonToDelete(null);
  };

  const handleBulkDelete = () => {
    if (!selectedBook) return;
    try {
      let updatedUnits = [...(selectedBook.units || GLOBAL_SYLLABUS)];

      // Filter out selected units
      updatedUnits = updatedUnits.filter(unit => !selectedUnits.includes(unit.id));

      // Filter out selected lessons from remaining units
      updatedUnits = updatedUnits.map(unit => ({
        ...unit,
        lessons: unit.lessons.filter(lesson => !selectedLessons.includes(lesson.id))
      }));

      const updatedBook = { ...selectedBook, units: updatedUnits };
      setBooks(books.map(b => b.id === selectedBook.id ? updatedBook : b));
      setSelectedBook(updatedBook);
      
      setSelectedUnits([]);
      setSelectedLessons([]);
      setShowBulkDeleteConfirm(false);
      showNotification("BULK_PURGE_COMPLETE", "success");
    } catch (err) {
      showNotification("BULK_PURGE_FAILURE", "error");
    }
  };

  const saveUnitEdit = () => {
    try {
      if (!selectedBook || editingUnitIdx === null) return;
      const updatedUnits = [...(selectedBook.units || GLOBAL_SYLLABUS)];
      updatedUnits[editingUnitIdx] = {
        ...updatedUnits[editingUnitIdx],
        title: unitDraft.title,
        summary: unitDraft.summary
      };
      const updatedBook = { ...selectedBook, units: updatedUnits };
      setBooks(books.map(b => b.id === selectedBook.id ? updatedBook : b));
      setSelectedBook(updatedBook);
      setEditingUnitIdx(null);
      showNotification("CORE_METADATA_REWRITTEN", "success");
    } catch (err) {
      showNotification("WRITE_PROTECTION_ERROR", "error");
    }
  };

  const addUnit = () => {
    if (!selectedBook) return;
    const currentUnits = selectedBook.units || GLOBAL_SYLLABUS;
    const newUnit: Unit = {
      id: Math.max(0, ...currentUnits.map(u => u.id)) + 1,
      title: 'New Unit',
      summary: 'Unit Summary...',
      lessons: []
    };
    const updatedBook = { ...selectedBook, units: [...currentUnits, newUnit] };
    setBooks(books.map(b => b.id === selectedBook.id ? updatedBook : b));
    setSelectedBook(updatedBook);
  };

  const addLesson = (unitIdx: number) => {
    if (!selectedBook) return;
    if (!newLessonTitle.trim()) {
      showNotification("LESSON_TITLE_REQUIRED", "error");
      return;
    }
    const updatedUnits = [...(selectedBook.units || GLOBAL_SYLLABUS)];
    const newLesson = {
      id: Math.random().toString(36).substr(2, 9),
      title: newLessonTitle.trim(),
      content: newLessonContent.trim(),
      videoUrl: newLessonVideoUrl.trim()
    };
    updatedUnits[unitIdx] = {
      ...updatedUnits[unitIdx],
      lessons: [...updatedUnits[unitIdx].lessons, newLesson]
    };
    const updatedBook = { ...selectedBook, units: updatedUnits };
    setBooks(books.map(b => b.id === selectedBook.id ? updatedBook : b));
    setSelectedBook(updatedBook);
    setNewLessonTitle('');
    setNewLessonVideoUrl('');
    setNewLessonContent('');
    showNotification("LESSON_CATALOGED", "success");
  };

  const saveLessonEdit = () => {
    if (!selectedBook || !editingLessonId) return;
    const { unitIdx, lessonId } = editingLessonId;
    const updatedUnits = [...(selectedBook.units || GLOBAL_SYLLABUS)];
    updatedUnits[unitIdx] = {
      ...updatedUnits[unitIdx],
      lessons: updatedUnits[unitIdx].lessons.map(l => 
        l.id === lessonId ? { ...l, ...lessonDraft } : l
      )
    };
    const updatedBook = { ...selectedBook, units: updatedUnits };
    setBooks(books.map(b => b.id === selectedBook.id ? updatedBook : b));
    setSelectedBook(updatedBook);
    setEditingLessonId(null);
  };

  const openForm = (book?: Book) => {
    if (book) {
      setEditingBook(book);
      setFormData({ 
        title: book.title, 
        author: book.author, 
        category: book.category, 
        coverUrl: book.coverUrl || '',
        description: book.description || '',
        publisher: book.publisher || '',
        year: book.year || 2024,
        isbn: book.isbn || '',
        pages: book.pages || 0
      });
    } else {
      setEditingBook(null);
      setFormData({ 
        title: '', 
        author: '', 
        category: '', 
        coverUrl: '',
        description: '',
        publisher: '',
        year: 2024,
        isbn: '',
        pages: 0
      });
    }
    setIsModalOpen(true);
  };

  const getPlaceholderImage = (title: string) => {
    return `https://picsum.photos/seed/${encodeURIComponent(title)}/800/1200`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingBook) {
        const updatedBook = { 
          ...editingBook, 
          ...formData,
          coverUrl: formData.coverUrl || getPlaceholderImage(formData.title)
        };
        setBooks(books.map(b => b.id === editingBook.id ? updatedBook : b));
        if (selectedBook?.id === editingBook.id) {
          setSelectedBook(updatedBook);
        }
        showNotification("ARCHIVE_ENTRY_UPDATED", "success");
      } else {
        const newBook: Book = {
          id: Math.random().toString(36).substr(2, 9),
          title: formData.title,
          author: formData.author,
          category: formData.category,
          coverId: String(Math.floor(Math.random() * 100)),
          coverUrl: formData.coverUrl || getPlaceholderImage(formData.title),
          available: true,
          description: formData.description,
          publisher: formData.publisher,
          year: formData.year,
          isbn: formData.isbn,
          pages: formData.pages,
          units: []
        };
        setBooks([...books, newBook]);
        showNotification("NEW_NODE_SYNCHRONIZED", "success");
      }
      setIsModalOpen(false);
    } catch (err) {
      showNotification("METADATA_WRITE_FAILURE", "error");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, scale: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 }
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
  };

  if (view === 'home') {
    return (
      <div 
        className="min-h-screen flex flex-col font-sans select-none relative overflow-hidden bg-[#050608]"
      >
        {/* Animated Background Layers */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30 grayscale mix-blend-overlay"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2560&auto=format&fit=crop')` }}
          ></div>
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-transparent"></div>
        </div>

        {/* Noise Overlay */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

        <div className="relative z-10 flex flex-col min-h-screen">
          <nav className="px-12 py-10 flex justify-between items-center">
            <motion.div 
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-5"
            >
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn7PbH5exr2wwXozfpy3G0HfOD8-dPkjmHwg&s" 
                alt="Logo" 
                className="w-12 h-12 rounded-xl object-cover shadow-[0_0_30px_rgba(16,185,129,0.4)] animate-blur-in"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="text-2xl font-display font-black tracking-widest text-white leading-none">KLE SOCIETY'S</span>
                <span className="text-[10px] font-bold tracking-[0.6em] text-primary uppercase mt-1.5 opacity-80">BCA DIGITAL LIBRARY</span>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-10"
            >
              <div className="relative">
                <button 
                  onClick={() => setShowLanguagePicker(!showLanguagePicker)}
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-primary transition-all group"
                >
                  <Languages className="w-4 h-4" />
                  {INDIAN_LANGUAGES.find(l => l.code === selectedLanguage)?.name || 'Language'}
                </button>
                
                {showLanguagePicker && (
                  <div className="absolute top-full mt-4 right-0 w-48 glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl z-[60] animate-blur-in">
                    <div className="p-2 grid grid-cols-1 gap-1">
                      {INDIAN_LANGUAGES.map(lang => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setSelectedLanguage(lang.code);
                            setShowLanguagePicker(false);
                          }}
                          className="w-full text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-primary hover:bg-white/5 transition-all rounded-xl flex items-center justify-between"
                        >
                          {lang.name}
                          {selectedLanguage === lang.code && <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <a 
                href="https://klebcadwd.com/" 
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-primary transition-all group"
              >
                <div className="w-1 h-1 bg-primary rounded-full group-hover:scale-150 transition-transform"></div>
                College Mainframe
              </a>
              <button 
                onClick={() => simulateNeuralLink(() => setView('clusters'))}
                className="hidden lg:flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-primary transition-all group"
              >
                <div className="w-1 h-1 bg-primary rounded-full group-hover:scale-150 transition-transform"></div>
                Neural Clusters
              </button>
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => simulateNeuralLink(() => setView('login'))}
                className="bg-white text-black px-10 py-3.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all"
              >
                ACCESS TERMINAL
              </motion.button>
            </motion.div>
          </nav>

          <main className="flex-1 flex flex-col items-start justify-center px-12 md:px-32 max-w-8xl mx-auto w-full">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-3">
                <div className="h-[1px] w-12 bg-primary/30"></div>
                <span className="text-primary text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">System Online // v2.04</span>
              </div>
              
              <h1 className="text-7xl md:text-9xl font-display font-black leading-[0.85] text-white tracking-tighter uppercase italic animate-blur-in">
                Archives <br/>
                <span className="text-primary not-italic text-glow">Infinite.</span>
              </h1>
              
              <p className="max-w-2xl text-xl text-slate-400 font-medium leading-relaxed tracking-tight">
                High-fidelity access to the KLE Society’s scientific repository. 
                Digitized resources optimized for the modern computer scientist.
              </p>
              
              <div className="flex flex-wrap gap-8 pt-8">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => simulateNeuralLink(() => setView('login'))}
                  className="bg-primary text-black px-12 py-6 rounded-2xl text-[12px] font-black uppercase tracking-[0.3em] shadow-[0_0_50px_rgba(16,185,129,0.25)] flex items-center gap-6 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  INITIALIZE EXPLORATION
                  <div className="w-8 h-[1px] bg-black/40 group-hover:w-12 transition-all"></div>
                </motion.button>

                <div className="flex flex-col justify-center">
                  <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em]">Current Catalog Status</span>
                  <span className="text-xs font-black text-white uppercase tracking-widest">{books.length} NODES INDEXED</span>
                </div>
              </div>
            </motion.div>
          </main>

          <footer className="px-12 py-16 flex justify-between items-center border-t border-white/5 bg-black/20 backdrop-blur-md">
            <div className="flex gap-16">
              <div>
                <span className="text-[8px] font-bold text-white/20 uppercase tracking-[0.4em] block mb-2">Protocol</span>
                <span className="text-[10px] font-black text-white tracking-widest">TLS_v1.3_SECURE</span>
              </div>
              <div>
                <span className="text-[8px] font-bold text-white/20 uppercase tracking-[0.4em] block mb-2">Identity</span>
                <span className="text-[10px] font-black text-primary tracking-widest">GUEST_LINK</span>
              </div>
            </div>
            
            <div className="flex items-center gap-10">
               <div className="flex gap-1.5 items-center">
                 {[1, 2, 3, 4].map(i => (
                   <motion.div 
                    key={i}
                    animate={{ height: [4, 16, 4], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    className="w-1 bg-primary rounded-full"
                   />
                 ))}
               </div>
               <span className="text-[10px] font-black text-white/40 tracking-[0.3em]">SECURE ARCHIVE INTERFACE</span>
            </div>
          </footer>
        </div>
      </div>
    );
  }

  if (view === 'login') {
    return (
      <div className={`min-h-screen flex flex-col font-sans select-none relative bg-bg overflow-hidden ${theme === 'light' ? 'text-text-main' : ''}`}>
        {/* Animated Orbs */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 blur-[100px] rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative z-10 flex flex-col min-h-screen items-center justify-center p-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl glass-panel rounded-[3rem] shadow-2xl overflow-hidden border border-white/10"
          >
            <div className="p-16 pb-8 text-center bg-white/5 border-b border-white/5">
               <img 
                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn7PbH5exr2wwXozfpy3G0HfOD8-dPkjmHwg&s" 
                 alt="Logo" 
                 className="w-20 h-20 rounded-2xl object-cover mx-auto mb-10 shadow-2xl shadow-primary/20 transform -rotate-3 hover:rotate-0 transition-transform duration-500 animate-blur-in"
                 referrerPolicy="no-referrer"
               />
               <h2 className="text-4xl font-display font-black text-white tracking-tighter uppercase italic">Access Archives</h2>
               <p className="text-primary text-[11px] font-black tracking-[0.6em] uppercase mt-4 opacity-70">BCA DIGITAL LIBRARY SYSTEM</p>
            </div>
            
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                simulateNeuralLink(() => setView('app'));
              }} 
              className="p-16 pt-8 space-y-8"
            >
              <div className="flex gap-3 p-1.5 bg-black/40 rounded-2xl mb-8 border border-white/5">
                {(['Student', 'Employee', 'Admin'] as Role[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => {
                      setRole(r);
                      setLoginData({ 
                        email: r === 'Admin' ? 'admin@kle.edu' : r === 'Employee' ? 'employee@kle.edu' : 'student@kle.edu', 
                        password: 'password123' 
                      });
                    }}
                    className={`flex-1 py-4 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all ${
                      role === r 
                        ? 'bg-primary text-black shadow-lg shadow-primary/20' 
                        : 'text-slate-500 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              <div className="space-y-6">
                <div className="group">
                  <label className="block text-[9px] font-black text-slate-500 tracking-[0.3em] uppercase mb-3 ml-2 group-focus-within:text-primary transition-colors">IDENTIFICATION_KEY</label>
                  <input 
                    required 
                    type="text" 
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    placeholder="ID / EMAIL"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white placeholder-white/10 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all font-bold text-xs tracking-[0.2em] uppercase"
                  />
                </div>
                <div className="group">
                  <label className="block text-[9px] font-black text-slate-500 tracking-[0.3em] uppercase mb-3 ml-2 group-focus-within:text-primary transition-colors">SECURITY_BUFFER</label>
                  <input 
                    required 
                    type="password" 
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    placeholder="PASSWORD"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white placeholder-white/10 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all font-bold text-xs tracking-[0.2em] uppercase"
                  />
                </div>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                className="w-full py-6 bg-white text-black rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] hover:bg-primary transition-all shadow-2xl mt-6 group overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                ESTABLISH_CONNECTION
              </motion.button>

              <div className="pt-8 text-center">
                <button onClick={() => setView('home')} className="text-[11px] font-black text-slate-500 hover:text-primary uppercase tracking-[0.3em] transition-all group">
                   <span className="inline-block transform group-hover:-translate-x-2 transition-transform">&larr;</span> TERMINATE_PROCESS
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`min-h-screen flex flex-col font-sans select-none relative bg-bg text-text-main ${theme === 'light' ? 'light' : ''}`}
    >
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      
      {/* Dynamic Background Blurs */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
      {/* Search Header instead of Navbar */}
      <header className="glass-panel sticky top-0 z-50 px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-8 border-b border-border-main scrollbar-none">
        <div className="flex items-center gap-10">
          <div 
            className="flex items-center gap-4 cursor-pointer group"
            onClick={() => setView('home')}
          >
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn7PbH5exr2wwXozfpy3G0HfOD8-dPkjmHwg&s" 
              alt="Logo" 
              className="w-12 h-12 rounded-xl object-cover shadow-[0_0_30px_rgba(16,185,129,0.2)] group-hover:scale-105 transition-transform duration-500 animate-blur-in"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
              <span className="text-2xl font-display font-black tracking-tighter text-text-main leading-none italic group-hover:text-primary transition-colors uppercase italic">ARCHIVE</span>
              <span className="text-[9px] font-black tracking-[0.4em] text-primary uppercase leading-none mt-2 opacity-60">KLE Society</span>
            </div>
          </div>

          <div className="relative group w-full md:w-96 ml-8">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-main/20 group-focus-within:text-primary transition-all duration-300" />
            <input 
              type="text" 
              placeholder="GLOBAL INDEX SEARCH..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface border border-border-main rounded-2xl py-4 pl-14 pr-24 text-text-main focus:outline-none focus:border-primary/40 focus:bg-surface transition-all text-[10px] font-black tracking-[0.2em] placeholder-text-main/10"
            />

            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="p-2.5 rounded-xl text-text-main/20 hover:text-primary hover:bg-primary/10 transition-all"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button 
                onClick={toggleVoiceSearch}
                className={`p-2 rounded-xl transition-all ${
                  listeningTarget === 'search' ? 'bg-primary text-black animate-pulse shadow-[0_0_15px_#10B981]' : 'bg-white/5 text-white/40 hover:text-primary'
                }`}
                title={listeningTarget === 'search' ? "Listening..." : "Voice Search"}
              >
                {listeningTarget === 'search' ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-10">
          <button 
            onClick={toggleTheme}
            className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-primary hover:border-primary/40 transition-all hover:scale-110 active:scale-95"
            title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 text-gray-800" />}
          </button>

          <div className="relative">
            <button 
              onClick={() => setShowLanguagePicker(!showLanguagePicker)}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-primary transition-all group"
            >
              <Languages className="w-4 h-4" />
              {INDIAN_LANGUAGES.find(l => l.code === selectedLanguage)?.name || 'TRANSLATE'}
            </button>
            
            {showLanguagePicker && (
              <div className="absolute top-full mt-4 left-0 w-48 glass-panel rounded-2xl border border-border-main overflow-hidden shadow-2xl z-[60] animate-blur-in">
                <div className="p-2 grid grid-cols-1 gap-1">
                  {INDIAN_LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLanguage(lang.code);
                        setShowLanguagePicker(false);
                      }}
                      className="w-full text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-text-main/60 hover:text-primary hover:bg-surface/50 transition-all rounded-xl flex items-center justify-between"
                    >
                      {lang.name}
                      {selectedLanguage === lang.code && <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <nav className="hidden xl:flex items-center gap-10 text-[10px] font-black tracking-[0.3em] uppercase text-text-main/30">
              <button
                onClick={() => simulateNeuralLink(() => setView('home'))}
                className="hover:text-primary transition-all flex items-center gap-3 group"
              >
                <div className="w-1.5 h-1.5 bg-border-main rounded-full group-hover:bg-primary transition-colors"></div>
                BACK_TO_PORTAL
              </button>
              <button
                onClick={() => simulateNeuralLink(() => setView('clusters'))}
                className="hover:text-primary transition-all flex items-center gap-3 group"
              >
                <div className="w-1.5 h-1.5 bg-border-main rounded-full group-hover:bg-primary transition-colors"></div>
                NEURAL_CLUSTERS
              </button>
              <a href="https://klebcadwd.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-all flex items-center gap-3 group">
                <div className="w-1.5 h-1.5 bg-white/10 rounded-full group-hover:bg-primary transition-colors"></div>
                EXTERNAL_LINK
              </a>
          </nav>

          <div className="flex items-center gap-6">
            <div 
              onClick={() => simulateNeuralLink(() => setView('profile'))}
              className="flex items-center gap-4 bg-white/5 p-2 pr-6 rounded-2xl border border-white/5 group hover:border-primary/30 transition-all cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 text-primary flex items-center justify-center font-display font-black text-lg border border-white/5 group-hover:bg-primary group-hover:text-black transition-all">
                {loginData.email ? loginData.email.charAt(0).toUpperCase() : role.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-black text-white leading-none uppercase tracking-tighter truncate max-w-[120px]">{loginData.email || role}</span>
                <span className="text-[8px] font-bold text-primary uppercase tracking-[0.2em] mt-1.5">ID: {role}_LINK</span>
              </div>
            </div>
            <button
              onClick={() => setView('login')}
              className="w-14 h-14 bg-white/5 border border-white/5 rounded-2xl hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-all flex items-center justify-center group"
              title="Terminate Session"
            >
              <ShieldAlert className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero with stats */}
      <section className="px-10 py-16 flex flex-col md:flex-row gap-12 items-start max-w-8xl mx-auto w-full">
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-4">
             <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
             <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Active Node Directory</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-black text-text-main tracking-tighter uppercase leading-none italic">
            Learning <span className="text-primary not-italic text-glow">Vault.</span>
          </h2>
          <p className="text-slate-400 text-lg font-medium max-w-xl leading-relaxed">
            Browse the specialized collection curated for the next generation of engineers. 
            Real-time indexing and prioritized resource allocation.
          </p>
        </div>

        <div className="flex gap-6 w-full md:w-auto">
          {[
            { label: 'Total Nodes', val: books.length, color: 'text-text-main' },
            { label: 'In Service', val: books.filter(b => !b.available).length, color: 'text-primary' }
          ].map(stat => (
            <div key={stat.label} className="bg-surface border border-border-main p-8 rounded-[2rem] min-w-[180px] backdrop-blur-md group hover:border-primary/30 transition-all">
               <span className="text-[9px] font-black text-slate-500 tracking-[0.3em] uppercase block mb-4 group-hover:text-primary transition-colors">{stat.label}</span>
               <span className={`text-5xl font-display font-black ${stat.color}`}>{stat.val}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content Area */}
      {view === 'app' && (
      <main className="flex-1 p-10 pt-0 flex flex-col max-w-8xl mx-auto w-full">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12 border-b border-border-main pb-12">
          <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-none scroll-smooth w-full md:w-auto -mx-2 px-2 mask-linear-fade">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border shrink-0 ${
                  selectedCategory === cat 
                    ? 'bg-primary text-black border-primary shadow-[0_0_20px_#10B98130]' 
                    : 'bg-surface text-slate-500 border-border-main hover:border-white/20 hover:text-text-main'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {isStaff && (
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openForm()}
              className="bg-white text-black px-6 py-2.5 rounded-full font-black uppercase text-[10px] tracking-widest transition-all flex items-center gap-3 shadow-xl hover:bg-primary shadow-primary/10"
            >
              <Plus className="w-3.5 h-3.5" />
              Upload Item
            </motion.button>
          )}
        </div>

        {/* Database Readout / Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8"
        >
          <AnimatePresence mode="wait">
            {isLoading ? (
              <React.Fragment key="loading">
                {[...Array(10)].map((_, i) => (
                  <BookSkeleton key={i} />
                ))}
              </React.Fragment>
            ) : filteredBooks.map((book, i) => (
              <motion.div 
                key={book.id}
                layout
                variants={itemVariants}
                transition={{ delay: i * 0.05 }}
                onClick={() => {
                  simulateNeuralLink(() => {
                    setSelectedBook(book);
                    addToHistory(book.id);
                    setView('details');
                  });
                }}
                className="bento-card rounded-[2rem] group overflow-hidden cursor-pointer flex flex-col h-full relative"
              >
                {/* ID Label Overlay */}
                <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                   <div className="text-[8px] font-black text-primary uppercase tracking-[0.4em] bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-primary/30">
                     NODE_{book.id.slice(0, 4).toUpperCase()}
                   </div>
                </div>

                <div className="h-64 relative overflow-hidden bg-slate-950">
                  <img 
                    src={book.coverUrl || `https://picsum.photos/seed/${book.id}/400/600`}
                    alt={book.title}
                    className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400&auto=format&fit=crop`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-transparent to-transparent opacity-80"></div>
                  
                    <div className="absolute top-6 left-6 flex items-center gap-2">
                    <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(book.id);
                        }}
                        className={`p-2 rounded-full backdrop-blur-md border transition-all ${
                          bookmarks.includes(book.id)
                            ? 'bg-primary border-primary text-black'
                            : 'bg-white/5 border-white/10 text-white/40 hover:text-primary hover:border-primary/40'
                        }`}
                        title={bookmarks.includes(book.id) ? "Remove Bookmark" : "Save Bookmark"}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${bookmarks.includes(book.id) ? 'fill-current' : ''}`} />
                      </button>
                      <span className={`text-[9px] font-black uppercase tracking-[0.3em] py-2 px-4 rounded-full backdrop-blur-md border ${
                      book.available ? 'bg-primary/10 text-primary border-primary/40' : 'bg-red-500/10 text-red-400 border-red-500/40'
                    }`}>
                      {book.available ? '● ONLINE' : '○ CIRCULATING'}
                    </span>
                    {isStaff && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleAvailability(book.id);
                        }}
                        className={`p-2 rounded-full backdrop-blur-md border transition-all ${
                          book.available 
                            ? 'bg-primary/20 border-primary/40 text-primary hover:bg-primary hover:text-black' 
                            : 'bg-red-500/20 border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white'
                        }`}
                        title={book.available ? "Mark as Unavailable" : "Mark as Available"}
                      >
                        <motion.div
                          animate={{ rotate: book.available ? 0 : 180 }}
                        >
                          <div className={`w-2 h-2 rounded-full ${book.available ? 'bg-primary' : 'bg-red-500'} group-hover:bg-white`}></div>
                        </motion.div>
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <span className="text-[9px] font-black text-primary uppercase tracking-[0.4em] opacity-60">CAT // {book.category}</span>
                  </div>
                  <h3 className="text-white font-display font-black text-2xl leading-[1.1] mb-3 uppercase tracking-tighter group-hover:text-primary transition-colors text-glow">{book.title}</h3>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em]">{book.author}</p>
                  
                  <div className="mt-auto pt-8 flex gap-4">
                    {isStaff ? (
                      <div className="flex gap-3 w-full">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            openForm(book);
                          }}
                          className="flex-1 bg-white/5 text-slate-400 border border-white/5 rounded-2xl py-3.5 text-[9px] font-black uppercase tracking-[0.2em] hover:bg-primary hover:text-black hover:border-primary transition-all"
                        >
                          EDIT_NODE
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(book.id);
                          }}
                          className="w-14 bg-white/5 text-slate-400 border border-white/5 rounded-2xl py-3.5 flex items-center justify-center hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/30 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button 
                        disabled={!book.available}
                        className={`w-full py-4 text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl transition-all relative overflow-hidden group/btn ${
                          book.available 
                            ? 'bg-white text-black hover:bg-primary shadow-2xl' 
                            : 'bg-white/5 text-white/5 cursor-not-allowed border border-white/5'
                        }`}
                      >
                        <div className="absolute inset-0 bg-black opacity-0 group-hover/btn:opacity-5 transition-opacity"></div>
                        {book.available ? 'ESTABLISH_LINK' : 'NODE_LOCKED'}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredBooks.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-32 glass-panel rounded-3xl border border-white/5 max-w-4xl mx-auto mt-20"
          >
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/5">
              <Search className="w-6 h-6 text-slate-500" />
            </div>
            <h4 className="font-display text-2xl text-text-main font-black tracking-tight mb-3 uppercase">Zero Hits</h4>
            <p className="text-slate-500 font-medium text-sm tracking-widest uppercase">No records matching that query signature.</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-8 px-8 py-3 bg-white text-black rounded-full font-black text-[10px] tracking-widest uppercase hover:bg-primary transition-colors"
            >
              Reset Terminal
            </button>
          </motion.div>
        )}
      </main>
      )}

      {/* Clusters View */}
      {view === 'clusters' && (
        <main className="flex-1 p-12 overflow-y-auto relative scrollbar-none">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-l-2 border-primary/30 pl-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-[11px] font-black text-primary uppercase tracking-[0.5em]">Active Neural Networks</span>
                </div>
                <h1 className="text-6xl font-display font-black text-white tracking-tighter uppercase italic">
                  Research <span className="text-primary not-italic">Clusters.</span>
                </h1>
                <p className="text-slate-400 text-lg max-w-xl font-medium leading-relaxed">
                  Join active computational nodes focused on protocol optimization, 
                  algorithmic research, and cybernetics.
                </p>
              </div>
              
              <button 
                onClick={() => simulateNeuralLink(() => setView(loginData.email ? 'app' : 'home'))}
                className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-white hover:border-primary transition-all"
              >
                &larr; BACK_TO_INTERFACE
              </button>
            </div>

            {isLoading ? (
              <ClusterSkeleton />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {clusters.map((cluster, i) => (
                  <motion.div
                    key={cluster.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-panel border border-white/5 rounded-[2.5rem] p-10 flex flex-col gap-8 group hover:border-primary/40 transition-all hover:-translate-y-2 relative overflow-hidden"
                  >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] -z-10 group-hover:bg-primary/10 transition-all"></div>
                  
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">{cluster.field}</span>
                      <h3 className="text-2xl font-display font-black text-white uppercase leading-tight tracking-tight">{cluster.name}</h3>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${cluster.active ? 'bg-primary shadow-[0_0_15px_#10B981]' : 'bg-slate-700'}`}></div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                      <span>SYNC_INTENSITY</span>
                      <span className="text-white">{cluster.intensity}%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${cluster.intensity}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-primary"
                      ></motion.div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        {[1,2,3].map(j => (
                          <div key={j} className="w-8 h-8 rounded-full border-2 border-[#07080a] bg-slate-800 flex items-center justify-center text-[8px] font-black text-white">U</div>
                        ))}
                      </div>
                      <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">{cluster.members} ACTIVE NODES</span>
                    </div>
                    
                    <button className="px-6 py-3 bg-white text-black rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-primary transition-all">
                      JOIN_NODE
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          </div>
        </main>
      )}

      {/* Profile View */}
      {view === 'profile' && (
        <main className="flex-1 p-12 overflow-y-auto relative scrollbar-none">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-l-2 border-primary/30 pl-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-[11px] font-black text-primary uppercase tracking-[0.5em]">User Control Center</span>
                </div>
                <h1 className="text-6xl font-display font-black text-white tracking-tighter uppercase italic">
                  Identity <span className="text-primary not-italic">Profile.</span>
                </h1>
                <p className="text-slate-400 text-lg max-w-xl font-medium leading-relaxed">
                  Managing your digital footprints across the KLE Society's neural archives.
                </p>
              </div>
              
              <button 
                onClick={() => simulateNeuralLink(() => setView('app'))}
                className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-white hover:border-primary transition-all"
              >
                &larr; BACK_TO_INTERFACE
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-1 space-y-8">
                <div className="glass-panel border border-white/5 rounded-[2.5rem] p-10 space-y-8">
                  <div className="flex flex-col items-center gap-6">
                    <div className="w-32 h-32 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-display font-black text-6xl shadow-[0_0_50px_rgba(16,185,129,0.1)]">
                      {loginData.email?.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-center">
                      <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight">{loginData.email.split('@')[0]}</h3>
                      <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mt-2 mb-6">ID: {role}_LINK_STABLE</p>
                      
                      <div className="flex items-center gap-2 justify-center mb-8">
                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                          role === 'Admin' ? 'bg-red-500/10 border-red-500/30 text-red-400' :
                          role === 'Employee' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' :
                          'bg-primary/10 border-primary/30 text-primary'
                        }`}>
                          {role}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-8 border-t border-white/5">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                      <span className="text-slate-500">Security Clearance</span>
                      <span className="text-white">{role === 'Admin' ? 'LEVEL_04' : role === 'Employee' ? 'LEVEL_02' : 'LEVEL_01'}</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                      <span className="text-slate-500">Active Sessions</span>
                      <span className="text-white">01_ENCRYPTED</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                       <span className="text-slate-500">Mastered Nodes</span>
                       <span className="text-primary">{Object.values(completedLessons).flat().length}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => setView('login')}
                    className="w-full py-4 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-black transition-all flex items-center justify-center gap-3 mt-8"
                  >
                    <ShieldAlert className="w-4 h-4" /> TERMINATE_SESSION
                  </button>
                </div>

                <div className="glass-panel border border-white/5 rounded-[2.5rem] p-10">
                  <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                    <History className="w-4 h-4 text-primary" /> Transmission History
                  </h3>
                  <div className="space-y-6">
                    {readingHistory.length > 0 ? readingHistory.map((bId) => {
                      const book = books.find(b => b.id === bId);
                      if (!book) return null;
                      return (
                        <div 
                          key={bId}
                          onClick={() => {
                            setSelectedBook(book);
                            setView('details');
                          }}
                          className="flex items-center gap-4 group cursor-pointer"
                        >
                          <div className="w-12 h-16 rounded-lg overflow-hidden border border-white/5 shrink-0 grayscale group-hover:grayscale-0 transition-all">
                            <img src={book.coverUrl} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                          </div>
                          <div>
                            <h4 className="text-[10px] font-black text-white uppercase tracking-tight group-hover:text-primary transition-colors">{book.title}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Clock className="w-3 h-3 text-slate-500" />
                              <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">SYNCHRONIZED</span>
                            </div>
                          </div>
                        </div>
                      );
                    }) : (
                      <div className="text-center py-10">
                        <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest italic">NO_LOGS_AVAILABLE</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-12">
                <div className="flex justify-between items-end">
                   <div>
                    <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-2 flex items-center gap-3">
                      <Bookmark className="w-4 h-4 text-primary" /> Bookmarked Segments
                    </h3>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Saved neural access points</p>
                   </div>
                </div>

                {bookmarks.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {bookmarks.map((bId) => {
                      const book = books.find(b => b.id === bId);
                      if (!book) return null;
                      return (
                        <motion.div 
                          key={bId}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="glass-panel border border-white/5 rounded-[2rem] p-8 flex gap-6 group hover:border-primary/40 transition-all cursor-pointer relative"
                          onClick={() => {
                            setSelectedBook(book);
                            setView('details');
                          }}
                        >
                          <div className="absolute top-6 right-6">
                             <button 
                               onClick={(e) => {
                                 e.stopPropagation();
                                 toggleBookmark(bId);
                               }}
                               className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary border border-white/10 hover:bg-primary hover:text-black transition-all"
                             >
                               <Bookmark className="w-4 h-4 fill-current" />
                             </button>
                          </div>

                          <div className="w-24 h-32 rounded-xl overflow-hidden border border-white/5 shrink-0 grayscale group-hover:grayscale-0 transition-all duration-500">
                            <img src={book.coverUrl} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                          </div>
                          <div className="flex flex-col justify-center">
                            <span className="text-[8px] font-black text-primary uppercase tracking-[0.4em] mb-2 block">{book.category}</span>
                            <h4 className="text-xl font-display font-black text-white uppercase tracking-tight group-hover:text-primary transition-colors leading-tight mb-2 italic">{book.title}</h4>
                            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{book.author}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-24 text-center glass-panel border border-dashed border-white/5 rounded-[3rem]">
                     <Bookmark className="w-12 h-12 text-white/5 mx-auto mb-6" />
                     <h4 className="text-lg font-black text-white/20 uppercase tracking-widest">Vault Empty</h4>
                     <p className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter mt-2">PIN ARCHIVE NODES FOR RAPID RETRIEVAL</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Details View */}
      {view === 'details' && selectedBook && (
        <main className="flex-1 p-12 overflow-y-auto relative scrollbar-none overflow-hidden">
          {isLoading ? (
            <div className="pt-24">
              <DetailsSkeleton />
            </div>
          ) : (
            <>
          {/* Breadcrumbs */}
          <nav className="max-w-7xl mx-auto mb-10 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-text-main/40">
            <button 
              onClick={() => simulateNeuralLink(() => setView('app'))}
              className="hover:text-primary transition-colors flex items-center gap-2"
            >
              <Home className="w-3 h-3" /> ARCHIVE_PORTAL
            </button>
            <ChevronRight className="w-3 h-3 text-text-main/10" />
            <button 
              onClick={() => {
                simulateNeuralLink(() => {
                  setSelectedCategory(selectedBook.category);
                  setView('app');
                });
              }}
              className="hover:text-primary transition-colors"
            >
              {selectedBook.category}
            </button>
            <ChevronRight className="w-3 h-3 text-text-main/10" />
            <span className="text-text-main truncate max-w-[200px]">{selectedBook.title}</span>
          </nav>
          {/* Immersive Background */}
          <div className="absolute inset-0 -z-20 overflow-hidden">
            <img 
              src={selectedBook.coverUrl || `https://picsum.photos/seed/${selectedBook.id}/800/1200`} 
              alt=""
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-20 blur-[100px] scale-150"
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-bg ${theme === 'dark' ? 'via-bg/60' : 'via-bg/20'} to-transparent`}></div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col lg:flex-row gap-20 max-w-7xl mx-auto items-center lg:items-start"
          >
            <div className="w-full lg:w-[480px] shrink-0 sticky top-0">
              <div className="relative group overflow-hidden rounded-[3rem] aspect-[3/4] shadow-[0_0_100px_rgba(0,0,0,0.6)] border border-white/10 transform transition-all duration-700 hover:scale-105">
                <div 
                   className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110"
                   style={{ backgroundImage: `url('${selectedBook.coverUrl || `https://picsum.photos/seed/${selectedBook.id}/800/1200`}')` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-10 left-10">
                   <div className="px-5 py-2 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full text-[9px] font-black text-primary uppercase tracking-[0.3em]">
                     RESOURCE NODE: {selectedBook.id}
                   </div>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-12 py-10">
              <div className="space-y-6">
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-4"
                >
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                  <span className="text-[11px] font-black text-primary uppercase tracking-[0.5em] block">{selectedBook.category} // ARCHIVE_01</span>
                </motion.div>
                
            <h1 className="text-6xl md:text-9xl font-display font-black text-text-main leading-[0.8] tracking-tighter uppercase italic text-glow animate-blur-in">
                  {selectedBook.title}
                </h1>
                
                <p className="text-2xl text-slate-400 font-medium uppercase tracking-widest leading-none">
                   Index Curator: <span className="text-text-main">{selectedBook.author}</span>
                </p>

                <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                  <div className="flex-1 max-w-sm">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">TRANSMISSION_PROGRESS</span>
                       <span className="text-[10px] font-black text-primary uppercase tracking-widest">{Math.round(getBookProgress(selectedBook.id, selectedBook.units))}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: `${getBookProgress(selectedBook.id, selectedBook.units)}%` }}
                         className="h-full bg-primary"
                       />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-6 py-3 bg-white/5 rounded-2xl border border-white/5">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">NODES_MASTERED:</span>
                    <span className="text-[10px] font-black text-white">{(completedLessons[selectedBook.id] || []).length} / {(selectedBook.units || GLOBAL_SYLLABUS).reduce((acc, unit) => acc + unit.lessons.length, 0)}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {[
                  { label: 'PUBLISHER', val: selectedBook.publisher || 'KLE ACADEMIC' },
                  { label: 'YEAR', val: selectedBook.year || '2024' },
                  { label: 'ISBN_MANIFEST', val: selectedBook.isbn || '978-0000000000' },
                  { label: 'PAGE_VOLUME', val: selectedBook.pages ? `${selectedBook.pages} UNITS` : '512+ UNITS' },
                  { label: 'NODE_ACCESS', val: selectedBook.available ? 'AUTHORIZED' : 'RESTRICTED' },
                  { label: 'UNIQUE_HASH', val: selectedBook.id.slice(0, 8).toUpperCase() }
                ].map((stat, i) => (
                  <motion.div 
                    key={stat.label} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + (i * 0.1) }}
                    className="bg-surface border border-border-main p-6 rounded-3xl backdrop-blur-md group hover:border-primary/30 transition-all hover:-translate-y-2"
                  >
                    <span className="text-[9px] font-black text-slate-600 tracking-[0.3em] uppercase block mb-3 group-hover:text-primary transition-colors">{stat.label}</span>
                    <span className="text-sm font-black text-white uppercase tracking-wider">{stat.val}</span>
                  </motion.div>
                ))}
              </div>

              <div className="prose prose-invert max-w-4xl border-l-[1px] border-white/10 pl-10">
                <p className="text-slate-400 text-lg leading-relaxed font-medium tracking-tight">
                  {selectedBook.description || `This high-performance academic resource is cryptographically indexed within the KLE Society's digital vault. It contains high-fidelity learning materials specifically calibrated for the ${selectedBook.category} curriculum structure.`}
                </p>
              </div>

              <div className="flex flex-wrap gap-6 pt-12 border-t border-white/10">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowSyllabusModal(true)}
                  className="flex-1 md:flex-none px-14 py-6 bg-primary text-black rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.3em] hover:shadow-[0_0_50px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-4 group"
                >
                  <BookOpen className="w-5 h-5 group-hover:rotate-12 transition-transform" /> OPEN_RESOURCE
                </motion.button>

                <button
                  onClick={() => toggleBookmark(selectedBook.id)}
                  className={`px-10 py-6 border rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center gap-3 ${
                    bookmarks.includes(selectedBook.id)
                      ? 'bg-primary/20 border-primary/40 text-primary'
                      : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${bookmarks.includes(selectedBook.id) ? 'fill-current' : ''}`} />
                  {bookmarks.includes(selectedBook.id) ? 'BOOKMARKED' : 'BOOKMARK_NODE'}
                </button>
                
                {isStaff ? (
                  <div className="flex gap-4 w-full md:w-auto">
                    <button 
                      onClick={() => openForm(selectedBook)}
                      className="px-10 py-6 bg-white/5 text-white border border-white/10 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/10 hover:border-primary transition-all"
                    >
                      MODIFY_NODE
                    </button>
                    <button 
                      onClick={() => setDeleteConfirmId(selectedBook.id)}
                      className="px-10 py-6 bg-red-500/10 text-red-500 border border-red-500/20 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-red-500 hover:text-black transition-all"
                    >
                      TERMINATE_ARCHIVE
                    </button>
                  </div>
                ) : (
                  <button 
                    disabled={!selectedBook.available}
                    className={`px-16 py-6 rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.3em] transition-all relative overflow-hidden group ${
                      selectedBook.available 
                        ? 'bg-white/5 text-primary border border-primary/40 hover:bg-primary hover:text-black' 
                        : 'bg-white/5 text-slate-800 cursor-not-allowed border border-white/5'
                    }`}
                  >
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    {selectedBook.available ? 'REQUEST_ACCESS' : 'LINK_IN_USE'}
                  </button>
                )}
                
                <button 
                  onClick={() => setView('app')}
                  className="px-12 py-6 bg-white/5 text-slate-500 border border-white/5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.3em] hover:text-white hover:border-white/20 transition-all ml-auto"
                >
                  RETURN_TO_INDEX
                </button>
              </div>
            </div>
          </motion.div>

          {/* Recommended Section */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="max-w-7xl mx-auto mt-32 pb-20 border-t border-white/5 pt-20"
          >
            <div className="flex justify-between items-end mb-12">
              <div>
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em] mb-4 block">NEURAL LINK RECOMMENDATIONS</span>
                <h2 className="text-5xl font-display font-black text-white tracking-tighter uppercase italic">Related Nodes</h2>
              </div>
              <div className="hidden md:block h-px flex-1 bg-white/5 mx-10 mb-5 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary w-1/4 animate-pulse"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {books
                .filter(b => b.category === selectedBook.category && b.id !== selectedBook.id)
                .slice(0, 4)
                .map((book, idx) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + (idx * 0.1) }}
                    onClick={() => {
                      setSelectedBook(book);
                      const mainElement = document.querySelector('main');
                      if (mainElement) {
                        mainElement.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 mb-6 transition-all duration-500 group-hover:border-primary/50 group-hover:-translate-y-2 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                      <img 
                        src={book.coverUrl || `https://picsum.photos/seed/${book.id}/400/600`}
                        className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                        alt={book.title}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>
                      <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <button className="w-full py-4 bg-primary text-black text-[10px] font-black uppercase tracking-widest rounded-xl">View Node</button>
                      </div>
                    </div>
                    <div>
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 block">{book.author}</span>
                      <h3 className="text-lg font-bold text-white uppercase leading-tight group-hover:text-primary transition-colors">{book.title}</h3>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>

          {/* Reviews Section */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="max-w-7xl mx-auto mt-20 pb-32 border-t border-white/5 pt-20"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
              <div className="lg:col-span-1">
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em] mb-4 block">NEURAL FEEDBACK</span>
                <h2 className="text-4xl font-display font-black text-white tracking-tighter uppercase mb-8">User Metadata</h2>
                
                <form onSubmit={handleReviewSubmit} className="space-y-6 bg-white/5 p-8 rounded-3xl border border-white/10">
                  <div>
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3 block">RATING_LEVEL</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className={`p-1 transition-all ${star <= reviewRating ? 'text-primary' : 'text-white/10'}`}
                        >
                          <Star className={`w-5 h-5 ${star <= reviewRating ? 'fill-primary' : ''}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3 block">COMMENT_DATA</label>
                    <div className="relative">
                      <textarea
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Input your evaluation..."
                        className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-4 text-[11px] text-white placeholder:text-white/20 focus:border-primary/50 outline-none transition-all resize-none font-mono pr-12"
                      />
                      <button
                        type="button"
                        onClick={toggleReviewDictation}
                        className={`absolute right-3 bottom-3 p-2 rounded-xl transition-all ${
                          listeningTarget === 'review' ? 'bg-primary text-black animate-pulse shadow-[0_0_15px_#10B981]' : 'bg-white/5 text-white/40 hover:text-primary'
                        }`}
                        title={listeningTarget === 'review' ? "Listening..." : "Dictate Review"}
                      >
                        {listeningTarget === 'review' ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full py-4 bg-primary text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:shadow-[0_0_30px_#10B98150] transition-all"
                  >
                    Submit_Report
                  </button>
                </form>
              </div>

              <div className="lg:col-span-2 space-y-8">
                <div className="flex justify-between items-center mb-10">
                   <h3 className="text-xl font-bold text-white uppercase tracking-widest">Operation_Logs ({selectedBook.reviews?.length || 0})</h3>
                   <div className="flex items-center gap-4 text-[10px] text-slate-500 font-bold">
                     <span className="flex items-center gap-2 text-primary">
                       <div className="w-1 h-1 bg-primary animate-pulse rounded-full"></div>
                       LIVE_FEED
                     </span>
                   </div>
                </div>

                <div className="space-y-6">
                  {selectedBook.reviews && selectedBook.reviews.length > 0 ? (
                    selectedBook.reviews.map((review, i) => (
                      <motion.div 
                        key={review.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.4 + (i * 0.1) }}
                        className="bg-white/3 p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-all group"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20">
                              <User className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <span className="block text-[11px] font-black text-white uppercase tracking-widest">{review.userName}</span>
                              <span className="text-[9px] font-mono text-slate-500">{new Date(review.timestamp).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-primary fill-primary' : 'text-white/10'}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-400 font-medium leading-relaxed font-mono">
                          {review.comment}
                        </p>
                      </motion.div>
                    ))
                  ) : (
                    <div className="py-20 text-center border border-dashed border-white/10 rounded-3xl">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">NO_REVIEWS_DETECTED_IN_THIS_NODE</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
          </>
          )}
        </main>
      )}

      {/* Footer Area */}
      <footer className="px-8 py-6 flex flex-wrap justify-between items-center z-40 relative border-t border-white/5">
        <div className="flex gap-12">
            <div>
              <span className="text-[8px] font-black text-slate-600 tracking-widest uppercase block">ENCRYPTION</span>
              <span className="text-[10px] font-black text-white">AES_256</span>
            </div>
            <div>
              <span className="text-[8px] font-black text-slate-600 tracking-widest uppercase block">SESSION</span>
              <span className="text-[10px] font-black text-primary">SECURE</span>
            </div>
        </div>
        <div className="flex items-center gap-3 bg-white/5 px-5 py-2 rounded-full border border-white/5">
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_10px_#10B981]"></div>
          <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest">System Link Active</span>
        </div>
      </footer>

      {/* Modals */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              className="glass-panel rounded-[2.5rem] w-full max-w-xl shadow-2xl overflow-hidden border border-white/10"
            >
              <div className="px-10 py-8 border-b border-white/5 flex justify-between items-center">
                <div>
                  <h2 className="font-display font-black text-3xl text-white tracking-tighter uppercase italic">
                    {editingBook ? 'Modify Record' : 'New Archive'}
                  </h2>
                  <p className="text-[9px] font-bold text-primary mt-1 uppercase tracking-[0.3em]">Administrative Access</p>
                </div>
                <button type="button" onClick={() => setIsModalOpen(false)} className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white/30 hover:text-primary transition-all border border-white/5">
                  <span className="text-3xl leading-none">&times;</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-10 space-y-8">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="w-full md:w-40 shrink-0">
                    <label className="block text-[8px] font-black text-slate-500 mb-3 uppercase tracking-[0.3em]">PREVIEW</label>
                    <div className="aspect-[3/4] rounded-2xl bg-white/5 border border-white/5 overflow-hidden flex items-center justify-center">
                      {formData.coverUrl ? (
                        <img 
                          src={formData.coverUrl} 
                          alt="Preview" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400&auto=format&fit=crop';
                          }}
                        />
                      ) : (
                        <BookOpen className="w-8 h-8 text-white/10" />
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-6">
                    <div>
                      <label className="block text-[8px] font-black text-slate-500 mb-2 uppercase tracking-[0.3em]">TITLE</label>
                      <input 
                        required type="text" value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-primary transition-all font-bold text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[8px] font-black text-slate-500 mb-2 uppercase tracking-[0.3em]">AUTHOR</label>
                      <input 
                        required type="text" value={formData.author}
                        onChange={(e) => setFormData({...formData, author: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-primary transition-all font-bold text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[8px] font-black text-slate-500 mb-2 uppercase tracking-[0.3em]">CATEGORY</label>
                      <input 
                        required type="text" value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-primary transition-all font-bold text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[8px] font-black text-slate-500 mb-2 uppercase tracking-[0.3em]">COVER_IMAGE_URL</label>
                      <input 
                        type="url" value={formData.coverUrl}
                        onChange={(e) => setFormData({...formData, coverUrl: e.target.value})}
                        placeholder="https://example.com/image.jpg"
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-primary transition-all font-bold text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[8px] font-black text-slate-500 mb-2 uppercase tracking-[0.3em]">DESCRIPTION</label>
                      <textarea 
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-primary transition-all font-bold text-xs resize-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[8px] font-black text-slate-500 mb-2 uppercase tracking-[0.3em]">PUBLISHER</label>
                        <input 
                          type="text" value={formData.publisher}
                          onChange={(e) => setFormData({...formData, publisher: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-primary transition-all font-bold text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[8px] font-black text-slate-500 mb-2 uppercase tracking-[0.3em]">YEAR</label>
                        <input 
                          type="number" value={formData.year}
                          onChange={(e) => setFormData({...formData, year: parseInt(e.target.value) || 0})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-primary transition-all font-bold text-xs"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[8px] font-black text-slate-500 mb-2 uppercase tracking-[0.3em]">ISBN</label>
                        <input 
                          type="text" value={formData.isbn}
                          onChange={(e) => setFormData({...formData, isbn: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-primary transition-all font-bold text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[8px] font-black text-slate-500 mb-2 uppercase tracking-[0.3em]">PAGES</label>
                        <input 
                          type="number" value={formData.pages}
                          onChange={(e) => setFormData({...formData, pages: parseInt(e.target.value) || 0})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-primary transition-all font-bold text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 pt-8">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      type="button" onClick={() => setIsModalOpen(false)}
                      className="flex-1 py-4 bg-white/5 text-slate-500 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:text-white transition-all border border-white/5"
                    >
                      Abort_Process
                    </button>
                    <button 
                      type="submit" 
                      className="flex-1 py-4 bg-primary text-black rounded-2xl text-[9px] font-black uppercase tracking-widest hover:shadow-[0_0_30px_#10B98150] transition-all flex items-center justify-center gap-2"
                    >
                      <Save className="w-3 h-3" /> Save_to_Library
                    </button>
                    <button 
                      type="submit" 
                      className="flex-1 py-4 bg-white text-black rounded-2xl text-[9px] font-black uppercase tracking-widest hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all"
                    >
                      Commit_Changes
                    </button>
                  </div>
                  
                  <div className="pt-4 border-t border-white/5">
                    <button 
                      type="button" 
                      onClick={() => {
                        setIsModalOpen(false);
                        setSelectedBook(null);
                        setView('home');
                      }}
                      className="w-full py-4 bg-white/5 text-slate-400 border border-white/5 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:text-primary hover:border-primary/30 transition-all flex items-center justify-center gap-3 group"
                    >
                      <Home className="w-4 h-4 group-hover:scale-110 transition-transform" /> 
                      Return_to_Main_Portal
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}

        {showSyllabusModal && selectedBook && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="glass-panel border border-white/10 rounded-[3rem] p-12 max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative"
            >
              <button 
                onClick={() => {
                  setShowSyllabusModal(false);
                  setExpandedUnitId(null);
                  setNewLessonTitle('');
                  setNewLessonVideoUrl('');
                  setNewLessonContent('');
                  setSelectedUnits([]);
                  setSelectedLessons([]);
                }}
                className="absolute top-10 right-10 w-12 h-12 bg-white/5 text-white/30 rounded-2xl flex items-center justify-center hover:text-red-400 transition-colors border border-white/5"
              >
                &times;
              </button>
              
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-primary/20 text-primary rounded-2xl flex items-center justify-center border border-primary/20">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-4xl font-display font-black text-white italic uppercase tracking-tighter leading-none">{selectedBook.title}</h2>
                    <div className="mt-3 flex items-center gap-4">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em]">Curriculum Expansion Node</p>
                      <div className="h-4 w-[1px] bg-white/10 hidden sm:block"></div>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${getBookProgress(selectedBook.id, selectedBook.units)}%` }}
                            className="h-full bg-primary"
                          />
                        </div>
                        <span className="text-[9px] font-black text-primary uppercase tracking-widest">
                          {Math.round(getBookProgress(selectedBook.id, selectedBook.units))}% COMPLETED
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {isStaff && (selectedUnits.length > 0 || selectedLessons.length > 0) && (
                    <button 
                      onClick={() => setShowBulkDeleteConfirm(true)}
                      className="px-6 py-3 bg-red-500/20 text-red-500 border border-red-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" /> Delete Selected ({selectedUnits.length + selectedLessons.length})
                    </button>
                  )}
                  {isStaff && (
                    <button 
                      onClick={addUnit}
                      className="px-6 py-3 bg-primary/20 text-primary border border-primary/20 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-black transition-all flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" /> Add Unit
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                {(selectedBook.units || GLOBAL_SYLLABUS).map((unit, idx) => (
                  <div 
                    key={idx} 
                    className={`p-8 border rounded-3xl transition-all cursor-pointer ${
                      expandedUnitId === unit.id 
                        ? 'border-primary/50 bg-primary/5 shadow-[0_0_30px_#10B98110]' 
                        : 'border-white/5 bg-white/5 hover:border-white/20'
                    }`}
                    onClick={() => setExpandedUnitId(expandedUnitId === unit.id ? null : unit.id)}
                  >
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-3">
                           {isStaff && (
                             <button
                               onClick={(e) => {
                                 e.stopPropagation();
                                 setSelectedUnits(prev => 
                                   prev.includes(unit.id) ? prev.filter(id => id !== unit.id) : [...prev, unit.id]
                                 );
                               }}
                               className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                                 selectedUnits.includes(unit.id)
                                   ? 'bg-red-500 border-red-500 text-white'
                                   : 'bg-white/5 border-white/10 text-transparent hover:border-red-500/50'
                               }`}
                             >
                               <Trash2 className="w-3 h-3" />
                             </button>
                           )}
                           <h3 className={`text-xs font-black uppercase tracking-[0.2em] flex items-center gap-4 ${selectedUnits.includes(unit.id) ? 'text-red-500' : 'text-primary'}`}>
                             {unit.title}
                           </h3>
                           {unit.lessons.length > 0 && unit.lessons.every(l => (completedLessons[selectedBook.id] || []).includes(l.id)) && (
                             <div className="px-2 py-0.5 bg-primary/20 text-primary border border-primary/20 rounded-md text-[8px] font-black uppercase">
                               UNIT_MASTERED
                             </div>
                           )}
                        </div>
                        <div className="flex items-center gap-4">
                          {isStaff && (
                            <div className="flex gap-2">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditingUnitIdx(idx);
                                  setUnitDraft({ title: unit.title, summary: unit.summary });
                                }}
                                className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors"
                              >
                                <Edit3 className="w-3 h-3" />
                              </button>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setUnitToDelete(idx);
                                }}
                                className="p-2 hover:bg-red-500/10 rounded-lg text-red-500 transition-colors"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                          <span className="text-primary font-black text-2xl leading-none">{expandedUnitId === unit.id ? '−' : '+'}</span>
                        </div>
                      </div>

                    {editingUnitIdx === idx ? (
                      <div className="space-y-4 pt-4 border-t border-white/5" onClick={(e) => e.stopPropagation()}>
                        <input 
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white"
                          value={unitDraft.title}
                          onChange={(e) => setUnitDraft({...unitDraft, title: e.target.value})}
                          placeholder="Unit Title"
                        />
                        <textarea 
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white resize-none"
                          value={unitDraft.summary}
                          onChange={(e) => setUnitDraft({...unitDraft, summary: e.target.value})}
                          placeholder="Unit Summary"
                          rows={2}
                        />
                        <div className="flex gap-2">
                          <button onClick={saveUnitEdit} className="bg-primary text-black px-4 py-2 rounded-lg text-[10px] font-black uppercase">Save</button>
                          <button onClick={() => setEditingUnitIdx(null)} className="bg-white/5 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase">Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-slate-400 text-xs font-medium leading-relaxed">
                        {unit.summary}
                      </p>
                    )}
                    
                    <AnimatePresence>
                      {expandedUnitId === unit.id && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden border-t border-white/5 pt-8 mt-8"
                        >
                          <div className="space-y-6">
                            {unit.lessons.map((lesson, tidx) => (
                              <div key={tidx} className={`bg-black/40 p-6 rounded-2xl border transition-all ${
                                selectedLessons.includes(lesson.id)
                                  ? 'border-red-500/50 bg-red-500/5'
                                  : (completedLessons[selectedBook.id] || []).includes(lesson.id) 
                                    ? 'border-primary/30 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]' 
                                    : 'border-white/5'
                              }`}>
                                <h4 className="font-black text-white text-[10px] uppercase tracking-widest mb-4 flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    {isStaff && (
                                      <button
                                        onClick={() => setSelectedLessons(prev => 
                                          prev.includes(lesson.id) ? prev.filter(id => id !== lesson.id) : [...prev, lesson.id]
                                        )}
                                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                                          selectedLessons.includes(lesson.id)
                                            ? 'bg-red-500 border-red-500 text-white'
                                            : 'bg-white/5 border-white/10 text-transparent hover:border-red-500/50'
                                        }`}
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </button>
                                    )}
                                    <button 
                                      onClick={() => toggleLessonCompletion(selectedBook.id, lesson.id)}
                                      className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${
                                        (completedLessons[selectedBook.id] || []).includes(lesson.id)
                                          ? 'bg-primary border-primary text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                                          : 'bg-white/5 border-white/10 text-white/10 hover:border-primary/50 hover:text-primary/50'
                                      }`}
                                      title={(completedLessons[selectedBook.id] || []).includes(lesson.id) ? "Mark as Incomplete" : "Mark as Completed"}
                                    >
                                      <CheckCircle2 className="w-3.5 h-3.5" />
                                    </button>
                                    <div className="flex flex-col">
                                      <span className={`transition-colors ${(completedLessons[selectedBook.id] || []).includes(lesson.id) ? 'text-primary' : 'text-white'}`}>
                                        {lesson.title}
                                      </span>
                                      {(completedLessons[selectedBook.id] || []).includes(lesson.id) && (
                                        <span className="text-[7px] text-primary/60 font-black tracking-widest mt-0.5">LECTURE_MASTERED</span>
                                      )}
                                    </div>
                                    {lesson.videoUrl && (
                                      <a 
                                        href={lesson.videoUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="ml-2 flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-lg text-[8px] font-black uppercase hover:bg-primary hover:text-black transition-all"
                                      >
                                        <Video className="w-2.5 h-2.5" /> WATCH_VIDEO
                                      </a>
                                    )}
                                  </div>
                                  {isStaff && (
                                    <div className="flex gap-2">
                                      <button 
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setEditingLessonId({ unitIdx: idx, lessonId: lesson.id });
                                          setLessonDraft({ 
                                            title: lesson.title, 
                                            content: lesson.content || '', 
                                            videoUrl: lesson.videoUrl || '' 
                                          });
                                        }}
                                        className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors"
                                      >
                                        <Edit3 className="w-3 h-3" />
                                      </button>
                                      <button 
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setLessonToDelete({ unitIdx: idx, lessonId: lesson.id });
                                        }}
                                        className="p-2 hover:bg-red-500/10 rounded-lg text-red-500 transition-colors"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </button>
                                    </div>
                                  )}
                                </h4>

                                {editingLessonId?.unitIdx === idx && editingLessonId?.lessonId === lesson.id ? (
                                  <div className="space-y-4">
                                    <input 
                                      className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-[10px] text-white"
                                      value={lessonDraft.title}
                                      onChange={(e) => setLessonDraft({...lessonDraft, title: e.target.value})}
                                      placeholder="Lesson Title"
                                    />
                                    <textarea 
                                      className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-[10px] text-white resize-none"
                                      value={lessonDraft.content}
                                      onChange={(e) => setLessonDraft({...lessonDraft, content: e.target.value})}
                                      placeholder="Lesson Content"
                                      rows={3}
                                    />
                                    <input 
                                      className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-[10px] text-white"
                                      value={lessonDraft.videoUrl}
                                      onChange={(e) => setLessonDraft({...lessonDraft, videoUrl: e.target.value})}
                                      placeholder="Video URL"
                                    />
                                    <div className="flex gap-2">
                                      <button onClick={saveLessonEdit} className="bg-primary text-black px-4 py-2 rounded-lg text-[9px] font-black uppercase">Save</button>
                                      <button onClick={() => setEditingLessonId(null)} className="bg-white/5 text-white px-4 py-2 rounded-lg text-[9px] font-black uppercase">Cancel</button>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    {lesson.content && (
                                      <div className="markdown-body prose prose-invert prose-xs max-w-none text-slate-400 mb-2 leading-relaxed font-medium">
                                        <Markdown>{lesson.content}</Markdown>
                                      </div>
                                    )}
                                  </>
                                )}
                              </div>
                            ))}
                            <div className="mt-6 flex flex-col gap-3">
                              <div className="flex flex-col sm:flex-row gap-3">
                                <div className="relative flex-1">
                                  <input 
                                    className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-[10px] font-black uppercase tracking-widest text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/10 pr-12"
                                    value={newLessonTitle}
                                    onChange={(e) => setNewLessonTitle(e.target.value)}
                                    placeholder="LESSON_TITLE_OR_DICTATE..."
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') {
                                        e.stopPropagation();
                                        addLesson(idx);
                                      }
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      startVoiceDictation('lesson', (text) => setNewLessonTitle(text));
                                    }}
                                    className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all ${
                                      listeningTarget === 'lesson' ? 'bg-primary text-black animate-pulse shadow-[0_0_15px_#10B981]' : 'bg-white/5 text-white/40 hover:text-primary'
                                    }`}
                                    title={listeningTarget === 'lesson' ? "Listening..." : "Dictate Lesson Title"}
                                  >
                                    {listeningTarget === 'lesson' ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                                  </button>
                                </div>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    addLesson(idx);
                                  }}
                                  className="px-8 py-4 bg-primary text-black rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 shrink-0"
                                >
                                  <Plus className="w-4 h-4" /> ADD_NODE
                                </button>
                              </div>
                              <textarea 
                                className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-[10px] font-black uppercase tracking-widest text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/10 resize-none font-mono"
                                value={newLessonContent}
                                onChange={(e) => setNewLessonContent(e.target.value)}
                                placeholder="LESSON_PROSE_MD_SUPPORTED..."
                                rows={3}
                                onClick={(e) => e.stopPropagation()}
                              />
                              <input 
                                className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-[10px] font-black uppercase tracking-widest text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/10"
                                value={newLessonVideoUrl}
                                onChange={(e) => setNewLessonVideoUrl(e.target.value)}
                                placeholder="YOUTUBE_VIDEO_URL (OPTIONAL)..."
                                onClick={(e) => e.stopPropagation()}
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              <div className="mt-12 flex justify-center">
                <button 
                  onClick={() => {
                    setShowSyllabusModal(false);
                    setExpandedUnitId(null);
                    setNewLessonTitle('');
                    setNewLessonVideoUrl('');
                    setNewLessonContent('');
                    setSelectedUnits([]);
                    setSelectedLessons([]);
                  }}
                  className="px-12 py-4 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary transition-all"
                >
                  Exit Node
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Global Delete Confirmation Modal */}
        {(deleteConfirmId || unitToDelete !== null || lessonToDelete || showBulkDeleteConfirm) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass-panel border border-red-500/20 bg-red-500/5 rounded-[3rem] p-12 max-w-md w-full text-center"
            >
              <div className="w-20 h-20 bg-red-500/20 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-red-500/20 scale-110 shadow-[0_0_50px_rgba(239,68,68,0.2)]">
                <ShieldAlert className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-display font-black text-white italic uppercase tracking-tighter mb-4">Security Challenge</h2>
              <p className="text-slate-400 text-sm font-medium leading-relaxed mb-10 tracking-tight">
                {showBulkDeleteConfirm 
                  ? `You are about to permanently purge ${selectedUnits.length} units and ${selectedLessons.length} lessons from the archives. This action is IRREVERSIBLE. Proceed?`
                  : "You are about to permanently terminate a resource segment from the archives. This action is IRREVERSIBLE. Do you wish to proceed?"}
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => {
                    setDeleteConfirmId(null);
                    setUnitToDelete(null);
                    setLessonToDelete(null);
                    setShowBulkDeleteConfirm(false);
                  }}
                  className="flex-1 py-5 bg-white/5 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/5 hover:bg-white/10 transition-all"
                >
                  ABORT_CMD
                </button>
                <button 
                  onClick={() => {
                    if (showBulkDeleteConfirm) handleBulkDelete();
                    else if (deleteConfirmId) confirmDelete();
                    else if (unitToDelete !== null) handleDeleteUnit(unitToDelete);
                    else if (lessonToDelete) handleDeleteLesson(lessonToDelete.unitIdx, lessonToDelete.lessonId);
                  }}
                  className="flex-1 py-5 bg-red-500 text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-400 transition-all shadow-[0_0_30px_rgba(239,68,68,0.3)]"
                >
                  CONFIRM_DELETE
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      </div>
      {/* Notification Layer */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-12 right-12 z-[9999]"
          >
            <div className={`
              px-8 py-5 rounded-3xl backdrop-blur-2xl border flex items-center gap-5 shadow-2xl
              ${notification.type === 'error' ? 'bg-red-500/10 border-red-500/40 text-red-400' : 
                notification.type === 'success' ? 'bg-primary/10 border-primary/40 text-primary' : 
                'bg-white/10 border-white/40 text-white'}
            `}>
              <div className={`w-3 h-3 rounded-full animate-pulse ${
                notification.type === 'error' ? 'bg-red-500 shadow-[0_0_15px_#ef444450]' : 
                notification.type === 'success' ? 'bg-primary shadow-[0_0_15px_#10B98150]' : 
                'bg-white shadow-[0_0_15px_#ffffff50]'
              }`}></div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] block opacity-50 mb-1">
                  {notification.type === 'error' ? 'CRITICAL_ASSERTION_FAIL' : 
                   notification.type === 'success' ? 'SYSTEM_SYNC_SUCCESS' : 'ARCHIVE_NOTICE'}
                </span>
                <p className="text-[12px] font-black uppercase tracking-widest">{notification.message}</p>
              </div>
              <button 
                onClick={() => setNotification(null)}
                className="ml-4 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <div className="w-4 h-4 relative">
                  <div className="absolute inset-0 rotate-45 border-t-2 border-current"></div>
                  <div className="absolute inset-0 -rotate-45 border-t-2 border-current"></div>
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

