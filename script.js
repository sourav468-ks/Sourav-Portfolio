/* =========================================
   MOBILE MENU
========================================= */

const menuButton =
    document.getElementById("menuButton");

const navMenu =
    document.getElementById("navMenu");


menuButton.addEventListener("click", () => {

    navMenu.classList.toggle("open");

});


/* Close menu after clicking a link */

const navLinks =
    document.querySelectorAll(".nav-link");


navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("open");

    });

});


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections =
    document.querySelectorAll("section");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        if (
            window.scrollY >= sectionTop
        ) {

            current =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + current
        ) {

            link.classList.add("active");

        }

    });

});


/* =========================================
   PROJECT DATA
========================================= */

const projects = {

    spam: {

        number: "PROJECT 01",

        title: "Spam Email Classifier",

        icon:
            '<i class="fa-solid fa-envelope"></i>',

        description:
            "A machine learning based email classification project designed to distinguish spam emails from legitimate messages. The project focuses on text preprocessing, feature extraction and classification.",

        technologies: [
            "Python",
            "NumPy",
            "Pandas",
            "Scikit-learn",
            "NLP"
        ],

        github:
            "https://github.com/",

        demo:
            "#"
            
    },


    object: {

        number: "PROJECT 02",

        title: "Object Detection using TensorFlow",

        icon:
            '<i class="fa-solid fa-eye"></i>',

        description:
            "A computer vision project using TensorFlow and transfer learning to detect objects in images. The model uses a pretrained MobileNetV2 backbone with custom detection components.",

        technologies: [
            "Python",
            "TensorFlow",
            "Computer Vision",
            "MobileNetV2"
        ],

        github:
            "https://github.com/",

        demo:
            "#"

    },


    qlearning: {

        number: "PROJECT 03",

        title: "Q-Learning Grid Game",

        icon:
            '<i class="fa-solid fa-gamepad"></i>',

        description:
            "A reinforcement learning experiment where an agent learns to navigate a grid environment using Q-learning. The project demonstrates states, actions, rewards and policy improvement.",

        technologies: [
            "Python",
            "Q-Learning",
            "NumPy",
            "Gymnasium"
        ],

        github:
            "https://github.com/",

        demo:
            "#"

    },


    assistant: {

        number: "PROJECT 04",

        title: "AI Personal Assistant",

        icon:
            '<i class="fa-solid fa-robot"></i>',

        description:
            "An experimental personal assistant interface designed around AI features, system information, web tools and computer interaction.",

        technologies: [
            "Python",
            "AI",
            "HTML",
            "CSS",
            "JavaScript"
        ],

        github:
            "https://github.com/",

        demo:
            "#"

    }

};


/* =========================================
   OPEN PROJECT
========================================= */

function openProject(projectId) {

    const project =
        projects[projectId];


    if (!project) {

        return;

    }


    document.getElementById(
        "modalNumber"
    ).textContent =
        project.number;


    document.getElementById(
        "modalTitle"
    ).textContent =
        project.title;


    document.getElementById(
        "modalIcon"
    ).innerHTML =
        project.icon;


    document.getElementById(
        "modalDescription"
    ).textContent =
        project.description;


    const technologyContainer =
        document.getElementById(
            "modalTechnologies"
        );


    technologyContainer.innerHTML = "";


    project.technologies.forEach(
        technology => {

            const tag =
                document.createElement("span");

            tag.textContent =
                technology;

            technologyContainer.appendChild(
                tag
            );

        }
    );


    document.getElementById(
        "modalGithub"
    ).href =
        project.github;


    document.getElementById(
        "modalDemo"
    ).href =
        project.demo;


    document.getElementById(
        "projectModal"
    ).classList.add("show");


    document.body.style.overflow =
        "hidden";

}


/* =========================================
   CLOSE PROJECT
========================================= */

function closeProject() {

    document.getElementById(
        "projectModal"
    ).classList.remove("show");


    document.body.style.overflow =
        "";
}


/* Close modal by clicking outside */

document.getElementById(
    "projectModal"
).addEventListener("click", event => {

    if (
        event.target.id ===
        "projectModal"
    ) {

        closeProject();

    }

});


