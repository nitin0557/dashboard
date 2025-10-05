import React from "react";
import { motion } from "framer-motion";

export default function Profile() {
  const timeline = [
    { year: 2017, event: "Graduated ECE (IIIT Allahabad)" },
    {
      year: 2018,
      event: "First web dev contract, built UI for small businesses",
    },
    { year: 2022, event: "Joined FabHotels as Frontend Developer" },
    { year: 2025, event: "Working on ApnaMart & freelance projects" },
  ];

  const testimonials = [
    {
      quote:
        "Nitin brought clarity and precision when things got complicated. He listens carefully and delivers practical solutions.",
      name: "Javed Sir, Engineering Manager",
    },
  ];

  const funFacts = [
    "Reading Books and Music",
    "Travelling and Photography is a Side Passion",
    "Playing Chess",
  ];

  const projects = [
    {
      title: "FabHotels Conference & Settlement",
      desc: "Built reusable React components for conference & settlement flows in hotel management.",
      url: "https://www.fabhotels.com/",
    },
    {
      title: "SantaBanta (Demo)",
      desc: "React based food delivery demo site.",
      url: "https://nitin0557.github.io/SantaBanta/",
    },
    {
      title: "ApnaMart",
      desc: "Billing system and storefront demo.",
      url: "https://apnamart.in/",
    },
  ];

  const sectionFadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <section className="relative h-screen flex flex-col md:flex-row items-center justify-center text-center md:text-left px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/40 pointer-events-none" />

        <motion.div
          className="z-10 max-w-xl flex flex-col items-center md:items-start"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
            Call me Nitin
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-gray-200">
            Frontend Developer & Creative Technologist with 3+ years of
            experience in React.js, Next.js, and modern web technologies.
          </p>
          <motion.a
            href="#contact"
            className="mt-8 inline-block px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg shadow hover:bg-gray-100"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in touch
          </motion.a>
        </motion.div>

        <motion.div
          className="z-10 mt-12 md:mt-0 md:ml-16"
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, type: "spring" }}
          whileHover={{ scale: 1.05, rotate: 2 }}
        >
          <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden shadow-xl border-4 border-transparent bg-gradient-to-r from-teal-400 to-blue-500 p-1">
            <motion.img
              src="/profile.png"
              alt="Nitin Kumar Singh"
              className="object-cover w-full h-full rounded-full"
              animate={{ y: [0, -10, 0] }} // floating effect
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      <motion.section
        className="py-16 px-6 max-w-4xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionFadeIn}
      >
        <h2 className="text-3xl font-semibold mb-8 text-white">Career Story</h2>
        <div className="space-y-6 text-gray-200">
          {timeline.map((t) => (
            <div key={t.year} className="flex gap-4">
              <div className="text-xl font-bold w-20">{t.year}</div>
              <div className="flex-grow">{t.event}</div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="py-16 px-6 max-w-3xl mx-auto bg-gray-800 rounded-lg"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionFadeIn}
      >
        <h2 className="text-3xl font-semibold mb-8 text-white">
          Words From Collaborators
        </h2>
        <div className="space-y-8 text-gray-200">
          {testimonials.map((t, i) => (
            <blockquote key={i} className="italic">
              “{t.quote}”
              <footer className="mt-2 text-sm font-semibold">— {t.name}</footer>
            </blockquote>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="bg-gray-900 py-16 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionFadeIn}
      >
        <h2 className="text-3xl font-semibold mb-8 text-center text-white">
          Fun Facts
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-gray-200">
          {funFacts.map((f, i) => (
            <li
              key={i}
              className="p-6 bg-gray-800 border border-gray-700 rounded-lg"
            >
              {f}
            </li>
          ))}
        </ul>
      </motion.section>

      <motion.section
        className="py-16 px-6 max-w-4xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionFadeIn}
      >
        <h2 className="text-3xl font-semibold mb-8 text-center text-white">
          Selected Projects
        </h2>
        <div className="space-y-6">
          {projects.map((p, i) => (
            <motion.a
              key={i}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="block p-6 bg-gray-800 border border-gray-700 rounded-lg hover:shadow-lg"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl font-semibold text-white">{p.title}</h3>
              <p className="mt-2 text-gray-300">{p.desc}</p>
            </motion.a>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="contact"
        className="py-16 px-6 bg-black text-white text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        <h2 className="text-3xl font-semibold mb-4">
          Interested in working together?
        </h2>
        <p className="mb-8 max-w-xl mx-auto">
          Let’s build something amazing. Drop me a message and let’s talk.
        </p>
        <motion.a
          href="mailto:nitinkrsingh789@gmail.com"
          className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg shadow hover:bg-gray-100"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Send a message
        </motion.a>
      </motion.section>

      <footer className="py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Nitin Kumar Singh. All rights reserved.
      </footer>
    </div>
  );
}
