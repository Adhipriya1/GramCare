import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Bell, Send, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const pastAlerts = [
  { message: 'Dengue cases rising in nearby villages. Take preventive measures.', date: '2026-03-10', severity: 'high' },
  { message: 'Free health camp at PHC Devpur on March 15.', date: '2026-03-08', severity: 'info' },
  { message: 'Vaccination drive for children under 5 in Rampur.', date: '2026-03-01', severity: 'info' },
];

export default function HealthAlerts() {
  const { t } = useApp();
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;
    setSent(true);
    setMessage('');
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-6">{t('nav.alerts')}</h1>

        <div className="card-healthcare mb-6">
          <h2 className="font-semibold text-foreground mb-3">{t('admin.sendAlert')}</h2>
          <Textarea
            placeholder={t('admin.alertPlaceholder')}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[100px] text-base mb-3"
          />
          <div className="flex items-center gap-3">
            <Button onClick={handleSend} disabled={!message.trim()}>
              <Send className="h-4 w-4 mr-2" />
              {t('admin.sendAlert')}
            </Button>
            {sent && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-success flex items-center gap-1 text-sm"
              >
                <CheckCircle className="h-4 w-4" /> Alert sent!
              </motion.span>
            )}
          </div>
        </div>

        <h2 className="text-xl font-semibold text-foreground mb-4">Past Alerts</h2>
        <div className="space-y-3">
          {pastAlerts.map((a, i) => (
            <div key={i} className={`card-healthcare flex items-start gap-3 ${a.severity === 'high' ? 'border-emergency/30' : ''}`}>
              <Bell className={`h-5 w-5 mt-0.5 ${a.severity === 'high' ? 'text-emergency' : 'text-primary'}`} />
              <div>
                <p className="text-foreground">{a.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{a.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
