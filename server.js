// server/index.js
const express = require('express');
const cors = require('cors');
const twilio = require('twilio');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
app.use(cors());

const accountSid = process.env.TWILIO_ACCOUNT_SID; // Get from environment variables
const authToken = process.env.TWILIO_AUTH_TOKEN;   // Get from environment variables
const client = twilio(accountSid, authToken);

app.get('/call', (req, res) => {
  console.log('Received request to initiate call');
  console.log('Environment variables:', process.env);
  // console.log('Request headers:', req.headers);

  client.calls
    .create({
      url: 'http://demo.twilio.com/docs/voice.xml', // Twilio will use this to handle the call
      to: process.env.DESTINATION_PHONE_NUMBER,    // Destination phone number from environment
      from: process.env.TWILIO_PHONE_NUMBER       // Your Twilio phone number from environment
    })
    .then(call => {
      console.log('Call initiated successfully:', call.sid);
      res.json(call.sid);
    })
    .catch(err => {
      console.error('Failed to initiate call:', err.message);
      res.status(500).json({ error: err.message });
    });
});

app.listen(5000, () => console.log('Server running on port 5000'));
