require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const Joi = require('joi');
const mongoose = require('mongoose');
const multer = require('multer');

const app = express();
const port = process.env.PORT || 3001;

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.warn('WARNING: MONGODB_URI not found in environment variables. Using default local connection.');
}

mongoose.connect(mongoUri || 'mongodb://localhost:27017/pickleball', {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
  .then(() => {
    console.log('✓ Connected to MongoDB successfully');
    console.log('Database:', mongoose.connection.name);
  })
  .catch(err => {
    console.error('✗ MongoDB connection error:', err.message);
    if (err.message.includes('authentication failed')) {
      console.error('   Check your MongoDB username and password in the .env file');
    } else if (err.message.includes('ENOTFOUND')) {
      console.error('   Check your MongoDB connection string and network connection');
    }
  });

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.static(__dirname));
app.use('/images', express.static(path.join(__dirname, 'images')));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

const uploadMiddleware = upload.single('picture');

const products = [
  {
    id: 1,
    name: "Pro Paddle Set",
    image: "proPaddleSet.jpg",
    price: "$89.99",
    description: "High-performance paddle set for competitive players",
    skillLevel: "Advanced",
    detailedDescription: "Our Pro Paddle Set features carbon fiber construction for maximum power and control. Includes two premium paddles with cushioned grips and a carrying case."
  },
  {
    id: 2,
    name: "Pickleball Balls (6-pack)",
    image: "pickleBallz.jpg",
    price: "$24.99",
    description: "Durable outdoor pickleballs",
    skillLevel: "All Levels",
    detailedDescription: "USAPA approved outdoor pickleballs designed for durability and consistent bounce. Perfect for all weather conditions."
  },
  {
    id: 3,
    name: "Beginner Paddle",
    image: "beginPaddle.webp",
    price: "$45.99",
    description: "Perfect starter paddle for new players",
    skillLevel: "Beginner",
    detailedDescription: "Lightweight composite paddle with a large sweet spot, ideal for learning the game. Comfortable grip and excellent control."
  },
  {
    id: 4,
    name: "Court Shoes",
    image: "pickleShoes.webp",
    price: "$79.99",
    description: "Comfortable court shoes with great traction",
    skillLevel: "All Levels",
    detailedDescription: "Specially designed for pickleball with non-marking soles, lateral support, and cushioned insoles for all-day comfort."
  },
  {
    id: 5,
    name: "Paddle Cover",
    image: "paddleCover.jpeg",
    price: "$19.99",
    description: "Protective cover for your paddle",
    skillLevel: "All Levels",
    detailedDescription: "Neoprene paddle cover with zipper closure. Protects your paddle from scratches and weather damage."
  },
  {
    id: 6,
    name: "Grip Tape",
    image: "pickleGrip.webp",
    price: "$12.99",
    description: "Non-slip grip tape for better control",
    skillLevel: "All Levels",
    detailedDescription: "Moisture-wicking grip tape that provides superior traction. Easy to apply and replace. Pack of 3 rolls."
  },
  {
    id: 7,
    name: "Team Uniform",
    image: "pickleUni.jpg",
    price: "$39.99",
    description: "Comfortable team uniform for tournaments",
    skillLevel: "All Levels",
    detailedDescription: "Breathable, moisture-wicking fabric in various colors. Perfect for team play and tournaments. Available in S-XXL."
  },
  {
    id: 8,
    name: "Equipment Bag",
    image: "bagpick.webp",
    price: "$34.99",
    description: "Spacious bag to carry all your gear",
    skillLevel: "All Levels",
    detailedDescription: "Durable equipment bag with multiple compartments for paddles, balls, water bottles, and accessories. Adjustable shoulder strap."
  }
];

const courtSchema = new mongoose.Schema({
  name: String,
  address: String,
  hours: String,
  courts: String,
  amenities: String,
  phone: String,
  parking: String,
  fees: String,
  picture: String
});

const Court = mongoose.model('Court', courtSchema);

const groups = [
  {
    id: 1,
    name: "Tuesday Night Pickleball",
    location: "Community Center",
    time: "6-8 PM",
    day: "Tuesday",
    skillLevel: "All Levels",
    description: "Weekly community play",
    organizer: "Sarah Johnson",
    contactEmail: "sarah@tuesdaypickleball.com",
    averageAttendance: "15-20 players"
  },
  {
    id: 2,
    name: "Weekend Warriors",
    location: "Riverside Park",
    time: "Saturday 9 AM",
    day: "Saturday",
    skillLevel: "Intermediate",
    description: "Weekend morning games",
    organizer: "Mike Chen",
    contactEmail: "mike@weekendwarriors.com",
    averageAttendance: "10-15 players"
  },
  {
    id: 3,
    name: "Beginner's Club",
    location: "Sports Complex",
    time: "Thursday 7 PM",
    day: "Thursday",
    skillLevel: "Beginner",
    description: "Perfect for new players",
    organizer: "Emily Rodriguez",
    contactEmail: "emily@beginnersclub.com",
    averageAttendance: "8-12 players"
  },
  {
    id: 4,
    name: "Senior Pickleball",
    location: "Community Center",
    time: "Monday/Wednesday 10 AM",
    day: "Monday/Wednesday",
    skillLevel: "All Ages",
    description: "Senior-friendly games",
    organizer: "Robert Williams",
    contactEmail: "robert@seniorpickleball.com",
    averageAttendance: "12-18 players"
  }
];

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/health', (req, res) => {
  const mongoStatus = mongoose.connection.readyState;
  const mongoStates = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  
  res.json({
    status: 'ok',
    mongodb: {
      state: mongoStates[mongoStatus] || 'unknown',
      readyState: mongoStatus,
      connected: mongoStatus === 1
    },
    timestamp: new Date().toISOString()
  });
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.get('/api/courts', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.error('GET /api/courts - MongoDB not connected. State:', mongoose.connection.readyState);
      return res.status(503).json({ 
        error: 'Database not available',
        message: 'MongoDB connection is not established. Please check server logs.'
      });
    }

    const courts = await Court.find().maxTimeMS(10000);
    console.log(`GET /api/courts - Found ${courts.length} courts in database`);
    
    if (courts.length > 0) {
      console.log('First court from DB:', {
        _id: courts[0]._id,
        name: courts[0].name,
        address: courts[0].address,
        hasData: !!(courts[0].name && courts[0].address)
      });
    }
    
    const formattedCourts = courts.map(court => {
      try {
        return {
          id: court._id ? court._id.toString() : '',
          name: court.name || '',
          address: court.address || '',
          hours: court.hours || '',
          courts: court.courts || '',
          amenities: court.amenities || '',
          phone: court.phone || '',
          parking: court.parking || '',
          fees: court.fees || '',
          picture: court.picture || ''
        };
      } catch (mapErr) {
        console.error('Error formatting court:', mapErr);
        return null;
      }
    }).filter(court => court !== null);
    
    res.json(formattedCourts);
  } catch (err) {
    console.error('GET /api/courts error:', err);
    console.error('Error stack:', err.stack);
    
    if (err.name === 'MongoServerError' || err.name === 'MongoNetworkError') {
      return res.status(503).json({ 
        error: 'Database error',
        message: 'Unable to connect to database. Please try again later.'
      });
    }
    
    res.status(500).json({ 
      error: 'Server error',
      message: err.message || 'An unexpected error occurred'
    });
  }
});

