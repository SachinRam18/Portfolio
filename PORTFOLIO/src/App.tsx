import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import type { LucideIcon } from 'lucide-react';
import {
  Award,
  CalendarDays,
  Code2,
  Cpu,
  ChevronDown,
  FileText,
  FolderCode,
  Github,
  HeartHandshake,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  MonitorSmartphone,
  MoonStar,
  Phone,
  Sparkles,
  SunMedium,
  User,
  Terminal,
  Coffee,
  Smartphone,
  LayoutTemplate,
  Paintbrush,
  Braces,
  Layers,
  Atom,
  ServerCog,
  Container,
  Database,
  FolderTree,
  GitBranch,
  Flame,
  Network,
  FileCode,
  Workflow,
  Box,
  HardDrive,
  Laptop
} from 'lucide-react';
import { DeviceFrameset } from 'react-device-frameset';
import 'react-device-frameset/styles/marvel-devices.min.css';
import { AppId, AppState } from './types';
import MenuBar from './components/macOS/MenuBar';
import Dock from './components/macOS/Dock';
import Dashboard from './components/macOS/Dashboard';
import Window from './components/macOS/Window';
import DesktopIcon from './components/macOS/DesktopIcon';
import AboutMe from './components/apps/AboutMe';
import Projects from './components/apps/Projects';
import Resume from './components/apps/Resume';
import GlassCursor from './components/macOS/GlassCursor';

const FlutterLogomark = ({ size = 24, className = '', strokeWidth, color }: { size?: number | string, className?: string, strokeWidth?: number | string, color?: string }) => (
  <div 
    className={`bg-white rounded-full flex items-center justify-center shadow-sm ${className}`}
    style={{ width: size, height: size, minWidth: size, minHeight: size }}
  >
    <img 
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg" 
      style={{ width: '55%', height: '55%' }}
      alt="Flutter" 
    />
  </div>
);

type ThemeMode = 'light' | 'dark';

type HeroStat = {
  label: string;
  value: string;
  icon: LucideIcon;
};

type ContactPreview = {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
  color?: string;
};

type SkillGroup = {
  title: string;
  items: { name: string; icon: string; level: number; color?: string }[];
};

type ProjectCard = {
  title: string;
  description: string;
  tech: string[];
  image?: string;
};

type ExperienceCard = {
  title: string;
  company: string;
  period: string;
  bullets: string[];
};

const INITIAL_APPS: AppState[] = [
  { id: 'about', title: 'About Me', isOpen: true, isMinimized: false, zIndex: 11 },
  { id: 'projects', title: 'Projects', isOpen: true, isMinimized: false, zIndex: 12 },
  { id: 'resume', title: 'Resume', isOpen: false, isMinimized: false, zIndex: 10 },
  { id: 'contact', title: 'Contact', isOpen: false, isMinimized: false, zIndex: 10 },
];

const WINDOW_LAYOUT: Record<string, string> = {
  about:
    'left-[5%] top-[16%] h-[52%] w-[42%] min-w-[300px] max-md:left-[4%] max-md:top-[14%] max-md:h-[42%] max-md:w-[58%]',
  projects:
    'right-[4.5%] top-[22%] h-[56%] w-[50%] min-w-[320px] max-md:right-[4%] max-md:top-[42%] max-md:h-[40%] max-md:w-[70%]',
  resume:
    'left-[28%] top-[20%] h-[60%] w-[46%] min-w-[340px] max-md:left-[8%] max-md:top-[24%] max-md:h-[46%] max-md:w-[84%]',
};

const dashboardItems = [
  { id: 'about', icon: User, label: 'About', color: '#0ea5e9' },
  { id: 'skills', icon: Code2, label: 'Skills', color: '#F7DF1E' },
  { id: 'projects', icon: FolderCode, label: 'Projects', color: '#007ACC' },
  { id: 'experience', icon: FileText, label: 'Experience', color: '#47A248' },
  { id: 'contact', icon: Mail, label: 'Contact', color: '#EA4335' },
] as const;

const aboutContacts: ContactPreview[] = [
  { label: 'Email', value: 'sachinram6363@gmail.com', href: 'mailto:sachinram6363@gmail.com', icon: Mail, color: '#EA4335' },
  { label: 'Phone', value: '+91 97890 10679', href: 'tel:+919789010679', icon: Phone, color: '#34A853' },
  { label: 'LinkedIn', value: 'linkedin.com', href: 'https://linkedin.com', icon: Linkedin, color: '#0A66C2' },
  { label: 'GitHub', value: 'github.com/SachinRam18/', href: 'https://github.com/SachinRam18/', icon: Github, color: '#181717' },
  { label: 'LeetCode', value: 'leetcode.com/u/SachinRam27/', href: 'https://leetcode.com/u/SachinRam27/', icon: Code2, color: '#FFA116' },
];

const skillGroups: SkillGroup[] = [
  { title: 'Languages', items: [
    { name: 'Python', icon: 'python/python-original.svg', level: 90, color: '#3776AB' },
    { name: 'Java', icon: 'java/java-original.svg', level: 85, color: '#5382A1' },
    { name: 'C', icon: 'c/c-original.svg', level: 75, color: '#A8B9CC' },
    { name: 'Dart', icon: 'dart/dart-original.svg', level: 80, color: '#0175C2' },
  ] },
  { title: 'Frontend', items: [
    { name: 'HTML', icon: 'html5/html5-original.svg', level: 95, color: '#E34F26' },
    { name: 'CSS', icon: 'css3/css3-original.svg', level: 90, color: '#1572B6' },
    { name: 'JavaScript', icon: 'javascript/javascript-original.svg', level: 85, color: '#F7DF1E' },
    { name: 'Flutter', icon: 'flutter/flutter-original.svg', level: 85, color: '#02569B' },
    { name: 'React', icon: 'react/react-original.svg', level: 80, color: '#61DAFB' },
  ] },
  { title: 'Backend', items: [
    { name: 'Django', icon: 'django/django-plain.svg', level: 85, color: '#092E20' },
    { name: 'Flask', icon: 'flask/flask-original.svg', level: 80, color: '#808080' },
  ] },
  { title: 'Databases', items: [
    { name: 'MySQL', icon: 'mysql/mysql-original.svg', level: 85, color: '#4479A1' },
    { name: 'MongoDB', icon: 'mongodb/mongodb-original.svg', level: 75, color: '#47A248' },
  ] },
  { title: 'Tools', items: [
    { name: 'Git', icon: 'git/git-original.svg', level: 90, color: '#F05032' },
    { name: 'GitHub', icon: 'github/github-original.svg', level: 95, color: '#181717' },
    { name: 'Firebase', icon: 'firebase/firebase-plain.svg', level: 80, color: '#FFCA28' },
    { name: 'REST APIs', icon: 'openapi/openapi-original.svg', level: 85, color: '#0096D6' },
    { name: 'VS Code', icon: 'vscode/vscode-original.svg', level: 95, color: '#007ACC' },
  ] },
  { title: 'Core', items: [
    { name: 'DSA', icon: 'cplusplus/cplusplus-original.svg', level: 85, color: '#FF8C00' },
    { name: 'OOP', icon: 'java/java-original.svg', level: 90, color: '#8B0000' },
    { name: 'DBMS', icon: 'postgresql/postgresql-original.svg', level: 80, color: '#4169E1' },
    { name: 'OS', icon: 'linux/linux-original.svg', level: 80, color: '#2F4F4F' },
  ] },
];

