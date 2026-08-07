import { useState } from "react";
import { profile } from "../data";

// This form posts to Formspree, a free service that emails form
// submissions to you without needing your own backend.
// 1. Go to https://formspree.io and create a free account
// 2. Create a new form and copy the endpoint it gives you
// 3. Paste it below, replacing "your-form-id"
const FORMSPREE_ENDPOINT = "https://formspree.io/f/maewnlpl";

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

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
    <section id="contact" className="section">
      <p className="section-label">Contact</p>
      <p className="contact-intro">
        Have a project in mind or just want to say hi? Send a message, or reach me
        directly at{" "}
        <a href={`mailto:${profile.email}`} className="contact-email">
          {profile.email}
        </a>
        .
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
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
        <button type="submit" className="contact-submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
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
    </section>
  );
}
