const images = [
    'Images-Coin-clicker/big-coin-first-frame.png',
    'Images-Coin-clicker/big-coin-second-frame.png',
    'Images-Coin-clicker/big-coin-first-frame.png',
    'Images-Coin-clicker/big-coin-second-frame.png',
    'Images-Coin-clicker/big-coin-first-frame.png',
    'Images-Coin-clicker/big-coin-second-frame.png',
    'Images-Coin-clicker/big-coin-first-frame.png',
    'Images-Coin-clicker/big-coin-second-frame.png',
    'Images-Coin-clicker/big-coin-first-frame.png',
    'Images-Coin-clicker/big-coin-second-frame.png',
    'Images-Coin-clicker/big-coin-third-frame.png',
    'Images-Coin-clicker/big-coin-fourth-frame.png',
    'Images-Coin-clicker/big-coin-third-frame.png',
    'Images-Coin-clicker/big-coin-fourth-frame.png',
    'Images-Coin-clicker/big-coin-third-frame.png',
    'Images-Coin-clicker/big-coin-fourth-frame.png',
    'Images-Coin-clicker/big-coin-third-frame.png',
    'Images-Coin-clicker/big-coin-fourth-frame.png',
    'Images-Coin-clicker/big-coin-third-frame.png',
    'Images-Coin-clicker/big-coin-fourth-frame.png',
    'Images-Coin-clicker/big-coin-fifth-frame.png',
    'Images-Coin-clicker/big-coin-sixth-frame.png',
    'Images-Coin-clicker/big-coin-first-frame.png',
    'Images-Coin-clicker/big-coin-second-frame.png',
    'Images-Coin-clicker/big-coin-first-frame.png',
    'Images-Coin-clicker/big-coin-second-frame.png',
    'Images-Coin-clicker/big-coin-first-frame.png',
    'Images-Coin-clicker/big-coin-second-frame.png',
    'Images-Coin-clicker/big-coin-first-frame.png',
    'Images-Coin-clicker/big-coin-second-frame.png',
    'Images-Coin-clicker/big-coin-first-frame.png',
    'Images-Coin-clicker/big-coin-second-frame.png',
    'Images-Coin-clicker/big-coin-first-frame.png',
    'Images-Coin-clicker/big-coin-seventh-frame.png',
    'Images-Coin-clicker/big-coin-eighth-frame.png',
    'Images-Coin-clicker/big-coin-ninth-frame.png',
    'Images-Coin-clicker/big-coin-tenth-frame.png',
    'Images-Coin-clicker/big-coin-seventh-frame.png',
    'Images-Coin-clicker/big-coin-eighth-frame.png',
    'Images-Coin-clicker/big-coin-tenth-frame.png',
    'Images-Coin-clicker/big-coin-seventh-frame.png',
    'Images-Coin-clicker/big-coin-eighth-frame.png',
    'Images-Coin-clicker/big-coin-ninth-frame.png',
    'Images-Coin-clicker/big-coin-tenth-frame.png',
    'Images-Coin-clicker/big-coin-second-frame.png',
];
let currentIndex = 0;
let spacePressed = false;

function changeImage() {
currentIndex = (currentIndex + 1) % images.length;
document.getElementById('big-coin').src = images[currentIndex];
}

function Totalcoins() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = users[users.length - 1];
    if (!currentUser) return;

    fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(userslist => {
            const user = userslist.find(u => u.id === currentUser.id);
            if (user) {
                document.querySelector('.title-rectangle').textContent = user.balance;
                document.querySelector('.coins-total').textContent = user.balance;
            }
        });
    };

    window.addEventListener('load', Totalcoins);

function incrementCoins() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = users[users.length - 1];

    if (!currentUser) {
        console.error('Error user not found');
    }

    fetch('http://localhost:3000/click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: currentUser.id })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
            document.querySelector('.title-rectangle').textContent = data.balance;
            document.querySelector('.coins-total').textContent = data.balance;
            }
    });
}

function sendPassiveIncome() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = users[users.length - 1];
    if (!currentUser) return;

    fetch('http://localhost:3000/passive-income', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: currentUser.id })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            document.querySelector('.title-rectangle').textContent = data.balance;
            document.querySelector('.coins-total').textContent = data.balance;
        }
    });
}
setInterval(sendPassiveIncome, 1000);

document.getElementById('big-coin').addEventListener('click', function() {
changeImage();
incrementCoins();
});
document.addEventListener('keydown', function(event) {
if (event.code === 'Space' && !spacePressed) {
    event.preventDefault();
    spacePressed = true;
    changeImage();
    incrementCoins();
}
});

document.addEventListener('keyup', function(event) {
if (event.code === 'Space') {
    spacePressed = false;
}
});

