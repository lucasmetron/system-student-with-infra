import React, { useState } from 'react';
import KpiCard from '../components/KpiCard';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import StatusPill from '../components/StatusPill';
import { api } from '../services/api';

export default function MateriasPage() {
  const [formData, setFormData] = useState({});
  const [filterArea, setFilterArea] = useState('Todas');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/materias', formData);
      alert('Matéria salva com sucesso!');
      setFormData({});
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const materias = [
    { id: '1', nome: 'Matemática Avançada', codigo: 'MAT-301', area: 'Exatas', carga: '4h', professor: 'Carlos Mendes', status: 'Ativa' },
    { id: '2', nome: 'História Contemporânea', codigo: 'HIS-202', area: 'Humanas', carga: '2h', professor: 'Roberto Almeida', status: 'Ativa' },
    { id: '3', nome: 'Biologia Celular', codigo: 'BIO-105', area: 'Biológicas', carga: '3h', professor: 'Luciana Ferreira', status: 'Revisão' },
    { id: '4', nome: 'Literatura Brasileira', codigo: 'POR-401', area: 'Linguagens', carga: '4h', professor: 'Sonia Guimarães', status: 'Ativa' }
  ];

  const materiasFiltradas = filterArea === 'Todas' ? materias : materias.filter(m => m.area === filterArea);

  const renderAreaIcon = (area) => {
    switch(area) {
      case 'Exatas': return 'calculate';
      case 'Humanas': return 'public';
      case 'Biológicas': return 'biotech';
      case 'Linguagens': return 'translate';
      default: return 'menu_book';
    }
  };

  return (
    <div className="flex flex-col w-full gap-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-headline-lg text-on-surface tracking-tight">Cadastro de Matérias</h1>
          <p className="font-body-md text-on-surface-variant">Gestão da matriz curricular, ementas e carga horária disciplinar.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 self-start lg:self-center">
          <Button variant="secondary" icon="menu_book">Matriz Curricular Base</Button>
          <Button variant="primary" icon="add" onClick={() => document.getElementById('form-materia').scrollIntoView({behavior: 'smooth'})}>Nova Matéria</Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard title="Disciplinas Ativas" icon="menu_book" value="42" trendIcon="trending_up" trendValue="+3" />
        <KpiCard title="Carga Horária Total" icon="schedule" value="1.240h" />
        <KpiCard title="Em Revisão de Ementa" icon="rate_review" value="5" trendColor="warning" />
        <KpiCard title="Alocação de Docentes" icon="group_add" value="100%" progress={100} />
      </div>

      <div className="flex flex-col xl:flex-row gap-6 items-start" id="form-materia">

        {/* Coluna Esquerda: Gráfico + Form */}
        <div className="w-full xl:w-1/3 flex flex-col gap-6">

          {/* Gráfico Distribuição Curricular */}
          <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-6 shadow-sm border border-outline-variant flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <h3 className="font-title-md text-on-surface">Distribuição Curricular</h3>
              <span className="font-label-sm px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant">2025</span>
            </div>
            <div className="flex items-center justify-center p-2">
              <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 160 160">
                <circle cx="80" cy="80" fill="transparent" r="60" stroke="#eff4ff" strokeWidth="20"></circle>
                <circle cx="80" cy="80" fill="transparent" r="60" stroke="#004ac6" strokeDasharray="377" strokeDashoffset="150" strokeLinecap="round" strokeWidth="20"></circle>
                <circle cx="80" cy="80" fill="transparent" r="60" stroke="#007b71" strokeDasharray="377" strokeDashoffset="270" strokeLinecap="round" strokeWidth="20"></circle>
                <circle cx="80" cy="80" fill="transparent" r="60" stroke="#4b41e1" strokeDasharray="377" strokeDashoffset="340" strokeLinecap="round" strokeWidth="20"></circle>
              </svg>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-primary"></span><span className="font-label-sm text-on-surface-variant">Exatas</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span><span className="font-label-sm text-on-surface-variant">Biológicas</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-secondary"></span><span className="font-label-sm text-on-surface-variant">Humanas</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-surface-container-high"></span><span className="font-label-sm text-on-surface-variant">Linguagens</span></div>
            </div>
          </div>

          {/* Formulário */}
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-sm p-6">
            <h2 className="font-title-md text-on-surface mb-6 border-b border-surface-container pb-3">Dados da Disciplina</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <Input id="nome" label="Nome da Matéria" placeholder="Ex: Matemática Avançada" required onChange={handleInputChange} />

              <div className="grid grid-cols-2 gap-4">
                <Input id="codigo" label="Código" placeholder="Ex: MAT-301" required onChange={handleInputChange} />
                <Input id="cargaHoraria" label="Carga/Semana" type="number" placeholder="Ex: 4" required onChange={handleInputChange} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select id="area" label="Área de Conhecimento" options={[
                  {value: 'Exatas', label: 'Ciências Exatas'},
                  {value: 'Humanas', label: 'Ciências Humanas'},
                  {value: 'Biologicas', label: 'Ciências Biológicas'},
                  {value: 'Linguagens', label: 'Linguagens e Códigos'}
                ]} required onChange={handleInputChange} />

                <Input id="salaPadrao" label="Sala Padrão" placeholder="Ex: Lab 01" onChange={handleInputChange} />
              </div>

              <Select id="professor" label="Professor Coordenador" options={[
                {value: '1', label: 'Carlos Eduardo Mendes'},
                {value: '2', label: 'Luciana Ferreira'},
                {value: '4', label: 'Sonia Guimarães'}
              ]} onChange={handleInputChange} placeholder="Selecione um docente" />

              <div className="flex flex-col gap-1.5 w-full">
                <label className="font-label-md text-on-surface flex items-center gap-1">Ementa Resumida</label>
                <textarea
                  id="ementa"
                  rows="4"
                  className="w-full p-3 rounded-lg bg-surface-container-lowest border border-outline-variant text-on-surface font-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                  placeholder="Descreva os objetivos e o conteúdo programático..."
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                 <Button variant="secondary">Limpar</Button>
                 <Button type="submit" variant="primary" icon="save">Salvar Matéria</Button>
              </div>
            </form>
          </div>
        </div>

        {/* Grade de Cards */}
        <div className="flex-1 w-full flex flex-col gap-4">
           {/* Filtros Rápidos */}
           <div className="flex items-center gap-2 overflow-x-auto pb-2">
             {['Todas', 'Exatas', 'Humanas', 'Biológicas', 'Linguagens'].map(area => (
               <button
                 key={area}
                 onClick={() => setFilterArea(area)}
                 className={`px-4 py-2 rounded-full font-label-md whitespace-nowrap transition-colors ${filterArea === area ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest text-on-surface border border-outline-variant hover:bg-surface-container-low'}`}
               >
                 {area}
               </button>
             ))}
           </div>

           {/* Cards Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {materiasFiltradas.map(m => (
               <div key={m.id} className="p-5 bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-sm flex flex-col gap-4 hover:border-primary/50 transition-colors cursor-pointer group">
                 <div className="flex justify-between items-start">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                       <span className="material-symbols-outlined">{renderAreaIcon(m.area)}</span>
                     </div>
                     <div className="flex flex-col">
                       <span className="font-label-lg text-on-surface font-semibold">{m.nome}</span>
                       <span className="font-body-sm text-on-surface-variant">{m.codigo} • {m.area}</span>
                     </div>
                   </div>
                   <StatusPill status={m.status === 'Ativa' ? 'success' : 'warning'} label={m.status} />
                 </div>

                 <div className="flex items-center justify-between pt-4 border-t border-surface-container">
                   <div className="flex items-center gap-2 text-on-surface-variant">
                     <span className="material-symbols-outlined text-[18px]">person</span>
                     <span className="font-body-sm">{m.professor}</span>
                   </div>
                   <div className="flex items-center gap-1 font-label-md text-on-surface">
                     <span className="material-symbols-outlined text-[18px] text-outline">schedule</span>
                     <span>{m.carga}/sem</span>
                   </div>
                 </div>
               </div>
             ))}
           </div>
        </div>

      </div>
    </div>
  );
}
