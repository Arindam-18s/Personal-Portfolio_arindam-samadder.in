import { projects } from "../data";

export default function Projects() {
  return (
    <section id="projects" className="section">
      <p className="section-label">Projects</p>
      <ul className="project-list">
        {projects.map((project) => (
          <li key={project.title} className="project-row">
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="project-link"
            >
              <span className="project-year">{project.year}</span>
              <span className="project-main">
                <span className="project-title">
                  {project.title}
                  <span className="project-arrow" aria-hidden="true">
                    ↗
                  </span>
                </span>
                <span className="project-description">{project.description}</span>
                <span className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
