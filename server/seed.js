const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const User = require('./models/User');
const Course = require('./models/Course');
const Enrollment = require('./models/Enrollment');
const Quiz = require('./models/Quiz');
const QuizAttempt = require('./models/QuizAttempt');
const Certificate = require('./models/Certificate');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/lms_ai_db');
    console.log('[Seeder] Connected to MongoDB...');

    // Clear existing data
    await User.deleteMany();
    await Course.deleteMany();
    await Enrollment.deleteMany();
    await Quiz.deleteMany();
    await QuizAttempt.deleteMany();
    await Certificate.deleteMany();

    console.log('[Seeder] Cleared previous records.');

    // Create Default Users
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('password123', salt);

    const adminUser = await User.create({
      name: 'Alex Vance (Admin)',
      email: 'admin@lms.com',
      password: passwordHash,
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      bio: 'LMS Platform Super Administrator'
    });

    const instructorUser = await User.create({
      name: 'Dr. Sarah Connor',
      email: 'instructor@lms.com',
      password: passwordHash,
      role: 'instructor',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      bio: 'Senior AI Engineer & Full-Stack Educator with 10+ years experience.',
      skills: ['React', 'Node.js', 'Python', 'Gemini AI', 'RAG Architecture']
    });

    const studentUser = await User.create({
      name: 'David Miller',
      email: 'student@lms.com',
      password: passwordHash,
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      bio: 'Passionate developer learning AI integration & web development.'
    });

    console.log('[Seeder] Users created successfully (admin@lms.com, instructor@lms.com, student@lms.com).');

    // Create Sample Courses
    const course1 = await Course.create({
      title: 'Full-Stack Web Development with AI & React',
      description: 'Master modern frontend & backend development integrated with Gemini AI models, RAG tutors, and automated quiz generation.',
      thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
      instructorId: instructorUser._id,
      instructorName: instructorUser.name,
      category: 'Web Development',
      level: 'intermediate',
      price: 49.99,
      status: 'published',
      averageRating: 4.9,
      totalReviews: 12,
      ratings: [
        {
          userId: studentUser._id,
          userName: studentUser.name,
          userAvatar: studentUser.avatar,
          rating: 5,
          review: 'Outstanding course! The AI chatbot tutor helped me clear all my concepts instantly!'
        }
      ],
      modules: [
        {
          title: 'Module 1: Introduction to AI-Driven Web Applications',
          lessons: [
            {
              title: 'Lesson 1.1: Platform Overview & System Setup',
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
              duration: '08:45',
              transcript: 'Welcome to Full-Stack AI Web Development. In this video, we setup our Vite React environment, Node Express backend, and link Google Gemini API for intelligent chatbot tutors.',
              aiSummary: 'Overview of building modern full-stack web apps integrated with AI features like automated quiz generation and interactive RAG tutors.',
              resources: [
                { title: 'Course Architecture Diagram PDF', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'pdf' }
              ]
            },
            {
              title: 'Lesson 1.2: State Management & Component Architecture',
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
              duration: '12:30',
              transcript: 'Understanding React context, custom hooks, and state management for real-time video progress tracking and floating chatbot widgets.',
              aiSummary: 'Deep dive into React context providers, hooks, and clean state handling.',
              resources: []
            }
          ]
        },
        {
          title: 'Module 2: RAG Architecture & Gemini API Integration',
          lessons: [
            {
              title: 'Lesson 2.1: Building the RAG AI Tutor Widget',
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
              duration: '15:10',
              transcript: 'Retrieval Augmented Generation (RAG) allows AI chatbots to reference course syllabus and lesson transcripts accurately without hallucination.',
              aiSummary: 'Explores how to inject course transcript context into AI prompts for accurate tutor responses.',
              resources: [
                { title: 'Gemini RAG Prompt Guide PDF', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'pdf' }
              ]
            }
          ]
        }
      ]
    });

    const course2 = await Course.create({
      title: 'Python for Data Science & AI Prompt Engineering',
      description: 'Learn Python fundamentals, data visualization with Pandas, and advanced prompt engineering strategies for Gemini & OpenAI models.',
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
      instructorId: instructorUser._id,
      instructorName: instructorUser.name,
      category: 'Data Science',
      level: 'beginner',
      price: 0, // Free course
      status: 'published',
      averageRating: 4.7,
      totalReviews: 8,
      modules: [
        {
          title: 'Module 1: Python Essentials',
          lessons: [
            {
              title: 'Lesson 1.1: Data Types & Logic',
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
              duration: '10:00',
              transcript: 'Python basics covering variables, data structures, loops, functions, and structured JSON output for AI generators.',
              aiSummary: 'Fundamental Python concepts and data parsing routines for AI applications.',
              resources: []
            }
          ]
        }
      ]
    });

    const course3 = await Course.create({
      title: 'Modern UI/UX Design & Glassmorphism Systems',
      description: 'Design beautiful modern web dashboards with dark mode, smooth micro-animations, accessible color palettes, and glassmorphism elements.',
      thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
      instructorId: instructorUser._id,
      instructorName: instructorUser.name,
      category: 'Design',
      level: 'intermediate',
      price: 29.99,
      status: 'published',
      averageRating: 4.95,
      totalReviews: 15,
      modules: [
        {
          title: 'Module 1: Visual Excellence & CSS Tokens',
          lessons: [
            {
              title: 'Lesson 1.1: Creating Glassmorphism & Micro-animations',
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
              duration: '14:20',
              transcript: 'How to craft glassmorphic cards, linear gradient borders, backdrop blur filters, and accessible contrast ratios.',
              aiSummary: 'CSS techniques for modern dark glass themes and vibrant UI interfaces.',
              resources: []
            }
          ]
        }
      ]
    });

    console.log('[Seeder] Sample courses created.');

    // Create Sample Quiz for Course 1
    const lesson1Id = course1.modules[0].lessons[0]._id.toString();
    const quiz1 = await Quiz.create({
      courseId: course1._id,
      lessonId: lesson1Id,
      title: 'Module 1 Assessment: React & AI Basics',
      createdBy: instructorUser._id,
      questions: [
        {
          question: 'What is the role of RAG (Retrieval Augmented Generation) in LMS AI Chatbots?',
          options: [
            'RAG injects course transcripts into prompt context to provide accurate answers',
            'RAG compiles React components into HTML files',
            'RAG generates random CSS colors',
            'RAG encrypts user passwords in MongoDB'
          ],
          correctAnswer: 0,
          explanation: 'RAG supplies relevant course context to the AI model so answers are accurate and hallucination-free.'
        },
        {
          question: 'Which HTTP header is standard for JWT authentication in Express APIs?',
          options: [
            'Authorization: Bearer <token>',
            'X-Custom-Token: <token>',
            'Content-Type: token',
            'Accept: application/jwt'
          ],
          correctAnswer: 0,
          explanation: 'The standard Bearer token scheme is used in Authorization HTTP headers.'
        }
      ]
    });

    // Create Sample Enrollment & Progress for Student
    await Enrollment.create({
      studentId: studentUser._id,
      courseId: course1._id,
      progress: [
        { lessonId: lesson1Id, completed: true, completedAt: new Date() }
      ],
      overallProgress: 50,
      certificateIssued: false
    });

    // Update Student enrolledCourses array
    studentUser.enrolledCourses.push(course1._id);
    await studentUser.save();

    // Update Course enrolledStudents array
    course1.enrolledStudents.push(studentUser._id);
    await course1.save();

    console.log('[Seeder] Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('[Seeder] Error during seed:', error);
    process.exit(1);
  }
};

seedData();
