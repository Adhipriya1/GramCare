import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CalendarCheck, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BookConsultation() {
  const { t } = useApp();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <DashboardLayout>
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <CalendarCheck className="h-7 w-7 text-primary" />
          {t('consultation.title')}
        </h1>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="card-healthcare space-y-5"
            >
              <div className="space-y-2">
                <Label>{t('consultation.name')}</Label>
                <Input className="h-12 text-base" placeholder="Ramesh Kumar" />
              </div>
              <div className="space-y-2">
                <Label>{t('consultation.village')}</Label>
                <Input className="h-12 text-base" placeholder="Devpur" />
              </div>
              <div className="space-y-2">
                <Label>{t('consultation.symptoms')}</Label>
                <Textarea className="min-h-[80px] text-base" placeholder="Fever, headache..." />
              </div>
              <div className="space-y-2">
                <Label>{t('consultation.time')}</Label>
                <Input className="h-12 text-base" type="time" />
              </div>
              <Button type="submit" size="lg" className="w-full h-12 text-base font-semibold">
                {t('consultation.submit')}
              </Button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card-healthcare text-center py-12"
            >
              <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground">{t('consultation.success')}</h2>
              <Button variant="outline" className="mt-6" onClick={() => setSubmitted(false)}>
                Book Another
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
