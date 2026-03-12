import { useApp } from '@/contexts/AppContext';
import { DashboardLayout } from '@/components/DashboardLayout';
import { StatCard } from '@/components/StatCard';
import { Users, CalendarCheck, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DoctorDashboard() {
  const { t } = useApp();

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-6">{t('nav.dashboard')}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard icon={<Users className="h-5 w-5" />} label={t('doctor.totalPatients')} value={247} trend="+12 this week" color="primary" />
          <StatCard icon={<CalendarCheck className="h-5 w-5" />} label={t('doctor.todayConsultations')} value={8} trend="3 completed" color="secondary" />
          <StatCard icon={<Clock className="h-5 w-5" />} label={t('doctor.pendingRequests')} value={5} color="warning" />
        </div>

        <h2 className="text-xl font-semibold text-foreground mb-4">Recent Patient Requests</h2>
        <div className="space-y-3">
          {[
            { name: 'Sita Devi', village: 'Rampur', symptoms: 'Fever, cough for 3 days' },
            { name: 'Mohan Lal', village: 'Devpur', symptoms: 'Stomach pain, vomiting' },
            { name: 'Lakshmi Bai', village: 'Sundarpur', symptoms: 'Joint pain, swelling in knee' },
          ].map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card-healthcare flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <h3 className="font-semibold text-foreground">{p.name}</h3>
                <p className="text-sm text-muted-foreground">🏘️ {p.village} — {p.symptoms}</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-success/10 text-success rounded-lg text-sm font-medium hover:bg-success/20 transition-colors">
                  {t('doctor.accept')}
                </button>
                <button className="px-4 py-2 bg-emergency/10 text-emergency rounded-lg text-sm font-medium hover:bg-emergency/20 transition-colors">
                  {t('doctor.reject')}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
