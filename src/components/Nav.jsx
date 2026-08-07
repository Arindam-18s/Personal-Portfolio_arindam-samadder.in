import { profile } from "../data";

export default function Nav() {
  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <div className="nav-bar">
      <nav className="nav">
        <a href="#top" className="nav-mark">
          {initials}
        </a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a href={profile.resumeUrl} className="nav-resume" target="_blank" rel="noreferrer">
          Resume
        </a>
      </nav>
    </div>
  );
}