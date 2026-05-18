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

// SNS Sharing Logic
const KAKAO_API_KEY = 'YOUR_KAKAO_JS_KEY'; // 사용자가 나중에 직접 넣어야 함

if (typeof Kakao !== 'undefined' && !Kakao.isInitialized()) {
    try {
        // Kakao.init(KAKAO_API_KEY); // 주석 처리하여 에러 방지
    } catch (e) {
        console.error('Kakao SDK Init Error:', e);
    }
}

const shareTitle = 'LottoGen | 이번 주 로또 번호는?';
const shareDesc = '과학적 통계와 무작위 추출로 생성된 로또 번호, 지금 바로 확인하고 1등의 주인공이 되세요!';
const shareUrl = window.location.href;

// Kakao Share
document.getElementById('share-kakao').addEventListener('click', () => {
    if (typeof Kakao !== 'undefined' && Kakao.isInitialized()) {
        Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
                title: shareTitle,
                description: shareDesc,
                imageUrl: 'https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?q=80&w=500&auto=format&fit=crop',
                link: {
                    mobileWebUrl: shareUrl,
                    webUrl: shareUrl,
                },
            },
            buttons: [
                {
                    title: '번호 생성하러 가기',
                    link: {
                        mobileWebUrl: shareUrl,
                        webUrl: shareUrl,
                    },
                },
            ],
        });
    } else {
        alert('카카오 공유를 사용하려면 Kakao JavaScript 키 설정이 필요합니다.');
    }
});

// Facebook Share
document.getElementById('share-facebook').addEventListener('click', () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, 'facebook-share-dialog', 'width=800,height=600');
});

// Twitter Share
document.getElementById('share-twitter').addEventListener('click', () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle + '\n' + shareDesc)}&url=${encodeURIComponent(shareUrl)}`, 'twitter-share-dialog', 'width=800,height=600');
});

// Copy URL
document.getElementById('copy-url').addEventListener('click', () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
        alert('사이트 주소가 복사되었습니다. 친구들에게 공유해보세요!');
    });
});
