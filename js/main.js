const techIcons = [
    { name: "Python", image: "images/python.png" },
    { name: "Java", image: "images/java.svg" },
    { name: "JavaScript", image: "images/js.png" },
    { name: "TypeScript", image: "images/typescript.png" },
    { name: "HTML", image: "images/html.png" },
    { name: "CSS", image: "images/css.png" },
    { name: "C", image: "images/c.png" },
    { name: "PostgreSQL", image: "images/postgresql.png" },
    { name: "MySQL", image: "images/mysql.png" },
    { name: "DuckDB", image: "images/duckdb.png" },
    { name: "AWS", image: "images/aws.png" },
    { name: "Cloudflare", image: "images/cloudflare.png" },
    { name: "Git", image: "images/git.png" },
    { name: "Docker", image: "images/docker.webp" },
    { name: "React", image: "images/react.png" },
    { name: "Next.js", image: "images/nextjs.png" },
    { name: "Prisma", image: "images/prisma.png" },
    { name: "Jest", image: "images/jest.png" },
    { name: "Terraform", image: "images/terraform.png" },
    { name: "Vercel", image: "images/vercel.svg" },
];

function createTechCarouselItems() {
    const carousel = document.getElementById("techCarousel");
    let carouselHTML = "";

    techIcons.forEach((tech) => {
        carouselHTML += `
      <div class="tech-icon">
        <img src="${tech.image}" alt="${tech.name}" />
        <p>${tech.name}</p>
      </div>
    `;
    });

    carouselHTML += carouselHTML;
    carousel.innerHTML = carouselHTML;
}

function createTechGridItems() {
    const grid = document.getElementById("techGrid");
    let gridHTML = "";

    techIcons.forEach((tech) => {
        gridHTML += `
      <div class="tech-grid-item">
        <img src="${tech.image}" alt="${tech.name}" />
        <p>${tech.name}</p>
      </div>
    `;
    });

    grid.innerHTML = gridHTML;
}

