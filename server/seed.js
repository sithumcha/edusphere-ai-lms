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

    // Create Password Hash
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('password123', salt);

    // 1. Create Default Users
    const adminUser = await User.create({
      name: 'Alex Vance',
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
      bio: 'Passionate student learning AI engineering & full-stack development.'
    });

    console.log('[Seeder] Users created successfully (admin@lms.com, instructor@lms.com, student@lms.com).');

    // 2. Create Real Courses
    const course1 = await Course.create({
      title: 'Full-Stack Web Development with AI & React',
      description: 'Master modern frontend & backend development integrated with Gemini AI models, RAG tutors, and automated quiz generation.',
      thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
      instructorId: instructorUser._id,
      instructorName: instructorUser.name,
      category: 'Computer Science',
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
              transcript: 'Welcome to Full-Stack AI Web Development. In this video, we setup our Vite React environment, Node Express backend, and link Google Gemini API.',
              aiSummary: 'Overview of building modern full-stack web apps integrated with AI features.'
            },
            {
              title: 'Lesson 1.2: State Management & Component Architecture',
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
              duration: '12:30',
              transcript: 'Understanding React context, custom hooks, and state management.',
              aiSummary: 'Deep dive into React context providers and state handling.'
            }
          ]
        }
      ]
    });

    const course2 = await Course.create({
      title: 'Python for Data Science & AI Prompt Engineering',
      description: 'Learn Python fundamentals, data visualization with Pandas, and advanced prompt engineering strategies for Gemini models.',
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
      instructorId: instructorUser._id,
      instructorName: instructorUser.name,
      category: 'Data Science',
      level: 'beginner',
      price: 94.99,
      status: 'published',
      averageRating: 4.9,
      totalReviews: 18,
      modules: [
        {
          title: 'Module 1: Python Data Science Essentials',
          lessons: [
            {
              title: 'Lesson 1.1: Data Structures & Numpy Arrays',
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
              duration: '10:00',
              transcript: 'Python data science basics covering numpy arrays and matrices.',
              aiSummary: 'Fundamental Python concepts and data parsing routines.'
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
      averageRating: 4.8,
      totalReviews: 15,
      modules: [
        {
          title: 'Module 1: Visual Design Tokens',
          lessons: [
            {
              title: 'Lesson 1.1: Glassmorphic UI Systems',
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
              duration: '14:20',
              transcript: 'Crafting glassmorphic cards and micro-animations.',
              aiSummary: 'CSS techniques for modern dark glass themes.'
            }
          ]
        }
      ]
    });

    const course4 = await Course.create({
      title: 'AWS Certified Solutions Architect Associate 2026',
      description: 'Comprehensive cloud architecture masterclass covering EC2, S3, Lambda, VPCs, and serverless deployment pipelines.',
      thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
      instructorId: instructorUser._id,
      instructorName: instructorUser.name,
      category: 'Cloud Computing',
      level: 'advanced',
      price: 119.99,
      status: 'published',
      averageRating: 4.7,
      totalReviews: 24,
      modules: [
        {
          title: 'Module 1: AWS Core Cloud Infrastructure',
          lessons: [
            {
              title: 'Lesson 1.1: Virtual Private Cloud (VPC) Setup',
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
              duration: '18:30',
              transcript: 'Configuring AWS VPC subnets, route tables, and internet gateways.',
              aiSummary: 'AWS networking and cloud security fundamentals.'
            }
          ]
        }
      ]
    });

    const course5 = await Course.create({
      title: 'Strategic MBA Essentials: Business Strategy & Execution',
      description: 'Learn executive decision making, financial analysis, market positioning, and growth strategies for modern digital startups.',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
      instructorId: instructorUser._id,
      instructorName: instructorUser.name,
      category: 'Business',
      level: 'beginner',
      price: 79.99,
      status: 'published',
      averageRating: 4.85,
      totalReviews: 9,
      modules: [
        {
          title: 'Module 1: Corporate Strategy',
          lessons: [
            {
              title: 'Lesson 1.1: Market Entry & Competitive Advantage',
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
              duration: '15:40',
              transcript: 'Frameworks for strategic market positioning.',
              aiSummary: 'Business frameworks for corporate strategy execution.'
            }
          ]
        }
      ]
    });

    console.log('[Seeder] 5 Published Real Courses Created.');

    // 3. Create Real Quizzes
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
          explanation: 'RAG supplies relevant course context to the AI model so answers are accurate.'
        }
      ]
    });

    // 4. Create Real Enrollments for Student
    const enrollment1 = await Enrollment.create({
      studentId: studentUser._id,
      courseId: course1._id,
      progress: [
        { lessonId: lesson1Id, completed: true, completedAt: new Date() }
      ],
      overallProgress: 50,
      certificateIssued: false
    });

    const enrollment2 = await Enrollment.create({
      studentId: studentUser._id,
      courseId: course2._id,
      progress: [],
      overallProgress: 0,
      certificateIssued: false
    });

    // Add to User & Course schema references
    studentUser.enrolledCourses.push(course1._id, course2._id);
    await studentUser.save();

    course1.enrolledStudents.push(studentUser._id);
    await course1.save();

    course2.enrolledStudents.push(studentUser._id);
    await course2.save();

    // 5. Create Real Quiz Attempts for Student Analytics
    await QuizAttempt.create({
      studentId: studentUser._id,
      quizId: quiz1._id,
      score: 95,
      totalQuestions: 2,
      correctAnswers: 2,
      passed: true
    });

    // 6. Create Real Certificate for Student
    const certId = `CERT-${Date.now()}-8821`;
    await Certificate.create({
      certificateId: certId,
      studentId: studentUser._id,
      studentName: studentUser.name,
      courseId: course1._id,
      courseTitle: course1.title,
      instructorName: course1.instructorName,
      issueDate: new Date()
    });

    console.log('[Seeder] Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('[Seeder] Error during seed:', error);
    process.exit(1);
  }
};

seedData();
