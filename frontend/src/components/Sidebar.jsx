import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const linkClasses = ({ isActive }) =>
    isActive
      ? "flex items-center gap-3 px-3.5 py-2.5 rounded-lg font-label-md transition-colors duration-150 bg-primary text-on-primary shadow-sm"
      : "flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant font-label-md hover:bg-surface-container hover:text-on-surface transition-colors duration-150";

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between py-6">
      <div className="flex flex-col gap-6">
        <div className="px-6 flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" fill="none" className="h-8 w-auto object-contain">
            <rect width="48" height="48" rx="12" fill="#2563EB"/>
            <path d="M24 12L10 19L24 26L38 19L24 12Z" fill="white"/>
            <path d="M14 22.5V30.5C14 34 18.5 36.5 24 36.5C29.5 36.5 34 34 34 30.5V22.5L24 27.5L14 22.5Z" fill="white" fillOpacity="0.85"/>
            <path d="M38 19.5V29" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="38" cy="30.5" r="1.5" fill="white"/>
          </svg>
          <div className="flex flex-col">
            <span className="font-headline-md text-title-md text-on-surface leading-tight tracking-tight">EducaCore</span>
            <span className="font-body-sm text-on-surface-variant">Gestão Escolar</span>
          </div>
        </div>
        <div className="px-6">
          <div className="h-px w-full bg-surface-container"></div>
        </div>
        <nav className="flex flex-col gap-1.5 px-4">
          <NavLink to="/alunos" className={linkClasses}>
            <span className="material-symbols-outlined text-[20px]">school</span>
            <span>Cadastro de Alunos teste lala</span>
          </NavLink>
          <NavLink to="/professores" className={linkClasses}>
            <span className="material-symbols-outlined text-[20px]">co_present</span>
            <span>Cadastro de Professores</span>
          </NavLink>
          <NavLink to="/materias" className={linkClasses}>
            <span className="material-symbols-outlined text-[20px]">menu_book</span>
            <span>Cadastro de Matérias</span>
          </NavLink>
        </nav>
      </div>
      <div className="px-6 flex flex-col gap-4">
        <div className="p-3.5 rounded-xl bg-surface-container-low flex flex-col gap-2">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-[18px]">help_outline</span>
            <span className="font-label-md">Suporte e Ajuda</span>
          </div>
          <p className="font-body-sm text-on-surface-variant">Central acadêmica disponível em horário letivo.</p>
        </div>
        <div className="flex items-center justify-between text-outline font-label-sm px-1">
          <span>Versão estável</span>
          <span className="px-2 py-0.5 rounded-full bg-surface-container font-semibold text-on-surface-variant">v2.4</span>
        </div>
      </div>
    </aside>
  );
}
