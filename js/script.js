
/* =========================================================
   PAGE LOADER
========================================================= */

window.addEventListener("load", () => {

    const loader = document.querySelector(".loader");

    setTimeout(() => {

        loader.style.opacity = "0";
        loader.style.pointerEvents = "none";

        setTimeout(() => {
            loader.remove();
        }, 700);

    }, 1800);

});


/* =========================================================
   CUSTOM CURSOR
========================================================= */

const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

let mouseX = 0;
let mouseY = 0;

let followerX = 0;
let followerY = 0;

document.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";

});


function animateCursor() {

    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;

    follower.style.left = followerX + "px";
    follower.style.top = followerY + "px";

    requestAnimationFrame(animateCursor);
}

animateCursor();


/* Cursor hover */

const cursorTargets = document.querySelectorAll(
    "a, button, .project-card, .skill-items span"
);

cursorTargets.forEach((element) => {

    element.addEventListener("mouseenter", () => {

        cursor.classList.add("active");
        follower.classList.add("active");

    });

    element.addEventListener("mouseleave", () => {

        cursor.classList.remove("active");
        follower.classList.remove("active");

    });

});


/* =========================================================
   NAVBAR ON SCROLL
========================================================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(
    ".reveal, .reveal-text"
);

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.15
    }
);


revealElements.forEach((element) => {

    observer.observe(element);

});


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveNav() {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navLinks.forEach((link) => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

}

window.addEventListener("scroll", updateActiveNav);


/* =========================================================
   MAGNETIC BUTTON
========================================================= */

const magneticButtons = document.querySelectorAll(
    ".magnetic-btn"
);

magneticButtons.forEach((button) => {

    button.addEventListener("mousemove", (e) => {

        const rect = button.getBoundingClientRect();

        const x =
            e.clientX -
            rect.left -
            rect.width / 2;

        const y =
            e.clientY -
            rect.top -
            rect.height / 2;

        button.style.transform =
            `translate(${x * 0.15}px, ${y * 0.15}px)`;

    });


    button.addEventListener("mouseleave", () => {

        button.style.transform = "translate(0,0)";

    });

});


/* =========================================================
   PROJECT CARD PARALLAX
========================================================= */

const projectCards = document.querySelectorAll(
    ".project-card"
);

projectCards.forEach((card) => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x =
            (e.clientX - rect.left) / rect.width - 0.5;

        const y =
            (e.clientY - rect.top) / rect.height - 0.5;

        const visual =
            card.querySelector(".project-visual");

        if (visual) {

            visual.style.transform =
                `translate(${x * 12}px, ${y * 12}px)`;

        }

    });


    card.addEventListener("mouseleave", () => {

        const visual =
            card.querySelector(".project-visual");

        if (visual) {

            visual.style.transform =
                "translate(0,0)";

        }

    });

});


/* =========================================================
   SMOOTH ANCHOR CLICK
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", function (e) {

        const targetId =
            this.getAttribute("href");

        const target =
            document.querySelector(targetId);

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton = document.querySelector(".menu-btn");
const nav = document.querySelector(".navbar nav");

let menuOpen = false;

menuButton.addEventListener("click", () => {

    menuOpen = !menuOpen;

    if (menuOpen) {

        nav.style.display = "flex";
        nav.style.position = "absolute";
        nav.style.top = "85px";
        nav.style.left = "0";
        nav.style.width = "100%";
        nav.style.padding = "30px";
        nav.style.background = "rgba(11,11,11,.96)";
        nav.style.backdropFilter = "blur(20px)";
        nav.style.flexDirection = "column";
        nav.style.gap = "25px";

    } else {

        nav.style.display = "";

    }

});


/* Close mobile menu after click */

nav.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", () => {

        if (window.innerWidth <= 900) {

            nav.style.display = "";

            menuOpen = false;

        }

    });

});


/* =========================================================
   PARALLAX BACKGROUND TEXT
========================================================= */

const backgroundText =
    document.querySelector(".hero-bg-text");

window.addEventListener("scroll", () => {

    if (!backgroundText) return;

    const scrollValue =
        window.scrollY * 0.12;

    backgroundText.style.transform =
        `translateX(${scrollValue}px)`;

});


/* =========================================================
   YEAR
========================================================= */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* =========================================================
   STAGGER SKILL ANIMATION
========================================================= */

const skillGroups =
    document.querySelectorAll(".skill-group");

skillGroups.forEach((group, index) => {

    group.style.transitionDelay =
        `${index * 0.1}s`;

});


/* =========================================================
   PROJECT IMAGE HOVER TILT
========================================================= */

document.querySelectorAll(".project-card")
    .forEach((card) => {

        card.addEventListener("mousemove", (e) => {

            if (window.innerWidth < 900) return;

            const rect =
                card.getBoundingClientRect();

            const rotateX =
                ((e.clientY - rect.top) / rect.height - 0.5) * -3;

            const rotateY =
                ((e.clientX - rect.left) / rect.width - 0.5) * 3;

            card.style.transform =
                `perspective(1200px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "perspective(1200px) rotateX(0) rotateY(0)";

        });

    });

//* =====================================
//    ABOUT SCROLL ANIMATION
// ===================================== */

/* =====================================================
   ABOUT SCROLL ANIMATION
===================================================== */

const aboutSection =
    document.querySelector("#about");


if (aboutSection) {

    const aboutObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        aboutSection.classList.add(
                            "about-visible"
                        );

                    }

                });

            },

            {
                threshold: 0.2
            }

        );


    aboutObserver.observe(aboutSection);
}


/* =====================================================
   ABOUT PHOTO PARALLAX
===================================================== */

const aboutPhoto =
    document.querySelector(".about-photo img");


if (aboutPhoto) {

    window.addEventListener(
        "scroll",
        () => {

            const rect =
                aboutPhoto.getBoundingClientRect();

            const screen =
                window.innerHeight;

            if (
                rect.top < screen &&
                rect.bottom > 0
            ) {

                const progress =
                    (screen - rect.top) /
                    (screen + rect.height);

                const move =
                    (progress - .5) * 25;

                aboutPhoto.style.transform =
                    `scale(1.08) translateY(${move}px)`;

            }

        },
        {
            passive: true
        }
    );

}


document.addEventListener("mousemove", function(e) {

    const hero = document.querySelector(".hero");
    const cards = document.querySelectorAll(".floating-card");

    if (!hero) return;

    const x = (window.innerWidth / 2 - e.clientX) / 80;
    const y = (window.innerHeight / 2 - e.clientY) / 80;

    cards.forEach((card, index) => {

        const strength = (index + 1) * 0.7;

        card.style.transform =
            `translate(${x * strength}px, ${y * strength}px)`;

    });

});
