import { useApp } from '@/contexts/AppContext';
import { DashboardLayout } from '@/components/DashboardLayout';
import { StatCard } from '@/components/StatCard';
import { Package, AlertTriangle, ClipboardList } from 'lucide-react';

export default function PharmacistDashboard() {
  const { t } = useApp();

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-6">{t('nav.dashboard')}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard icon={<Package className="h-5 w-5" />} label={t('pharma.inStock')} value={156} color="primary" />
          <StatCard icon={<AlertTriangle className="h-5 w-5" />} label={t('pharma.lowStock')} value={12} color="warning" />
          <StatCard icon={<ClipboardList className="h-5 w-5" />} label={t('pharma.recentRx')} value={28} trend="Today" color="secondary" />
        </div>

        <h2 className="text-xl font-semibold text-foreground mb-4">Recent Prescriptions</h2>
        <div className="space-y-3">
          {[
            { patient: 'Sita Devi', medicines: ['Amoxicillin 500mg – 3x daily', 'Paracetamol – as needed'], status: 'Pending' },
            { patient: 'Mohan Lal', medicines: ['ORS – 2 sachets daily', 'Domperidone 10mg – before meals'], status: 'Ready' },
          ].map((rx, i) => (
            <div key={i} className="card-healthcare">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-foreground">{rx.patient}</h3>
                <span className={`text-sm px-3 py-1 rounded-full ${rx.status === 'Ready' ? 'urgency-low' : 'urgency-moderate'}`}>
                  {rx.status}
                </span>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 mb-3">
                {rx.medicines.map((m, j) => <li key={j}>💊 {m}</li>)}
              </ul>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-success/10 text-success rounded-lg text-sm font-medium hover:bg-success/20 transition-colors">
                  {t('pharma.markReady')}
                </button>
                <button className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors">
                  {t('pharma.updateStatus')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
