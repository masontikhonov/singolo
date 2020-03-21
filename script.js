const makeActive = (event) => {
    event.target.closest('ul').querySelectorAll('li').forEach(li => li.classList.remove('active'));
    event.target.closest('li').classList.add('active');
}

const smoothScroll = (event) => {
    if (event.target.tagName === 'A') {
        event.preventDefault();
    }
    document.querySelector(event.target.getAttribute('href')).scrollIntoView({behavior: 'smooth'});
}

const randomReorder = (event) => {
    if (event.target.tagName === 'A') {
        event.preventDefault();
        const portfolio = document.querySelector("#portfolio > ul");
        const items = portfolio.children;
        portfolio.appendChild(items[Math.floor(Math.random() * items.length)]);
    }
}

const preventDefault = (event) => {
        event.preventDefault();
}

const MAIN_MENU = document.getElementById('main-menu').querySelector('ul');
MAIN_MENU.addEventListener('click', makeActive);
MAIN_MENU.addEventListener('click', smoothScroll);

const PORTFOLIO_MENU = document.getElementById('portfolio-menu').querySelector('ul');
PORTFOLIO_MENU.addEventListener('click', makeActive);
PORTFOLIO_MENU.addEventListener('click', randomReorder);

const PORTFOLIO = document.querySelector("#portfolio");
PORTFOLIO.addEventListener('click', makeActive);
PORTFOLIO.addEventListener('click', preventDefault);