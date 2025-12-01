const express = require('express');
const cors = require('cors');
const path = require('path');
const Joi = require('joi');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.static(__dirname));
app.use('/images', express.static(path.join(__dirname, 'images')));

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

const courts = [
  {
    id: 1,
    name: "Community Recreation Center",
    address: "123 Main Street",
    hours: "Open: 6 AM - 10 PM Daily",
    courts: "4 outdoor courts, 2 indoor courts",
    amenities: "Equipment rental available",
    phone: "(555) 123-4567",
    parking: "Free parking available",
    fees: "$5 per person per day"
  },
  {
    id: 2,
    name: "Riverside Park",
    address: "456 Oak Avenue",
    hours: "Open: Dawn to Dusk",
    courts: "6 outdoor courts",
    amenities: "Free to play, bring your own equipment",
    phone: "(555) 234-5678",
    parking: "Street parking",
    fees: "Free"
  },
  {
    id: 3,
    name: "Sports Complex",
    address: "789 Pine Street",
    hours: "Open: 7 AM - 9 PM",
    courts: "8 outdoor courts, 4 indoor courts",
    amenities: "Lessons and tournaments available",
    phone: "(555) 345-6789",
    parking: "Large parking lot",
    fees: "$10 per person per day, memberships available"
  }
];

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

app.get('/api/courts', (req, res) => {
  res.json(courts);
});

app.get('/api/courts/:id', (req, res) => {
  const court = courts.find(c => c.id === parseInt(req.params.id));
  if (court) {
    res.json(court);
  } else {
    res.status(404).json({ error: 'Court not found' });
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

const courtSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Court name is required'
  }),
  address: Joi.string().required().messages({
    'string.empty': 'Address is required'
  }),
  hours: Joi.string().required().messages({
    'string.empty': 'Hours are required'
  }),
  courts: Joi.string().required().messages({
    'string.empty': 'Court information is required'
  }),
  amenities: Joi.string().required().messages({
    'string.empty': 'Amenities are required'
  }),
  phone: Joi.string().pattern(/^[\d\s\-\(\)]+$/).required().messages({
    'string.empty': 'Phone number is required',
    'string.pattern.base': 'Phone number must contain only digits, spaces, dashes, and parentheses'
  }),
  parking: Joi.string().required().messages({
    'string.empty': 'Parking information is required'
  }),
  fees: Joi.string().required().messages({
    'string.empty': 'Fee information is required'
  })
});

app.post('/api/courts', (req, res) => {
  try {
    const { error, value } = courtSchema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const errors = error.details.map(detail => detail.message);
      return res.status(400).json({ 
        success: false, 
        error: 'Validation failed', 
        details: errors 
      });
    }

    const newId = courts.length > 0 ? Math.max(...courts.map(c => c.id)) + 1 : 1;
    
    const newCourt = {
      id: newId,
      ...value
    };

    courts.push(newCourt);

    res.status(201).json({ 
      success: true, 
      message: 'Court added successfully', 
      court: newCourt 
    });
  } catch (err) {
    console.error('Error adding court:', err);
    res.status(500).json({ 
      success: false, 
      error: 'Server error', 
      message: err.message 
    });
  }
});

app.put('/api/courts/:id', (req, res) => {
  const { error, value } = courtSchema.validate(req.body, { abortEarly: false });
  
  if (error) {
    const errors = error.details.map(detail => detail.message);
    return res.status(400).json({ 
      success: false, 
      error: 'Validation failed',
      details: errors
    });
  }

  const court = courts.find(c => c.id === parseInt(req.params.id));
  
  if (!court) {
    return res.status(404).json({ 
      success: false, 
      error: 'Court not found' 
    });
  }

  Object.assign(court, value);
  
  res.status(200).json({ 
    success: true, 
    court: court 
  });
});

app.delete('/api/courts/:id', (req, res) => {
  const courtIndex = courts.findIndex(c => c.id === parseInt(req.params.id));
  
  if (courtIndex === -1) {
    return res.status(404).json({ 
      success: false, 
      error: 'Court not found' 
    });
  }

  courts.splice(courtIndex, 1);
  
  res.status(200).json({ 
    success: true 
  });
});

app.listen(port, () => {
  console.log(`Pickleball API Server running on port ${port}`);
  });
