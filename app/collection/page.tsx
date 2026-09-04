import SiteHeader from "@/components/site-header";
import { getAllProjects } from "@/lib/projects";

export default function CollectionPage() {
  const projects = getAllProjects();

  return (
    <main className="page">
      <SiteHeader />
      <h2 className="collection-title">
        Collection <span className="collection-count">({projects.length})</span>
      </h2>
      <p className="muted">A collection of cool things I&apos;ve built.</p>
      <hr className="collection-sep" aria-hidden="true" />

      {projects.length === 0 ? (
        <p className="muted">Projects will be added soon :)</p>
      ) : (
        <ul className="project-list project-list-detailed">
          {projects.map((project) => (
            <li key={project.title} className="project-item">
              <div className="project-heading">
                <a href={project.href} className="project-title project-title-link" target={project.external ? "_blank" : undefined} rel={project.external ? "noopener noreferrer" : undefined}>
                  {project.title}
                </a>
                <span className="project-technologies" aria-label={`${project.title} technologies`}>
                  {project.technologies.join(" / ")}
                </span>
              </div>
              <p className="project-description">{project.description}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
