const numbersDiv = document.getElementById('numbers');
const generateBtn = document.getElementById('generate');
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Theme Logic
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggleBtn.textContent = 'Light Mode';
    } else {
        body.classList.remove('dark-mode');
        themeToggleBtn.textContent = 'Dark Mode';
    }
}

function toggleTheme() {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeToggleBtn.textContent = 'Light Mode';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggleBtn.textContent = 'Dark Mode';
    }
}

themeToggleBtn.addEventListener('click', toggleTheme);

// Lottery Logic
function generateNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

function displayNumbers(numbers) {
    numbersDiv.innerHTML = '';
    for (const number of numbers) {
        const numberDiv = document.createElement('div');
        numberDiv.className = 'number';
        numberDiv.textContent = number;
        numbersDiv.appendChild(numberDiv);
    }
}

function generateAndDisplayNumbers() {
    const numbers = generateNumbers();
    displayNumbers(numbers);
}

generateBtn.addEventListener('click', generateAndDisplayNumbers);

// Initialization
initTheme();
generateAndDisplayNumbers();
