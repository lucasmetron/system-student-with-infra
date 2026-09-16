import React from 'react';

export default function Header() {
  return (
    <header className="fixed top-0 left-72 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-8">
      <div className="flex items-center gap-6 flex-1 max-w-xl">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
          <input className="w-full h-10 pl-10 pr-4 rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline font-body-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all" placeholder="Buscar por aluno, matrícula ou matéria..." type="text"/>
        </div>
        <div className="hidden xl:flex items-center gap-2 whitespace-nowrap px-3 py-1.5 rounded-full bg-surface-container-high text-on-surface">
          <span className="w-2 h-2 rounded-full bg-tertiary-container"></span>
          <span className="font-label-sm font-medium">Ano Letivo 2025 • 1º Semestre</span>
        </div>
      </div>
      <div className="flex items-center gap-4 ml-6">
        <button className="relative p-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" type="button">
          <span className="material-symbols-outlined text-[22px]">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full"></span>
        </button>
        <div className="h-6 w-px bg-surface-container"></div>
        <div className="flex items-center gap-3">
          <img alt="Profile" className="w-8 h-8 rounded-full object-cover shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHISIa2KmfncJvlc33NozQ44RxMzCwqMiIuGp6n0R0yT89f17rXyidWxlSO4H9Kaqw1v1huSsVpvuiUJOvUMe0riKLoOB_XMRNDSDx9_EDxFoECy7M84OA-2rHpWqMhC23VsU7-tbjwj2_mZ2LnxI_wXp1HAbgVIKyyLaNPa6Sbj9dzN8N05gAbneu3dfGuyvETj_Vx0-cD6KGhKuJpysqXRF6Q1CpTKX1PAKOX4L2jfY6ZJ3c-Rg5-Q"/>
          <div className="flex flex-col text-left">
            <span className="font-label-md text-on-surface leading-tight">Mariana Souza</span>
            <span className="font-label-sm text-on-surface-variant">Secretaria Acadêmica</span>
          </div>
        </div>
      </div>
    </header>
  );
}