/* Close modal with ESC */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeProject();

        }

    }
);


// ===============================
// CONTACT FORM
// ===============================

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formMessage");

if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            formStatus.textContent = "Please fill in all fields.";
            formStatus.className = "form-message error";
            return;
        }

        formStatus.textContent = "Sending message...";
        formStatus.className = "form-message";

        try {

            const response = await fetch(
                "https://sourav-portfolio-hxxe.onrender.com/api/contact",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name: name,
                        email: email,
                        message: message
                    })
                }
            );

            const result = await response.json();

            if (result.success) {

                formStatus.textContent = "Message sent successfully!";
                formStatus.className = "form-message success";

                contactForm.reset();

            } else {

                formStatus.textContent = result.message;
                formStatus.className = "form-message error";
            }

        } catch (error) {

            console.error("Contact form error:", error);

            formStatus.textContent =
                "Unable to connect to the server.";

            formStatus.className = "form-message error";
        }
    });
}


/* =========================================
   SCROLL REVEAL
========================================= */

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "visible"
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


sections.forEach(section => {

    observer.observe(section);

});


/* =========================================
   FOOTER YEAR
========================================= */

document.getElementById(
    "year"
).textContent =
    new Date().getFullYear();


/* =========================================
   AI NETWORK BACKGROUND
========================================= */

const canvas =
    document.getElementById("networkCanvas");

const ctx =
    canvas.getContext("2d");


let particles = [];

let animationFrame;


/* =========================================
   RESIZE CANVAS
========================================= */

function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

    createParticles();
}


window.addEventListener(
    "resize",
    resizeCanvas
);


/* =========================================
   CREATE PARTICLES
========================================= */

function createParticles() {

    particles = [];

    const particleCount =
        window.innerWidth < 700
            ? 45
            : 85;


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        particles.push({

            x:
                Math.random() *
                canvas.width,

            y:
                Math.random() *
                canvas.height,

            radius:
                Math.random() *
                2 +
                0.5,

            vx:
                (Math.random() - 0.5)
                * 0.25,

            vy:
                (Math.random() - 0.5)
                * 0.25,

            alpha:
                Math.random() *
                0.6 +
                0.15

        });

    }

}


/* =========================================
   DRAW PARTICLES
========================================= */

function drawParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    for (
        let i = 0;
        i < particles.length;
        i++
    ) {

        const p =
            particles[i];


        /* Move */

        p.x += p.vx;
        p.y += p.vy;


        /* Screen wrapping */

        if (p.x < 0)
            p.x = canvas.width;

        if (p.x > canvas.width)
            p.x = 0;

        if (p.y < 0)
            p.y = canvas.height;

        if (p.y > canvas.height)
            p.y = 0;


        /* Glow */

        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.radius,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            `rgba(0, 229, 255, ${p.alpha})`;


        ctx.shadowBlur = 15;

        ctx.shadowColor =
            "rgba(0, 229, 255, 0.8)";


        ctx.fill();

    }


    /* =====================================
       CONNECTION LINES
    ===================================== */

    for (
        let i = 0;
        i < particles.length;
        i++
    ) {

        for (
            let j = i + 1;
            j < particles.length;
            j++
        ) {

            const p1 =
                particles[i];

            const p2 =
                particles[j];


            const dx =
                p1.x - p2.x;

            const dy =
                p1.y - p2.y;


            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            const maxDistance =
                window.innerWidth < 700
                    ? 100
                    : 140;


            if (
                distance <
                maxDistance
            ) {

                const opacity =
                    (1 -
                        distance /
                        maxDistance)
                    * 0.22;


                ctx.beginPath();

                ctx.moveTo(
                    p1.x,
                    p1.y
                );

                ctx.lineTo(
                    p2.x,
                    p2.y
                );


                ctx.strokeStyle =
                    `rgba(
                        0,
                        229,
                        255,
                        ${opacity}
                    )`;


                ctx.lineWidth =
                    0.7;

                ctx.stroke();

            }

        }

    }


    animationFrame =
        requestAnimationFrame(
            drawParticles
        );

}


/* =========================================
   START
========================================= */

resizeCanvas();

drawParticles();