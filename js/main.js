    //Variables:
    const toggleBtn = document.querySelector('.mobile-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const navContainer = document.querySelector('.nav-container');
    const mobileNavContainer = document.querySelector('.mobile-nav-list');
    const freeTrialBtn = document.querySelector('.free-trial-btn');
    const starterOldPrice = document.querySelector('.starter-old-price');
    const starterNewPrice = document.querySelector('.starter-new-price');
    const proOldPrice = document.querySelector('.pro-old-price');
    const proNewPrice = document.querySelector('.pro-new-price');
    const starterPaidPeriod = document.querySelector('.starter-paid-period');
    const proPaidPeriod = document.querySelector('.pro-paid-period');
    const planPeriodEl = document.querySelector('.plan-period');
    const faqItems = document.querySelector('.faq-items');

    let paidPeriod = 'quarterly';

    //Function: Toggle Nav
    function toggleNav(e) {
        e.stopPropagation();
        if (e.currentTarget.classList.contains('nav-open')) {
            e.currentTarget.classList.remove('nav-open');
            mobileNav.style.width = 0;
        } else {
            e.currentTarget.classList.add('nav-open');
            mobileNav.style.width = '200px';
        }
    }

    //Function: Smooth Scroll
    function smoothScroll(e) {
        e.preventDefault();
        const item = e.target;
        const itemTarget = item.dataset.target;
        if (itemTarget) {
            const section = document.querySelector(`.${ itemTarget }`);
            const sectionPosition = section.offsetTop;

            window.scrollTo({
                top: sectionPosition,
                behavior: 'smooth'
            });
        }
    }

    //Function: Set Paid Period
    function setPaidPeriod() {
        if (paidPeriod === 'quarterly') {
            starterOldPrice.textContent = '450';
            starterNewPrice.textContent = '350';
            proOldPrice.textContent = '550';
            proNewPrice.textContent = '450';
            starterPaidPeriod.textContent = 'Paid Quarterly';
            proPaidPeriod.textContent = 'Paid Quarterly';
        } else if (paidPeriod === 'monthly') {
            starterOldPrice.textContent = '500';
            starterNewPrice.textContent = '400';
            proOldPrice.textContent = '600';
            proNewPrice.textContent = '500';
            starterPaidPeriod.textContent = 'Paid Monthly';
            proPaidPeriod.textContent = 'Paid Monthly';
        }
    }

    //Function: Show Faqs
    function showFaqs() {
        const faqItem = document.querySelectorAll('.faq-item');

        faqItem.forEach(item => {
            const itemTitle = item.querySelector('.item-title');
            itemTitle.addEventListener('click', e => {
                const element = e.currentTarget;
                const itemContent = element.nextElementSibling;
                const itemTarget = itemContent.querySelector('p');
                const itemTargetHeight = itemTarget.getBoundingClientRect().height;
                if (element.classList.contains('active')) {
                    element.classList.remove('active');
                    itemContent.style.maxHeight = 0;
                } else {
                    faqItems.querySelectorAll('.item-title').forEach(item => item.classList.remove('active'));
                    faqItems.querySelectorAll('.item-content').forEach(item => item.style.maxHeight = 0);
                    itemTitle.classList.add('active');
                    itemContent.style.maxHeight = `${ itemTargetHeight }px`;
                }
            });
        });
    }

    //for index.html
    if (window.location.pathname === '/agencylancer-website-clone/') {
        //Event: DOM Content Loaded
        document.addEventListener('DOMContentLoaded', () => {
            //set paid period 
            setPaidPeriod();
            //show faqs
            showFaqs();
            //set current year;
            document.querySelector('.footer-year').textContent = new Date().getFullYear();
        });

        //Event: Choose Plan Period
        planPeriodEl.addEventListener('click', e => {
            const element = e.target;
            e.currentTarget.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
            element.classList.add('active');
            if (element.textContent === 'Monthly') {
                paidPeriod = 'monthly';
                setPaidPeriod();
            } else if (element.textContent === 'Quarterly') {
                paidPeriod = 'quarterly';
                setPaidPeriod();
            }
        });

        //Event: Smooth Scroll Main Navigation
        navContainer.addEventListener('click', smoothScroll);
        //Event: Smooth Scroll Mobile Navigation
        mobileNavContainer.addEventListener('click', smoothScroll);
        //Event: Free Trial Btn Smooth Scroll
        freeTrialBtn.addEventListener('click', smoothScroll);

        //Team OwlCarousel
        $('.team-owl-carousel').owlCarousel({
            loop: true,
            margin: 10,
            nav: false,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2
                },
                992: {
                    items: 3
                },
                1200: {
                    items: 4
                }
            }
        });
        //Portfolio OwlCarousel
        $('.portfolio-owl-carousel').owlCarousel({
            loop: true,
            margin: 10,
            nav: false,
            dots: true,
            dotsEach: true,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 2
                },
                768: {
                    items: 3
                },
                992: {
                    items: 4
                }
            }
        });
    }

    //for index.html nad faq-page.html
    if (window.location.pathname === '/agencylancer-website-clone/' || 
        window.location.pathname === '/agencylancer-website-clone/faq-page.html') {
        //Event: Open / Close Mobile Navigation
        toggleBtn.addEventListener('click', toggleNav);

        //Event: Hide Mobile Navigation with click on window
        window.addEventListener('click', e => {
            if (toggleBtn.classList.contains('nav-open')) {
                if (e.target !== mobileNav && e.target !== toggleBtn) {
                    mobileNav.style.width = 0;
                    toggleBtn.classList.remove('nav-open');
                }
            }
        });
    }