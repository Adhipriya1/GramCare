import { LanguageSelector } from './LanguageSelector';
import { useApp } from '@/contexts/AppContext';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Heart } from 'lucide-react';

export function AppHeader() {
  const { t, user } = useApp();

  return (
    <header className="h-16 flex items-center justify-between border-b border-border/60 bg-card/80 backdrop-blur-md px-4 md:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        {user && <SidebarTrigger className="mr-1" />}
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <Heart className="h-5 w-5 text-primary fill-primary" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base tracking-tight text-foreground leading-tight">
              {t('app.name')}
            </span>
            <span className="hidden sm:block text-[11px] text-muted-foreground leading-tight">
              {t('app.tagline')}
            </span>
          </div>
        </div>
      </div>
      <LanguageSelector />
    </header>
  );
}
