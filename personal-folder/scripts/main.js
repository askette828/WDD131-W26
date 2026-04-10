import { projects, skills } from "./data.js";

function getThemeToggle() {
    return document.getElementById("theme-toggle");
}

function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    document.body.dataset.theme = theme;

    const themeToggle = getThemeToggle();
    if (themeToggle) {
        themeToggle.textContent = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
        themeToggle.setAttribute("aria-label", themeToggle.textContent);
    }
}

function initializeTheme() {
    const savedTheme = localStorage.getItem("theme");
    const theme = savedTheme === "dark" ? "dark" : "light";

    applyTheme(theme);

    const themeToggle = getThemeToggle();
    if (themeToggle && themeToggle.dataset.bound !== "true") {
        themeToggle.dataset.bound = "true";
        themeToggle.addEventListener("click", () => {
            const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
            applyTheme(nextTheme);
            localStorage.setItem("theme", nextTheme);
        });
    }
}

function initializeResponsiveMenu() {
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("primary-navigation");

    if (!menuToggle || !navLinks) {
        return;
    }

    const setExpanded = (isExpanded) => {
        menuToggle.setAttribute("aria-expanded", String(isExpanded));
        navLinks.classList.toggle("open", isExpanded);
    };

    setExpanded(false);

    menuToggle.addEventListener("click", () => {
        const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
        setExpanded(!isExpanded);
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 900) {
                setExpanded(false);
            }
        });
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            setExpanded(false);
        }
    });
}

function renderSkills() {
    const skillsContainer = document.querySelector(".skills-container");
    if (!skillsContainer) {
        return;
    }

    skillsContainer.innerHTML = "";

    skills.forEach((skill) => {
        const skillElement = document.createElement("article");
        skillElement.className = "skill";
        skillElement.innerHTML = `
            <div class="skill-top">
                <h3>${skill.name}</h3>
                <span>${skill.level}%</span>
            </div>
            <p>${skill.detail}</p>
            <div class="progress-bar" aria-hidden="true">
                <div class="progress" style="width: ${skill.level}%"></div>
            </div>
        `;
        skillsContainer.appendChild(skillElement);
    });
}

function getProjectMarkup(project) {
    const tags = project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("");
    const imageMarkup = project.image
        ? `<img class="project-image" src="${project.image}" alt="${project.title} screenshot">`
        : "";
    const linkMarkup = project.url
        ? `<a class="project-link" href="${project.url}" target="_blank" rel="noopener noreferrer">Visit</a>`
        : "";

    return `
        <article class="project-card">
            ${imageMarkup}
            <p class="project-category">${project.category}</p>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <p class="project-highlight">${project.highlight}</p>
            <div class="tags">${tags}</div>
            ${linkMarkup}
        </article>
    `;
}

function renderProjects(filter = "All") {
    const projectsGrid = document.querySelector(".projects-grid");
    if (!projectsGrid) {
        return;
    }

    const limit = Number(projectsGrid.dataset.projectLimit || 0);
    const filteredProjects = filter === "All"
        ? projects
        : projects.filter((project) => project.category === filter);
    const visibleProjects = limit > 0 ? filteredProjects.slice(0, limit) : filteredProjects;

    projectsGrid.innerHTML = "";

    if (visibleProjects.length === 0) {
        projectsGrid.innerHTML = `
            <article class="project-card empty-state">
                <h3>No projects in this category yet</h3>
                <p>Try another filter to explore the rest of the portfolio.</p>
            </article>
        `;
        return;
    }

    visibleProjects.forEach((project) => {
        projectsGrid.insertAdjacentHTML("beforeend", getProjectMarkup(project));
    });
}

function renderProjectFilters() {
    const filterContainer = document.querySelector(".filter-buttons");
    if (!filterContainer) {
        return;
    }

    const categories = ["All", ...new Set(projects.map((project) => project.category))];
    let activeFilter = "All";

    filterContainer.innerHTML = "";

    categories.forEach((category) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = category === activeFilter ? "filter-button active" : "filter-button";
        button.textContent = category;

        button.addEventListener("click", () => {
            activeFilter = category;
            filterContainer.querySelectorAll("button").forEach((filterButton) => {
                const isActive = filterButton.textContent === activeFilter;
                filterButton.classList.toggle("active", isActive);
                filterButton.setAttribute("aria-pressed", String(isActive));
            });
            renderProjects(activeFilter);
        });

        button.setAttribute("aria-pressed", String(category === activeFilter));
        filterContainer.appendChild(button);
    });
}

function validateContactForm(name, email, message) {
    if (name.trim().length < 2) {
        return "Please enter a name with at least 2 characters.";
    }

    if (!email.includes("@") || !email.includes(".")) {
        return "Please enter a valid email address.";
    }

    if (message.trim().length < 15) {
        return "Please write a message with at least 15 characters.";
    }

    return "";
}

function initializeContactForm() {
    const contactForm = document.getElementById("contact-form");
    const status = document.getElementById("form-status");

    if (!contactForm || !status) {
        return;
    }

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name")?.value ?? "";
        const email = document.getElementById("email")?.value ?? "";
        const message = document.getElementById("message")?.value ?? "";
        const validationMessage = validateContactForm(name, email, message);

        if (validationMessage) {
            status.textContent = validationMessage;
            status.dataset.state = "error";
            return;
        }

        status.textContent = `Thanks, ${name.trim()}! Your message looks great. This demo form is ready for a real backend or email service.`;
        status.dataset.state = "success";
        contactForm.reset();
    });
}

function setFooterYear() {
    const footerText = document.querySelector("footer p");
    if (!footerText) {
        return;
    }

    footerText.textContent = "© 2026 Dias Zhanbolatov";
}

document.addEventListener("DOMContentLoaded", () => {
    initializeResponsiveMenu();
    initializeTheme();
    renderSkills();
    renderProjectFilters();
    renderProjects();
    initializeContactForm();
    setFooterYear();
});
