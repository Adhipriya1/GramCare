import { useApp } from '@/contexts/AppContext';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';

export default function PrescriptionManagement() {
  const { t } = useApp();

  const prescriptions = [
    { patient: 'Sita Devi', doctor: 'Dr. Anita Sharma', medicines: ['Amoxicillin 500mg', 'Paracetamol'], dosage: '3x daily for 5 days', status: 'Pending' },
    { patient: 'Lakshmi Bai', doctor: 'Dr. Ravi Kumar', medicines: ['Ibuprofen 400mg'], dosage: 'Twice daily after meals', status: 'Ready' },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-6">{t('nav.prescriptions')}</h1>
        <div className="space-y-4">
          {prescriptions.map((rx, i) => (
            <div key={i} className="card-healthcare">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-foreground">{rx.patient}</h3>
                  <p className="text-sm text-muted-foreground">By {rx.doctor}</p>
                </div>
                <span className={`text-sm px-3 py-1 rounded-full ${rx.status === 'Ready' ? 'urgency-low' : 'urgency-moderate'}`}>
                  {rx.status}
                </span>
              </div>
              <div className="border-t border-border pt-3 mt-3">
                <p className="text-sm text-foreground font-medium mb-1">Medicines:</p>
                <ul className="text-sm text-muted-foreground mb-2">
                  {rx.medicines.map((m, j) => <li key={j}>💊 {m}</li>)}
                </ul>
                <p className="text-sm text-muted-foreground mb-3">📋 {rx.dosage}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="default">{t('pharma.markReady')}</Button>
                  <Button size="sm" variant="outline">{t('pharma.updateStatus')}</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
