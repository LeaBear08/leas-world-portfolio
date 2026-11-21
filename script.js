
// Load project information from projects.xml

async function loadProjects() {

    const projectList = document.getElementById("project-list");

    try {

        // Fetch the XML file
        const response = await fetch("projects.xml");

        if (!response.ok) {
            throw new Error("Unable to load projects.xml");
        }

        const xmlText = await response.text();

        // Read the XML content
        const parser = new DOMParser();
        const xml = parser.parseFromString(
            xmlText,
            "application/xml"
        );

        // Check for XML errors
        if (xml.querySelector("parsererror")) {
            throw new Error("Invalid XML format");
        }

        // Get all project elements
        const projects = xml.querySelectorAll("project");

        // Clear the loading message
        projectList.replaceChildren();

        // Display each project
        projects.forEach(project => {

            const title = project.querySelector("title").textContent.trim();
            const description = project.querySelector("description").textContent.trim();
            const link = project.querySelector("link").textContent.trim();
            const date = project.querySelector("date").textContent.trim();

            // Create project container
            const article = document.createElement("article");
            article.className = "project-card";

            // Create project title
            const heading = document.createElement("h3");
            heading.textContent = title;

            // Create project description
            const paragraph = document.createElement("p");
            paragraph.textContent = description;

            // Create project date
            const dateText = document.createElement("p");
            dateText.className = "project-date";
            dateText.textContent = "Date: " + date;

            // Create project link
            const projectLink = document.createElement("a");
            projectLink.href = link;
            projectLink.textContent = "View Project";
            projectLink.target = "_blank";
            projectLink.rel = "noopener noreferrer";

            // Add everything to the project card
            article.append(
                heading,
                paragraph,
                dateText,
                projectLink
            );

            projectList.appendChild(article);

        });

    } catch (error) {

        projectList.textContent =
            "Sorry, the projects could not be loaded. Please try again.";

        console.error("Project loading error:", error);

    }

}

// Run the function when the page loads
loadProjects();
