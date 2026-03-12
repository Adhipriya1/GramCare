import { useApp } from '@/contexts/AppContext';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { FileText, Stethoscope, Pill } from 'lucide-react';

const mockRecords = [
  { date: '2026-03-10', type: 'symptom', title: 'Fever & Headache', description: 'AI Symptom Checker - Low urgency', icon: Stethoscope },
  { date: '2026-03-08', type: 'consultation', title: 'Dr. Anita Sharma', description: 'Video consultation for recurring cough', icon: FileText },
  { date: '2026-03-05', type: 'prescription', title: 'Amoxicillin 500mg', description: '3 times daily for 5 days', icon: Pill },
  { date: '2026-02-20', type: 'symptom', title: 'Body Pain', description: 'AI Symptom Checker - Moderate urgency', icon: Stethoscope },
];

const typeColors = {
  symptom: 'bg-primary/10 text-primary',
  consultation: 'bg-secondary/10 text-secondary',
  prescription: 'bg-warning/10 text-warning',
};

export default function HealthRecords() {
  const { t } = useApp();

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-6">{t('records.title')}</h1>

        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border" />
          <div className="space-y-6">
            {mockRecords.map((r, i) => (
              <div key={i} className="relative pl-12">
                <div className={`absolute left-3 w-5 h-5 rounded-full border-2 border-card ${typeColors[r.type as keyof typeof typeColors]} flex items-center justify-center`}>
                  <div className="w-2 h-2 rounded-full bg-current" />
                </div>
                <div className="card-healthcare">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <r.icon className="h-4 w-4 text-muted-foreground" />
                      <h3 className="font-semibold text-foreground">{r.title}</h3>
                    </div>
                    <Badge variant="outline" className="text-xs">{r.date}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{r.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
