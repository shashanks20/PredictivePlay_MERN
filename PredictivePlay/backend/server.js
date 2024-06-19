// Import necessary modules and models
const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const db = require('./config/db');
const Register = require("./models/register");
const Fixture = require("./models/fixture");
const Prediction = require("./models/submission");
const crypto = require('crypto');
const saltRounds = 10;

const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'your-secret-key',
  resave: true,
  saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, '../frontend/public')));

// API routes

// Route to fetch all fixtures with status 0
app.get("/fixtures", async (req, res) => {
  try {
    const allDetails = await Fixture.find({ status: 0 }).sort({ Date: 1 }).exec();
    res.json(allDetails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to fetch leaderboard sorted by Score descending
app.get("/leaderboard", async (req, res) => {
  try {
    const allDetails = await Register.find().sort({ Score: -1 }).exec();
    res.json(allDetails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to fetch prediction data for the logged-in user
app.get("/predict", async (req, res) => {
  try {
    const username = req.session.username;
    const allDetails = await Fixture.find({ status: 0 }).exec(); // Adjust this query based on your schema and requirements
    const data = {
      username: username,
      details: allDetails
    };
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to fetch specific columns (TeamA, TeamB) of a fixture by ID
app.get('/fetch-columns/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Fixture.findById(id, 'TeamA TeamB');
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to handle prediction submission
app.post("/predict", async (req, res) => {
  try {
    const username = req.session.username;
    const match = req.body.match;
    const team = req.body.predicted;
    const user = await Prediction.findOne({ Username: username, MatchID: match });

    if (user) {
      await Prediction.findOneAndUpdate({ Username: username, MatchID: match }, { Team: team });
    } else {
      const registerSubmission = new Prediction({
        Username: username,
        MatchID: match,
        Team: team
      });
      await registerSubmission.save();
    }
    res.status(201).json({ message: 'Prediction submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to handle user registration
app.post("/register", async (req, res) => {
  try {
    const { fname, email, password } = req.body;

    // Check if the username or email already exists
    const existingUser = await Register.findOne({ $or: [{ Username: fname }, { Email: email }] });

    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already taken' });
    }

    const newUser = new Register({
      Username: fname,
      Email: email,
      Password: password, // Store password in plain text
      Score: 0
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error('Error in user registration:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Register.findOne({ Username: username });

    if (!user) {
      return res.status(400).json({ message: 'Invalid login details' });
    }

    if (password === user.Password) {
      req.session.username = username;
      return res.status(200).json({ message: 'Login successful' });
    } else {
      return res.status(400).json({ message: 'Invalid login details' });
    }
  } catch (error) {
    console.error('Error in user login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Route to serve the React frontend (catch-all route)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
