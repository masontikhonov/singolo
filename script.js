const makeActive = (event) => {
    event.target.closest('ul').querySelectorAll('li').forEach(li => li.classList.remove('active'));
    event.target.closest('li').classList.add('active');
}

const smoothScroll = (event) => {
    if (event.target.tagName === 'A') {
        event.preventDefault();
    }
    window.removeEventListener('scroll', checkPosition);
    const HREF_TARGET_TOP = document.querySelector(event.target.getAttribute('href')).getBoundingClientRect().top;
    const scrollByTop = HREF_TARGET_TOP - 95;
    if (HREF_TARGET_TOP !== 0) {
        window.scrollBy({top: scrollByTop, behavior: 'smooth'});
    } else {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
    const addScrollEvent = () => {
        setTimeout(function() { window.addEventListener('scroll', checkPosition); }, 500);
    }
    addScrollEvent();
}

let currentSlidePos = 0;
const changeSlide = (event) => {
    if (event.target.parentElement.tagName === 'A') {
        const BUTTON = event.target.parentElement;
        const SLIDES = SLIDER.querySelectorAll('.items > .item');
        const SLIDER_WIDTH = SLIDER.querySelector('.items').offsetWidth;
        const maxMoveLeft = -SLIDER_WIDTH * (SLIDES.length - 1);
        if (BUTTON.className.includes('arrow-left')) {
            if (currentSlidePos < 0) {
                currentSlidePos += SLIDER_WIDTH;
                for (const item of SLIDES) {
                    item.style['transform'] = `translate3d(${currentSlidePos}px, 0, 0)`;
                }
            } else {
                currentSlidePos = maxMoveLeft;
                for (const item of SLIDES) {
                    item.style['transform'] = `translate3d(${currentSlidePos}px, 0, 0)`;
                }
            }
            SLIDES.forEach(li => li.classList.remove('active'));
            SLIDES[-currentSlidePos / SLIDER_WIDTH].classList.add('active');
            SLIDER.style.backgroundColor = getComputedStyle(SLIDER.querySelector('.active'), null)['background-color'];
        }
        if (BUTTON.className.includes('arrow-right')) {
            if (currentSlidePos > maxMoveLeft) {
                currentSlidePos -= SLIDER_WIDTH;
                for (const item of SLIDES) {
                    item.style['transform'] = `translate3d(${currentSlidePos}px, 0, 0)`;
                }
            } else {
                currentSlidePos = 0;
                for (const item of SLIDES) {
                    item.style['transform'] = `translate3d(${currentSlidePos}px, 0, 0)`;
                }
            }
            SLIDES.forEach(li => li.classList.remove('active'));
            SLIDES[-currentSlidePos / SLIDER_WIDTH].classList.add('active');
            SLIDER.style.backgroundColor = getComputedStyle(SLIDER.querySelector('.active'), null)['background-color'];

        }
    }
}

const changePhoneState = (event) => {
    if (event.target.tagName === 'IMG') {
        const targetClasses = event.target.classList;
        if (targetClasses.contains('background') && !targetClasses.contains('hidden')) {
            event.target.classList.add('hidden');
            return;
        }
        if (targetClasses.contains('frame') && !event.target.closest('div').querySelector('.background').classList.contains('hidden')) {
            event.target.closest('div').querySelector('.background').classList.add('hidden');
            return;
        }
        if (targetClasses.contains('frame') && event.target.closest('div').querySelector('.background').classList.contains('hidden')) {
            event.target.closest('div').querySelector('.background').classList.remove('hidden');
            return;
        }
    }
}

const randomReorder = (event) => {
    if (event.target.tagName === 'A') {
        event.preventDefault();
        const portfolio = document.querySelector("#portfolio > ul");
        const items = portfolio.children;
        portfolio.appendChild(items[0]);
    }
}

const formSubmit = (event) => {
    const name = FORM[0].value;
    const email = FORM[1].value;
    const subject = FORM[2].value;
    const description = FORM[3].value;

    FORM_SUBMIT.querySelector('#name').textContent = `${name}${FORM_SUBMIT.querySelector('#name').textContent}`;
    FORM_SUBMIT.querySelector('#email').textContent += ` ${email}`;
    if (subject !== '') {
        FORM_SUBMIT.querySelector('#subject').textContent += ` ${subject}`;
    } else {
        FORM_SUBMIT.querySelector('#subject').textContent = 'No subject';
    }
    if (description !== '') {
        FORM_SUBMIT.querySelector('#description').textContent += ` ${description}`;
    } else {
        FORM_SUBMIT.querySelector('#description').textContent = 'No description';
    }
    FORM_SUBMIT.classList.remove('hidden');
}

const closeFormSubmit = (event) => {
    FORM_SUBMIT.querySelector('#name').textContent = ', thank you for contacting us.';
    FORM_SUBMIT.querySelector('#email').textContent = 'Your email:';
    FORM_SUBMIT.querySelector('#subject').textContent = 'Subject:';
    FORM_SUBMIT.querySelector('#description').textContent = 'Description:';
    FORM_SUBMIT.classList.add('hidden');
    FORM.reset();
}

const preventDefault = (event) => {
        event.preventDefault();
}

const checkPosition = (event) => {
    for (const section of document.querySelectorAll('main > div')) {
        const sectionTop = section.getBoundingClientRect().top,
        sectionBottom = section.getBoundingClientRect().bottom,
        windowHeight = document.documentElement.clientHeight;
        if (sectionTop >= 95 && sectionTop <= section.offsetHeight / 2 + 95) {
            document.querySelectorAll('#main-menu li').forEach(li => li.classList.remove('active'));
            if (section.id === 'wrapper-slider') {
                document.querySelectorAll('#main-menu li')[0].classList.add('active');
            } else {
                for (const a of document.querySelectorAll('#main-menu li a')) {
                    if (a.href.includes(section.id)) {
                        a.closest('li').classList.add('active');
                    }
                }
            }
        }
    }
}

const MAIN_MENU = document.getElementById('main-menu').querySelector('ul');
MAIN_MENU.addEventListener('click', makeActive);
MAIN_MENU.addEventListener('click', smoothScroll);

const SLIDER = document.getElementById('wrapper-slider');
SLIDER.addEventListener('click', changeSlide);
SLIDER.querySelector('.items').addEventListener('click', changePhoneState);

const PORTFOLIO_MENU = document.getElementById('portfolio-menu').querySelector('ul');
PORTFOLIO_MENU.addEventListener('click', makeActive);
PORTFOLIO_MENU.addEventListener('click', randomReorder);

const PORTFOLIO = document.querySelector("#portfolio");
PORTFOLIO.addEventListener('click', makeActive);
PORTFOLIO.addEventListener('click', preventDefault);

const FORM = document.querySelector("#wrapper-quote > section > form");
const FORM_SUBMIT = document.querySelector('.popup.form-submit');
FORM.addEventListener('submit', formSubmit);
FORM.addEventListener('submit', preventDefault);
FORM_SUBMIT.querySelector('.popup .button.close').addEventListener('click', closeFormSubmit);
FORM_SUBMIT.querySelector('.popup .button.ok').addEventListener('click', closeFormSubmit);
FORM_SUBMIT.querySelector('.popup .background').addEventListener('click', closeFormSubmit);
document.addEventListener('keyup', event => {if (event.key === "Escape") {closeFormSubmit();}});

window.addEventListener('scroll', checkPosition);