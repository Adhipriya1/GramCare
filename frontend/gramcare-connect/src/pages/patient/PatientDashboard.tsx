import { useApp } from '@/contexts/AppContext';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Stethoscope, Mic, CalendarCheck, Pill, FileText, AlertTriangle } from 'lucide-react';

const features = [
  { key: 'aiSymptom', icon: Stethoscope, emoji: '🩺', route: '/patient/symptoms', accent: 'border-primary/30 hover:border-primary/60' },
  { key: 'speakSymptoms', icon: Mic, emoji: '🎤', route: '/patient/symptoms', accent: 'border-secondary/30 hover:border-secondary/60' },
  { key: 'bookDoctor', icon: CalendarCheck, emoji: '👨‍⚕️', route: '/patient/consultation', accent: 'border-primary/30 hover:border-primary/60' },
  { key: 'findMedicine', icon: Pill, emoji: '💊', route: '/patient/medicine', accent: 'border-warning/30 hover:border-warning/60' },
  { key: 'healthRecords', icon: FileText, emoji: '📋', route: '/patient/records', accent: 'border-muted-foreground/20 hover:border-muted-foreground/40' },
  { key: 'emergency', icon: AlertTriangle, emoji: '🚨', route: '/patient/emergency', accent: 'border-emergency/30 hover:border-emergency/60' },
];

export default function PatientDashboard() {
  const { t, user } = useApp();
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="mb-10"
        >
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
            {t('patient.welcome')}, {user?.full_name} 👋
          </h1>
          <p className="text-muted-foreground mt-2 text-base md:text-lg leading-relaxed">
            {t('patient.howCanWeHelp')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.button
              key={f.key}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06, ease: [0.4, 0, 0.2, 1] }}
              onClick={() => navigate(f.route)}
              className={`feature-card border-2 ${f.accent} group`}
            >
              <span className="text-5xl transition-transform duration-300 group-hover:scale-110">
                {f.emoji}
              </span>
              <span className="font-bold text-foreground text-base tracking-tight">
                {t(`patient.${f.key}`)}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
