// my portfolio data
var skills = [
    { name: "HTML", level: 88, detail: "I use HTML to build clear page structure with headings, sections, links, and forms." },
    { name: "CSS", level: 82, detail: "I use CSS for layout, spacing, colors, and making pages look better on phones and laptops." },
    { name: "JavaScript", level: 76, detail: "I use JavaScript to add interactivity like buttons, filters, validation, and theme changes." },
    { name: "Node.js", level: 72, detail: "I use Node.js to build backend services, handle routes, and run JavaScript on the server." },
    { name: "TypeScript", level: 70, detail: "I use TypeScript to write safer JavaScript with types and better project structure." },
    { name: "Problem Solving", level: 74, detail: "I am getting better at planning my code, testing small changes, and fixing mistakes as I go." }
];

var projects = [
    { title: "Giro Girls", category: "Full Stack", description: "A production website project for Giro Girls built with TypeScript and Node.js.", tags: ["TypeScript", "Node.js", "Web App"], highlight: "Custom frontend experience connected to a Node.js backend.", url: "http://giro-girls.kz/", image: "images/giro.webp" }
];

// theme toggle stuff
function initTheme() {
    var themeBtn = document.getElementById("theme-toggle");
    var savedTheme = localStorage.getItem("theme");
    
    if (savedTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        document.body.setAttribute("data-theme", "dark");
        if (themeBtn) {
            themeBtn.innerText = "Light Mode";
        }
    }
    
    if (themeBtn) {
        themeBtn.onclick = function() {
            var current = document.documentElement.getAttribute("data-theme");
            if (current === "dark") {
                document.documentElement.setAttribute("data-theme", "light");
                document.body.setAttribute("data-theme", "light");
                localStorage.setItem("theme", "light");
                themeBtn.innerText = "Dark Mode";
            } else {
                document.documentElement.setAttribute("data-theme", "dark");
                document.body.setAttribute("data-theme", "dark");
                localStorage.setItem("theme", "dark");
                themeBtn.innerText = "Light Mode";
            }
        };
    }
}

// mobile menu toggle
function initMenu() {
    var menuBtn = document.getElementById("menu-toggle");
    var navLinks = document.getElementById("primary-navigation");
    
    if (menuBtn && navLinks) {
        menuBtn.onclick = function() {
            if (navLinks.style.display === "block") {
                navLinks.style.display = "none";
            } else {
                navLinks.style.display = "block";
            }
        };
    }
}

// render skills on the page
function showSkills() {
    var container = document.querySelector(".skills-container");
    if (!container) return;
    
    var html = "";
    for (var i = 0; i < skills.length; i++) {
        var skill = skills[i];
        html = html + '<article class="skill">';
        html = html + '<div class="skill-top">';
        html = html + '<h3>' + skill.name + '</h3>';
        html = html + '<span>' + skill.level + '%</span>';
        html = html + '</div>';
        html = html + '<p>' + skill.detail + '</p>';
        html = html + '<div class="progress-bar">';
        html = html + '<div class="progress" style="width:' + skill.level + '%"></div>';
        html = html + '</div>';
        html = html + '</article>';
    }
    container.innerHTML = html;
}

// get project card HTML
function makeProjectCard(project) {
    var tagHtml = "";
    for (var j = 0; j < project.tags.length; j++) {
        tagHtml = tagHtml + '<span class="tag">' + project.tags[j] + '</span>';
    }
    
    var card = '<article class="project-card">';
    if (project.image) {
        card = card + '<img class="project-image" src="' + project.image + '" alt="' + project.title + '">';
    }
    card = card + '<p class="project-category">' + project.category + '</p>';
    card = card + '<h3>' + project.title + '</h3>';
    card = card + '<p>' + project.description + '</p>';
    card = card + '<p class="project-highlight">' + project.highlight + '</p>';
    card = card + '<div class="tags">' + tagHtml + '</div>';
    if (project.url) {
        card = card + '<a class="project-link" href="' + project.url + '" target="_blank">Visit</a>';
    }
    card = card + '</article>';
    return card;
}

// render project filters
function showFilters() {
    var filterDiv = document.querySelector(".filter-buttons");
    if (!filterDiv) return;
    
    var categories = ["All"];
    for (var i = 0; i < projects.length; i++) {
        var cat = projects[i].category;
        var alreadyAdded = false;
        for (var j = 0; j < categories.length; j++) {
            if (categories[j] === cat) {
                alreadyAdded = true;
                break;
            }
        }
        if (!alreadyAdded) {
            categories.push(cat);
        }
    }
    
    var btnHtml = "";
    for (var k = 0; k < categories.length; k++) {
        var activeClass = k === 0 ? " active" : "";
        btnHtml = btnHtml + '<button class="filter-button' + activeClass + '">' + categories[k] + '</button>';
    }
    filterDiv.innerHTML = btnHtml;
    
    // add click events to filter buttons
    var buttons = filterDiv.querySelectorAll("filter-button");
    var allBtns = filterDiv.getElementsByTagName("button");
    for (var m = 0; m < allBtns.length; m++) {
        (function(cat) {
            allBtns[m].onclick = function() {
                for (var n = 0; n < allBtns.length; n++) {
                    allBtns[n].className = "filter-button";
                }
                this.className = "filter-button active";
                showProjects(cat);
            };
        })(categories[m]);
    }
}

// render projects
function showProjects(filter) {
    var grid = document.querySelector(".projects-grid");
    if (!grid) return;
    
    var limitAttr = grid.getAttribute("data-project-limit");
    var limit = 0;
    if (limitAttr) {
        limit = parseInt(limitAttr);
    }
    
    var filtered = [];
    for (var i = 0; i < projects.length; i++) {
        if (filter === "All" || projects[i].category === filter) {
            filtered.push(projects[i]);
        }
    }
    
    if (limit > 0 && filtered.length > limit) {
        filtered = filtered.slice(0, limit);
    }
    
    var html = "";
    if (filtered.length === 0) {
        html = '<article class="project-card empty-state"><h3>No projects in this category yet</h3><p>Try another filter.</p></article>';
    } else {
        for (var j = 0; j < filtered.length; j++) {
            html = html + makeProjectCard(filtered[j]);
        }
    }
    grid.innerHTML = html;
}

// contact form validation
function initContactForm() {
    var form = document.getElementById("contact-form");
    var status = document.getElementById("form-status");
    
    if (!form || !status) return;
    
    form.onsubmit = function(e) {
        e.preventDefault();
        
        var nameVal = document.getElementById("name").value;
        var emailVal = document.getElementById("email").value;
        var msgVal = document.getElementById("message").value;
        
        if (nameVal.length < 2) {
            status.innerText = "Please enter a name with at least 2 characters.";
            status.style.color = "red";
            return;
        }
        
        if (emailVal.indexOf("@") === -1 || emailVal.indexOf(".") === -1) {
            status.innerText = "Please enter a valid email address.";
            status.style.color = "red";
            return;
        }
        
        if (msgVal.length < 15) {
            status.innerText = "Please write a message with at least 15 characters.";
            status.style.color = "red";
            return;
        }
        
        status.innerText = "Thanks, " + nameVal + "! Your message has been validated. This demo form is ready for a real backend.";
        status.style.color = "green";
        form.reset();
    };
}

// run everything when page loads
window.onload = function() {
    initTheme();
    initMenu();
    showSkills();
    showFilters();
    showProjects("All");
    initContactForm();
};
