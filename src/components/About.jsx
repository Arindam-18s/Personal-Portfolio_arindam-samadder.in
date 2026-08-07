import { about } from "../data";

export default function About() {
  return (
    <section id="about" className="section">
      <p className="section-label">About</p>
      <div className="about-body">
        {about.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  );
}
