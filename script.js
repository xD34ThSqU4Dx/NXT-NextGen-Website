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


            const size =
                1 + Math.random() * 3;


            particle.style.width =
                `${size}px`;


            particle.style.height =
                `${size}px`;


            particle.style.animationDuration =
                `${8 + Math.random() * 15}s`;


            particle.style.animationDelay =
                `${Math.random() * -15}s`;


            particle.style.opacity =
                `${0.25 + Math.random() * 0.65}`;


            particleContainer.appendChild(
                particle
            );

        }

    }



    /* =====================================================
       DISCORD MITGLIEDER
       ===================================================== */

    const memberCountElement =
        document.getElementById(
            "discordMemberCount"
        );


    async function loadDiscordMemberCount() {

        if (!memberCountElement) {
            return;
        }


        try {

            memberCountElement.textContent =
                "…";


            const response =
    await fetch(
        "https://politicians-notes-june-lock.trycloudflare.com/api/discord/members",
        {
            method: "GET",
            cache: "no-store"
        }
    );


            if (!response.ok) {

                throw new Error(
                    `HTTP ${response.status}`
                );

            }


            const data =
                await response.json();


            if (
                typeof data.members !== "number"
            ) {

                throw new Error(
                    "Ungültige Mitgliederzahl"
                );

            }


            memberCountElement.textContent =
                data.members;


            console.log(
                `[NXT] Discord Mitglieder: ${data.members}`
            );


        } catch (error) {

            console.error(
                "[NXT] Discord Mitglieder konnten nicht geladen werden:",
                error
            );


            /*
             * Wenn die API nicht erreichbar ist,
             * bleibt die Anzeige nicht bei "…".
             */

            memberCountElement.textContent =
                "—";

        }

    }


    loadDiscordMemberCount();



    /* =====================================================
       MOUSE EFFECT ELEMENTS
       ===================================================== */

    const particles =
        document.querySelectorAll(
            ".particle"
        );


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


    const backgroundGlows =
        document.querySelectorAll(
            ".background-glow"
        );


    const smokeElements =
        document.querySelectorAll(
            ".smoke"
        );


    /*
     * EIN einziger globaler mousemove Listener.
     *
     * Dieser steuert:
     *
     * - Partikel
     * - Hero Glow
     * - Hero Grid
     * - Hero Logo
     * - Background Glows
     * - Smoke
     *
     * Der Listener läuft nur auf Desktop.
     */

    const mouseEffectsEnabled =
        window.innerWidth >= 800 &&
        (
            particles.length > 0 ||
            heroGlow ||
            heroGrid ||
            heroLogo ||
            backgroundGlows.length > 0 ||
            smokeElements.length > 0
        );


    if (mouseEffectsEnabled) {

        let targetMouseX = 0;
        let targetMouseY = 0;

        let currentMouseX = 0;
        let currentMouseY = 0;


        let animationFrameId = null;


        /* =================================================
           MOUSE POSITION
           ================================================= */

        window.addEventListener(
            "mousemove",
            (event) => {

                targetMouseX =
                    event.clientX /
                    window.innerWidth -
                    0.5;


                targetMouseY =
                    event.clientY /
                    window.innerHeight -
                    0.5;

            },
            { passive: true }
        );


        /* =================================================
           ZENTRALE MOUSE ANIMATION
           ================================================= */

        function animateMouseEffects() {

            currentMouseX +=
                (
                    targetMouseX -
                    currentMouseX
                ) * 0.025;


            currentMouseY +=
                (
                    targetMouseY -
                    currentMouseY
                ) * 0.025;



            /* =============================================
               PARTICLES
               ============================================= */

            particles.forEach(
                (particle, index) => {

                    const depth =
                        (index % 5 + 1) * 3;


                    particle.style.translate =
                        `
                        ${currentMouseX * depth}px
                        ${currentMouseY * depth}px
                        `;

                }
            );



            /* =============================================
               HERO GLOW
               ============================================= */

            if (heroGlow) {

                heroGlow.style.transform =
                    `
                    translate(
                        ${currentMouseX * -35}px,
                        ${currentMouseY * -35}px
                    )
                    `;

            }



            /* =============================================
               HERO GRID
               ============================================= */

            if (heroGrid) {

                heroGrid.style.transform =
                    `
                    translate(
                        ${currentMouseX * 12}px,
                        ${currentMouseY * 12}px
                    )
                    `;

            }



            /* =============================================
               HERO LOGO
               ============================================= */

            if (heroLogo) {

                heroLogo.style.transform =
                    `
                    translate(
                        ${currentMouseX * 5}px,
                        ${currentMouseY * 5}px
                    )
                    `;

            }



            /* =============================================
               BACKGROUND GLOWS
               ============================================= */

            backgroundGlows.forEach(
                (glow, index) => {

                    const strength =
                        15 + index * 10;


                    glow.style.transform =
                        `
                        translate(
                            ${currentMouseX * strength}px,
                            ${currentMouseY * strength}px
                        )
                        `;

                }
            );



            /* =============================================
               SMOKE
               ============================================= */

            smokeElements.forEach(
                (smoke, index) => {

                    const strength =
                        10 + index * 8;


                    smoke.style.setProperty(
                        "--mouse-x",
                        `${currentMouseX * strength}px`
                    );


                    smoke.style.setProperty(
                        "--mouse-y",
                        `${currentMouseY * strength}px`
                    );

                }
            );


            animationFrameId =
                requestAnimationFrame(
                    animateMouseEffects
                );

        }


        animationFrameId =
            requestAnimationFrame(
                animateMouseEffects
            );


        /*
         * Animation stoppen, wenn die Seite
         * nicht sichtbar ist.
         */

        document.addEventListener(
            "visibilitychange",
            () => {

                if (
                    document.hidden
                ) {

                    if (
                        animationFrameId
                    ) {

                        cancelAnimationFrame(
                            animationFrameId
                        );

                        animationFrameId =
                            null;

                    }

                } else if (
                    !animationFrameId
                ) {

                    animationFrameId =
                        requestAnimationFrame(
                            animateMouseEffects
                        );

                }

            }
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

                },
                { passive: true }
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


                    ripple.className =
                        "button-ripple";


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


                    const rect =
                        button.getBoundingClientRect();


                    ripple.style.left =
                        `${
                            event.clientX -
                            rect.left
                        }px`;


                    ripple.style.top =
                        `${
                            event.clientY -
                            rect.top
                        }px`;


                    button.appendChild(
                        ripple
                    );


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


        document.body.classList.add(
            "reduce-motion"
        );

    }

});
