const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors({
  origin: 'https://bajaj-fin-serv-test.vercel.app/'
}));

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

app.post('/bfhl', (req, res) => {
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

app.get('/bfhl', (req, res) => {
  res.json({ operation_code: 1 });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
