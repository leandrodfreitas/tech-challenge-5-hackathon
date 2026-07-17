import type { Metadata } from 'next'
import { PreferencesProvider } from '../presentation/contexts/PreferencesContext'
import { PreferencesApplier } from '../presentation/components/PreferencesApplier'
import { Sidebar } from '../presentation/components/dashboard/Sidebar'
import { Topbar } from '../presentation/components/dashboard/Topbar'
import './globals.css'

export const metadata: Metadata = {
  title: 'SeniorEase',
  description: 'Plataforma de acessibilidade digital para idosos',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, background: 'var(--background)', color: 'var(--text-color)', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", transition: 'var(--transition)' }}>
        <PreferencesProvider>
          <PreferencesApplier />
          <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar fixa à esquerda */}
            <Sidebar />

            {/* Área principal: topbar + conteúdo */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', overflow: 'hidden' }}>
              <Topbar />
              <main id="main-content" style={{ flex: 1, overflowY: 'auto' }}>
                {children}
              </main>
            </div>
          </div>
        </PreferencesProvider>
      </body>
    </html>
  )
}
