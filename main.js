//Execute script after DOM is loaded
document.addEventListener('DOMContentLoaded', function(event) {

    // Default theme mode
    (function() {
        if (localStorage.getItem('theme') === 'light-mode') {
            setTheme('light-mode');
        } else {
            setTheme('dark-mode');
        }
    })();
    /* // Navigation tabs */
    const indicator = document.getElementById('indicator');
    const navigation = document.getElementById('navigation');
    const sections = document.querySelectorAll('.sections');
    const contentTab = document.querySelectorAll('[data-content]');

    /*pages*/
    /* const pages = document.querySelectorAll('.pages'); */

    /* Selector size */
    let sizeIndicator = navigation.querySelector('li').offsetWidth;
    let activeSection;
    indicator.style.width = 20 + sizeIndicator + 'px';

    /* Navigation */
    const targets = navigation.querySelectorAll('[data-target]');
    targets.forEach(target => {
        target.addEventListener('click', () => {

            /* Removing active class to all elements */
            contentTab.forEach(c => {
                c.classList.remove('active');
            })
            const t = document.querySelector(target.dataset.target);
            t.classList.add('active');
            /* console.log(t) */
        });
    });
    // Change indicator size on display size change
    const sizeChange = () => {
        sizeIndicator = navigation.querySelector('li').offsetWidth;
        indicator.style.width = `${40+sizeIndicator}px`;
    };
    window.addEventListener('resize', sizeChange);
    const observer = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                /* ------ Transform into array ------- */
                activeSection = [...sections].indexOf(entrada.target);
                indicator.style.transform = `translateX(${(30+sizeIndicator)*activeSection}px)`;
                if (sizeIndicator > 77) {
                    console.log(sizeIndicator);
                    indicator.style.transform = `translateX(${(75+sizeIndicator)*activeSection}px)`;
                }
                /* indicator.style.transform = `translateX(${129*activeSection}px)`; */
            }
        });
    });
    sections.forEach(section => observer.observe(section));

    /* pagination */
    const previous = document.querySelector('previous--button');
    const next = document.querySelector('next--button');
    const pages = document.querySelectorAll('.pages');
    previous.addEventListener('click', function() {
        previous();
    });

});

function previous() {
    pages.forEach(page => {
        console.log(page);
        page.classList.add('.pageActive');
    });
}

// function to set dark/light modes
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

// function to toggle modes
function toggleThemeMode() {
    if (localStorage.getItem('theme') === 'light-mode') {
        setTheme('dark-mode');
    } else {
        setTheme('light-mode');
    }
}