document.addEventListener("DOMContentLoaded", function () {
    createTechCarouselItems();
    createTechGridItems();

    // Smooth scrolling for navigation links
    document
        .querySelectorAll("#main-nav .nav-links a")
        .forEach((anchor) => {
            anchor.addEventListener("click", function (e) {
                e.preventDefault();
                const targetId = this.getAttribute("href");
                const targetElement = document.querySelector(targetId);
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: "smooth",
                });
            });
        });

    // Add active class to nav items on scroll
    window.addEventListener("scroll", () => {
        const sections = document.querySelectorAll("section");
        const navLinks = document.querySelectorAll("#main-nav a");

        let current = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").substring(1) === current) {
                link.classList.add("active");
            }
        });
    });

    // Tech modal functionality
    const modal = document.getElementById("techModal");
    const viewAllBtn = document.getElementById("viewAllTech");
    const closeModal = document.getElementById("closeModal");

    viewAllBtn.addEventListener("click", function () {
        modal.classList.add("show");
        document.body.style.overflow = "hidden";
    });

    closeModal.addEventListener("click", function () {
        modal.classList.remove("show");
        document.body.style.overflow = "auto";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.classList.remove("show");
            document.body.style.overflow = "auto";
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && modal.classList.contains("show")) {
            modal.classList.remove("show");
            document.body.style.overflow = "auto";
        }
    });

    // Project details toggle functionality
    document.querySelectorAll(".details-toggle").forEach((button) => {
        button.addEventListener("click", function () {
            const projectContent = this.closest(".project-content");
            const detailsSection = projectContent.querySelector(".project-details");

            projectContent.classList.toggle("expanded");

            if (projectContent.classList.contains("expanded")) {
                detailsSection.style.maxHeight = detailsSection.scrollHeight + "px";
            } else {
                detailsSection.style.maxHeight = "0px";
            }
        });
    });

    // Project media modal
    const mediaModal = document.getElementById("projectMediaModal");
    const closeMediaModal = document.getElementById("closeMediaModal");
    const mediaSlides = document.getElementById("mediaSlides");
    const mediaIndicators = document.getElementById("mediaIndicators");
    const prevButton = document.getElementById("prevMedia");
    const nextButton = document.getElementById("nextMedia");
    const modalTitle = document.getElementById("mediaModalTitle");

    const projectMedia = {
        project2: {
            title: "E-commerce Platform",
            type: "video",
            items: ["videos/extension-demo.mp4"],
        },
        project3: {
            title: "Browser Web Extension",
            type: "screenshots",
            items: [
                "images/projects/extension/screenshot1.jpg",
                "images/projects/extension/screenshot2.jpg",
            ],
        },
        project4: {
            title: "Color Identifier",
            type: "video",
            items: ["videos/color-identifier-demo.mp4"],
        },
    };

    let currentSlide = 0;
    let currentProject = null;

    document.querySelectorAll(".media-button").forEach((button) => {
        button.addEventListener("click", function (e) {
            e.preventDefault();

            const projectId = this.getAttribute("data-project");
            const media = projectMedia[projectId];

            if (!media) return;

            modalTitle.textContent =
                media.title + (media.type === "screenshots" ? " Screenshots" : " Demo");
            currentProject = projectId;

            mediaSlides.innerHTML = "";
            mediaIndicators.innerHTML = "";

            media.items.forEach((item, index) => {
                const slide = document.createElement("div");
                slide.className = "media-slide" + (index === 0 ? " active" : "");

                if (media.type === "video") {
                    slide.innerHTML = `
                        <video controls>
                            <source src="${item}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    `;
                } else {
                    slide.innerHTML = `<img src="${item}" alt="${media.title} screenshot ${index + 1}">`;
                }

                mediaSlides.appendChild(slide);

                const indicator = document.createElement("div");
                indicator.className = "indicator" + (index === 0 ? " active" : "");
                indicator.setAttribute("data-index", index);
                mediaIndicators.appendChild(indicator);
            });

            if (media.items.length <= 1) {
                prevButton.style.display = "none";
                nextButton.style.display = "none";
                mediaIndicators.style.display = "none";
            } else {
                prevButton.style.display = "flex";
                nextButton.style.display = "flex";
                mediaIndicators.style.display = "flex";
            }

            currentSlide = 0;


            mediaModal.classList.add("show");
            document.body.style.overflow = "hidden";
        });
    });

    closeMediaModal.addEventListener("click", function () {
        mediaModal.classList.remove("show");
        document.body.style.overflow = "auto";

        const videos = mediaSlides.querySelectorAll("video");
        videos.forEach((video) => video.pause());
    });

    mediaModal.addEventListener("click", function (event) {
        if (event.target === mediaModal) {
            mediaModal.classList.remove("show");
            document.body.style.overflow = "auto";

            const videos = mediaSlides.querySelectorAll("video");
            videos.forEach((video) => video.pause());
        }
    });

    prevButton.addEventListener("click", function () {
        if (!currentProject) return;

        const slides = mediaSlides.querySelectorAll(".media-slide");
        const indicators = mediaIndicators.querySelectorAll(".indicator");

        if (slides.length <= 1) return;

        slides[currentSlide].classList.remove("active");
        indicators[currentSlide].classList.remove("active");

        currentSlide = (currentSlide - 1 + slides.length) % slides.length;

        slides[currentSlide].classList.add("active");
        indicators[currentSlide].classList.add("active");
    });

    nextButton.addEventListener("click", function () {
        if (!currentProject) return;

        const slides = mediaSlides.querySelectorAll(".media-slide");
        const indicators = mediaIndicators.querySelectorAll(".indicator");

        if (slides.length <= 1) return;

        slides[currentSlide].classList.remove("active");
        indicators[currentSlide].classList.remove("active");

        currentSlide = (currentSlide + 1) % slides.length;

        slides[currentSlide].classList.add("active");
        indicators[currentSlide].classList.add("active");
    });

    mediaIndicators.addEventListener("click", function (e) {
        if (e.target.classList.contains("indicator")) {
            const index = parseInt(e.target.getAttribute("data-index"));

            const slides = mediaSlides.querySelectorAll(".media-slide");
            const indicators = mediaIndicators.querySelectorAll(".indicator");

            slides[currentSlide].classList.remove("active");
            indicators[currentSlide].classList.remove("active");

            currentSlide = index;

            slides[currentSlide].classList.add("active");
            indicators[currentSlide].classList.add("active");
        }
    });

    document.addEventListener("keydown", function (event) {
        if (!mediaModal.classList.contains("show")) return;

        if (event.key === "Escape") {
            mediaModal.classList.remove("show");
            document.body.style.overflow = "auto";

            const videos = mediaSlides.querySelectorAll("video");
            videos.forEach((video) => video.pause());
        } else if (event.key === "ArrowLeft") {
            prevButton.click();
        } else if (event.key === "ArrowRight") {
            nextButton.click();
        }
    });
});
