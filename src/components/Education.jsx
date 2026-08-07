import { education } from "../data";

export default function Education() {
  return (
    <section className="education-container">
      <h2>Education</h2>
      {education.map((item, index) => (
        <div key={index} className="education-card">
          <div className="education-header">
            <h3>{item.institution}</h3>
            <span className="location">{item.location}</span>
          </div>

          <div className="education-subheader">
            <strong>{item.degree}</strong>
            <span className="duration">{item.duration}</span>
          </div>

          <ul className="education-highlights">
            {item.highlights.map((point, pointIndex) => (
              <li key={pointIndex}>{point}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};