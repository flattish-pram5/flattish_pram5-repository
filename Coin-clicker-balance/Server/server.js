const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
// form

const users = [];
let lastUserId = 0;
const { encodePassword } = require('./hash');

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
  lastUserId += 1; 
  const id = lastUserId;
  users.push({ 
    id, 
    email, 
    password: encodePassword(password),
    balance: 0,
    coinsPerClick: 20,
    passiveIncomePerSecond: 1
  });
  return res.status(201).json({ message: 'Реєстрація успішна!', email, id });
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

  const PasswordValid = require('./hash').comparePassword(password, user.password);
  if (!PasswordValid) {
    res.status(401).json({ message: 'Invalid password!' });
    return;
  }
  return res.status(201).json({
    message: 'Авторизація успішна!',
    email: user.email,
    id: user.id,
    balance: user.balance,
    coinsPerClick: user.coinsPerClick,
    passiveIncomePerSecond: user.passiveIncomePerSecond
  });
});

// api
let upgrades = [
  { "id": 1, "name": "Click Accelerator", "description": "speed of earning x10", "price": 10 },
  { "id": 2, "name": "Coin Multiplier", "description": "ClickCoins per click x10", "price": 11 },
  { "id": 3, "name": "Power Tap", "description": "ClickCoins per click x2", "price": 12 },
  { "id": 4, "name": "Golden Touch", "description": "random bonus on click", "price": 13 },
  { "id": 5, "name": "Coin Stream", "description": "passive income x10", "price": 14 },
  { "id": 6, "name": "Mining Drone", "description": "automated taps for 1 min", "price": 15 },
];

// Добавить новый апгрейд
app.post('/upgrades', (req, res) => {
  const { id, name, description, price } = req.body;

  const existingUpgrade = upgrades.find((upgrade) => upgrade.id === id);
  if (existingUpgrade) {
    return res.status(409).json({ message: 'Upgrade with this ID already exists' });
  }

  const newUpgrade = { id, name, description, price };
  upgrades.push(newUpgrade);
  res.status(201).json(newUpgrade);
});

// Полчуить все апгрейды
app.get('/upgrades', (req, res) => {
  res.json(upgrades);
});

// Получить один апгрейд по ID
app.get('/upgrades/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const upgrade = upgrades.find((upgrade) => upgrade.id === id);

  if (!upgrade) {
    return res.status(404).json({ message: 'Not Found' });
  }
  
  res.status(200).json(upgrade);

  res.json(upgrade);
});

// Обновить апгрейд по ID
app.put('/upgrades/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = upgrades.findIndex((upgrade) => upgrade.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Not Found' });
  }

  if (!req.body || !req.body.name || !req.body.description || !req.body.price) {
    return res.status(400).json({ message: 'Bad Request' });
  }

  const { name, description, price } = req.body;
  upgrades[index] = { id, name, description, price };
  res.json(upgrades[index]);

    res.status(200).json({
    upgrade: upgrades[index]
  });
});

// Удалить апргрейд по ID
app.delete('/upgrades/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = upgrades.findIndex((upgrade) => upgrade.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Id not found!' });
  }

  upgrades.splice(index, 1);
  res.status(204).send();
});

// balance

app.post('/click', (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: 'User id is required' });
  }
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  user.balance += user.coinsPerClick;
  res.json({ success: true, balance: user.balance });
});

app.get('/users', (req, res) => {
  res.status(200).json(users); 
});

app.post('/passive-income', (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: 'User id is required' });
  }
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  user.balance += user.passiveIncomePerSecond;
  res.json({ success: true, balance: user.balance });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});