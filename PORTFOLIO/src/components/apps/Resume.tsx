import React from 'react';
import { Download, Mail, Phone, MapPin, Globe } from 'lucide-react';

export default function Resume() {
  return (
    <div className="min-h-full bg-[#eef2f7] px-4 py-6 md:px-6">
      <div className="mx-auto max-w-3xl bg-white p-8 text-black shadow-2xl font-serif">
      <div className="mb-8 flex items-start justify-between border-b-2 border-black pb-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">SACHIN RAM ES</h1>
          <p className="text-lg font-medium mt-1">FULL-STACK DEVELOPER AND CODING ENTHUSIAST</p>
        </div>
        <div className="text-right text-sm space-y-1">
          <p className="flex items-center justify-end gap-2"><Mail size={14} /> sachinram6363@gmail.com</p>
          <p className="flex items-center justify-end gap-2"><Phone size={14} /> +91 97890 10679</p>
          <p className="flex items-center justify-end gap-2"><MapPin size={14} /> Chennai, India</p>
          <p className="flex items-center justify-end gap-2"><Globe size={14} /> github.com/SachinRam18/</p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold border-b border-black/20 mb-3 uppercase tracking-widest">Education</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between font-bold">
              <span>PSG Institute of Technology and Applied Research</span>
              <span>2023-Present</span>
            </div>
            <p>B. TECH Computer Science and Business Systems | Current CGPA: 8.59</p>
          </div>
          <div>
            <div className="flex justify-between font-bold">
              <span>Srimathi Sundaravalli Memorial School</span>
              <span>2020-2023</span>
            </div>
            <p>XII | Percentage: 88.2% &nbsp;&nbsp; X | Percentage: 91.6%</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold border-b border-black/20 mb-3 uppercase tracking-widest">Relevant Experience</h2>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between font-bold">
              <span>Flutter Developer Intern - Smart Stack Technologies</span>
              <span>Jan 2025</span>
            </div>
            <ul className="list-disc ml-5 mt-2 space-y-1 text-sm">
              <li>Contributed to development and deployment of a Flutter-based billing system handling 100+ daily transactions.</li>
              <li>Streamlined data handling and reporting pipelines, reducing manual billing effort by 25%.</li>
            </ul>
          </div>
          <div>
            <div className="flex justify-between font-bold">
              <span>Lead Java Developer Intern - Yahweh Software Solutions</span>
              <span>June - Sept 2025</span>
            </div>
            <ul className="list-disc ml-5 mt-2 space-y-1 text-sm">
              <li>Led backend module integration for the EduDibon education management platform.</li>
              <li>Improved scheduling logic and database operations, increasing timetable generation speed by 35%.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold border-b border-black/20 mb-3 uppercase tracking-widest">Technical Skills</h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
          <p><span className="font-bold">Languages:</span> Python, Java, C, Dart</p>
          <p><span className="font-bold">Frontend:</span> HTML, CSS, JS, Flutter, React</p>
          <p><span className="font-bold">Backend:</span> Django, Flask</p>
          <p><span className="font-bold">Databases:</span> MySQL, MongoDB</p>
        </div>
      </section>

      <div className="sticky bottom-4 mt-8 flex justify-end">
        <button className="flex items-center gap-2 rounded-full bg-black px-6 py-3 text-white shadow-xl transition-transform hover:scale-105">
          <Download size={20} /> Download PDF
        </button>
      </div>
      </div>
    </div>
  );
}
