import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { USER_PROFILE } from '../data/movies';
import { useToast, Toast } from '../components/Toast';
import PageTransition from '../components/PageTransition';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { toast, showToast } = useToast();
  const [prefs, setPrefs] = useState(USER_PROFILE.preferences);

  const togglePref = (key: keyof typeof USER_PROFILE.preferences) => {
    if (typeof prefs[key] === 'boolean') {
      setPrefs({ ...prefs, [key]: !prefs[key] });
      showToast(`${key} atualizado`);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-bg-black pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/92 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-[700px] mx-auto px-[var(--content-pad)] py-4 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="shrink-0 w-11 h-11 flex items-center justify-center rounded-full bg-surface hover:bg-white/10 transition-colors"
            aria-label="Voltar"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold flex-1 text-center pr-11">Configurações</h1>
        </div>
      </div>

      <div className="max-w-[700px] mx-auto px-[var(--content-pad)] mt-8 animate-fade-in">

        {/* Categoria Conta */}
        <section className="mb-8">
          <h2 className="text-sm font-bold text-gold uppercase tracking-widest mb-3 pl-1">Sua Conta</h2>
          <div className="bg-surface rounded-2xl border border-white/5 overflow-hidden divide-y divide-white/5">
            <SettingsItem icon={<UserIcon />} label="Dados Pessoais" value={USER_PROFILE.name} onClick={() => showToast('Mudar dados pessoais')} />
            <SettingsItem icon={<MailIcon />} label="E-mail" value={USER_PROFILE.email} onClick={() => showToast('Mudar email')} />
            <SettingsItem icon={<ShieldIcon />} label="Senha" value="*********" onClick={() => showToast('Redefinir senha')} />
            <SettingsItem icon={<CreditCardIcon />} label="Assinatura" value={USER_PROFILE.plan} onClick={() => showToast('Gerenciar plano')} />
          </div>
        </section>

        {/* Reprodução */}
        <section className="mb-8">
          <h2 className="text-sm font-bold text-gold uppercase tracking-widest mb-3 pl-1">Reprodução</h2>
          <div className="bg-surface rounded-2xl border border-white/5 overflow-hidden divide-y divide-white/5">
            <SettingsItem icon={<QualityIcon />} label="Qualidade de Vídeo" value={prefs.videoQuality} onClick={() => showToast('Qualidade de vídeo')} />
            <SettingToggle icon={<PlayIcon />} label="Autoplay de trailers" checked={prefs.autoplay} onChange={() => togglePref('autoplay')} />
            <SettingToggle icon={<NextIcon />} label="Pular aberturas automaticamente" checked={true} onChange={() => showToast('Pular aberturas ativado')} />
          </div>
        </section>

        {/* Downloads */}
        <section className="mb-8">
          <h2 className="text-sm font-bold text-gold uppercase tracking-widest mb-3 pl-1">Downloads Offline</h2>
          <div className="bg-surface rounded-2xl border border-white/5 overflow-hidden divide-y divide-white/5">
            <SettingsItem icon={<DownloadIcon />} label="Qualidade de Download" value={prefs.downloadQuality} onClick={() => showToast('Qualidade de download')} />
            <SettingsItem icon={<StorageIcon />} label="Gerenciar Espaço" value="2.1 GB Usados" onClick={() => showToast('Gerenciar de armazenamento')} />
          </div>
        </section>

        {/* Legendas & Áudio */}
        <section className="mb-8">
          <h2 className="text-sm font-bold text-gold uppercase tracking-widest mb-3 pl-1">Áudio e Legendas</h2>
          <div className="bg-surface rounded-2xl border border-white/5 overflow-hidden divide-y divide-white/5">
            <SettingsItem icon={<GlobeIcon />} label="Idioma Padrão" value={prefs.language} onClick={() => showToast('Idioma padrão')} />
            <SettingToggle icon={<SubtitleIcon />} label="Ativar Legendas" checked={prefs.subtitles} onChange={() => togglePref('subtitles')} />
            <SettingsItem icon={<TextIcon />} label="Aparência das Legendas" value="Amarela / Média" onClick={() => showToast('Aparência das legendas')} />
          </div>
        </section>

        {/* Danger Zone */}
        <section className="mb-8">
          <div className="bg-surface rounded-2xl border border-white/5 overflow-hidden divide-y divide-white/5">
            <button
              onClick={() => showToast('Trocar de Perfil')}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/5 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-xs font-bold text-black border border-black">{USER_PROFILE.avatar}</div>
                <span className="text-[15px] font-medium text-white">Trocar de Perfil</span>
              </div>
              <ChevronRightIcon />
            </button>
            <button
              onClick={() => showToast('Saindo...')}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-red-500/10 transition-colors text-left group"
            >
              <div className="flex items-center gap-3 text-red-500 group-hover:text-red-400">
                <LogoutIcon />
                <span className="text-[15px] font-medium">Sair da Conta</span>
              </div>
            </button>
          </div>
        </section>

        {/* Sobre o Projeto */}
        <section className="mb-8">
          <h2 className="text-sm font-bold text-gold uppercase tracking-widest mb-3 pl-1">Sobre o Projeto</h2>
          <div className="bg-surface rounded-2xl border border-white/5 overflow-hidden p-5">
            <p className="text-[13px] text-text-secondary leading-relaxed mb-5">
              Projeto acadêmico desenvolvido para a disciplina de Avaliação de Interfaces.
            </p>
            <h3 className="text-xs font-bold text-text-tertiary uppercase tracking-widest mb-3">Desenvolvido por</h3>
            <div className="flex flex-col gap-3">
              {[
                { name: 'Kauã Barreto de Souza Tortorelo', initials: 'KB' },
                { name: 'Samuhel Araújo Cardoso dos Santos', initials: 'SA' },
                { name: 'Carlos Daniel Correia Malta', initials: 'CD' },
                { name: 'Leonardo Neves Santana', initials: 'LN' },
              ].map(dev => (
                <div key={dev.initials} className="flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center
                    text-[11px] font-bold text-gold shrink-0 group-hover:bg-gold/20 transition-colors">
                    {dev.initials}
                  </div>
                  <div>
                    <p className="text-[14px] font-medium text-text-primary">{dev.name}</p>
                    <p className="text-[11px] text-text-tertiary">Sistemas de Informação · 3º Semestre</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* App Version */}
        <p className="text-center text-xs text-text-tertiary pb-8 font-medium">
          Filmeflix v1.0.0 · Cinema Curado
        </p>

      </div>
      <Toast {...toast} />
      </div>
    </PageTransition>
  );
}

// Subcomponents

function SettingsItem({ icon, label, value, onClick }: { icon: React.ReactNode, label: string, value?: string, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/5 transition-colors text-left group cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <div className="text-text-secondary group-hover:text-gold transition-colors">{icon}</div>
        <span className="text-[15px] font-medium text-white">{label}</span>
      </div>
      <div className="flex items-center gap-2 text-text-tertiary">
        {value && <span className="text-[13px]">{value}</span>}
        <ChevronRightIcon />
      </div>
    </button>
  );
}

function SettingToggle({ icon, label, checked, onChange }: { icon: React.ReactNode, label: string; checked: boolean; onChange: () => void }) {
  return (
    <div className="flex items-center justify-between px-5 py-4 bg-surface hover:bg-white/5 transition-colors">
      <div className="flex items-center gap-3">
        <div className="text-text-secondary">{icon}</div>
        <span className="text-[15px] font-medium text-white">{label}</span>
      </div>
      <button
        onClick={onChange}
        role="switch"
        aria-checked={checked}
        className={`relative w-[48px] h-[28px] rounded-full transition-colors duration-200 shrink-0
          ${checked ? 'bg-gold shadow-[0_0_8px_rgba(212,175,55,0.4)]' : 'bg-white/10'}`}
      >
        <span
          className="absolute top-[3px] w-[22px] h-[22px] rounded-full bg-white shadow-md transition-all duration-200"
          style={{ left: checked ? '23px' : '3px' }}
        />
      </button>
    </div>
  );
}


// Icons (Simple SVGs)

const UserIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const MailIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 6l10 7 10-7"/></svg>;
const ShieldIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const CreditCardIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>;
const QualityIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>;
const PlayIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>;
const NextIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg>;
const DownloadIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>;
const StorageIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>;
const GlobeIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>;
const SubtitleIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="15" width="18" height="6" rx="2" ry="2"/><rect x="3" y="3" width="18" height="6" rx="2" ry="2" opacity="0.3"/></svg>;
const TextIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>;
const ChevronRightIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>;
const LogoutIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
