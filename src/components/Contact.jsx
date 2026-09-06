import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function submit(e) {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <section className="contact-section" id="contact">
      <div className="contact-copy">
        <p className="eyebrow">LET'S CONNECT</p>
        <h2>Have a destination idea?</h2>
        <p>Tell us about a place you think belongs on Karenda. This demo uses a frontend-only contact form.</p>
        <div className="contact-items">
          <span>✉ hello@karenda.travel</span>
          <span>📍 Chennai, India</span>
          <span>☀️ Made for short escapes</span>
        </div>
      </div>
      <form className="contact-form" onSubmit={submit} aria-label="Contact form">
        <label htmlFor="contact-name" className="visually-hidden">Your name</label>
        <input
          id="contact-name"
          required
          placeholder="Your name"
          value={form.name}
          onChange={e => setForm({...form, name: e.target.value})}
        />
        <label htmlFor="contact-email" className="visually-hidden">Email address</label>
        <input
          id="contact-email"
          required
          type="email"
          placeholder="Email address"
          value={form.email}
          onChange={e => setForm({...form, email: e.target.value})}
        />
        <label htmlFor="contact-message" className="visually-hidden">Your message</label>
        <textarea
          id="contact-message"
          required
          rows="5"
          placeholder="Your message..."
          value={form.message}
          onChange={e => setForm({...form, message: e.target.value})}
        />
        <button className="primary-btn full" aria-live="polite">
          {sent ? "✓ Message Sent" : "Send Message →"}
        </button>
      </form>
    </section>
  );
}