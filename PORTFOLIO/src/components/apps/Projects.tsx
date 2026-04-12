import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

type ThemeMode = 'light' | 'dark';

const projects = [
  {
    title: 'Smart Geo-Fenced Firearm Safety',
    description:
      'Authorization system that enables use only within approved zones and locks the trigger in restricted areas.',
    tech: ['ESP32', 'Embedded C', 'React.js', 'RFID'],
    date: 'Nov 2025',
  },
  {
    title: 'AI Color-Grading Web Platform',
    description: 'Cinematic color-grading workflow that analyzes footage and applies film-inspired palettes automatically.',
    tech: ['Python', 'OpenCV', 'CNN', 'NumPy'],
    date: 'Mar 2025',
  },
];

interface ProjectsProps {
  theme?: ThemeMode;
}

export default function Projects({ theme = 'light' }: ProjectsProps) {
  const isDark = theme === 'dark';

  return (
    <div className={`flex h-full ${isDark ? 'bg-slate-950 text-white' : 'bg-[#eef2f7] text-slate-800'}`}>
      <div className={`hidden w-48 border-r p-4 md:block ${isDark ? 'border-white/10 bg-white/4' : 'border-black/6 bg-[#e8edf4]'}`}>
        <div className={`rounded-2xl p-2 ring-1 ${isDark ? 'bg-white/5 ring-white/10' : 'bg-white ring-black/5'}`}>
          <ul className="space-y-1 text-sm">
            <li className="rounded-xl bg-[#0a84ff] px-3 py-2 font-medium text-white">All Projects</li>
            <li className={`rounded-xl px-3 py-2 ${isDark ? 'text-white/60 hover:bg-white/6' : 'text-slate-500 hover:bg-slate-100'}`}>Web Apps</li>
            <li className={`rounded-xl px-3 py-2 ${isDark ? 'text-white/60 hover:bg-white/6' : 'text-slate-500 hover:bg-slate-100'}`}>Embedded</li>
            <li className={`rounded-xl px-3 py-2 ${isDark ? 'text-white/60 hover:bg-white/6' : 'text-slate-500 hover:bg-slate-100'}`}>Mobile</li>
          </ul>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-5 md:p-6">
        <div className="grid grid-cols-1 gap-5">
          {projects.map((project) => (
            <div
              key={project.title}
              className={`overflow-hidden rounded-[24px] ring-1 ${isDark ? 'bg-white/6 ring-white/10' : 'bg-white shadow-sm ring-black/5'}`}
            >
              <div className="aspect-[16/9] overflow-hidden bg-slate-200/70">
                <div className="flex h-full items-end justify-between bg-[linear-gradient(135deg,rgba(20,92,186,0.45),rgba(255,255,255,0.06))] p-4 text-white">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">Preview</p>
                    <p className="mt-2 max-w-[14rem] text-xl font-semibold leading-tight">{project.title}</p>
                  </div>
                  <span className="rounded-full border border-white/20 bg-white/12 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]">
                    {project.date}
                  </span>
                </div>
              </div>

              <div className="p-5 md:p-6">
                <p className={`text-sm leading-6 ${isDark ? 'text-white/72' : 'text-slate-600'}`}>{project.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${isDark ? 'bg-white/8 text-white/75' : 'bg-slate-100 text-slate-600'}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex gap-3 border-t border-white/8 pt-4">
                  <button className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium transition-colors ${isDark ? 'bg-white/8 text-white/80 hover:bg-white/12' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                    <Github size={14} />
                    Code
                  </button>
                  <button className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium transition-colors ${isDark ? 'bg-white/8 text-white/80 hover:bg-white/12' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                    <ExternalLink size={14} />
                    Demo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
