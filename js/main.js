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

    // Paper Modal
    const paperModal = document.getElementById("paperModal");
    const closePaperModal = document.getElementById("closePaperModal");
    const paperPreview = document.getElementById("paperPreview");
    const downloadPaper = document.getElementById("downloadPaper");
    const paperModalTitle = document.getElementById("paperModalTitle");

    document.querySelectorAll(".paper-button").forEach((button) => {
        button.addEventListener("click", function (e) {
            e.preventDefault();

            const paperPath = this.getAttribute("data-paper");
            const paperTitle = this.textContent.trim();

            if (!paperPath) return;

            paperModalTitle.textContent = paperTitle;

            paperPreview.innerHTML = `
                <iframe src="${paperPath}"></iframe>
            `;

            downloadPaper.href = paperPath;
            downloadPaper.setAttribute("download", paperPath.split('/').pop());

            paperModal.classList.add("show");
            document.body.style.overflow = "hidden";
        });
    });

    closePaperModal.addEventListener("click", function () {
        paperModal.classList.remove("show");
        document.body.style.overflow = "auto";
    });

    paperModal.addEventListener("click", function (event) {
        if (event.target === paperModal) {
            paperModal.classList.remove("show");
            document.body.style.overflow = "auto";
        }
    });

    document.addEventListener("keydown", function (event) {
        if (!paperModal.classList.contains("show")) return;

        if (event.key === "Escape") {
            paperModal.classList.remove("show");
            document.body.style.overflow = "auto";
        }
    });
});