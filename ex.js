
const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');

const app = express();

// Use express-fileupload middleware
app.use(fileUpload());

// Route to handle image upload
app.post('/upload', (req, res) => {
  const image = req.files?.image; // Access the uploaded file using express-fileupload
  
  if (!image) {
    return res.status(400).send('No file uploaded.');
  }

  // Define the upload path
  const uploadPath = path.join(__dirname, 'public', image.name);

  // Move the file to the 'public' folder
  image.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send('File upload failed.');
    }
    res.send('File uploaded successfully.');
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
  
});