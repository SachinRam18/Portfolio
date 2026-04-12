import React from 'react';
import { Code2, Database, Globe, Layout, Smartphone, Terminal } from 'lucide-react';

type ThemeMode = 'light' | 'dark';

const skills = [
  { name: 'Python', icon: Terminal, color: 'text-sky-600' },
  { name: 'Java', icon: Code2, color: 'text-orange-600' },
  { name: 'React', icon: Layout, color: 'text-cyan-600' },
  { name: 'Flutter', icon: Smartphone, color: 'text-blue-600' },
  { name: 'Django', icon: Globe, color: 'text-emerald-600' },
  { name: 'MongoDB', icon: Database, color: 'text-green-600' },
];

interface AboutMeProps {
  theme?: ThemeMode;
}

export default function AboutMe({ theme = 'light' }: AboutMeProps) {
  const isDark = theme === 'dark';

  return (
    <div className={`h-full p-5 md:p-6 ${isDark ? 'bg-slate-950 text-white' : 'bg-[#eef2f7] text-slate-800'}`}>
      <div className={`grid h-full gap-4 ${isDark ? 'md:grid-cols-[200px_1fr]' : 'md:grid-cols-[210px_1fr]'}`}>
        <div className={`rounded-[24px] p-4 ${isDark ? 'bg-white/6 ring-white/10' : 'bg-white shadow-sm ring-black/5'} ring-1`}>
          <div className="group relative mx-auto h-32 w-32 overflow-hidden rounded-full shadow-sm">
            <div className="absolute inset-0 z-10 rounded-full opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100 group-hover:bg-white/10 dark:group-hover:bg-black/10" />
            <img
              src="/pic1-modified.png"
              alt="sachin"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="mt-4 text-center">
            <h2 className={`text-xl font-semibold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>SACHIN RAM ES</h2>
            <p className={`mt-1 text-sm ${isDark ? 'text-white/70' : 'text-slate-500'}`}>Full-Stack Developer</p>
          </div>

          <div className={`mt-4 rounded-2xl p-4 ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Focus</p>
            <p className={`mt-2 text-sm leading-6 ${isDark ? 'text-white/72' : 'text-slate-600'}`}>
              Polished product UI, reliable backend systems, and practical AI integrations.
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          <section className={`rounded-[24px] p-5 ring-1 ${isDark ? 'bg-white/6 ring-white/10' : 'bg-white ring-black/5'}`}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">Preview</p>
            <p className={`mt-3 text-[15px] leading-7 ${isDark ? 'text-white/72' : 'text-slate-600'}`}>
              I build interfaces that feel intentional and systems that scale cleanly. This window is a quick snapshot,
              while the full portfolio lives below the interactive hero.
            </p>
          </section>

          <section className={`rounded-[24px] p-5 ring-1 ${isDark ? 'bg-white/6 ring-white/10' : 'bg-white ring-black/5'}`}>
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">Toolbox</p>
              <span className={`text-xs ${isDark ? 'text-white/45' : 'text-slate-400'}`}>Preview stack</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {skills.map((skill) => (
                <div key={skill.name} className={`flex items-center gap-3 rounded-2xl px-4 py-3 ring-1 ${isDark ? 'bg-white/5 ring-white/8' : 'bg-slate-50 ring-black/5'}`}>
                  <skill.icon size={18} className={skill.color} />
                  <span className={`text-sm font-medium ${isDark ? 'text-white/80' : 'text-slate-700'}`}>{skill.name}</span>
                </div>
              ))}
            </div>
          </section>

          <section className={`rounded-[24px] p-5 ring-1 ${isDark ? 'bg-white/6 ring-white/10' : 'bg-white ring-black/5'}`}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">Education</p>
            <div className={`mt-4 flex items-start justify-between gap-4 rounded-2xl px-4 py-4 ${isDark ? 'bg-white/5' : 'bg-slate-50'} ring-1 ${isDark ? 'ring-white/8' : 'ring-black/5'}`}>
              <div>
                <p className={`font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>PSG Institute of Technology</p>
                <p className={`mt-1 text-sm ${isDark ? 'text-white/70' : 'text-slate-500'}`}>B.Tech CSBS</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-700'}`}>CGPA 8.59</p>
                <p className={`mt-1 text-xs ${isDark ? 'text-white/45' : 'text-slate-400'}`}>2023 - Present</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
