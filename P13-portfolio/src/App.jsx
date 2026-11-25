import { useState } from 'react';

const skills = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'Python'];

const projects = [
  { title: 'To-Do List', text: 'Task manager with delete, move up/down and checkboxes.', tech: 'HTML, CSS, JS' },
  { title: 'Snake and Ladder', text: 'Two player board game built with JavaScript.', tech: 'HTML, CSS, JS' },
  { title: 'E-commerce App', text: 'Cart, payment, orders and seller panel.', tech: 'Express, MongoDB, EJS' }
];

function Navbar() {
  return (
    <nav className="navbar">
      <h2>My Portfolio</h2>
      <div>
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header className="hero">
      <h1>Hi, I'm Your Name</h1>
      <p>MCA student at GLA University, Mathura | Web Developer</p>
    </header>
  );
}

function About() {
  return (
    <section id="about">
      <h2>About Me</h2>
      <p>
        I am a Master of Computer Applications student who enjoys building web applications.
        I have worked with HTML, CSS, JavaScript, Node.js, Express, MongoDB and React.
      </p>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills">
      <h2>Skills</h2>
      <div className="skills">
        {skills.map(s => <span key={s} className="skill">{s}</span>)}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects">
      <h2>Projects</h2>
      <div className="projects">
        {projects.map(p => (
          <div className="project" key={p.title}>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
            <small>{p.tech}</small>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    console.log('Form data:', form);
    setSent(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact">
      <h2>Contact</h2>
      {sent && <p className="sent">Thanks! Your message was submitted.</p>}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Your email" value={form.email} onChange={handleChange} required />
        <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} required />
        <button>Send</button>
      </form>
    </section>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <footer>© 2026 Your Name</footer>
    </>
  );
}
