//Execute script after DOM is loaded
document.addEventListener('DOMContentLoaded', function(event) {

    /* // Navigation tabs */
    const indicator = document.getElementById('indicator');
    const navigation = document.getElementById('navigation');
    const sections = document.querySelectorAll('.sections');
    const contentTab = document.querySelectorAll('[data-content]');

    /* Selector size */
    let sizeIndicator = navigation.querySelector('li').offsetWidth;
    let activeSection;
    indicator.style.width = sizeIndicator + 39 + 'px';
    console.log(sizeIndicator);
    /* Navigation */
    const targets = navigation.querySelectorAll('[data-target]');
    targets.forEach(target => {
        target.addEventListener('click', () => {

            /* Removing active class to all elements */
            contentTab.forEach(c => {
                c.classList.remove('active')
                indicator.style.transform = `translateX(${128*0}px)`;
            })
            const t = document.querySelector(target.dataset.target);
            t.classList.add('active');
        })
    })
    const sizeChange = () => {
        sizeIndicator = navigation.querySelector('li').offsetWidth;
        indicator.style.width = `${sizeIndicator}px`;
    }
    const observer = new IntersectionObserver((entradas, observer) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                /* ------ Transform into array ------- */
                activeSection = [...sections].indexOf(entrada.target);
                /* indicator.style.transform = `translateX(${sizeIndicator*activeSection}px)`; */
                indicator.style.transform = `translateX(${128*activeSection}px)`;
            }

        });
    });
    sections.forEach(section => observer.observe(section));

    window.addEventListener('resize', sizeChange);
})



/* sections.forEach(section => {
    section.
}) */



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

// Immediately invoked function to set the theme on initial load
(function() {
    if (localStorage.getItem('theme') === 'light-mode') {
        setTheme('light-mode');
    } else {
        setTheme('dark-mode');
    }
})();