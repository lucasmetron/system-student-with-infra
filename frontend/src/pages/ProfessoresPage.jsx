import React, { useState } from 'react';
import KpiCard from '../components/KpiCard';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import StatusPill from '../components/StatusPill';
import { api } from '../services/api';

export default function ProfessoresPage() {
  const [formData, setFormData] = useState({});
  const [selectedDisciplinas, setSelectedDisciplinas] = useState([]);
  const [selectedTurmas, setSelectedTurmas] = useState([]);

  const disciplinas = ['Matemática', 'Física', 'Química', 'Biologia', 'Português', 'História', 'Geografia', 'Inglês'];
  const turmas = ['1º Ano A', '1º Ano B', '2º Ano A', '3º Ano A', '9º Ano A'];

  const toggleDisciplina = (d) => {
    setSelectedDisciplinas(prev =>
      prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]
    );
  };

  const toggleTurma = (t) => {
    setSelectedTurmas(prev =>
      prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = { ...formData, disciplinas: selectedDisciplinas, turmas: selectedTurmas };
      await api.post('/professores', dataToSubmit);
      alert('Professor cadastrado com sucesso!');
      setFormData({});
      setSelectedDisciplinas([]);
      setSelectedTurmas([]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const professores = [
    { id: '1', nome: 'Carlos Eduardo Mendes', rf: 'RF-90812', email: 'carlos.mendes@educacore.edu.br', disciplinas: ['Matemática', 'Física'], carga: '32h', status: 'Ativo', statusType: 'success' },
    { id: '2', nome: 'Luciana Ferreira', rf: 'RF-90813', email: 'luciana.ferreira@educacore.edu.br', disciplinas: ['Biologia', 'Ciências'], carga: '24h', status: 'Ativo', statusType: 'success' },
    { id: '3', nome: 'Roberto Almeida', rf: 'RF-90814', email: 'roberto.almeida@educacore.edu.br', disciplinas: ['História'], carga: '16h', status: 'Afastado', statusType: 'warning' },
    { id: '4', nome: 'Sonia Guimarães', rf: 'RF-90815', email: 'sonia.guimaraes@educacore.edu.br', disciplinas: ['Português', 'Literatura'], carga: '40h', status: 'Ativo', statusType: 'success' }
  ];

  return (
    <div className="flex flex-col w-full gap-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-headline-lg text-on-surface tracking-tight">Cadastro de Professores</h1>
          <p className="font-body-md text-on-surface-variant">Gestão do corpo docente, alocação de disciplinas e controle de turmas.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 self-start lg:self-center">
          <Button variant="secondary" icon="download">Exportar Relatório</Button>
          <Button variant="primary" icon="person_add" onClick={() => document.getElementById('form-prof').scrollIntoView({behavior: 'smooth'})}>Novo Docente</Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard title="Corpo Docente Ativo" icon="group" value="84" trendIcon="trending_up" trendValue="+2" />
        <KpiCard title="Carga Horária Média" icon="schedule" value="28h/sem" />
        <KpiCard title="Professores Afastados" icon="event_busy" value="3" trendColor="error" />
        <KpiCard title="Cobertura de Turmas" icon="check_circle" value="98%" progress={98} />
      </div>

      <div className="flex flex-col xl:flex-row gap-6 items-start" id="form-prof">

        {/* Formulario e Grafico */}
        <div className="flex flex-col flex-1 w-full gap-6">

          {/* Gráfico de Distribuição por Grau */}
          <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-6 shadow-sm border border-outline-variant flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <h3 className="font-title-md text-on-surface">Distribuição por Grau</h3>
                <span className="font-body-sm text-on-surface-variant">Titulação do corpo docente</span>
              </div>
              <span className="material-symbols-outlined text-outline text-[20px]">school</span>
            </div>
            <div className="flex items-center justify-center py-2">
              <div className="relative flex items-center justify-center">
                <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 100 100">
                  <circle className="text-surface-container" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeWidth="12"></circle>
                  <circle className="text-primary" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeDasharray="251.2" strokeDashoffset="100" strokeWidth="12"></circle>
                  <circle className="text-secondary-container" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeDasharray="251.2" strokeDashoffset="180" strokeWidth="12"></circle>
                  <circle className="text-tertiary" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeDasharray="251.2" strokeDashoffset="230" strokeWidth="12"></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-headline-md text-on-surface">84</span>
                  <span className="font-label-sm text-on-surface-variant">Docentes</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="flex flex-col gap-1 px-3 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant">
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-primary"></span><span className="font-label-sm text-on-surface-variant">Mestrado</span></div>
                <span className="font-label-md text-on-surface ml-4">42 <span className="font-body-sm text-on-surface-variant font-normal">(50%)</span></span>
              </div>
              <div className="flex flex-col gap-1 px-3 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant">
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-surface-container"></span><span className="font-label-sm text-on-surface-variant">Especialização</span></div>
                <span className="font-label-md text-on-surface ml-4">26 <span className="font-body-sm text-on-surface-variant font-normal">(31%)</span></span>
              </div>
              <div className="flex flex-col gap-1 px-3 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant">
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-secondary-container"></span><span className="font-label-sm text-on-surface-variant">Doutorado</span></div>
                <span className="font-label-md text-on-surface ml-4">12 <span className="font-body-sm text-on-surface-variant font-normal">(14%)</span></span>
              </div>
              <div className="flex flex-col gap-1 px-3 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant">
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span><span className="font-label-sm text-on-surface-variant">Graduação</span></div>
                <span className="font-label-md text-on-surface ml-4">4 <span className="font-body-sm text-on-surface-variant font-normal">(5%)</span></span>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-sm p-6">
            <h2 className="font-title-md text-on-surface mb-6 border-b border-surface-container pb-3">Novo Docente</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input id="nome" label="Nome Completo" placeholder="Ex: Carlos Eduardo Mendes" required onChange={handleInputChange} />
                <Input id="email" type="email" label="E-mail Institucional" placeholder="nome@educacore.edu.br" required onChange={handleInputChange} />
                <Input id="cpf" label="CPF" placeholder="000.000.000-00" required onChange={handleInputChange} />
                <Input id="telefone" label="Telefone" placeholder="(00) 00000-0000" onChange={handleInputChange} />
                <Select id="titulacao" label="Titulação Máxima" options={[
                  {value: 'graduacao', label: 'Graduação'}, {value: 'especializacao', label: 'Especialização'},
                  {value: 'mestrado', label: 'Mestrado'}, {value: 'doutorado', label: 'Doutorado'}
                ]} required onChange={handleInputChange} />
                <Input id="cargaHoraria" label="Carga Horária Semanal" type="number" placeholder="Ex: 40" required onChange={handleInputChange} />
              </div>

              <div className="flex flex-col gap-3 pt-4 border-t border-surface-container">
                <label className="font-label-md text-on-surface">Disciplinas Habilitadas</label>
                <div className="flex flex-wrap gap-2">
                  {disciplinas.map(d => (
                    <button
                      type="button"
                      key={d}
                      onClick={() => toggleDisciplina(d)}
                      className={`px-3 py-1.5 rounded-full font-label-sm border transition-colors ${selectedDisciplinas.includes(d) ? 'bg-primary-container text-on-primary-container border-primary-container' : 'bg-surface-container-lowest text-on-surface border-outline-variant hover:bg-surface-container-low'}`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-4 border-t border-surface-container">
                <label className="font-label-md text-on-surface">Turmas Atribuídas</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {turmas.map(t => (
                    <label key={t} className="flex items-center gap-2 p-2 rounded-lg border border-outline-variant cursor-pointer hover:bg-surface-container-low">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-primary rounded border-outline-variant focus:ring-primary"
                        checked={selectedTurmas.includes(t)}
                        onChange={() => toggleTurma(t)}
                      />
                      <span className="font-body-sm text-on-surface">{t}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-surface-container">
                 <Button variant="secondary">Cancelar</Button>
                 <Button type="submit" variant="primary" icon="save">Salvar Docente</Button>
              </div>
            </form>
          </div>
        </div>

        {/* Tabela de Professores */}
        <div className="w-full xl:w-[600px] bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-sm overflow-hidden flex-shrink-0">
           <div className="p-4 border-b border-outline-variant flex items-center justify-between bg-surface-container-low/50">
             <h2 className="font-title-md text-on-surface">Corpo Docente</h2>
             <span className="material-symbols-outlined text-outline">search</span>
           </div>

           <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="bg-surface-container-low/30 border-b border-surface-container">
                   <th className="p-3 font-label-md text-on-surface-variant font-semibold">Professor</th>
                   <th className="p-3 font-label-md text-on-surface-variant font-semibold">Disciplinas</th>
                   <th className="p-3 font-label-md text-on-surface-variant font-semibold">Carga</th>
                   <th className="p-3 font-label-md text-on-surface-variant font-semibold">Status</th>
                   <th className="p-3"></th>
                 </tr>
               </thead>
               <tbody>
                 {professores.map(p => (
                   <tr key={p.id} className="border-b border-surface-container hover:bg-surface-container-lowest transition-colors">
                     <td className="p-3">
                       <div className="flex flex-col">
                         <span className="font-label-md text-on-surface whitespace-nowrap">{p.nome}</span>
                         <span className="font-body-sm text-on-surface-variant">{p.rf}</span>
                       </div>
                     </td>
                     <td className="p-3">
                       <div className="flex flex-wrap gap-1">
                         {p.disciplinas.map(d => (
                           <span key={d} className="px-1.5 py-0.5 bg-surface-container text-on-surface font-label-sm rounded">{d}</span>
                         ))}
                       </div>
                     </td>
                     <td className="p-3 font-body-sm text-on-surface">{p.carga}</td>
                     <td className="p-3">
                       <StatusPill status={p.statusType} label={p.status} />
                     </td>
                     <td className="p-3 text-right">
                       <button type="button" className="p-1 rounded text-on-surface-variant hover:bg-surface-container transition-colors">
                         <span className="material-symbols-outlined text-[20px]">more_vert</span>
                       </button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>

           <div className="p-3 bg-surface-container-lowest border-t border-outline-variant flex items-center justify-between">
              <span className="font-body-sm text-on-surface-variant">Mostrando 4 de 84</span>
              <div className="flex items-center gap-1">
                <Button variant="ghost" className="px-2 py-1"><span className="material-symbols-outlined">chevron_left</span></Button>
                <Button variant="ghost" className="px-2 py-1"><span className="material-symbols-outlined">chevron_right</span></Button>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
