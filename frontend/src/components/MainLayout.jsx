import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col text-on-surface antialiased">
      {/* Sidebar Desktop + Mobile Drawer */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Conteúdo Principal ocupando 100% da largura útil sem centralização */}
      <div className="lg:pl-72 flex flex-col flex-1 min-w-0">
        {/* Header fixo no topo com alinhamento de 15px */}
        <Header
          onMenuToggle={() => setSidebarOpen(prev => !prev)}
          isSidebarOpen={sidebarOpen}
        />

        {/* 100% de largura, alinhado à esquerda e com 15px de padding em todos os lados (pt-[79px] = 64px header + 15px respiro) */}
        <main className="w-full flex-1 pt-[79px] px-[15px] pb-[15px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
