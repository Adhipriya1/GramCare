import { useApp } from '@/contexts/AppContext';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FileText, Upload } from 'lucide-react';

export default function DiagnosisPage() {
  const { t } = useApp();

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-6">{t('nav.diagnosis')}</h1>

        <div className="card-healthcare mb-6">
          <h2 className="font-semibold text-foreground text-lg mb-2">Patient: Sita Devi</h2>
          <p className="text-sm text-muted-foreground mb-1">Village: Rampur</p>
          <p className="text-sm text-muted-foreground">History: Fever, cough for 3 days. Previously treated for common cold (Feb 2026).</p>
        </div>

        <div className="card-healthcare space-y-4">
          <div className="space-y-2">
            <Label>{t('doctor.writeDiagnosis')}</Label>
            <Textarea className="min-h-[120px] text-base" placeholder="Enter diagnosis details..." />
          </div>
          <div className="flex gap-3">
            <Button size="lg">
              <FileText className="h-5 w-5 mr-2" />
              Save Diagnosis
            </Button>
            <Button size="lg" variant="outline">
              <Upload className="h-5 w-5 mr-2" />
              {t('doctor.uploadPrescription')}
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
