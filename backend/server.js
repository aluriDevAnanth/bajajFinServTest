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

app.post('/bfhl', upload.single('file'), (req, res) => {
  const { data, file_b64 } = req.body;

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({ is_success: false, message: "Invalid input" });
  }

  const numbers = data.filter(item => /^\d+$/.test(item));
  const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));
  const lowestLowercase = data.filter(item => item.match(/[a-z]/));
  const highestLowercaseChar = lowestLowercase.length ? [Math.max(...lowestLowercase.map(c => c.charCodeAt(0)))].map(c => String.fromCharCode(c)) : [];

  const file = req.file;
  let fileValid = false;
  let fileMimeType = null;
  let fileSizeKb = 0;

  if (file_b64) {
    fileValid = true;
    fileMimeType = file ? file.mimetype : "application/octet-stream";
    fileSizeKb = file ? (file.size / 1024).toFixed(2) : 0;
  }

  const response = {
    is_success: true,
    user_id: userId,
    email: email,
    roll_number: rollNumber,
    numbers: numbers,
    alphabets: alphabets,
    highest_lowercase_alphabet: highestLowercaseChar,
    file_valid: fileValid,
    file_mime_type: fileMimeType,
    file_size_kb: fileSizeKb,
  };

  return res.json(response);
});

app.get('/bfhl', (req, res) => {
  return res.status(200).json({ operation_code: 1 });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