app.get('/api/courts/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ 
        error: 'Database not available',
        message: 'MongoDB connection is not established.'
      });
    }

    const court = await Court.findById(req.params.id).maxTimeMS(10000);
    if (court) {
      res.json({
        id: court._id ? court._id.toString() : '',
        name: court.name || '',
        address: court.address || '',
        hours: court.hours || '',
        courts: court.courts || '',
        amenities: court.amenities || '',
        phone: court.phone || '',
        parking: court.parking || '',
        fees: court.fees || '',
        picture: court.picture || ''
      });
    } else {
      res.status(404).json({ error: 'Court not found' });
    }
  } catch (err) {
    console.error('GET /api/courts/:id error:', err);
    if (err.name === 'MongoServerError' || err.name === 'MongoNetworkError' || err.name === 'CastError') {
      return res.status(503).json({ 
        error: 'Database error',
        message: 'Unable to connect to database or invalid ID format.'
      });
    }
    res.status(500).json({ 
      error: 'Server error',
      message: err.message || 'An unexpected error occurred'
    });
  }
});

app.get('/api/groups', (req, res) => {
  res.json(groups);
});

app.get('/api/groups/:id', (req, res) => {
  const group = groups.find(g => g.id === parseInt(req.params.id));
  if (group) {
    res.json(group);
  } else {
    res.status(404).json({ error: 'Group not found' });
  }
});

const courtValidationSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.empty': 'Court name is required',
    'any.required': 'Court name is required'
  }),
  address: Joi.string().trim().required().messages({
    'string.empty': 'Address is required',
    'any.required': 'Address is required'
  }),
  hours: Joi.string().trim().required().messages({
    'string.empty': 'Hours are required',
    'any.required': 'Hours are required'
  }),
  courts: Joi.string().trim().required().messages({
    'string.empty': 'Court information is required',
    'any.required': 'Court information is required'
  }),
  amenities: Joi.string().trim().required().messages({
    'string.empty': 'Amenities are required',
    'any.required': 'Amenities are required'
  }),
  phone: Joi.string().trim().pattern(/^[\d\s\-\(\)]+$/).required().messages({
    'string.empty': 'Phone number is required',
    'string.pattern.base': 'Phone number must contain only digits, spaces, dashes, and parentheses',
    'any.required': 'Phone number is required'
  }),
  parking: Joi.string().trim().required().messages({
    'string.empty': 'Parking information is required',
    'any.required': 'Parking information is required'
  }),
  fees: Joi.string().trim().required().messages({
    'string.empty': 'Fee information is required',
    'any.required': 'Fee information is required'
  }),
  picture: Joi.string().allow('').optional()
});

app.post('/api/courts', upload.single('picture'), async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.error('POST /api/courts - MongoDB not connected. State:', mongoose.connection.readyState);
      return res.status(503).json({
        success: false,
        error: 'Database not available',
        message: 'MongoDB connection is not established. Please check server configuration.'
      });
    }

    console.log('POST /api/courts - Received request');
    console.log('Content-Type:', req.headers['content-type']);
    console.log('Request body type:', typeof req.body);
    console.log('Request body keys:', Object.keys(req.body || {}));
    console.log('Request body:', req.body);
    console.log('Request file:', req.file ? `File received: ${req.file.originalname}` : 'No file');
    
    if (!req.body || Object.keys(req.body).length === 0) {
      console.error('ERROR: req.body is empty! Multer may not be parsing FormData correctly.');
      return res.status(400).json({
        success: false,
        error: 'Form data not received. Please check server configuration.',
        details: ['No form fields were received by the server']
      });
    }
    
    const getField = (fieldName) => {
      const value = req.body[fieldName];
      if (value === undefined || value === null) {
        console.warn(`⚠️ Field ${fieldName} is undefined or null in req.body`);
        return '';
      }
      const stringValue = String(value).trim();
      console.log(`✓ Field ${fieldName}: "${stringValue}"`);
      return stringValue;
    };
    
    const courtData = {
      name: getField('name'),
      address: getField('address'),
      hours: getField('hours'),
      courts: getField('courts'),
      amenities: getField('amenities'),
      phone: getField('phone'),
      parking: getField('parking'),
      fees: getField('fees'),
      picture: ''
    };
    
    console.log('\n=== Extracted court data before validation ===');
    Object.keys(courtData).forEach(key => {
      console.log(`  ${key}:`, courtData[key] || '(empty)');
    });
    console.log('===============================================\n');
    
    if (req.file) {
      const base64Image = req.file.buffer.toString('base64');
      const imageDataUrl = `data:${req.file.mimetype};base64,${base64Image}`;
      courtData.picture = imageDataUrl;
    } else if (req.body.picture && req.body.picture.trim() !== '') {
      courtData.picture = req.body.picture;
    }

    const { error, value } = courtValidationSchema.validate(courtData, { abortEarly: false });
    
    if (error) {
      const errors = error.details.map(detail => detail.message);
      return res.status(400).json({ 
        success: false, 
        error: 'Validation failed', 
        details: errors 
      });
    }

    console.log('\n=== Validated court data (from Joi) ===');
    console.log(JSON.stringify(value, null, 2));
    console.log('=========================================\n');
    
    if (!value.name || !value.address) {
      console.error('ERROR: Validated data is missing required fields!');
      console.error('Validated value:', value);
      return res.status(500).json({
        success: false,
        error: 'Data validation passed but required fields are missing',
        details: ['Name or address is missing after validation']
      });
    }
    
    const newCourt = new Court(value);
    console.log('Court model before save:', newCourt.toObject());
    
    const savedCourt = await newCourt.save();
    
    console.log('\n=== Saved court from database ===');
    console.log('  _id:', savedCourt._id);
    console.log('  name:', savedCourt.name || '(MISSING)');
    console.log('  address:', savedCourt.address || '(MISSING)');
    console.log('  hours:', savedCourt.hours || '(MISSING)');
    console.log('  courts:', savedCourt.courts || '(MISSING)');
    console.log('  amenities:', savedCourt.amenities || '(MISSING)');
    console.log('  phone:', savedCourt.phone || '(MISSING)');
    console.log('  parking:', savedCourt.parking || '(MISSING)');
    console.log('  fees:', savedCourt.fees || '(MISSING)');
    console.log('  picture:', savedCourt.picture ? 'Has picture' : 'No picture');
    console.log('==================================\n');

    const responseCourt = {
      id: savedCourt._id.toString(),
      name: value.name,
      address: value.address,
      hours: value.hours,
      courts: value.courts,
      amenities: value.amenities,
      phone: value.phone,
      parking: value.parking,
      fees: value.fees,
      picture: value.picture || ''
    };

    res.status(201).json({ 
      success: true, 
      message: 'Court added successfully', 
      court: responseCourt
    });
  } catch (err) {
    console.error('POST /api/courts error:', err);
    res.status(500).json({ 
      success: false, 
      error: 'Server error', 
      message: err.message 
    });
  }
});