const projectCards: ProjectCard[] = [
  {
    title: 'Smart Geo-Fenced Firearm Safety Prototype',
    description:
      'Ensures weapons operate only in authorized zones and locks the trigger outside permitted areas.',
    tech: ['ESP32', 'Embedded C', 'RFID', 'React.js'],
    image: '/gun4.png',
  },
  {
    title: 'AI Color-Grading Web Platform',
    description:
      'An AI-assisted cinematic color-grading system that reduces manual editing effort and speeds up previewing looks.',
    tech: ['Python', 'OpenCV', 'NumPy', 'CNN'],
  },
];

const experienceCards: ExperienceCard[] = [
  {
    title: 'Flutter Developer Intern',
    company: 'Smart Stack Technologies',
    period: '2025',
    bullets: ['Handled 100+ daily transactions in a billing workflow.', 'Reduced manual effort by 25%.'],
  },
  {
    title: 'Lead Java Developer Intern',
    company: 'Yahweh Software Solutions',
    period: '2025',
    bullets: ['Improved scheduling speed by 35%.', 'Supported backend module integration.'],
  },
];

const focusItems = ['Computer Networks', 'Data Structures & OOP', 'AI & Emerging Tech'];
const activityItems = ['Basketball', 'Art & Design'];
const heroStats: HeroStat[] = [
  { label: 'Location', value: 'Chennai, India', icon: MapPin },
  { label: 'Focus', value: 'Systems + Interfaces', icon: Layers3 },
  { label: 'Stack', value: 'React / Python / Flutter', icon: Cpu },
  { label: 'Status', value: 'Open to opportunities', icon: HeartHandshake },
];

const heroSignals = ['Interactive presentation hero', 'Scroll to the full portfolio', 'Theme-aware glassmorphism'];

function DesktopWidgets() {
  return (
    <div className="pointer-events-none absolute left-5 top-12 z-10 flex w-[220px] flex-col gap-3 md:w-[250px]">
      <div className="glass-dark rounded-[24px] p-4 text-white shadow-[0_18px_30px_rgba(0,0,0,0.22)]">
        <div className="flex items-center justify-between text-white/75">
          <span className="text-[12px] font-semibold uppercase tracking-[0.24em]">Sunday</span>
          <CalendarDays size={16} />
        </div>
        <div className="mt-3 text-5xl font-semibold leading-none">12</div>
        <p className="mt-2 text-sm text-white/72">Interactive desktop experience introducing my work.</p>
      </div>

      <div className="glass rounded-[24px] p-4 text-white shadow-[0_18px_30px_rgba(0,0,0,0.18)]">
        <div className="flex items-center gap-2 text-[13px] font-semibold text-white/90">
          <Sparkles size={14} />
          <span>Now Playing</span>
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-2 rounded-full bg-white/18">
            <div className="h-full w-[62%] rounded-full bg-white/85" />
          </div>
          <div className="flex items-center justify-between text-[12px] text-white/65">
            <span>Design pass</span>
            <span>3:12</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="max-w-3xl">
      <p className="section-kicker">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--page-text)] md:text-4xl">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-[var(--page-muted)] md:text-base">{description}</p>
    </div>
  );
}

function RevealCard({ children, className = '', id = '', delay = 0 }: { children: React.ReactNode; className?: string; id?: string; delay?: number }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, margin: '-10%' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      className={`glass-panel ${className}`}
    >
      {children}
    </motion.section>
  );
}

function ThemeToggle({ theme, onToggle }: { theme: ThemeMode; onToggle: () => void }) {
  return (
    <button type="button" className="theme-toggle" onClick={onToggle} aria-label="Toggle theme">
      <span className="flex items-center gap-2">
        {theme === 'dark' ? <SunMedium size={14} /> : <MoonStar size={14} />}
        <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
      </span>
    </button>
  );
}

