let modeToggle = document.querySelector('.mode-tog');
let langToggle = document.querySelector('.lang-tog');
let desktopfolio = document.getElementById('desktopfolio');
let darkMode = document.querySelector('.dark-mode');
let body = document.querySelector('body');
let socials = document.querySelectorAll('.socialIcon');
let lastRippleTime = 0;

const titleH1 = document.querySelector('#title h1');
function updateTitle() {
    const titleText = document.querySelector('#title h1').textContent;
    const screenWidth = window.innerWidth;

    if (screenWidth <= 600) {
        const breakText = titleText.replace(/\s/g, '<br>');
        titleH1.innerHTML = breakText;
        titleH1.style.whiteSpace = 'normal';
    } else {
        const spannedText = titleText.split('').map((letter, index) => `<span style="--i:${index + 1}">${letter}</span>`).join('');
        titleH1.innerHTML = spannedText;
        titleH1.style.whiteSpace = 'pre';
    }
}
updateTitle();

window.addEventListener('load', () => {
    document.body.classList.add('pointernone');
    if (localStorage.getItem('darkMode') === 'active') {
        darkMode.classList.add('active');
        modeToggle.classList.add('active');
        langToggle.classList.add('active');
        desktopfolio.classList.add('active');
        body.classList.add('active');
        socials.forEach((socialIcon) => {
            socialIcon.classList.toggle('active');
        });
    }
    setTimeout(() => {
        createClickRipple(1200, 400, false);
        setTimeout(() => {
            createClickRipple(700, 600, false);
            setTimeout(() => {
                document.getElementById('title').classList.toggle('active');
                /* langToggle.classList.add('visible'); */
                modeToggle.classList.add('visible');
                desktopfolio.classList.add('visible');
                moveDivAfterLoadAnimations();                                 
                setTimeout(() => {
                    generateRandomRipple();                                      
                }, 2500);                
            }, 1000);
        }, 200);
    }, 1800);
    body.addEventListener('mousemove', (e) => {
        const currentTime = new Date().getTime();
        if (currentTime - lastRippleTime > 50) {
            createSmallRipple(e.clientX, e.clientY);
            lastRippleTime = currentTime;
        }
    });
});

function generateRandomRipple() {
    const randomDelay = getRandomDelay(1000, 2500);
    setTimeout(() => {
        const randomX = Math.random() < 0.5 ? Math.random() * window.innerWidth * 0.2 : Math.random() * window.innerWidth * 0.8 + window.innerWidth * 0.2;
        const randomY = Math.random() * window.innerHeight;
        createClickRipple(randomX, randomY, true);
        generateRandomRipple();
    }, randomDelay);
}

function getRandomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function createSmallRipple(x, y) {
    const smallRipple = document.createElement('div');
    smallRipple.classList.add('small-ripple');
    smallRipple.style.left = x + 'px';
    smallRipple.style.top = y + 'px';
    document.body.appendChild(smallRipple);

    smallRipple.addEventListener('animationend', () => {
        smallRipple.remove();
    });
}

function createClickRipple(x, y, isRandom = false) {
    if (window.innerWidth > 600) {
        const clickRipple = document.createElement('div');
        clickRipple.classList.add('click-ripple');
        clickRipple.style.left = (x / window.innerWidth) * 100 + '%';
        clickRipple.style.top = (y / window.innerHeight) * 100 + '%';
        if (isRandom) {
            clickRipple.style.animation = 'randomRippleAnimation 1.4s ease-out';
        } else {
            clickRipple.style.animation = 'clickRippleAnimation 1.4s ease-out';
        }
        document.body.appendChild(clickRipple);
        clickRipple.addEventListener('animationend', () => {
            clickRipple.remove();
        });
    }
}

function moveDivAfterLoadAnimations() {
    const myDiv = document.getElementById('title');
    myDiv.style.top = '47%';    
    setTimeout(() => {
        document.getElementById('title').classList.toggle('active');
        document.getElementById('info').classList.add('active');
        document.body.classList.remove('pointernone');
        document.addEventListener('click', function (e) {
            createClickRipple(e.clientX, e.clientY, false);
        });
        document.getElementsByClassName('bx-envelope')[0].classList.add('btn1');
        document.getElementsByClassName('bxl-instagram')[0].classList.add('btn2');
        document.getElementsByClassName('bxl-github')[0].classList.add('btn3');
        document.getElementsByClassName('bxl-linkedin')[0].classList.add('btn4');
        setTimeout(() => {
            document.getElementsByClassName('bx-envelope')[0].classList.remove('btn1');
            document.getElementsByClassName('bxl-instagram')[0].classList.remove('btn2');
            document.getElementsByClassName('bxl-github')[0].classList.remove('btn3');
            document.getElementsByClassName('bxl-linkedin')[0].classList.remove('btn4');
            document.querySelectorAll('.socialIcon').forEach((socialIcon) => {
                socialIcon.style.opacity = '1';
            }
            );
            document.querySelectorAll('#enricAr span').forEach((span, index) => {
                span.style.animation = `waviy 3.5s ease-in-out infinite ${index * 0.1}s`;
            }); 
        }, 1600);
    }, 1000);        
}

modeToggle.addEventListener('click', () => {
    darkMode.classList.toggle('active');
    modeToggle.classList.toggle('active');
    langToggle.classList.toggle('active');
    desktopfolio.classList.toggle('active');
    body.classList.toggle('active');
    socials.forEach((socialIcon) => {
        socialIcon.classList.toggle('active');
    });

    if (localStorage.getItem('darkMode') === 'active') {
        localStorage.setItem('darkMode', '');
    } else {
        localStorage.setItem('darkMode', 'active');
    }
});

function copyMail() {
    let mail = "armengolgarciaenric@gmail.com";
    const tempInput = document.createElement('input');
    tempInput.value = mail;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    alert("Copied to clipboard: " + mail);
}

langToggle.addEventListener('click', () => {
    langToggle.innerHTML = langToggle.innerHTML === '<h3>ENG</h3>' ? '<h3>ESP</h3>' : '<h3>ENG</h3>';
});

desktopfolio.addEventListener('click', () => {
    const overlay = document.createElement("div");
    overlay.style.margin = "0";
    overlay.style.padding = "0";
    overlay.style.position = "fixed";
    overlay.style.zIndex = "2000";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "black";
    overlay.style.opacity = "0";
    overlay.style.transition = "opacity 0.5s";
    document.body.appendChild(overlay);    
    function fadeToBlack() {
        overlay.style.opacity = "1";
    }    
    setTimeout(fadeToBlack, 0);    
    overlay.addEventListener("transitionend", function () {
        setTimeout(() => {
            window.location.href = 'https://portfolio-desktop-navy.vercel.app';
        }, 300);
    });
});