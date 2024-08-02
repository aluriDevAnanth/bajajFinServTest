const express = require('express');
const cors = require('cors');
const { createServer } = require('http');

const app = express();
app.use(express.json());
app.use(cors());

const user = {
  user_id: "aluri_dev_ananth_22032004",
  email: "devananth_aluri@srmap.edu.in",
  roll_number: "AP21110010255"
};

const separateData = (data) => {
  const numbers = [];
  const alphabets = [];
  data.forEach(item => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else {
      alphabets.push(item);
    }
  });
  return { numbers, alphabets };
};

const findHighestAlphabet = (alphabets) => {
  if (alphabets.length === 0) return [];
  alphabets.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  return [alphabets[alphabets.length - 1]];
};

app.post('/api/bfhl', (req, res) => {
  const { data } = req.body;
  if (!data || !Array.isArray(data)) {
    return res.status(400).json({ is_success: false, message: "Invalid data format" });
  }

  const { numbers, alphabets } = separateData(data);
  const highest_alphabet = findHighestAlphabet(alphabets);

  const response = {
    is_success: true,
    user_id: user.user_id,
    email: user.email,
    roll_number: user.roll_number,
    numbers,
    alphabets,
    highest_alphabet
  };

  res.json(response);
});

app.get('/api/bfhl', (req, res) => {
  res.json({ operation_code: 1 });
});

module.exports = createServer(app);
