import { skills } from "../data";

export default function Skills() {
  return (
    <section id="skills" className="section">
      <p className="section-label">Skills</p>
      <div className="skills-grid">
        {skills.map((group) => (
          <div key={group.category} className="skills-group">
            <p className="skills-category">{group.category}</p>
            <ul className="skills-list">
              {group.items.map((item) => (
                <li key={item} className="skills-pill">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
