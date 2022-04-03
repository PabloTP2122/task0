//Executing script after DOM is loaded for avoid errors
document.addEventListener('DOMContentLoaded', function(event) {

    // Default theme mode
    (function() {
        if (localStorage.getItem('theme') === 'light-mode') {
            setTheme('light-mode');
        } else {
            setTheme('dark-mode');
        }
    })();
    /* Navigation  */
    // Doom elements reference
    const indicator = document.getElementById('indicator');
    const navigation = document.getElementById('navigation');
    const sections = document.querySelectorAll('.sections');
    const contentTab = document.querySelectorAll('[data-content]');
    /* ------ Pagination ------ */
    const items = document.querySelectorAll('.list');
    const activities = document.querySelector('.activities');
    const previous = document.querySelector('.previous--button');
    const next = document.querySelector('.next--button');
    listArray = [...items];
    let page = 0;
    /* items.slice(); */
    let currentPage = 1;

    // Hide all activity lists then sow only 3 elements
    items.forEach(item => {
        item.style.display = 'none';
    });
    for (let i = 0; i < page + 3; i++) {
        // Sow first 3 elements
        listArray[i].style.display = 'block';
    }
    /* if (currentPage == 1) {
        previous.style.display = 'none';
    } */

    /* For next button */
    next.addEventListener('click', () => {

        console.log(currentPage);

        // Hide all activity lists then sow only 3 elements
        items.forEach(item => {
            item.style.display = 'none';
        });
        page == listArray.length - 3 ? page = 0 : (page += 3);
        /* console.log(page) */
        for (let i = 0; i < page + 3; i++) {
            // hide all elements
            listArray[i].style.display = 'none';

        }
        for (let i = page; i < page + 3; i++) {
            listArray[i].style.display = 'block';
        }

    });

    /* For previous button */
    previous.addEventListener('click', () => {
        items.forEach(item => {
            item.style.display = 'none';
        });
        page == 0 ? page = (listArray.length - 3) : (page -= 3);
        /*         console.log(page);
         */
        for (let i = page; i < page + 3; i++) {
            // hide 3 elements
            /* console.log(i); */
            listArray[i].style.display = 'block';
        }
    });



    /* Selector size */
    let sizeIndicator = navigation.querySelector('li').offsetWidth;
    let activeSection;
    indicator.style.width = 20 + sizeIndicator + 'px';

    /* Navigation tabs*/
    const targets = navigation.querySelectorAll('[data-target]');
    targets.forEach(target => {
        target.addEventListener('click', () => {

            /* Removing active class to all elements */
            contentTab.forEach(c => {
                c.classList.remove('active');
            });
            const t = document.querySelector(target.dataset.target);
            t.classList.add('active');
            /* console.log(t) */
        });
    });
    // Change indicator size on display size changing
    const sizeChange = () => {
        sizeIndicator = navigation.querySelector('li').offsetWidth;
        indicator.style.width = `${40+sizeIndicator}px`;
    };
    window.addEventListener('resize', sizeChange);
    const observer = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                /* ------ Transforming into array ------- */
                activeSection = [...sections].indexOf(entrada.target);
                indicator.style.transform = `translateX(${(30+sizeIndicator)*activeSection}px)`;
                if (sizeIndicator > 77) {
                    indicator.style.transform = `translateX(${(75+sizeIndicator)*activeSection}px)`;
                }
                /* indicator.style.transform = `translateX(${129*activeSection}px)`; */
            }
        });
    });
    sections.forEach(section => observer.observe(section));
    /* console.log(listArray) */



});
// Function to set dark/light modes
const setTheme = (themeName) => {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
};

// Function to toggle modes
const toggleThemeMode = () => {
    if (localStorage.getItem('theme') === 'light-mode') {
        setTheme('dark-mode');
    } else {
        setTheme('light-mode');
    }
};