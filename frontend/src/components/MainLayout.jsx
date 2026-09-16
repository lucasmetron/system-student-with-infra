import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function MainLayout() {
  return (
    <>
      <Sidebar />
      <div className="pl-72 flex flex-col min-h-screen">
        <Header />
        <main className="w-full pt-16 bg-background min-h-screen px-8 py-8">
          <Outlet />
        </main>
      </div>
    </>
  );
}
