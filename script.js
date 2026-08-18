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
                    String(isOpen)
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


        mobileLinks.forEach(
            (link) => {

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


                        menuToggle.classList.remove(
                            "active"
                        );

                    }
                );

            }
        );

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


    if (
        "IntersectionObserver" in window
    ) {

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

    } else {

        animatedElements.forEach(
            (element) => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }



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


    if (
        "IntersectionObserver" in window
    ) {

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

    }



    /* =====================================================
       BACKGROUND PARTICLES
       ===================================================== */

    const particleContainer =
        document.getElementById(
            "backgroundParticles"
        );


    if (particleContainer) {

        /*
         * Der Container ist bereits
         * in der HTML vorhanden.
         *
         * Dadurch wird kein zweiter
         * Container erzeugt.
         */

        particleContainer.innerHTML = "";


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


            particle.style.top =
                `${Math.random() * 100}%`;


           