const Course = require('../models/Course');
const User = require('../models/User');

// @desc Get all courses with filtering & search
// @route GET /api/courses
const getCourses = async (req, res) => {
  try {
    const { category, level, price, search, status } = req.query;
    let query = {};

    if (status) {
      query.status = status;
    } else {
      query.status = 'published';
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    if (level && level !== 'All') {
      query.level = level.toLowerCase();
    }

    if (price === 'free') {
      query.price = 0;
    } else if (price === 'paid') {
      query.price = { $gt: 0 };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    const courses = await Course.find(query).sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get single course by ID
// @route GET /api/courses/:id
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Create new course
// @route POST /api/courses
const createCourse = async (req, res) => {
  try {
    const { title, description, thumbnail, category, level, price, status, modules, quizzes } = req.body;

    const course = new Course({
      title,
      description,
      thumbnail: thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
      instructorId: req.user._id,
      instructorName: req.user.name || 'Instructor',
      category: category || 'Web Development',
      level: level || 'beginner',
      price: price !== undefined ? Number(price) : 0,
      status: status || 'published',
      modules: modules || [],
      quizzes: quizzes || []
    });

    const createdCourse = await course.save();
    res.status(201).json(createdCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update existing course
// @route PUT /api/courses/:id
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.instructorId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to edit this course' });
    }

    const { title, description, thumbnail, category, level, price, status, modules, quizzes } = req.body;

    if (title) course.title = title;
    if (description) course.description = description;
    if (thumbnail) course.thumbnail = thumbnail;
    if (category) course.category = category;
    if (level) course.level = level;
    if (price !== undefined) course.price = price;
    if (status) course.status = status;
    if (modules) course.modules = modules;
    if (quizzes) course.quizzes = quizzes;

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete course
// @route DELETE /api/courses/:id
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.instructorId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this course' });
    }

    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Add rating & review
// @route POST /api/courses/:id/ratings
const addRating = async (req, res) => {
  try {
    const { rating, review } = req.body;
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const alreadyReviewed = course.ratings.find(
      (r) => r.userId.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      alreadyReviewed.rating = rating;
      alreadyReviewed.review = review;
    } else {
      course.ratings.push({
        userId: req.user._id,
        userName: req.user.name,
        userAvatar: req.user.avatar,
        rating: Number(rating),
        review
      });
    }

    course.totalReviews = course.ratings.length;
    const sumRatings = course.ratings.reduce((acc, item) => item.rating + acc, 0);
    course.averageRating = Number((sumRatings / course.ratings.length).toFixed(1));

    await course.save();
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  addRating
};