function ExperiencePhoneMockup({
  theme,
  experienceCards,
}: {
  theme: ThemeMode;
  experienceCards: ExperienceCard[];
}) {
  const [isQsOpen, setIsQsOpen] = React.useState(false);
  const [toggles, setToggles] = React.useState({ wifi: true, bt: false, airplane: false, dnd: false, powerOff: false });
  const [openedApp, setOpenedApp] = React.useState<number | null>(null);

  const toggleSetting = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAppOpen = (index: number) => {
    setOpenedApp(index);
  };

  const closePhoneApp = () => setOpenedApp(null);

  return (
          <div className="relative w-full h-[550px] sm:h-[650px] md:h-[750px] lg:h-[900px] flex justify-center mt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 scale-[0.60] sm:scale-[0.75] md:scale-[0.80] lg:scale-[0.90] origin-top drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-transform duration-300">
              
              {/* POWER BUTTON - Attached to the device frame wrapper */}
              <div 
                className="absolute -right-[4px] top-[140px] w-[5px] h-[54px] z-[500] cursor-pointer transition-colors duration-300 group rounded-r-md overflow-hidden drop-shadow-md"
                onClick={() => setToggles(prev => ({ ...prev, powerOff: !prev.powerOff }))}
              >
                <div className={`w-full h-full bg-gradient-to-r opacity-90 group-hover:opacity-100 transition-all ${
                  toggles.powerOff ? 'from-red-600 to-red-500 shadow-[0_0_12px_#ef4444]' : 'from-[#fffb8f] to-[#fffee6] shadow-[0_0_14px_#fffb8f]'
                }`} />
              </div>

              <DeviceFrameset device="Galaxy Note 8" color="black">
        <div className="relative w-full h-full bg-cover bg-center overflow-hidden font-sans select-none transition-all duration-500" 
             style={{ 
               backgroundImage: theme === 'dark' 
                 ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1080 1920'%3E%3Cdefs%3E%3ClinearGradient id='night' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%231a0b2e'/%3E%3Cstop offset='50%25' stop-color='%23311d4e'/%3E%3Cstop offset='100%25' stop-color='%234a306d'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1080' height='1920' fill='url(%23night)'/%3E%3C!-- Stars --%3E%3Ccircle cx='150' cy='200' r='3' fill='%23ffffff'/%3E%3Ccircle cx='450' cy='300' r='4' fill='%23ffffff' opacity='0.8'/%3E%3Ccircle cx='800' cy='150' r='2' fill='%23ffffff' opacity='0.5'/%3E%3Ccircle cx='600' cy='600' r='3' fill='%23ffffff'/%3E%3Ccircle cx='250' cy='800' r='4' fill='%23ffffff' opacity='0.7'/%3E%3Ccircle cx='900' cy='500' r='2' fill='%23ffffff'/%3E%3Ccircle cx='300' cy='400' r='2.5' fill='%23ffffff' opacity='0.4'/%3E%3Ccircle cx='700' cy='800' r='2' fill='%23ffffff' opacity='0.6'/%3E%3Ccircle cx='540' cy='400' r='120' fill='%23f6f1d3'/%3E%3C!-- Moon craters --%3E%3Ccircle cx='490' cy='370' r='15' fill='%23e0dbbd' opacity='0.6'/%3E%3Ccircle cx='570' cy='430' r='25' fill='%23e0dbbd' opacity='0.5'/%3E%3Ccircle cx='610' cy='350' r='12' fill='%23e0dbbd' opacity='0.4'/%3E%3C!-- Dark Clouds --%3E%3Cpath d='M 250 750 A 70 70 0 0 1 350 680 A 100 100 0 0 1 520 730 A 70 70 0 0 1 520 850 L 200 850 A 60 60 0 0 1 250 750' fill='%23384c5f' opacity='0.6'/%3E%3Cpath d='M 700 950 A 80 80 0 0 1 850 880 A 110 110 0 0 1 1050 950 A 70 70 0 0 1 1050 1080 L 650 1080 A 65 65 0 0 1 700 950' fill='%232c4154' opacity='0.5'/%3E%3C/svg%3E")`
                 : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1080 1920'%3E%3Cdefs%3E%3ClinearGradient id='sky' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%235ebcff'/%3E%3Cstop offset='100%25' stop-color='%23b7e3ff'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1080' height='1920' fill='url(%23sky)'/%3E%3C!-- Sun --%3E%3Ccircle cx='540' cy='400' r='140' fill='%23FFD700'/%3E%3Ccircle cx='540' cy='400' r='180' fill='%23FFD700' opacity='0.3'/%3E%3Ccircle cx='540' cy='400' r='230' fill='%23FFD700' opacity='0.15'/%3E%3C!-- Clouds --%3E%3Cpath d='M 250 650 A 60 60 0 0 1 350 600 A 90 90 0 0 1 500 650 A 60 60 0 0 1 500 750 L 220 750 A 50 50 0 0 1 250 650' fill='%23FFFFFF' opacity='0.95'/%3E%3Cpath d='M 700 950 A 80 80 0 0 1 850 880 A 110 110 0 0 1 1050 950 A 70 70 0 0 1 1050 1080 L 650 1080 A 65 65 0 0 1 700 950' fill='%23FFFFFF' opacity='0.9'/%3E%3Cpath d='M 100 1200 A 70 70 0 0 1 220 1120 A 100 100 0 0 1 400 1200 A 70 70 0 0 1 400 1320 L 50 1320 A 60 60 0 0 1 100 1200' fill='%23FFFFFF' opacity='0.85'/%3E%3C/svg%3E")`,
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               fontFamily: '"Roboto", -apple-system, sans-serif' 
             }}>
          
          {/* Screen Off Overlay */}
          <div className={`absolute inset-0 bg-black z-[100] transition-opacity duration-300 pointer-events-none ${toggles.powerOff ? 'opacity-100' : 'opacity-0'}`} />

          {/* STATUS BAR - Click to open Quick Settings */}
          <div 
            className="absolute top-0 left-0 right-0 h-[32px] flex justify-between items-center px-5 z-40 cursor-pointer hover:bg-black/5 transition-colors"
            onClick={() => !toggles.powerOff && !openedApp && setIsQsOpen(true)}
          >
            <span className={`text-[12px] font-medium tracking-wide ${isQsOpen || openedApp !== null ? 'text-slate-800' : 'text-slate-800'}`}>3:00</span>
            <div className={`flex gap-1.5 items-center ${isQsOpen || openedApp !== null ? 'text-slate-800' : 'text-slate-800'}`}>
              {toggles.wifi && <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21L23.5 6C20.69 3.09 16.59 1.5 12 1.5C7.41 1.5 3.31 3.09 0.5 6L12 21Z"/></svg>}
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M22 2v20h-20v-20h20zm-2 2h-16v16h16v-16z"/></svg>
              <span className="text-[10px] font-bold">80%</span>
            </div>
          </div>

          {/* HOME SCREEN */}
          <div className="absolute inset-0 pt-14 px-4 flex flex-col h-full z-10 transition-opacity duration-300" style={{ opacity: isQsOpen ? 0.2 : 1 }}>
            
            {/* Top Widgets matching the image closely */}
            <div className="flex relative mt-2 h-[130px]">
              {/* Weather Circle */}
              <div className="absolute left-2 top-0 w-[100px] h-[100px] bg-white/95 backdrop-blur-sm rounded-full shadow-sm flex flex-col items-center justify-center">
                <span className="text-[32px] font-light text-[#0b57d0] tracking-tighter ml-1">47°</span>
                <div className="absolute bottom-5 left-[18px] w-6 h-6 bg-[#fbc02d] rounded-full shadow-inner" />
                <div className="absolute bottom-[22px] left-[26px] w-[34px] h-[18px] bg-white rounded-full shadow-sm" />
              </div>
              
              {/* Clock Circle */}
              <div className="absolute right-4 top-[50px] w-[86px] h-[86px] bg-white/95 backdrop-blur-sm rounded-full shadow-sm flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-[#0b57d0] rounded-full absolute" />
                <div className="w-1 h-7 bg-[#0b57d0] absolute top-[16px] rounded-full origin-bottom" style={{ transform: 'rotate(50deg)' }} />
                <div className="w-9 h-1.5 bg-[#0b57d0] absolute left-[42px] rounded-full origin-left" />
              </div>
            </div>

            <div className="flex-1" />

            {/* APP GRID (4x4) */}
            <div className="grid grid-cols-4 gap-y-[18px] gap-x-2 px-1 mb-8 items-end justify-items-center">
              
              {/* Generic Icons matching layout */}
              <div className="flex flex-col items-center gap-1.5 cursor-not-allowed opacity-90"><div className="w-[50px] h-[50px] bg-blue-400 rounded-full flex items-center justify-center shadow-sm"><svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg></div><span className="text-[9px] font-semibold text-white drop-shadow-sm">Weather</span></div>
              <div className="flex flex-col items-center gap-1.5 cursor-not-allowed opacity-90"><div className="w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center shadow-sm"><span className="text-blue-600 font-bold text-xl">1</span></div><span className="text-[9px] font-semibold text-white drop-shadow-sm">Calendar</span></div>
              <div className="flex flex-col items-center gap-1.5 cursor-not-allowed opacity-90"><div className="w-[50px] h-[50px] bg-[#36497c] rounded-full flex items-center justify-center shadow-sm"><svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg></div><span className="text-[9px] font-semibold text-white drop-shadow-sm">Settings</span></div>
              <div className="flex flex-col items-center gap-1.5 cursor-not-allowed opacity-90"><div className="w-[50px] h-[50px] bg-orange-500 rounded-[18px] flex items-center justify-center shadow-sm"><svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg></div><span className="text-[9px] font-semibold text-white drop-shadow-sm">Notes</span></div>
              
              <div className="flex flex-col items-center gap-1.5 cursor-not-allowed opacity-90"><div className="w-[50px] h-[50px] bg-orange-600 rounded-full flex items-center justify-center shadow-sm"><svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></div><span className="text-[9px] font-semibold text-white drop-shadow-sm">Contacts</span></div>
              <div className="flex flex-col items-center gap-1.5 cursor-not-allowed opacity-90"><div className="w-[50px] h-[50px] bg-yellow-400 rounded-[18px] flex items-center justify-center shadow-sm"><svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg></div><span className="text-[9px] font-semibold text-white drop-shadow-sm">Files</span></div>
              
              {/* Flutter App Icon - Opens Experience[0] */}
              <div className="flex flex-col items-center gap-1.5 cursor-pointer hover:scale-105 transition-transform" onClick={() => handleAppOpen(0)}>
                <div className="w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center shadow-lg ring-2 ring-white/20">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg" className="w-[28px] h-[28px]" alt="Flutter" />
                </div>
                <span className="text-[9px] font-bold text-white drop-shadow-md bg-black/20 px-2 py-0.5 rounded-full">Flutter SDK</span>
              </div>
              
              {/* Android App Icon - Opens Experience[1] */}
              <div className="flex flex-col items-center gap-1.5 cursor-pointer hover:scale-105 transition-transform" onClick={() => handleAppOpen(1)}>
                <div className="w-[50px] h-[50px] bg-[#3DDC84] rounded-full flex items-center justify-center shadow-lg ring-2 ring-white/20">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg" className="w-[32px] h-[32px] object-contain ml-0.5" alt="Android" style={{ filter: 'brightness(0) invert(1)' }}/>
                </div>
                <span className="text-[9px] font-bold text-white drop-shadow-md bg-black/20 px-2 py-0.5 rounded-full">Android</span>
              </div>

            </div>

            {/* DOCK MATCHING IMAGE */}
            <div className="flex justify-around items-center px-1 pb-6 pt-5 border-t-[1.5px] border-white/20 relative">
              <div className="w-[50px] h-[50px] bg-blue-500 rounded-full flex items-center justify-center text-white shadow-sm"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg></div>
              <div className="w-[50px] h-[50px] bg-green-500 rounded-[18px] flex items-center justify-center text-white shadow-sm"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg></div>
              <div className="w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center shadow-sm"><div className="w-[24px] h-[24px] bg-[#36497c] rounded-full border-4 border-white ring-2 ring-blue-500" /></div>
              <div className="w-[50px] h-[50px] bg-red-500 rounded-[18px] flex items-center justify-center text-white shadow-sm"><svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div>
            </div>

            {/* Gesture Bar indicator */}
            <div className="absolute bottom-[10px] left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-white/90 rounded-full" />
          </div>

          {/* QUICK SETTINGS OVERLAY (Control Center) */}
          <motion.div 
            initial={false}
            animate={{ y: isQsOpen ? 0 : '-100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
            className="absolute inset-0 z-30 bg-[#eef3fa]/90 backdrop-blur-2xl flex flex-col px-4 pt-12 pb-6"
          >
            <div className="flex justify-between items-center mb-7 px-1">
              <div className="flex flex-col">
                <span className="text-2xl font-semibold text-slate-800 tracking-tight">3:00</span>
                <span className="text-[11px] text-slate-500 font-medium">Thursday, June 1</span>
              </div>
              <div className="flex gap-4">
                <svg className="w-5 h-5 text-slate-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                <svg className="w-5 h-5 text-slate-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></svg>
              </div>
            </div>

            {/* Quick Toggles Area */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              {/* Wi-Fi Pill */}
              <div 
                onClick={() => toggleSetting('wifi')}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-[28px] cursor-pointer transition-colors w-full h-[64px] ${toggles.wifi ? 'bg-[#0b57d0] text-white' : 'bg-[#d3e3fc] text-[#0b57d0]'}`}
              >
                <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21L23.5 6C20.69 3.09 16.59 1.5 12 1.5C7.41 1.5 3.31 3.09 0.5 6L12 21Z"/></svg>
                <div className="flex flex-col leading-[1.1] overflow-hidden mt-0.5">
                  <span className="font-semibold text-[14px]">Internet</span>
                  <span className={`text-[11px] font-medium mt-1 truncate ${toggles.wifi ? 'text-white/80' : 'text-[#0b57d0]/80'}`}>{toggles.wifi ? 'Connected' : 'Off'}</span>
                </div>
              </div>
              {/* Bluetooth Pill */}
              <div 
                onClick={() => toggleSetting('bt')}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-[28px] cursor-pointer transition-colors w-full h-[64px] ${toggles.bt ? 'bg-[#0b57d0] text-white' : 'bg-[#d3e3fc] text-[#0b57d0]'}`}
              >
                <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M17.71 7.71L12 2h-1v7.59L6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 11 13.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 5.83l1.88 1.88L13 9.59V5.83zm1.88 10.46L13 18.17v-3.76l1.88 1.88z"/></svg>
                <div className="flex flex-col leading-[1.1] overflow-hidden mt-0.5">
                  <span className="font-semibold text-[14px]">Bluetooth</span>
                  <span className={`text-[11px] font-medium mt-1 truncate ${toggles.bt ? 'text-white/80' : 'text-[#0b57d0]/80'}`}>{toggles.bt ? 'On' : 'Off'}</span>
                </div>
              </div>
            </div>

            {/* Smaller circle toggles row */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              <div onClick={() => toggleSetting('airplane')} className={`h-[64px] rounded-[28px] flex items-center justify-center cursor-pointer transition-colors ${toggles.airplane ? 'bg-[#0b57d0] text-white' : 'bg-[#d3e3fc] text-[#0b57d0]'}`}>
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div onClick={() => toggleSetting('dnd')} className={`h-[64px] rounded-[28px] flex items-center justify-center cursor-pointer transition-colors ${toggles.dnd ? 'bg-[#0b57d0] text-white' : 'bg-[#d3e3fc] text-[#0b57d0]'}`}>
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
              </div>
              <div className="h-[64px] rounded-[28px] flex items-center justify-center cursor-not-allowed bg-[#d3e3fc] text-[#0b57d0] opacity-80">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              </div>
              <div className="h-[64px] rounded-[28px] flex items-center justify-center cursor-not-allowed bg-[#d3e3fc] text-[#0b57d0] opacity-80">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
            </div>

            {/* Brightness Slider */}
            <div className="bg-[#d3e3fc] rounded-full h-[48px] w-full flex items-center px-1 mb-8 shadow-inner overflow-hidden">
               <div className="bg-[#0b57d0] w-[70%] h-[40px] rounded-full flex items-center px-4">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
               </div>
            </div>

            {/* Experience Cards as Notifications */}
            <div className="bg-white rounded-[28px] p-2 shadow-[0_8px_30px_rgba(0,0,0,0.06)] flex-1 overflow-y-auto">
              {experienceCards.map((exp, i) => (
                <div key={i} className="p-4 border-b border-slate-100/80 last:border-0 flex gap-4 items-center hover:bg-slate-50 transition-colors rounded-xl">
                  <div className="w-[42px] h-[42px] rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-blue-600">
                     <span className="font-bold text-lg">{exp.company.charAt(0)}</span>
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <div className="flex gap-2 items-center mb-0.5">
                      <span className="text-[14px] font-bold text-slate-900 truncate">{exp.company}</span>
                      <span className="text-[10px] text-slate-400 shrink-0">1m</span>
                    </div>
                    <span className="text-[12px] text-slate-600 leading-tight truncate">{exp.title}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Swipe up to close QS handle */}
            <div className="w-full flex justify-center pb-2 pt-4">
              <div 
                className="w-[100px] h-[5px] bg-[#0b57d0]/30 rounded-full cursor-pointer hover:bg-[#0b57d0] transition-colors"
                onClick={() => setIsQsOpen(false)}
              />
            </div>
          </motion.div>

          {/* FULLSCREEN APP OVERLAY (Flutter / Android) */}
          <motion.div
            initial={false}
            animate={{ scale: openedApp !== null ? 1 : 0.85, opacity: openedApp !== null ? 1 : 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`absolute inset-0 z-50 bg-slate-50 flex flex-col ${openedApp !== null ? 'pointer-events-auto' : 'pointer-events-none'}`}
          >
            {openedApp !== null && (
              <>
                <div className="h-[80px] bg-white border-b border-slate-200 flex items-end pb-4 px-6 z-10 shrink-0 shadow-sm">
                  <span className="text-[22px] font-bold text-slate-800 tracking-tight flex items-center gap-3">
                    {openedApp === 0 ? <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg" className="w-6 h-6" alt="Flutter" /> : <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg" className="w-6 h-6 object-contain filter invert" alt="Android" />}
                    {openedApp === 0 ? 'Flutter Dev Intern' : 'Java Dev Intern'}
                  </span>
                </div>
                <div className="flex-1 overflow-y-auto p-5">
                   <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-200">
                     <div className="flex flex-col items-start mb-6">
                       <span className="bg-blue-100 text-blue-700 text-[11px] font-bold px-3 py-1 rounded-full mb-3">{experienceCards[openedApp].period}</span>
                       <h2 className="text-xl font-bold text-slate-900 leading-tight">{experienceCards[openedApp].title}</h2>
                     </div>
                     <h3 className="text-[14px] font-semibold text-[#0b57d0] mb-5">{experienceCards[openedApp].company}</h3>
                     <ul className="space-y-4">
                       {experienceCards[openedApp].bullets.map((b, i) => (
                         <li key={i} className="flex gap-3 text-[14px] leading-relaxed text-slate-700">
                           <span className="text-[#0b57d0] mt-1 shrink-0">•</span> {b}
                         </li>
                       ))}
                     </ul>
                   </div>
                </div>
                {/* Swipe up to home */}
                <div 
                  className="h-[36px] bg-white flex items-center justify-center cursor-pointer shrink-0"
                  onClick={closePhoneApp}
                >
                  <div className="w-[120px] h-[5px] bg-slate-300 hover:bg-slate-500 transition-colors rounded-full" />
                </div>
              </>
            )}
          </motion.div>

        </div>
      </DeviceFrameset>
            </div>
          </div>
  );
}

export default function App() {
  const [apps, setApps] = useState<AppState[]>(INITIAL_APPS);
  const [maxZIndex, setMaxZIndex] = useState(12);
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [heroProgress, setHeroProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<(typeof dashboardItems)[number]['id']>('about');
  const heroRef = useRef<HTMLElement | null>(null);
  const maxZIndexRef = useRef(12);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('portfolio-theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      setTheme(storedTheme);
      return;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.body.dataset.theme = theme;
    window.localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    const favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');

    if (favicon) {
      favicon.href = theme === 'dark' ? '/logo3.png' : '/logo4.png';
    }
  }, [theme]);

  useEffect(() => {
    maxZIndexRef.current = maxZIndex;
  }, [maxZIndex]);

  useEffect(() => {
    let rafId: number;

    const updateHeroProgress = () => {
      const hero = heroRef.current;
      if (!hero) return;

      const rect = hero.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const travel = Math.max(rect.height - viewportHeight, 1);
      const progress = Math.min(Math.max((-rect.top) / travel, 0), 1);
      setHeroProgress(progress);
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateHeroProgress);
    };

    updateHeroProgress();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const sections = dashboardItems
          .map((item) => document.getElementById(item.id))
          .filter((section): section is HTMLElement => section !== null);

        if (!sections.length) return;

        const scrollPosition = window.scrollY + window.innerHeight / 2.5;

        let currentSection = sections[0].id;
        for (const section of sections) {
          const sectionTop = section.getBoundingClientRect().top + window.scrollY;
          if (sectionTop <= scrollPosition) {
            currentSection = section.id;
          }
        }

        setActiveSection((prev) => prev !== currentSection ? currentSection as any : prev);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const bringAppToFront = useCallback((id: AppId) => {
    const nextZ = maxZIndexRef.current + 1;
    maxZIndexRef.current = nextZ;
    setMaxZIndex(nextZ);
    setApps((prev) =>
      prev.map((app) => (app.id === id ? { ...app, isOpen: true, isMinimized: false, zIndex: nextZ } : app)),
    );
  }, []);

  const openApp = useCallback((id: AppId) => {
    bringAppToFront(id);
  }, [bringAppToFront]);

  const closeApp = useCallback((id: AppId) => {
    setApps((prev) => prev.map((app) => (app.id === id ? { ...app, isOpen: false } : app)));
  }, []);

  const minimizeApp = useCallback((id: AppId) => {
    setApps((prev) => prev.map((app) => (app.id === id ? { ...app, isMinimized: true } : app)));
  }, []);

  const focusApp = useCallback((id: AppId) => {
    bringAppToFront(id);
  }, [bringAppToFront]);

  const activeApp = apps.find((app) => app.isOpen && !app.isMinimized && app.zIndex === maxZIndex);
  const sceneScale = 1 - heroProgress * 0.08;
  const sceneShiftY = -heroProgress * 52;

  return (
    <div className="portfolio-page relative min-h-screen w-full overflow-x-hidden" data-theme={theme}>
      <GlassCursor />
      {/* Top Navigation / Status Bar (optional, currently we rely on Dashboard) */}

      <section ref={heroRef} className="relative min-h-[90svh] overflow-hidden px-4 pb-12 pt-6 md:px-8 md:pt-8 md:min-h-[128svh]">
        <div className="hero-backdrop pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 opacity-100 z-0">
          <motion.div
            animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className={`absolute left-[8%] top-[6%] h-64 w-64 rounded-full blur-3xl ${theme === 'dark' ? 'bg-cyan-300/10' : 'bg-stone-300/40'}`}
          />
          <motion.div
            animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className={`absolute right-[8%] top-[12%] h-72 w-72 rounded-full blur-3xl ${theme === 'dark' ? 'bg-indigo-500/16' : 'bg-sky-200/50'}`}
          />
          <motion.div
            animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className={`absolute bottom-[2%] left-1/2 h-60 w-[65%] -translate-x-1/2 rounded-full blur-3xl ${theme === 'dark' ? 'bg-purple-500/12' : 'bg-slate-300/35'}`}
          />
        </div>

        <div className="relative mx-auto flex min-h-[calc(90svh-3rem)] md:min-h-[calc(128svh-3rem)] w-full max-w-[1500px] flex-col items-center justify-center gap-8 py-4">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="hero-copy mx-auto max-w-5xl text-center"
          >
            <p className="section-kicker">macOS-inspired portfolio</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--page-text)] md:text-6xl lg:text-7xl">
              Engineering intuition into digital interfaces.
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[var(--page-muted)] md:text-lg">
              The presentation window below is just the start. Scroll down for the full portfolio sections: About, Skills,
              Projects, Experience, and Contact.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a className="pill-button" href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}>
                <FolderCode size={14} /> Projects
              </a>
              <a className="pill-button" href="#about" onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}>
                <User size={14} /> About
              </a>
              <a className="pill-button" href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
                <Mail size={14} /> Contact
              </a>
            </div>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              {heroSignals.map((signal) => (
                <span key={signal} className="hero-chip">
                  {signal}
                </span>
              ))}
            </div>
          </motion.div>

          <div
            className="macbook-scene relative mx-auto flex h-[260px] w-full max-w-[1100px] select-none justify-center sm:h-[420px] md:h-[680px] lg:h-[820px]"
            style={
              {
                '--scene-shift-y': `${sceneShiftY}px`,
                '--scene-scale': sceneScale,
              } as React.CSSProperties
            }
          >

            <div className="absolute top-0 left-1/2 z-10 flex w-[940px] -translate-x-1/2 select-none items-start justify-center pt-2 pointer-events-auto origin-top scale-[0.28] transition-transform duration-300 sm:w-[980px] sm:pt-6 sm:scale-[0.42] md:pt-10 md:scale-[0.72] lg:pt-14 lg:w-[1020px] lg:scale-[0.95]">
              <DeviceFrameset device="MacBook Pro" color="silver">
                <style>{`
                  .marvel-device.macbook .screen { background: transparent !important; border-radius: 12px; }
                  .marvel-device.macbook { box-shadow: 0 40px 100px -20px rgba(0,0,0,0.5); background: #151820; width: 1020px; height: 640px; padding: 20px 20px 44px; border-radius: 34px; }
                  .marvel-device.macbook:before { background: #0c0e13; border-radius: 28px; }
                  .marvel-device.macbook .top-bar { background: #151820; box-shadow: inset 0px -4px 13px 3px rgba(0,0,0,0.8); top: 704px; }
                  .marvel-device.macbook .top-bar:before { background: #1e222d; border-bottom: 2px solid #000; }
                  .marvel-device.macbook .top-bar:after { background: #08090c; box-shadow: inset 0px -3px 10px #000; }
                  .marvel-device.macbook .bottom-bar { top: 704px; }
                  .marvel-device.macbook .bottom-bar:before { background: linear-gradient(to right, #050608 0%, #151820 5%, #1e222d 14%, #0a0b0e 41%, #1e222d 80%, #1e222d 100%, #1e222d 100%); }
                  .marvel-device.macbook .bottom-bar:after { background: linear-gradient(to right, #1e222d 0%, #1e222d 0%, #1e222d 20%, #0a0b0e 59%, #1e222d 86%, #151820 95%, #050608 100%); }
                  .marvel-device.macbook .camera { display: none; }
                `}</style>
                <div className="screen-wallpaper !rounded-[12px] relative h-full w-full overflow-hidden bg-[#0f1422]">
                  {/* Screen Notch */}
                  <div className="absolute top-0 left-1/2 z-[60] flex h-6 w-32 -translate-x-1/2 items-center justify-center rounded-b-xl bg-black">
                    <div className="h-2 w-2 rounded-full bg-[#141414] ring-[0.5px] ring-white/10 shadow-inner"></div>
                  </div>
                  <div className="screen-glass pointer-events-none absolute inset-0 z-[1]" />
                  <div className="screen-glow pointer-events-none absolute inset-0 z-0" />
                  <div className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-black/50 to-transparent" />

                <MenuBar theme={theme} />
                <DesktopWidgets />

                <div className="absolute right-4 top-12 z-10 flex flex-col gap-6 md:right-5 md:top-14">
                  <DesktopIcon imgSrc="https://raw.githubusercontent.com/puruvj/macos-web/main/public/app-icons/finder/256.png" label="About Me" onClick={() => openApp('about')} />
                  <DesktopIcon imgSrc="https://raw.githubusercontent.com/puruvj/macos-web/main/public/app-icons/vscode/256.png" label="Projects" onClick={() => openApp('projects')} />
                  <DesktopIcon imgSrc="https://raw.githubusercontent.com/puruvj/macos-web/main/public/app-icons/notes/256.png" label="Resume" onClick={() => openApp('resume')} />
                </div>

                <div className="absolute bottom-22 left-6 z-10 hidden rounded-[22px] border border-white/14 bg-white/12 p-4 text-white shadow-[0_18px_26px_rgba(0,0,0,0.22)] backdrop-blur-xl lg:block">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-white/15 p-3">
                      <MonitorSmartphone size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Interactive UI</p>
                      <p className="text-xs text-white/70">Draggable windows running on a 3D interface.</p>
                    </div>
                  </div>
                </div>

                <Window
                  id="about"
                  title="About Me"
                  isOpen={apps.find((app) => app.id === 'about')?.isOpen ?? false}
                  onClose={() => closeApp('about')}
                  onMinimize={() => minimizeApp('about')}
                  zIndex={apps.find((app) => app.id === 'about')?.zIndex ?? 10}
                  active={activeApp?.id === 'about'}
                  onFocus={() => focusApp('about')}
                  className={WINDOW_LAYOUT.about}
                  theme={theme}
                >
                  <AboutMe theme={theme} />
                </Window>

                <Window
                  id="projects"
                  title="Projects"
                  isOpen={apps.find((app) => app.id === 'projects')?.isOpen ?? false}
                  onClose={() => closeApp('projects')}
                  onMinimize={() => minimizeApp('projects')}
                  zIndex={apps.find((app) => app.id === 'projects')?.zIndex ?? 10}
                  active={activeApp?.id === 'projects'}
                  onFocus={() => focusApp('projects')}
                  className={WINDOW_LAYOUT.projects}
                  theme={theme}
                >
                  <Projects theme={theme} />
                </Window>

                <Window
                  id="resume"
                  title="Resume"
                  isOpen={apps.find((app) => app.id === 'resume')?.isOpen ?? false}
                  onClose={() => closeApp('resume')}
                  onMinimize={() => minimizeApp('resume')}
                  zIndex={apps.find((app) => app.id === 'resume')?.zIndex ?? 10}
                  active={activeApp?.id === 'resume'}
                  onFocus={() => focusApp('resume')}
                  className={WINDOW_LAYOUT.resume}
                  theme={theme}
                >
                  <Resume />
                </Window>

                <Dock onOpenApp={openApp} activeAppId={activeApp?.id ?? null} theme={theme} />
                </div>
              </DeviceFrameset>
            </div>
          </div>

          <div className={`mx-auto flex w-full max-w-4xl items-center justify-between gap-4 rounded-full border px-5 py-3 text-xs font-medium backdrop-blur-xl ${theme === 'dark' ? 'border-white/10 bg-white/6 text-white/80' : 'border-white/35 bg-white/30 text-slate-700 shadow-[0_18px_35px_rgba(100,120,160,0.12)]'}`}>
            <span>Interactive window frame acts as an introduction.</span>
            <span className={`inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] ${theme === 'dark' ? 'text-white/55' : 'text-slate-500'}`}>
              Scroll <ChevronDown size={12} /> to open the full portfolio
            </span>
          </div>
        </div>
      </section>

      <main className="mx-auto flex w-full max-w-[1400px] flex-col gap-8 px-4 pb-24 md:px-8">
        <RevealCard id="about" className="grid gap-8 p-6 md:p-8 lg:grid-cols-[200px_1.2fr_0.8fr] scroll-mt-28 items-center">
          <div className="group relative mx-auto h-40 w-40 overflow-hidden rounded-full shadow-sm shrink-0">
            <div className="absolute inset-0 z-10 rounded-full opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100 group-hover:bg-white/10 dark:group-hover:bg-black/10" />
            <img
              src="/pic1-modified.png"
              alt="Sachin Ram"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="space-y-5">
            <p className="section-kicker">Full Portfolio</p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-[var(--page-text)] md:text-6xl flex items-center">
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: 'auto' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="inline-block overflow-hidden whitespace-nowrap"
              >
                SACHIN RAM ES
              </motion.span>
              <span className="ml-[2px] inline-block h-[1em] w-[4px] bg-[var(--page-text)] animate-[full-blink_1s_step-start_infinite]" />
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[var(--page-muted)] md:text-xl">
              Full-Stack Developer and Coding Enthusiast building polished interfaces, dependable systems, and practical
              product experiences.
            </p>
            <div className="flex flex-wrap gap-3">
              <a className="pill-button" href="mailto:sachinram6363@gmail.com">
                <Mail size={14} /> Email
              </a>
              <a className="pill-button" href="https://github.com/SachinRam18/" target="_blank" rel="noreferrer">
                <Github size={14} /> GitHub
              </a>
              <a className="pill-button" href="https://linkedin.com" target="_blank" rel="noreferrer">
                <Linkedin size={14} /> LinkedIn
              </a>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {heroStats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div key={stat.label} className="mini-stat">
                  <Icon size={18} className="text-[var(--page-muted)]" />
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--page-muted)]">{stat.label}</p>
                    <p className="mt-1 text-sm font-medium text-[var(--page-text)]">{stat.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </RevealCard>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <RevealCard id="about-details" className="p-6 md:p-8 scroll-mt-28">
            <SectionHeader
              eyebrow="About"
              title="A focused builder who likes premium interfaces and clean systems."
              description="I design and ship software with a strong attention to polish, predictable behavior, and a calm visual hierarchy."
            />

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {aboutContacts.map((contact) => {
                const Icon = contact.icon;
                return (
                  <a
                    key={contact.label}
                    href={contact.href}
                    target={contact.href.startsWith('http') ? '_blank' : undefined}
                    rel={contact.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="contact-link"
                  >
                    <Icon size={16} />
                    <span>
                      <strong>{contact.label}</strong>
                      <small>{contact.value}</small>
                    </span>
                  </a>
                );
              })}
            </div>
          </RevealCard>

          <RevealCard id="education" className="p-6 md:p-8 scroll-mt-28">
            <SectionHeader
              eyebrow="Education"
              title="Strong academic base with a business-minded CSBS track."
              description="The academic path and school record give the portfolio a solid foundation in engineering fundamentals and execution discipline."
            />

            <div className="mt-8 space-y-4">
              <div className="timeline-card flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white p-1.5 shadow-sm ring-1 ring-black/5 dark:bg-white/90">
                  <img src="/psg.png" alt="PSG ITech Logo" className="h-full w-full object-contain" />
                </div>
                <div>
                  <p className="font-semibold text-[var(--page-text)]">PSG Institute of Technology and Applied Research</p>
                  <p className="mt-1 text-sm text-[var(--page-muted)]">B.Tech CSBS</p>
                </div>
                <div className="text-right ml-auto">
                  <p className="font-semibold text-[var(--page-text)]">CGPA 8.59</p>
                  <p className="mt-1 text-xs text-[var(--page-muted)]">2023 - Present</p>
                </div>
              </div>

              <div className="timeline-card flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white p-1.5 shadow-sm ring-1 ring-black/5 dark:bg-white/90">
                  <img src="/ssm.png" alt="SSM School Logo" className="h-full w-full object-contain" />
                </div>
                <div>
                  <p className="font-semibold text-[var(--page-text)]">Srimathi Sundaravalli Memorial School</p>
                  <p className="mt-1 text-sm text-[var(--page-muted)]">XII: 88.2% | X: 91.6%</p>
                </div>
                <div className="text-right ml-auto">
                  <p className="font-semibold text-[var(--page-text)]">Schooling</p>
                  <p className="mt-1 text-xs text-[var(--page-muted)]">Foundation stage</p>
                </div>
              </div>
            </div>
          </RevealCard>
        </div>

        <RevealCard id="skills" className="p-6 md:p-8 scroll-mt-28">
          <SectionHeader
            eyebrow="Skills"
            title="A practical stack spanning frontend, backend, mobile, and core CS fundamentals."
            description="The portfolio leans on a compact toolset: enough breadth to ship products, enough depth to reason about the system."
          />

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {skillGroups.map((group) => (
              <motion.div 
                key={group.title} 
                className="skill-group-card will-change-transform"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--page-muted)]">
                  <Award size={13} />
                  {group.title}
                </div>
                <div className="mt-4 flex flex-col gap-2.5">
                  {group.items.map((item) => {
                    const iconSrc = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${item.icon}`;
                    return (
                      <div key={item.name} className="skill-pill flex items-center justify-between w-full relative group/item" style={{ '--icon-brand': item.color } as React.CSSProperties}>
                        <div className="flex items-center gap-3">
                          <div className="bg-white rounded-full flex items-center justify-center shadow-sm" style={{ width: 28, height: 28, minWidth: 28, minHeight: 28 }}>
                            <img 
                              src={iconSrc}
                              alt={item.name}
                              style={{ width: '60%', height: '60%', objectFit: 'contain' }}
                            />
                          </div>
                          <span className="font-medium text-[13.5px] tracking-tight transition-colors duration-300">{item.name}</span>
                        </div>
                        {/* Neon Tube Track */}
                        <div className="flex-1 max-w-[45%] h-1.5 ml-4 rounded-full bg-white/40 dark:bg-white/10 shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)] ring-1 ring-black/5 dark:ring-white/20 backdrop-blur-sm overflow-hidden relative">
                          {/* Neon Fill glow */}
                          <div 
                            className="absolute left-0 top-0 h-full rounded-full shadow-[0_0_10px_2px_var(--neon-glow)] transition-all duration-1000 ease-out"
                            style={{ 
                              width: `${item.level}%`,
                              background: 'var(--neon-bg)' 
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </RevealCard>

        <RevealCard id="projects" className="p-6 md:p-8 scroll-mt-28">
          <SectionHeader
            eyebrow="Projects"
            title="Two highlighted builds that show hardware, AI, and product thinking."
            description="The desktop previews inside the interactive window stay lightweight; the full project story lives here in the scrollable portfolio."
          />

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {projectCards.map((project, index) => (
              <motion.article 
                key={project.title} 
                className="project-card will-change-transform"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, margin: '-5%' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="project-surface relative group/img overflow-hidden">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-[1.05]" 
                    />
                  ) : (
                    <>
                      <div className="project-orb" />
                      <div className="project-frame" />
                    </>
                  )}
                  {/* A subtle overlay to ensure framing and orb-like aesthetics aren't completely lost */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent mix-blend-overlay pointer-events-none" />
                </div>
                <div className="p-5 md:p-6">
                  <h3 className="text-xl font-semibold tracking-tight text-[var(--page-text)]">{project.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--page-muted)]">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="skill-pill">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </RevealCard>

        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <RevealCard id="experience" className="p-6 md:p-8 scroll-mt-28">
            <SectionHeader
              eyebrow="Experience"
              title="Internships that improved throughput and reduced manual effort."
              description="The experience profile shows delivery under operational constraints, not just coursework."
            />

            <div className="mt-8 space-y-4">
              {experienceCards.map((experience, index) => (
                <motion.div 
                  key={experience.title} 
                  className="timeline-card flex items-start gap-4 will-change-transform"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, margin: '-5%' }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  {experience.title.includes('Flutter') && (
                    <motion.div
                      animate={{ y: [-3, 3, -3], rotateZ: [-2, 2, -2], rotateX: [0, 10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      className="relative flex h-14 w-14 lg:h-16 lg:w-16 shrink-0 items-center justify-center rounded-[18px] bg-gradient-to-br from-[#02569B] to-[#54C5F8] shadow-[0_12px_24px_-8px_#02569B,inset_0_2px_4px_rgba(255,255,255,0.4)] border border-white/20 mt-1 perspective-[1000px] transform-view"
                    >
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg" className="w-[60%] h-[60%] object-contain relative z-10" alt="Flutter" style={{ filter: 'brightness(0) invert(1) drop-shadow(0px 4px 6px rgba(0,0,0,0.3))' }} />
                      <div className="absolute inset-0 rounded-[18px] bg-gradient-to-tr from-transparent via-white/10 to-white/40 pointer-events-none" />
                    </motion.div>
                  )}
                  {experience.title.includes('Java') && (
                    <motion.div
                      animate={{ y: [-3, 3, -3], rotateZ: [2, -2, 2], rotateX: [10, 0, 10] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                      className="relative flex h-14 w-14 lg:h-16 lg:w-16 shrink-0 items-center justify-center rounded-[18px] bg-gradient-to-br from-[#3DDC84] to-[#01875F] shadow-[0_12px_24px_-8px_#3DDC84,inset_0_2px_4px_rgba(255,255,255,0.4)] border border-white/20 mt-1 perspective-[1000px] transform-view"
                    >
                      <svg width="65%" height="65%" viewBox="0 0 24 24" fill="#FFF" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.3))' }}>
                        <path d="M17.5 7.3l1.8-3.1c.1-.2 0-.5-.2-.6-.2-.1-.5 0-.6.2L16.6 7c-1.4-.6-2.9-.9-4.6-.9-1.6 0-3.2.3-4.6.9L5.5 3.8c-.1-.2-.4-.3-.6-.2-.2.1-.3.4-.2.6l1.8 3.1A9.7 9.7 0 002 15h20c0-3.1-1.4-5.9-4.5-7.7zM7 11.5c-.7 0-1.2-.6-1.2-1.2 0-.7.6-1.2 1.2-1.2.7 0 1.2.6 1.2 1.2 0 .7-.6 1.2-1.2 1.2zm10 0c-.7 0-1.2-.6-1.2-1.2 0-.7.6-1.2 1.2-1.2.7 0 1.2.6 1.2 1.2 0 .7-.6 1.2-1.2 1.2z"/>
                      </svg>
                      <div className="absolute inset-0 rounded-[18px] bg-gradient-to-tr from-transparent via-white/10 to-white/40 pointer-events-none" />
                    </motion.div>
                  )}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-y-1">
                      <div>
                        <p className="text-sm font-semibold text-[var(--page-text)]">{experience.title}</p>
                        <p className="mt-1 text-sm text-[var(--page-muted)]">{experience.company}</p>
                      </div>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--page-muted)]">
                        {experience.period}
                      </span>
                    </div>
                    <ul className="mt-4 space-y-3 text-[13.5px] leading-relaxed text-[var(--page-muted)]">
                      {experience.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3 items-start">
                          <div className="relative mt-[6px] shrink-0 h-2 w-2">
                            <span className="absolute inset-0 rounded-full opacity-40 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" style={{ background: 'var(--neon-bg)' }} />
                            <span className="relative block h-2 w-2 rounded-full shadow-[0_0_10px_2px_var(--neon-glow-spread)]" style={{ background: 'var(--neon-bg)' }} />
                          </div>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </RevealCard>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="flex h-full flex-col items-center justify-center"
          >
            <div className="glass-panel relative flex h-full w-full items-center justify-center overflow-hidden p-6 md:p-8">
              <ExperiencePhoneMockup theme={theme} experienceCards={experienceCards} />
            </div>
          </motion.div>
        </div>

        <RevealCard id="contact" className="grid gap-6 p-6 md:p-8 lg:grid-cols-[1fr_0.8fr] scroll-mt-28">
          <div>
            <SectionHeader
              eyebrow="Contact"
              title="Simple ways to reach out or inspect the code trail."
              description="Email is the fastest route. GitHub and LinkedIn are the public references."
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <a className="contact-link contact-link-strong group/contact relative overflow-hidden transition-colors duration-300 hover:bg-white/5" href="mailto:sachinram6363@gmail.com">
              <div className="relative z-10 flex items-center gap-3">
                <Mail size={16} className="text-[var(--page-muted)]" />
                <span className="flex flex-col">
                  <strong className="text-[var(--page-text)] font-semibold">Email</strong>
                  <small className="text-[var(--page-muted)] text-xs">sachinram6363@gmail.com</small>
                </span>
              </div>
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" alt="Gmail" className="absolute -right-4 top-1/2 h-[120%] w-auto max-w-none -translate-y-1/2 opacity-10 grayscale [mask-image:linear-gradient(to_right,transparent,black)] group-hover/contact:opacity-100 group-hover/contact:grayscale-0 transition-all duration-500 pointer-events-none" />
            </a>
            <a className="contact-link contact-link-strong group/contact relative overflow-hidden transition-colors duration-300 hover:bg-white/5" href="https://github.com/SachinRam18/" target="_blank" rel="noreferrer">
              <div className="relative z-10 flex items-center gap-3">
                <Github size={16} className="text-[var(--page-muted)]" />
                <span className="flex flex-col">
                  <strong className="text-[var(--page-text)] font-semibold">GitHub</strong>
                  <small className="text-[var(--page-muted)] text-xs">github.com/SachinRam18/</small>
                </span>
              </div>
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" alt="GitHub" className="absolute -right-4 top-1/2 h-[120%] w-auto max-w-none -translate-y-1/2 opacity-10 dark:invert [mask-image:linear-gradient(to_right,transparent,black)] group-hover/contact:opacity-100 transition-all duration-500 pointer-events-none" />
            </a>
            <a className="contact-link contact-link-strong group/contact relative overflow-hidden transition-colors duration-300 hover:bg-white/5" href="https://linkedin.com" target="_blank" rel="noreferrer">
              <div className="relative z-10 flex items-center gap-3">
                <Linkedin size={16} className="text-[var(--page-muted)]" />
                <span className="flex flex-col">
                  <strong className="text-[var(--page-text)] font-semibold">LinkedIn</strong>
                  <small className="text-[var(--page-muted)] text-xs">linkedin.com</small>
                </span>
              </div>
              <img src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg" alt="LinkedIn" className="absolute -right-4 top-1/2 h-[120%] w-auto max-w-none -translate-y-1/2 opacity-10 grayscale [mask-image:linear-gradient(to_right,transparent,black)] group-hover/contact:opacity-100 group-hover/contact:grayscale-0 transition-all duration-500 pointer-events-none" />
            </a>
            <a className="contact-link contact-link-strong group/contact relative overflow-hidden transition-colors duration-300 hover:bg-white/5" href="tel:+919789010679">
              <div className="relative z-10 flex items-center gap-3">
                <Phone size={16} className="text-[var(--page-muted)]" />
                <span className="flex flex-col">
                  <strong className="text-[var(--page-text)] font-semibold">Phone</strong>
                  <small className="text-[var(--page-muted)] text-xs">+91 97890 10679</small>
                </span>
              </div>
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="absolute -right-4 top-1/2 h-[120%] w-auto max-w-none -translate-y-1/2 opacity-10 grayscale [mask-image:linear-gradient(to_right,transparent,black)] group-hover/contact:opacity-100 group-hover/contact:grayscale-0 transition-all duration-500 pointer-events-none" />
            </a>
          </div>
        </RevealCard>

        <div className="pb-10 text-center text-xs uppercase tracking-[0.3em] text-[var(--page-muted)]">
          Interactive portfolio built with React, Tailwind CSS, and Motion.
        </div>
      </main>

      <Dashboard 
        items={dashboardItems} 
        activeSection={activeSection} 
        onSectionClick={(id) => setActiveSection(id as any)}
        theme={theme}
        onToggleTheme={() => {
          const toggle = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
          if (!(document as any).startViewTransition) {
            toggle();
          } else {
            (document as any).startViewTransition(toggle);
          }
        }} 
      />
    </div>
  );
}
