import { useState, useEffect } from 'react';
import TechOrbit from './components/TechOrbit';
import TechStack from './components/TechStack';
import LeetCodeStreak from './components/LeetCodeStreak';
import './App.css';

const GithubIcon = () => <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>;
const LinkedinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;

// FORMSPREE FETCH LOGIC
function ContactForm() {
  const [status, setStatus] = useState("idle");
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/maewnlpl";

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-row">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" required />
      </div>
      <div className="form-row">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required />
      </div>
      <div className="form-row">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows="5" required />
      </div>
      <button type="submit" disabled={status === "sending"} className="submit-btn">
        {status === "sending" ? "Sending…" : "Say Hello"}
      </button>

      {status === "sent" && (
        <p className="form-status form-status-success">
          Thanks — your message is on its way.
        </p>
      )}
      {status === "error" && (
        <p className="form-status form-status-error">
          Something went wrong. Try emailing me directly instead.
        </p>
      )}
    </form>
  );
}

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="layout">
      {/* Add the conditional class here */}
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
          <a href="#top" className="logo">AS.</a>
          
          {/* Desktop Links */}
            <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
              <li><a href="#about" onClick={() => setMenuOpen(false)}><span>01.</span> About</a></li>
              <li><a href="#leetcode" onClick={() => setMenuOpen(false)}><span>02.</span> Coding</a></li>
              <li><a href="#experience" onClick={() => setMenuOpen(false)}><span>03.</span> Academics</a></li>
              <li><a href="#projects" onClick={() => setMenuOpen(false)}><span>04.</span> Projects</a></li>
              <li><a href="#contact" onClick={() => setMenuOpen(false)}><span>05.</span> Contact</a></li>
            </ul>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className={`hamburger ${menuOpen ? 'open' : ''}`}></div>
        </button>
      </nav>

      {/* LEFT SIDEBAR - SOCIALS */}
      <aside className="sidebar left-sidebar">
        <div className="socials">
          <a href="https://github.com/Arindam-18s" target="_blank" rel="noreferrer" aria-label="GitHub"><GithubIcon /></a>
          <a href="https://www.linkedin.com/in/arindam-samadder/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedinIcon /></a>
        </div>
        <div className="line"></div>
      </aside>

      {/* RIGHT SIDEBAR - EMAIL */}
      <aside className="sidebar right-sidebar">
        <div className="email-link">
          <a href="arindam.samadder18@gmail.com">hello@arindam.com</a>
        </div>
        <div className="line"></div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        
        <header className="hero-section">
          <div className="hero-text">
            <p className="greeting">Hi, my name is</p>
            <h1 className="name">Arindam Samadder.</h1>
            <div className="tagline">Aspiring Systems Developer</div>
            <p className="location-tag">— based in Kolkata, India</p>
            <p className="bio">
              I'm a software engineer specializing in building (and occasionally designing) exceptional digital experiences. 
              Currently, I'm focused on building accessible, human-centered products at <span className="highlight">Your Company</span>.
            </p>
            <a href="#projects" className="cta-btn">Check out my work!</a>
          </div>
          <div className="hero-visual">
            <TechOrbit />
          </div>
        </header>

        {/* ABOUT */}
        <section id="about" className="section fade-in">
          <h2 className="section-title"><span>01.</span> About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <p>Hello! My name is Arindam and I enjoy creating things that live on the internet. My interest in web development started back in 2012 when I decided to try editing custom Tumblr themes — turns out hacking together a custom reblog button taught me a lot about HTML & CSS!</p>
              <p>Fast-forward to today, and I've had the privilege of working at <a href="#" className="inline-link">an advertising agency</a>, <a href="#" className="inline-link">a start-up</a>, <a href="#" className="inline-link">a huge corporation</a>, and <a href="#" className="inline-link">a student-led design studio</a>. My main focus these days is building accessible, inclusive products and digital experiences at <a href="#" className="inline-link">Upstatement</a> for a variety of clients.</p>
              <p>I also recently <a href="#" className="inline-link">launched a course</a> that covers everything you need to build a web app with the Spotify API using Node & React.</p>
              <p>Here are a few technologies I've been working with recently:</p>
              
              <ul className="skills-list">
                <li>Python</li>
                <li>Java</li>
                <li>JavaScript (ES6+)</li>
                <li>SQL</li>
                <li>Express.js</li>
                <li>Node.js</li>
                <li>MS-Office 365</li>
              </ul>
            </div>
            
            <div className="about-image-container">
              <div className="about-image-wrapper">
                <img src="./profile.PNG" alt="Arindam Samadder" />
              </div>
            </div>
          </div>
        </section>

        <section id="leetcode" className="section fade-in">
          <h2 className="section-title"><span>02.</span> Algorithmic Consistency</h2>
          
          <div className="leetcode-content" style={{ 
            background: '#112240', 
            padding: '30px', 
            borderRadius: '8px', 
            border: '1px solid #233554',
            boxShadow: '0 10px 30px -15px rgba(2,12,27,0.7)'
          }}>
            <p style={{ color: 'var(--slate)', marginBottom: '20px' }}>
              I believe in continuous learning and problem-solving. Here is my LeetCode submission streak over the last 6 months.
            </p>
            <LeetCodeStreak />
          </div>
        </section>

        <section id="experience" className="section fade-in">
          <h2 className="section-title"><span>03.</span> Where I've Collaborated</h2>
          <div className="experience-content">
            <div className="job">
              <h3 className="role-title">Data Science Intern <span className="company">@ IDEAS-TIH Indian Statistical Institute Kolkata</span></h3>
              <p className="date">Sept. 2026 - Present</p>
              <ul className="job-duties">
                <li>Deliver high-quality, robust production code for a diverse array of projects.</li>
                <li>Work alongside Fellow Researchers and Trainees to lead the research, development, and architecture of technical solutions.</li>
                <li>Collaborate with AI, Deep Learning - Machine Learning, Data Science Researchers and other engineers to transform creative concepts into production realities.</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="projects" className="section fade-in">
          <h2 className="section-title"><span>04.</span> Some Things I've Built</h2>
          
          <div className="project">
            <div className="project-content">
              <p className="project-overline">Featured Project</p>
              <h3 className="project-title">Halcyon Theme</h3>
              <div className="project-description">
                <p>A minimal, dark blue theme for VS Code, Sublime Text, Atom, iTerm, and more. Available on Visual Studio Marketplace, Package Control, Atom Package Manager, and npm.</p>
              </div>
              <ul className="project-tech-list">
                <li>VS Code</li>
                <li>Sublime Text</li>
                <li>Atom</li>
                <li>iTerm2</li>
              </ul>
            </div>
          </div>

          <div className="project">
            <div className="project-content">
              <p className="project-overline">Featured Project</p>
              <h3 className="project-title">Spotify Profile</h3>
              <div className="project-description">
                <p>A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track.</p>
              </div>
              <ul className="project-tech-list">
                <li>React</li>
                <li>Styled Components</li>
                <li>Express</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section fade-in">
          <p className="overline">05. What's Next?</p>
          <h2 className="contact-heading">Get In Touch</h2>
          <p className="contact-text">
            Although I'm not currently looking for any new opportunities, my inbox is always open. 
            Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          <ContactForm />
        </section>
      </main>
      {/* MOBILE FOOTER LINKS */}
      <footer className="mobile-footer">
        <div className="mobile-socials">
          <a href="https://github.com/Arindam-18s" target="_blank" rel="noreferrer" aria-label="GitHub">
            <GithubIcon />
          </a>
          <a href="https://www.linkedin.com/in/arindam-samadder/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedinIcon />
          </a>
          <a href="mailto:hello@arindam.com" className="mobile-email">
            hello@arindam.com
          </a>
        </div>
        <p className="mobile-credit">
          Designed & Built by Arindam Samadder
        </p>
      </footer>

    </div>
  );
}

export default App;