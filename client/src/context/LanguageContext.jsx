import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const TRANSLATIONS = {
  en: {
    // Navigation & Common
    home: 'Home',
    browseCourses: 'Browse Courses',
    myLearning: 'My Learning',
    resources: 'Resources',
    howToUse: 'How to Use ❓',
    signIn: 'Sign In',
    getStarted: 'Get Started ✨',
    searchPlaceholder: 'Search courses...',
    welcomeBack: 'Welcome back',
    dashboard: 'Dashboard',
    curriculum: 'Curriculum',
    analytics: 'Analytics',
    students: 'Students',
    aiInsights: 'AI Insights',
    settings: 'Settings',
    launchAiTutor: 'Launch AI Tutor',
    codeSandbox: 'Code Sandbox 💻',
    virtualClassroom: 'Virtual Classroom 🎥',

    // Home Page
    masterSkill: 'Master Any Skill with your AI Tutor',
    revolutionizingEdu: 'Revolutionizing Education',
    heroSubtitle: 'Personalized learning paths, 24/7 intelligent assistance, and interactive curriculum designed by world-class experts.',
    exploreCategories: 'Explore Top Categories',
    featuredCourses: 'Featured AI Courses',
    studentExperiences: 'Student Experiences',
    viewAllCourses: 'View All Courses 🚀',

    // Courses Page
    allCategories: 'All Categories',
    allLevels: 'All Levels',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    enrollNow: 'Enroll Now',
    viewDetails: 'View Details',
    free: 'Free',

    // Student Dashboard
    weeklyGoal: 'weekly goal',
    courseEfficiency: 'Course Efficiency Boosted',
    upcomingDeadlines: 'Upcoming Deadlines',
    aiRecommendations: 'AI Recommendations',
    peerLeaderboard: 'Peer Leaderboard',
    completed: 'Completed',
    inProgress: 'In Progress',

    // Instructor Dashboard
    instructorPortal: 'Instructor Portal',
    createCourse: 'Create New Course',
    openCourseStudio: 'Open Course Studio 🎓',
    manageEdit: 'Manage & Edit Course',
    totalStudents: 'Total Students',
    totalRevenue: 'Total Revenue',
    activeCourses: 'Active Courses',
    publishCourse: 'Publish Course Live 🚀',

    // Learning Portal & Quiz
    courseCurriculum: 'Course Curriculum',
    aiSummary: 'AI Summary',
    aiTutor: 'AI Tutor',
    notes: 'Notes',
    quiz: 'Quiz 🧪',
    submitQuiz: 'Submit Quiz & Check Score 🎯',
    viewCertificate: 'View Certificate 📜',
    certLockedQuiz: 'Cert Locked (Pass Quiz 40%+)',
    certLockedLessons: 'Cert Locked (Complete Lessons)',
    passThresholdMsg: 'Complete all questions. Score 40% or higher to unlock your verified course Certificate!',
    congratsUnlocked: 'Congratulations! You passed the 40% threshold. Your Certificate is unlocked!'
  },
  si: {
    // Navigation & Common
    home: 'මුල් පිටුව',
    browseCourses: 'පාඨමාලා නරඹන්න',
    myLearning: 'මගේ අධ්‍යයනය',
    resources: 'සම්පත්',
    howToUse: 'භාවිතා කරන්නේ කෙසේද ❓',
    signIn: 'පිවිසෙන්න',
    getStarted: 'ආරම්භ කරන්න ✨',
    searchPlaceholder: 'පාඨමාලා සොයන්න...',
    welcomeBack: 'නැවත සාදරයෙන් පිළිගනිමු',
    dashboard: 'පාලක පුවරුව',
    curriculum: 'විෂයමාලාව',
    analytics: 'විශ්ලේෂණ',
    students: 'සිසුන්',
    aiInsights: 'AI තොරතුරු',
    settings: 'සිටුවම්',
    launchAiTutor: 'AI උපදේශක ආරම්භ කරන්න',
    codeSandbox: 'කේත පරිසරය 💻',
    virtualClassroom: 'අතථ්‍ය පන්ති කාමරය 🎥',

    // Home Page
    masterSkill: 'ඔබේ AI උපදේශක සමඟ ඕනෑම කුසලතාවක් ප්‍රගුණ කරන්න',
    revolutionizingEdu: 'අධ්‍යාපනයේ නව විප්ලවය',
    heroSubtitle: 'පුද්ගලීකරණය කළ අධ්‍යයන මාර්ග, 24/7 බුද්ධිමත් සහාය සහ ලෝක මට්ටමේ විශේෂඥයින් විසින් සකස් කරන ලද පාඨමාලා.',
    exploreCategories: 'ප්‍රධාන විෂය ක්ෂේත්‍ර නරඹන්න',
    featuredCourses: 'විශේෂිත AI පාඨමාලා',
    studentExperiences: 'සිසුන්ගේ අත්දැකීම්',
    viewAllCourses: 'සියලුම පාඨමාලා නරඹන්න 🚀',

    // Courses Page
    allCategories: 'සියලුම ක්ෂේත්‍ර',
    allLevels: 'සියලුම මට්ටම්',
    beginner: 'ආරම්භක',
    intermediate: 'මධ්‍යම',
    advanced: 'උසස්',
    enrollNow: 'දැනටම ලියාපදිංචි වන්න',
    viewDetails: 'විස්තර බලන්න',
    free: 'නොමිලේ',

    // Student Dashboard
    weeklyGoal: 'සතිපතා ඉලක්කය',
    courseEfficiency: 'පාඨමාලා කාර්යක්ෂමතාව ඉහළට',
    upcomingDeadlines: 'ඉදිරි අවසාන දිනයන්',
    aiRecommendations: 'AI නිර්දේශිත පාඨමාලා',
    peerLeaderboard: 'ශ්‍රේණිගත කිරීම් පුවරුව',
    completed: 'අවසන් කළා',
    inProgress: 'සිදුකෙරෙමින් පවතී',

    // Instructor Dashboard
    instructorPortal: 'දේශක පෝර්ටලය',
    createCourse: 'නව පාඨමාලාවක් සාදන්න',
    openCourseStudio: 'Course Studio එක විවෘත කරන්න 🎓',
    manageEdit: 'පාඨමාලාව කළමනාකරණය හා සංස්කරණය',
    totalStudents: 'මුළු සිසුන් ගණන',
    totalRevenue: 'මුළු ආදායම',
    activeCourses: 'සක්‍රිය පාඨමාලා',
    publishCourse: 'සජීවීව ප්‍රකාශයට පත් කරන්න 🚀',

    // Learning Portal & Quiz
    courseCurriculum: 'පාඨමාලා විෂයමාලාව',
    aiSummary: 'AI සාරාංශය',
    aiTutor: 'AI උපදේශක',
    notes: 'සටහන්',
    quiz: 'ප්‍රශ්නාවලිය 🧪',
    submitQuiz: 'පිළිතුරු යොමුකර ලකුණු බලන්න 🎯',
    viewCertificate: 'සහතිකය නරඹන්න 📜',
    certLockedQuiz: 'සහතිකය Lock වී ඇත (Quiz 40%+ ලකුණු ගන්න)',
    certLockedLessons: 'සහතිකය Lock වී ඇත (පාඩම් අවසන් කරන්න)',
    passThresholdMsg: 'සියලු ප්‍රශ්නවලට පිළිතුරු සපයන්න. සහතිකය ලබා ගැනීමට 40% කට වඩා ලකුණු ලබාගන්න!',
    congratsUnlocked: 'සුභ පැතුම්! ඔබ 40% සීමාව සමත් විය. ඔබේ සහතිකය Unlock විය!'
  },
  ta: {
    // Navigation & Common
    home: 'முகப்பு',
    browseCourses: 'பாடப்பிரிவுகளைப் பார்க்கவும்',
    myLearning: 'என் கற்றல்',
    resources: 'வளங்கள்',
    howToUse: 'எப்படி பயன்படுத்துவது ❓',
    signIn: 'உள்நுழைய',
    getStarted: 'தொடங்கவும் ✨',
    searchPlaceholder: 'பாடப்பிரிவுகளைத் தேடுங்கள்...',
    welcomeBack: 'மீண்டும் நல்வரவு',
    dashboard: 'முகப்பு பலகை',
    curriculum: 'பாடத்திட்டம்',
    analytics: 'பகுப்பாய்வு',
    students: 'மாணவர்கள்',
    aiInsights: 'AI தகவல்கள்',
    settings: 'அமைப்புகள்',
    launchAiTutor: 'AI ஆசிரியரைத் தொடங்கு',
    codeSandbox: 'குறியீட்டு களஞ்சியம் 💻',
    virtualClassroom: 'மெய்நிகர் வகுப்பறை 🎥',

    // Home Page
    masterSkill: 'உங்கள் AI ஆசிரியருடன் எந்த திறமையையும் கற்றுக்கொள்ளுங்கள்',
    revolutionizingEdu: 'கல்வியின் புதிய புரட்சி',
    heroSubtitle: 'தனிப்பயனாக்கப்பட்ட கற்றல் வழிகள், 24/7 நுண்ணறிவு உதவி மற்றும் உலகத் தரம் வாய்ந்த வல்லுநர்களின் பாடத்திட்டம்.',
    exploreCategories: 'முக்கிய பிரிவுகளை ஆராயுங்கள்',
    featuredCourses: 'சிறப்பு AI பாடப்பிரிவுகள்',
    studentExperiences: 'மாணவர் அனுபவங்கள்',
    viewAllCourses: 'அனைத்து பாடப்பிரிவுகளையும் பார்க்கவும் 🚀',

    // Courses Page
    allCategories: 'அனைத்து பிரிவுகளும்',
    allLevels: 'அனைத்து நிலைகளும்',
    beginner: 'ஆரம்ப நிலை',
    intermediate: 'இடைநிலை',
    advanced: 'உயர் நிலை',
    enrollNow: 'இப்போதே சேருங்கள்',
    viewDetails: 'விவரங்களைப் பார்க்க',
    free: 'இலவசம்',

    // Student Dashboard
    weeklyGoal: 'வாராந்திர இலக்கு',
    courseEfficiency: 'கற்றல் திறன் அதிகரித்துள்ளது',
    upcomingDeadlines: 'வரவிருக்கும் காலக்கெடுகள்',
    aiRecommendations: 'AI பரிந்துரைகள்',
    peerLeaderboard: 'மாணவர் தரவரிசை',
    completed: 'முடிந்தது',
    inProgress: 'நடைபெறுகிறது',

    // Instructor Dashboard
    instructorPortal: 'ஆசிரியர் தளம்',
    createCourse: 'புதிய பாடப்பிரிவை உருவாக்கு',
    openCourseStudio: 'Course Studio ஐ திறக்கவும் 🎓',
    manageEdit: 'பாடப்பிரிவை நிர்வகிக்கவும் திருத்தவும்',
    totalStudents: 'மொத்த மாணவர்கள்',
    totalRevenue: 'மொத்த வருவாய்',
    activeCourses: 'செயலில் உள்ள பாடப்பிரிவுகள்',
    publishCourse: 'நேரலையாக வெளியிடு 🚀',

    // Learning Portal & Quiz
    courseCurriculum: 'பாடத்திட்டம்',
    aiSummary: 'AI சுருக்கம்',
    aiTutor: 'AI ஆசிரியர்',
    notes: 'குறிப்புகள்',
    quiz: 'வினாடி வினா 🧪',
    submitQuiz: 'சமர்ப்பித்து மதிப்பெண் பார்க்க 🎯',
    viewCertificate: 'சான்றிதழைப் பார்க்க 📜',
    certLockedQuiz: 'சான்றிதழ் பூட்டப்பட்டுள்ளது (Quiz 40%+ எடுக்கவும்)',
    certLockedLessons: 'சான்றிதழ் பூட்டப்பட்டுள்ளது (பாடங்களை முடிக்கவும்)',
    passThresholdMsg: 'அனைத்து கேள்விகளுக்கும் பதிலளிக்கவும். சான்றிதழைப் பெற 40% அல்லது அதற்கு மேல் எடுக்கவும்!',
    congratsUnlocked: 'வாழ்த்துகள்! நீங்கள் 40% தேர்ச்சி பெற்றீர்கள். உங்கள் சான்றிதழ் திறக்கப்பட்டது!'
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');

  const t = (key) => {
    return TRANSLATIONS[lang]?.[key] || TRANSLATIONS['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
