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

      {/* Conteúdo Principal com compensação da barra lateral no Desktop */}
      <div className="lg:pl-72 flex flex-col flex-1 min-w-0 transition-all duration-300">
        {/* Header fixo no topo com botão hambúrguer mobile */}
        <Header
          onMenuToggle={() => setSidebarOpen(prev => !prev)}
          isSidebarOpen={sidebarOpen}
        />

        {/* Área de conteúdo das rotas (pt-24 garante 32px de respiro abaixo do Header fixo de h-16) */}
        <main className="w-full flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