app.put('/api/courts/:id', upload.single('picture'), async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        error: 'Database not available',
        message: 'MongoDB connection is not established.'
      });
    }

    const existingCourt = await Court.findById(req.params.id);
    
    if (!existingCourt) {
      return res.status(404).json({ 
        success: false, 
        error: 'Court not found' 
      });
    }

    const courtData = {
      name: (req.body.name || '').trim(),
      address: (req.body.address || '').trim(),
      hours: (req.body.hours || '').trim(),
      courts: (req.body.courts || '').trim(),
      amenities: (req.body.amenities || '').trim(),
      phone: (req.body.phone || '').trim(),
      parking: (req.body.parking || '').trim(),
      fees: (req.body.fees || '').trim(),
      picture: existingCourt.picture || ''
    };
    
    if (req.file) {
      const base64Image = req.file.buffer.toString('base64');
      const imageDataUrl = `data:${req.file.mimetype};base64,${base64Image}`;
      courtData.picture = imageDataUrl;
    } else if (req.body.picture && req.body.picture.trim() !== '' && req.body.picture.startsWith('data:image')) {
      courtData.picture = req.body.picture;
    }

    const { error, value } = courtValidationSchema.validate(courtData, { abortEarly: false });
    
    if (error) {
      const errors = error.details.map(detail => detail.message);
      return res.status(400).json({ 
        success: false, 
        error: 'Validation failed',
        details: errors
      });
    }

    const updatedCourt = await Court.findByIdAndUpdate(req.params.id, value, { new: true });
    
    if (!updatedCourt) {
      return res.status(404).json({ 
        success: false, 
        error: 'Court not found' 
      });
    }
    
    res.status(200).json({ 
      success: true,
      message: 'Court updated successfully',
      court: {
        id: updatedCourt._id.toString(),
        name: updatedCourt.name,
        address: updatedCourt.address,
        hours: updatedCourt.hours,
        courts: updatedCourt.courts,
        amenities: updatedCourt.amenities,
        phone: updatedCourt.phone,
        parking: updatedCourt.parking,
        fees: updatedCourt.fees,
        picture: updatedCourt.picture || ''
      }
    });
  } catch (err) {
    console.error('PUT /api/courts/:id error:', err);
    res.status(500).json({ 
      success: false, 
      error: 'Server error', 
      message: err.message 
    });
  }
});

app.delete('/api/courts/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        error: 'Database not available',
        message: 'MongoDB connection is not established.'
      });
    }

    const court = await Court.findByIdAndDelete(req.params.id);
    
    if (!court) {
      return res.status(404).json({ 
        success: false, 
        error: 'Court not found' 
      });
    }
    
    res.status(200).json({ 
      success: true 
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      error: 'Server error', 
      message: err.message 
    });
  }
});

app.listen(port, () => {
  console.log(`Pickleball API Server running on port ${port}`);
  });
