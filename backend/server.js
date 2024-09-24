const express = require('express');
const cors = require('cors');
require('dotenv').config()

console.log(process.env.frontendUrl)

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors({ origin: process.env.frontendUrl || '*' }));

const userId = "AluriDevAnanth";
const email = "devananth_aluri@srmap.edu.in";
const rollNumber = "AP21110010255";

app.post('/bfhl', (req, res) => {
  const { data, file_b64 } = req.body;

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({ is_success: false, message: "Invalid input" });
  }

  const numbers = data.filter(item => /^\d+$/.test(item));
  const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));
  const lowestLowercase = data.filter(item => item.match(/[a-z]/));
  const highestLowercaseChar = lowestLowercase.length
    ? [Math.max(...lowestLowercase.map(c => c.charCodeAt(0)))].map(c => String.fromCharCode(c))
    : [];

  let fileValid = false;
  let fileMimeType = null;
  let fileSizeKb = 0;

  if (file_b64) {
    try {
      const base64Regex = /^data:(.+);base64,(.*)$/;
      const matches = file_b64.match(base64Regex);

      console.log(matches);

      fileMimeType = matches[1];
      const base64Data = matches[2];

      const fileBuffer = Buffer.from(base64Data, 'base64');

      fileValid = true;
      fileSizeKb = (fileBuffer.length / 1024).toFixed(2);

    } catch (err) {
      console.error('Error processing file_b64:', err);
      return res.status(500).json({ is_success: false, message: 'Error processing base64 file' });
    }
  }

  const response = {
    is_success: true,
    user_id: userId,
    email,
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
