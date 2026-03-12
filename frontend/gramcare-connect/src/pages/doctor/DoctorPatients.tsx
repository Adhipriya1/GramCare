import { useApp } from '@/contexts/AppContext';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FileText } from 'lucide-react';

export default function DoctorPatients() {
  const { t } = useApp();

  const patients = [
    { name: 'Sita Devi', village: 'Rampur', symptoms: 'Fever, cough for 3 days', status: 'Pending' },
    { name: 'Mohan Lal', village: 'Devpur', symptoms: 'Stomach pain', status: 'Accepted' },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-6">{t('nav.patients')}</h1>
        <div className="space-y-4">
          {patients.map((p, i) => (
            <div key={i} className="card-healthcare">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground text-lg">{p.name}</h3>
                <span className={`text-sm px-3 py-1 rounded-full ${p.status === 'Accepted' ? 'urgency-low' : 'urgency-moderate'}`}>
                  {p.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">🏘️ {p.village}</p>
              <p className="text-sm text-muted-foreground mb-4">Symptoms: {p.symptoms}</p>
              {p.status === 'Accepted' && (
                <div className="border-t border-border pt-4 space-y-3">
                  <Textarea placeholder="Write diagnosis..." className="text-base" />
                  <div className="flex gap-2">
                    <Button size="sm">
                      <FileText className="h-4 w-4 mr-1" />
                      {t('doctor.writeDiagnosis')}
                    </Button>
                    <Button size="sm" variant="outline">{t('doctor.uploadPrescription')}</Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
