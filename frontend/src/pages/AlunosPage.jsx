import React, { useState } from 'react';
import KpiCard from '../components/KpiCard';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import { api } from '../services/api';

export default function AlunosPage() {
  const [formData, setFormData] = useState({});
  const [filterSerie, setFilterSerie] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/alunos', formData);
      alert('Aluno cadastrado com sucesso!');
      setFormData({});
    } catch (error) {
      console.error(error);
    }
  };

  const ultimosCadastrados = [
    { id: '2025001', nome: 'Lucas Silva e Santos', serie: '1º Ano EM', turno: 'Manhã', status: 'Ativo' },
    { id: '2025002', nome: 'Mariana Costa Rios', serie: '9º Ano EF', turno: 'Manhã', status: 'Ativo' },
    { id: '2025003', nome: 'Pedro Henrique Oliveira', serie: '1º Ano EM', turno: 'Tarde', status: 'Pendente' },
    { id: '2025004', nome: 'Ana Julia Martins', serie: '8º Ano EF', turno: 'Manhã', status: 'Ativo' },
    { id: '2025005', nome: 'João Gabriel Souza', serie: '2º Ano EM', turno: 'Manhã', status: 'Pendente' }
  ];

  const alunosFiltrados = filterSerie
    ? ultimosCadastrados.filter(a => a.serie === filterSerie)
    : ultimosCadastrados;

  return (
    <div className="flex flex-col w-full gap-8">
      {/* Header da Página */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm">Módulo Acadêmico</span>
            <span className="text-outline font-label-sm">•</span>
            <span className="text-on-surface-variant font-label-sm">Período 2025/1</span>
          </div>
          <h1 className="font-headline-lg text-on-surface tracking-tight">Cadastro de Alunos</h1>
          <p className="font-body-md text-on-surface-variant">Gerencie matrículas, dados pessoais e documentação dos estudantes da rede integrada.</p>
        </div>
        <div className="flex items-center gap-3 self-start lg:self-center">
          <Button variant="secondary" icon="upload_file">Importar Planilha (CSV)</Button>
          <Button variant="primary" icon="add" onClick={() => document.getElementById('form-section').scrollIntoView({behavior: 'smooth'})}>Novo Aluno</Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard title="Total de Matriculados" icon="badge" value="1.280" trendIcon="trending_up" trendValue="+4.2% ano" progress={86} />
        <KpiCard title="Novas Matrículas (Mês)" icon="person_add" value="142" trendIcon="trending_up" trendValue="+12% mês" />
        <KpiCard title="Documentação Pendente" icon="pending_actions" value="12" trendColor="error" trendValue="Requer atenção" progress={14} />
        <KpiCard title="Turmas Ativas" icon="groups" value="48" />
      </div>

      {/* Conteúdo Principal */}
      <div className="flex flex-col xl:flex-row gap-6 items-start" id="form-section">

        {/* Formulário */}
        <div className="flex-1 w-full bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-outline-variant flex items-center justify-between bg-surface-container-low/50">
            <h2 className="font-title-md text-on-surface">Nova Matrícula</h2>
            <span className="px-2.5 py-1 rounded-md bg-surface-container-lowest text-primary font-label-sm border border-outline-variant shadow-sm">Ano Letivo: 2025</span>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">

              {/* Seção 1: Dados Pessoais */}
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-2 pb-2 border-b border-surface-container">
                  <span className="material-symbols-outlined text-primary text-[20px]">person</span>
                  <h3 className="font-label-md text-on-surface text-[14px]">01. Dados Pessoais</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                  <div className="md:col-span-8">
                    <Input id="nomeCompleto" label="Nome Completo do Aluno" placeholder="Ex: João da Silva Santos" icon="badge" required />
                  </div>
                  <div className="md:col-span-4">
                    <Input id="dataNascimento" label="Data de Nascimento" type="date" required />
                  </div>
                  <div className="md:col-span-4">
                    <Input id="cpf" label="CPF (Opcional para menores)" placeholder="000.000.000-00" icon="pin" />
                  </div>
                  <div className="md:col-span-4">
                    <Input id="rg" label="RG / Certidão de Nascimento" placeholder="Número do documento" required />
                  </div>
                  <div className="md:col-span-4">
                    <Select id="genero" label="Gênero" options={[{value:'masculino', label:'Masculino'}, {value:'feminino', label:'Feminino'}, {value:'outro', label:'Outro'}]} placeholder="Selecione" required />
                  </div>
                </div>
              </div>

              {/* Seção 2: Matrícula */}
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-2 pb-2 border-b border-surface-container">
                  <span className="material-symbols-outlined text-primary text-[20px]">school</span>
                  <h3 className="font-label-md text-on-surface text-[14px]">02. Informações de Matrícula</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <Select id="serie" label="Série / Ano" options={[
                    {value:'9-ef', label:'9º Ano - Ensino Fundamental'},
                    {value:'1-em', label:'1º Ano - Ensino Médio'},
                    {value:'2-em', label:'2º Ano - Ensino Médio'}
                  ]} placeholder="Selecione a série" required />
                  <Select id="turno" label="Turno" options={[
                    {value:'manha', label:'Manhã (07:15 - 12:30)'},
                    {value:'tarde', label:'Tarde (13:30 - 18:45)'}
                  ]} placeholder="Selecione o turno" required />
                  <Input id="matriculaNum" label="Nº de Matrícula (Gerado Auto)" placeholder="Ex: 20250001" disabled />
                </div>
              </div>

              {/* Seção 3: Responsável */}
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-2 pb-2 border-b border-surface-container">
                  <span className="material-symbols-outlined text-primary text-[20px]">family_restroom</span>
                  <h3 className="font-label-md text-on-surface text-[14px]">03. Responsável Legal</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                  <div className="md:col-span-8">
                    <Input id="respNome" label="Nome do Responsável" placeholder="Nome completo" icon="person" required />
                  </div>
                  <div className="md:col-span-4">
                    <Select id="respParentesco" label="Parentesco" options={[
                      {value:'mae', label:'Mãe'}, {value:'pai', label:'Pai'}, {value:'outro', label:'Outro'}
                    ]} placeholder="Selecione" required />
                  </div>
                  <div className="md:col-span-6">
                    <Input id="respCpf" label="CPF do Responsável" placeholder="000.000.000-00" icon="pin" required />
                  </div>
                  <div className="md:col-span-6">
                    <Input id="respTelefone" label="Telefone / WhatsApp" placeholder="(00) 00000-0000" icon="call" required />
                  </div>
                  <div className="md:col-span-12">
                    <Input id="respEmail" type="email" label="E-mail de Contato" placeholder="email@exemplo.com" icon="mail" required />
                  </div>
                </div>
              </div>

              {/* Seção 4: Endereço Residencial */}
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-2 pb-2 border-b border-surface-container">
                  <span className="material-symbols-outlined text-primary text-[20px]">home</span>
                  <h3 className="font-label-md text-on-surface text-[14px] uppercase tracking-wider">04. Endereço Residencial</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                  <div className="md:col-span-3">
                    <Input id="cep" label="CEP" placeholder="01310-100" icon="location_searching" required />
                  </div>
                  <div className="md:col-span-7">
                    <Input id="logradouro" label="Logradouro" placeholder="Av. Paulista" required />
                  </div>
                  <div className="md:col-span-2">
                    <Input id="numero" label="Número" placeholder="1000" required />
                  </div>
                  <div className="md:col-span-5">
                    <Input id="bairro" label="Bairro" placeholder="Bela Vista" required />
                  </div>
                  <div className="md:col-span-5">
                    <Input id="cidade" label="Cidade" placeholder="São Paulo" required />
                  </div>
                  <div className="md:col-span-2">
                    <Input id="estado" label="UF" placeholder="SP" required />
                  </div>
                </div>
              </div>

              {/* Botões */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-surface-container">
                <Button variant="secondary">Cancelar</Button>
                <Button type="submit" variant="primary" icon="check_circle">Concluir Matrícula</Button>
              </div>

            </form>
          </div>
        </div>

        {/* Sidebar Direita */}
        <div className="w-full xl:w-96 flex flex-col gap-6">

          {/* Documentação Pendente (Checklist) */}
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-sm overflow-hidden flex flex-col p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-error">assignment_late</span>
              <h2 className="font-title-md text-on-surface">Checklist de Documentação</h2>
            </div>
            <p className="font-body-sm text-on-surface-variant mb-4">Certifique-se de recolher todos os documentos físicos para validação da secretaria.</p>

            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-container-lowest transition-colors cursor-pointer border border-transparent hover:border-outline-variant">
                <input type="checkbox" className="w-4 h-4 text-primary rounded border-outline-variant focus:ring-primary" />
                <span className="font-body-sm text-on-surface">Cópia do RG/CPF do Aluno</span>
              </label>
              <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-container-lowest transition-colors cursor-pointer border border-transparent hover:border-outline-variant">
                <input type="checkbox" className="w-4 h-4 text-primary rounded border-outline-variant focus:ring-primary" />
                <span className="font-body-sm text-on-surface">Cópia do RG/CPF do Responsável</span>
              </label>
              <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-container-lowest transition-colors cursor-pointer border border-transparent hover:border-outline-variant">
                <input type="checkbox" className="w-4 h-4 text-primary rounded border-outline-variant focus:ring-primary" />
                <span className="font-body-sm text-on-surface">Comprovante de Residência Atualizado</span>
              </label>
              <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-container-lowest transition-colors cursor-pointer border border-transparent hover:border-outline-variant">
                <input type="checkbox" className="w-4 h-4 text-primary rounded border-outline-variant focus:ring-primary" />
                <span className="font-body-sm text-on-surface">Histórico Escolar Original (Transferência)</span>
              </label>
            </div>
          </div>

          {/* Últimos Cadastrados */}
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 border-b border-outline-variant flex items-center justify-between bg-surface-container-low/50">
              <h2 className="font-title-md text-on-surface">Últimos Cadastrados</h2>
              <span className="material-symbols-outlined text-outline">history</span>
            </div>

            <div className="p-3 border-b border-outline-variant">
               <Select
                 id="filterSerieList"
                 options={[{value:'', label:'Todas as Séries'}, {value:'1º Ano EM', label:'1º Ano EM'}, {value:'8º Ano EF', label:'8º Ano EF'}]}
                 onChange={(e) => setFilterSerie(e.target.value)}
               />
            </div>

            <div className="flex flex-col max-h-[350px] overflow-y-auto">
              {alunosFiltrados.map((aluno, index) => (
                <div key={index} className="flex items-center justify-between p-4 border-b border-surface-container hover:bg-surface-container-lowest transition-colors group">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary font-label-md font-bold flex-shrink-0">
                      {aluno.nome.charAt(0)}{aluno.nome.split(' ')[1]?.charAt(0)}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-label-md text-on-surface truncate">{aluno.nome}</span>
                      <span className="font-body-sm text-on-surface-variant truncate">{aluno.serie}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    <span className={`px-2 py-0.5 rounded-full font-label-sm font-semibold ${aluno.status === 'Ativo' ? 'bg-surface-container text-tertiary' : 'bg-error-container text-on-error-container'}`}>
                      {aluno.status}
                    </span>
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors" type="button">
                      <span className="material-symbols-outlined text-[18px]">more_vert</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 bg-surface-container-lowest border-t border-outline-variant">
              <Button variant="ghost" className="w-full text-primary font-label-md">Ver Todos os Alunos</Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
