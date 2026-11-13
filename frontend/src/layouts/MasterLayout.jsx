import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoCeam from '../assets/logos/logo-ceam.png';
import logoPrefeitura from '../assets/logos/logo-prefeitura-horizontal.png';

export default function MasterLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getPageTitle = (path) => {
    if (path === '/') return 'Painel Principal (Dashboard)';
    if (path === '/usuarias/nova') return 'Cadastro de Usuária (Mulher Atendida)';
    if (path.startsWith('/usuarias')) return 'Gestão de Mulheres Atendidas';
    if (path.startsWith('/atendimentos')) return 'Registro de Atendimentos';
    if (path.startsWith('/relatorios')) return 'Relatórios e Métricas de Gestão';
    if (path.startsWith('/configuracoes')) return 'Tabelas Dinâmicas de Domínio';
    return 'Sistema CEAM';
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    {
      to: '/',
      label: 'Dashboard',
      icon: (
        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      to: '/usuarias',
      label: 'Mulheres Atendidas',
      icon: (
        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      to: '/atendimentos',
      label: 'Atendimentos',
      icon: (
        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      to: '/relatorios',
      label: 'Relatórios e Métricas',
      icon: (
        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      to: '/configuracoes',
      label: 'Configurações',
      icon: (
        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
  ];

  return (
    <div className="flex h-screen bg-ceamFundo overflow-hidden">
      {/* Sidebar para Desktop */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-ceamLilas text-white shadow-xl flex-shrink-0">
        <div className="p-4 bg-white/10 flex items-center justify-center border-b border-white/20">
          <img src={logoCeam} alt="Logo CEAM" className="h-14 object-contain" />
        </div>
        <div className="px-6 py-4">
          <p className="text-xs uppercase tracking-wider text-purple-200 font-semibold">Secretaria da Mulher</p>
          <h2 className="text-sm font-bold text-white">Serra Talhada - PE</h2>
        </div>
        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                  isActive
                    ? 'bg-white text-ceamLilas font-bold shadow-md'
                    : 'text-purple-100 hover:bg-white/15 hover:text-white'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-white/20">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-white text-ceamLilas font-bold flex items-center justify-center shadow">
              {user?.nome ? user.nome.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate">{user?.nome || 'Operador'}</p>
              <p className="text-xs text-purple-200 truncate">{user?.role || 'CEAM Atendente'}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-left flex items-center text-xs font-medium text-purple-200 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Encerrar Sessão
          </button>
        </div>
      </aside>

      {/* Sidebar retrátil Mobile */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-ceamLilas text-white z-10">
            <div className="p-4 flex items-center justify-between border-b border-white/20">
              <img src={logoCeam} alt="Logo CEAM" className="h-10 object-contain" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-white hover:text-purple-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex-1 px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                      isActive
                        ? 'bg-white text-ceamLilas font-bold'
                        : 'text-purple-100 hover:bg-white/15'
                    }`
                  }
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="p-4 border-t border-white/20">
              <button
                onClick={handleLogout}
                className="w-full text-center py-2 bg-white/20 rounded text-sm font-semibold"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header Superior */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 shadow-sm flex-shrink-0">
          <div className="flex items-center">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="mr-4 text-ceamAzulEscuro md:hidden"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-ceamAzulEscuro">
              {getPageTitle(location.pathname)}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <img
                src={logoPrefeitura}
                alt="Prefeitura de Serra Talhada"
                className="h-9 object-contain"
              />
            </div>
            <div className="hidden md:flex flex-col text-right">
              <span className="text-xs font-semibold text-ceamAzulEscuro">{user?.nome || 'Atendente'}</span>
              <span className="text-[10px] text-gray-500">CEAM Serra Talhada</span>
            </div>
          </div>
        </header>

        {/* Área de Visualização com Scroll */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-ceamFundo">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
