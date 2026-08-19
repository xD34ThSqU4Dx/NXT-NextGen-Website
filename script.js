/* =========================================================
   [NXT] NEXT GEN
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("[NXT] Next Gen Website gestartet");


    /* =====================================================
       ELEMENTS
       ===================================================== */

    const navbar =
        document.querySelector(".navbar");

    const menuToggle =
        document.querySelector("#menuToggle");

    const mobileMenu =
        document.querySelector("#mobileMenu");

    const mobileLinks =
        document.querySelectorAll(
            ".mobile-menu a"
        );

    const memberCountElements =
        document.querySelectorAll(
            "#discordMemberCount, [data-discord-members]"
        );

    const heroGlow =
        document.querySelector(".hero-glow");


    /* =====================================================
       NAVBAR SCROLL EFFECT
       ===================================================== */

    function updateNavbar() {

        if (!navbar) {
            return;
        }

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

    function closeMobileMenu() {

        if (!mobileMenu || !menuToggle) {
            return;
        }

        mobileMenu.classList.remove("active");
        mobileMenu.classList.remove("open");

        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Menü öffnen"
        );

    }


    function openMobileMenu() {

        if (!mobileMenu || !menuToggle) {
            return;
        }

        mobileMenu.classList.add("active");
        mobileMenu.classList.add("open");

        menuToggle.classList.add("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Menü schließen"
        );

    }


    if (menuToggle && mobileMenu) {

        menuToggle.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                const isOpen =
                    mobileMenu.classList.contains(
                        "active"
                    );

                if (isOpen) {

                    closeMobileMenu();

                } else {

                    openMobileMenu();

                }

            }
        );


        mobileLinks.forEach(
            (link) => {

                link.addEventListener(
                    "click",
                    () => {

                        closeMobileMenu();

                    }
                );

            }
        );


        document.addEventListener(
            "click",
            (event) => {

                if (
                    !mobileMenu.contains(
                        event.target
                    ) &&
                    !menuToggle.contains(
                        event.target
                    )
                ) {

                    closeMobileMenu();

                }

            }
        );


        document.addEventListener(
            "keydown",
            (event) => {

                if (event.key === "Escape") {

                    closeMobileMenu();

                }

            }
        );


        window.addEventListener(
            "resize",
            () => {

                if (window.innerWidth > 850) {

                    closeMobileMenu();

                }

            }
        );

    }


    /* =====================================================
       SCROLL ANIMATIONS
       ===================================================== */

    const animatedElements =
        document.querySelectorAll(
            ".section-title, " +
            ".game-card, " +
            ".stat, " +
            ".event-box, " +
            ".discord-section"
        );


    animatedElements.forEach(
        (element) => {

            element.classList.add(
                "scroll-hidden"
            );

        }
    );


    if ("IntersectionObserver" in window) {

        const animationObserver =
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

                animationObserver.observe(
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


                    closeMobileMenu();


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
        "IntersectionObserver" in window &&
        sections.length &&
        navLinks.length
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
                    threshold: 0.35,

                    rootMargin:
                        "-80px 0px -40% 0px"
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
       GAME CARD HOVER EFFECT
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


            if (!image) {
                return;
            }


            card.addEventListener(
                "mouseenter",
                () => {

                    image.style.transform =
                        "scale(1.08)";

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    image.style.transform =
                        "scale(1)";

                }
            );

        }
    );


    /* =====================================================
       HERO PARALLAX
       ===================================================== */

    if (heroGlow) {

        window.addEventListener(
            "mousemove",
            (event) => {

                if (
                    window.innerWidth < 700
                ) {

                    return;

                }


                const x =
                    (
                        event.clientX /
                        window.innerWidth
                        - 0.5
                    ) * 25;


                const y =
                    (
                        event.clientY /
                        window.innerHeight
                        - 0.5
                    ) * 25;


                heroGlow.style.transform =
                    `translate(${x}px, ${y}px)`;

            }
        );

    }


    /* =====================================================
       BUTTON RIPPLE EFFECT
       ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".button.primary, " +
            ".discord-button"
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


                    ripple.classList.add(
                        "button-ripple"
                    );


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


                    setTimeout(
                        () => {

                            ripple.remove();

                        },
                        600
                    );

                }
            );

        }
    );


    /* =====================================================
       DISCORD MITGLIEDERZAHL
       ===================================================== */

    async function loadDiscordMembers() {

        if (
            !memberCountElements.length
        ) {

            console.log(
                "[NXT] Kein Discord-Mitglieder-Element gefunden."
            );

            return;

        }


        const apiUrl =
            "https://fifth-verification-exams-walks.trycloudflare.com/api/discord/members";


        try {

            console.log(
                "[NXT] Lade Discord Mitglieder..."
            );


            const response =
                await fetch(
                    apiUrl,
                    {
                        method: "GET",

                        cache: "no-store",

                        headers: {
                            "Accept":
                                "application/json"
                        }
                    }
                );


            if (!response.ok) {

                throw new Error(
                    `HTTP ${response.status}`
                );

            }


            const data =
                await response.json();


            const memberCount =
                Number(data.members);


            if (
                !Number.isFinite(
                    memberCount
                )
            ) {

                throw new Error(
                    "Ungültige Mitgliederzahl von der API."
                );

            }


            memberCountElements.forEach(
                (element) => {

                    element.textContent =
                        memberCount.toLocaleString(
                            "de-DE"
                        );

                }
            );


            console.log(
                `[NXT] Discord Mitglieder geladen: ${memberCount}`
            );


        } catch (error) {

            console.error(
                "[NXT] Fehler beim Laden der Discord Mitglieder:",
                error
            );


            memberCountElements.forEach(
                (element) => {

                    element.textContent =
                        "—";

                }
            );

        }

    }


    loadDiscordMembers();


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
                new Date()
                    .getFullYear();

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


        document
            .querySelectorAll("*")
            .forEach(
                (element) => {

                    element.style.animationDuration =
                        "0.01ms";


                    element.style.animationIterationCount =
                        "1";


                    element.style.transitionDuration =
                        "0.01ms";

                }
            );

    }


    /* =====================================================
       FINISHED
       ===================================================== */

    console.log(
        "[NXT] Alle Website-Funktionen geladen"
    );

});
