import { profile } from "../data";

export default function Hero() {
  return (
    <header id="top" className="hero">
      <p className="hero-status">
        <span className="status-dot" aria-hidden="true" />
        {profile.status}
      </p>
      <h1 className="hero-name">{profile.name}</h1>
      <p className="hero-role">{profile.role} — based in {profile.location}</p>
    </header>
  );
}
