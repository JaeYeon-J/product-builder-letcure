const numbersDiv = document.getElementById('numbers');
const statsSummaryDiv = document.getElementById('stats-summary');
const generateBtn = document.getElementById('generate');
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Theme Logic
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const icon = themeToggleBtn.querySelector('i');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (icon) icon.className = 'fas fa-sun';
    } else {
        body.classList.remove('dark-mode');
        if (icon) icon.className = 'fas fa-moon';
    }
}

function toggleTheme() {
    body.classList.toggle('dark-mode');
    const icon = themeToggleBtn.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        if (icon) icon.className = 'fas fa-sun';
    } else {
        localStorage.setItem('theme', 'light');
        if (icon) icon.className = 'fas fa-moon';
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

function calculateStats(numbers) {
    const sum = numbers.reduce((a, b) => a + b, 0);
    const oddCount = numbers.filter(n => n % 2 !== 0).length;
    const evenCount = 6 - oddCount;
    return { sum, oddCount, evenCount };
}

function displayNumbers(numbers) {
    numbersDiv.innerHTML = '';
    numbers.forEach((number, index) => {
        const numberDiv = document.createElement('div');
        numberDiv.className = 'number';
        numberDiv.textContent = number;
        numberDiv.style.animationDelay = `${index * 0.1}s`;
        numbersDiv.appendChild(numberDiv);
    });

    const { sum, oddCount, evenCount } = calculateStats(numbers);
    statsSummaryDiv.innerHTML = `
        <span>합계: ${sum}</span> | 
        <span>홀수: ${oddCount}</span> | 
        <span>짝수: ${evenCount}</span>
    `;
}

function generateAndDisplayNumbers() {
    const numbers = generateNumbers();
    displayNumbers(numbers);
}

generateBtn.addEventListener('click', generateAndDisplayNumbers);

// FAQ Accordion Logic
const accordionHeaders = document.querySelectorAll('.accordion-header');
accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const isActive = item.classList.contains('active');
        
        // Close all other items
        document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
        
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Initialization
initTheme();
generateAndDisplayNumbers();
