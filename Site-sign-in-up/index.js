const express = require('express');
const cors = require('cors');
const encodePassword = require('./hash').encodePassword;
const app = express();
const users = []; 

app.use(cors());
app.use(express.json());

app.post('/sign-up', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required!' });
    return;
  }

  if (password.length < 8) {
    res.status(400).json({ message: 'Password length should be minimum 8 symbols!' });
    return;
  }

  if (users.find((user) => user.email === email)) {
    res.status(400).json({ message: 'User with this email already exists!' });
    return;
  }
  users.push({ email, password: encodePassword(password) });
  res.status(201).json({ message: 'Реєстрація успішна!' });
});

app.post('/sign-in', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required!' });
    return;
  }
  
  if (password.length < 8) {
    res.status(400).json({ message: 'Password length should be minimum 8 symbols!' });
    return;
  }
  
  const user = users.find((user) => user.email === email);
  if (!user) {
    res.status(404).json({ message: 'User with this email does not exist!' });
    return;
  }
  users.push({ email, password: encodePassword(password) });
  res.status(201).json({ message: 'Авторизація успішна!' });
});

app.listen(3000, () => {
  console.log('Server is running on port http://localhost:3000');
});