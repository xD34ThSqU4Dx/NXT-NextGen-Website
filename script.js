/* =========================================================
   [NXT] NEXT GEN
   Main JavaScript
   Futuristic Gaming Edition
   ========================================================= */


document.addEventListener("DOMContentLoaded", () => {

    console.log("[NXT] Next Gen Website gestartet");


    /* =====================================================
       NAVBAR
       ===================================================== */

    const navbar =
        document.querySelector(".navbar");


    function updateNavbar() {

        if (!navbar) return;

        if (window.scrollY > 40) {

            navbar.classList.add(
                "navbar-scrolled"
            );

        } else {

            navbar.classList.remove(
                "navbar-scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );

    updateNavbar();



    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const menuToggle =
        document.getElementById(
            "menuToggle"
        );

    const mobileMenu =
        document.getElementById(
            "mobileMenu"
        );


    if (
        menuToggle &&
        mobileMenu
    ) {

        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    mobileMenu.classList.toggle(
                        "open"
                    );


                menuToggle.setAttribute(
                    "aria-expanded",
                    isOpen
                );


                menuToggle.classList.toggle(
                    "active",
                    isOpen
                );

            }
        );


        const mobileLinks =
            mobileMenu.querySelectorAll(
                "a"
            );


        mobileLinks.forEach((link) => {

            link.addEventListener(
                "click",
                () => {

                    mobileMenu.classList.remove(
                        "open"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });

    }



    /* =====================================================
       SCROLL ANIMATIONS
       ===================================================== */

    const animatedElements =
        document.querySelectorAll(
            ".section-title, .game-card, .stat, .event-box, .discord-section"
        );


    animatedElements.forEach(
        (element) => {

            element.classList.add(
                "scroll-hidden"
            );

        }
    );


    const observer =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(
                    (entry) => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        entry.target.classList.add(
                            "visible"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }
                );

            },
            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -50px 0px"
            }
        );


    animatedElements.forEach(
        (element) => {

            observer.observe(
                element
            );

        }
    );



    /* =====================================================
       SMOOTH NAVIGATION
       ===================================================== */

    const navigationLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    navigationLinks.forEach(
        (link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    const navbarHeight =
                        navbar
                            ? navbar.offsetHeight
                            : 0;


                    const targetPosition =
                        target
                            .getBoundingClientRect()
                            .top
                        +
                        window.scrollY
                        -
                        navbarHeight
                        -
                        10;


                    window.scrollTo({

                        top:
                            targetPosition,

                        behavior:
                            "smooth"

                    });

                }
            );

        }
    );



    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".navbar nav a"
        );


    const sectionObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        const id =
                            entry.target.id;


                        navLinks.forEach(
                            (link) => {

                                link.classList.remove(
                                    "active"
                                );


                                if (
                                    link.getAttribute(
                                        "href"
                                    ) ===
                                    `#${id}`
                                ) {

                                    link.classList.add(
                                        "active"
                                    );

                                }

                            }
                        );

                    }
                );

            },
            {
                threshold: 0.35
            }
        );


    sections.forEach(
        (section) => {

            sectionObserver.observe(
                section
            );

        }
    );



    /* =====================================================
       BACKGROUND PARTICLES
       ===================================================== */

    const particleContainer =
        document.createElement(
            "div"
        );


    particleContainer.className =
        "background-particles";


    document.body.prepend(
        particleContainer
    );


    const particleCount =
        window.innerWidth < 700
            ? 18
            : 35;


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const particle =
            document.createElement(
                "span"
            );


        particle.className =
            "particle";


        particle.style.left =
            `${Math.random() * 100}%`;


        particle.style.animationDuration =
            `${8 + Math.random() * 15}s`;


        particle.style.animationDelay =
            `${Math.random() * 12}s`;


        const size =
            1 + Math.random() * 3;


        particle.style.width =
            `${size}px`;


        particle.style.height =
            `${size}px`;


        particleContainer.appendChild(
            particle
        );

    }



    /* =====================================================
       GAME CARD 3D EFFECT
       ===================================================== */

    const gameCards =
        document.querySelectorAll(
            ".game-card"
        );


    gameCards.forEach(
        (card) => {

            const image =
                card.querySelector(
                    ".game-image"
                );


            card.addEventListener(
                "mousemove",
                (event) => {

                    if (
                        window.innerWidth < 900
                    ) {
                        return;
                    }


                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    const centerX =
                        rect.width / 2;


                    const centerY =
                        rect.height / 2;


                    const rotateX =
                        (y - centerY) /
                        25;


                    const rotateY =
                        (centerX - x) /
                        25;


                    card.style.transform =
                        `
                        perspective(900px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        translateY(-8px)
                        scale(1.015)
                        `;


                    if (image) {

                        image.style.transform =
                            `
                            scale(1.1)
                            translate(
                                ${rotateY * 0.25}px,
                                ${rotateX * 0.25}px
                            )
                            `;

                    }

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "";


                    if (image) {

                        image.style.transform =
                            "";

                    }

                }
            );

        }
    );



    /* =====================================================
       HERO MOUSE PARALLAX
       ===================================================== */

    const heroGlow =
        document.querySelector(
            ".hero-glow"
        );

    const heroGrid =
        document.querySelector(
            ".hero-grid"
        );

    const heroLogo =
        document.querySelector(
            ".hero-logo img"
        );


    if (
        heroGlow ||
        heroGrid ||
        heroLogo
    ) {

        window.addEventListener(
            "mousemove",
            (event) => {

                if (
                    window.innerWidth < 800
                ) {
                    return;
                }


                const x =
                    event.clientX /
                    window.innerWidth -
                    0.5;


                const y =
                    event.clientY /
                    window.innerHeight -
                    0.5;


                if (heroGlow) {

                    heroGlow.style.transform =
                        `
                        translate(
                            ${x * -35}px,
                            ${y * -35}px
                        )
                        `;

                }


                if (heroGrid) {

                    heroGrid.style.transform =
                        `
                        translate(
                            ${x * 12}px,
                            ${y * 12}px
                        )
                        `;

                }


                if (heroLogo) {

                    heroLogo.style.transform =
                        `
                        translate(
                            ${x * 5}px,
                            ${y * 5}px
                        )
                        `;

                }

            }
        );

    }



    /* =====================================================
       BUTTON RIPPLE
       ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".button.primary, .discord-button"
        );


    buttons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                (event) => {

                    const href =
                        button.getAttribute(
                            "href"
                        );


                    if (
                        href &&
                        href.startsWith("#") &&
                        href !== "#"
                    ) {
                        return;
                    }


                    const ripple =
                        document.createElement(
                            "span"
                        );


                    ripple.style.position =
                        "absolute";


                    ripple.style.width =
                        "20px";


                    ripple.style.height =
                        "20px";


                    ripple.style.borderRadius =
                        "50%";


                    ripple.style.background =
                        "rgba(255,255,255,0.35)";


                    ripple.style.transform =
                        "translate(-50%, -50%)";


                    ripple.style.pointerEvents =
                        "none";


                    ripple.style.left =
                        `${
                            event.clientX -
                            button.getBoundingClientRect().left
                        }px`;


                    ripple.style.top =
                        `${
                            event.clientY -
                            button.getBoundingClientRect().top
                        }px`;


                    ripple.animate(
                        [
                            {
                                width: "20px",
                                height: "20px",
                                opacity: 0.7
                            },

                            {
                                width: "400px",
                                height: "400px",
                                opacity: 0
                            }
                        ],
                        {
                            duration: 600,
                            easing: "ease-out"
                        }
                    );


                    button.appendChild(
                        ripple
                    );


                    setTimeout(
                        () => {
                            ripple.remove();
                        },
                        650
                    );

                }
            );

        }
    );



    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    const yearElements =
        document.querySelectorAll(
            "[data-year]"
        );


    yearElements.forEach(
        (element) => {

            element.textContent =
                new Date().getFullYear();

        }
    );



    /* =====================================================
       REDUCE MOTION
       ===================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (
        prefersReducedMotion.matches
    ) {

        document.documentElement.style
            .scrollBehavior = "auto";

    }


});