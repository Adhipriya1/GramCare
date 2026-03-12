import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarCheck, CheckCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';

// ─── Doctor Specializations ──────────────────────────────────────────────────

const DOCTOR_TYPES = [
  { value: 'general_physician', label: 'General Physician' },
  { value: 'pediatrician', label: 'Pediatrician' },
  { value: 'dermatologist', label: 'Dermatologist' },
  { value: 'orthopedic', label: 'Orthopedic' },
  { value: 'gynecologist', label: 'Gynecologist' },
  { value: 'cardiologist', label: 'Cardiologist' },
  { value: 'neurologist', label: 'Neurologist' },
  { value: 'ent_specialist', label: 'ENT Specialist' },
  { value: 'ophthalmologist', label: 'Ophthalmologist' },
  { value: 'dentist', label: 'Dentist' },
  { value: 'psychiatrist', label: 'Psychiatrist' },
  { value: 'pulmonologist', label: 'Pulmonologist' },
];

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  patientName: string;
  village: string;
  symptoms: string;
  appointmentDate: string;
  appointmentTime: string;
  doctorType: string;
}

interface FormErrors {
  patientName?: string;
  village?: string;
  symptoms?: string;
  appointmentDate?: string;
  appointmentTime?: string;
  doctorType?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const INITIAL_FORM: FormData = {
  patientName: '',
  village: '',
  symptoms: '',
  appointmentDate: '',
  appointmentTime: '',
  doctorType: '',
};

function validate(form: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!form.patientName.trim()) errors.patientName = 'Name is required';
  if (!form.village.trim()) errors.village = 'Village is required';
  if (!form.symptoms.trim()) errors.symptoms = 'Please describe your symptoms';
  if (!form.appointmentDate) errors.appointmentDate = 'Date is required';
  if (!form.appointmentTime) errors.appointmentTime = 'Time is required';
  if (!form.doctorType) errors.doctorType = 'Please select a doctor type';
  return errors;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function BookConsultation() {
  const { t, user } = useApp();

  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // ── Field helpers ──────────────────────────────────────────────────────────
  const set = (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    try {
      const patientId = user?.id;
      if (!patientId) throw new Error('You must be logged in to book a consultation.');

      // Combine date + time → ISO timestamp
      const appointmentTime = new Date(
        `${form.appointmentDate}T${form.appointmentTime}:00`
      ).toISOString();

      // Insert into appointments table in Supabase
      const { error } = await supabase.from('appointments').insert({
        patient_id: patientId,
        appointment_time: appointmentTime,
        symptoms: form.symptoms,
        status: 'scheduled',
        consultation_notes: `Doctor Type: ${form.doctorType} | Patient: ${form.patientName} | Village: ${form.village}`,
        created_at: new Date().toISOString(),
      });

      if (error) throw error;

      // Optionally update patient village
      await supabase
        .from('patients')
        .update({ village: form.village })
        .eq('id', patientId);

      setSubmitted(true);
    } catch (err: any) {
      console.error('Supabase submission error:', err);
      const message = err.message || 'Something went wrong. Please try again.';
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    setSubmitError(null);
    setSubmitted(false);
  };

  // ── Render ─────────────────────────────────────────────────────────────────
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
              {/* Name */}
              <div className="space-y-2">
                <Label>{t('consultation.name')}</Label>
                <Input
                  className="h-12 text-base"
                  placeholder="Ramesh Kumar"
                  value={form.patientName}
                  onChange={set('patientName')}
                />
                {errors.patientName && (
                  <p className="text-xs text-destructive">{errors.patientName}</p>
                )}
              </div>

              {/* Village */}
              <div className="space-y-2">
                <Label>{t('consultation.village')}</Label>
                <Input
                  className="h-12 text-base"
                  placeholder="Devpur"
                  value={form.village}
                  onChange={set('village')}
                />
                {errors.village && (
                  <p className="text-xs text-destructive">{errors.village}</p>
                )}
              </div>

              {/* Symptoms */}
              <div className="space-y-2">
                <Label>{t('consultation.symptoms')}</Label>
                <Textarea
                  className="min-h-[80px] text-base"
                  placeholder="Fever, headache..."
                  value={form.symptoms}
                  onChange={set('symptoms')}
                />
                {errors.symptoms && (
                  <p className="text-xs text-destructive">{errors.symptoms}</p>
                )}
              </div>

              {/* Date */}
              <div className="space-y-2">
                <Label>Appointment Date</Label>
                <Input
                  className="h-12 text-base"
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={form.appointmentDate}
                  onChange={set('appointmentDate')}
                />
                {errors.appointmentDate && (
                  <p className="text-xs text-destructive">{errors.appointmentDate}</p>
                )}
              </div>

              {/* Time */}
              <div className="space-y-2">
                <Label>{t('consultation.time')}</Label>
                <Input
                  className="h-12 text-base"
                  type="time"
                  value={form.appointmentTime}
                  onChange={set('appointmentTime')}
                />
                {errors.appointmentTime && (
                  <p className="text-xs text-destructive">{errors.appointmentTime}</p>
                )}
              </div>

              {/* Doctor Type selector */}
              <div className="space-y-2">
                <Label>Select Doctor Type</Label>
                <Select
                  value={form.doctorType}
                  onValueChange={(val) => {
                    setForm((prev) => ({ ...prev, doctorType: val }));
                    setErrors((prev) => ({ ...prev, doctorType: undefined }));
                  }}
                >
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue placeholder="Choose a specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    {DOCTOR_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.doctorType && (
                  <p className="text-xs text-destructive">{errors.doctorType}</p>
                )}
              </div>

              {/* Global submit error */}
              {submitError && (
                <p className="text-sm text-destructive bg-destructive/10 rounded-md px-3 py-2">
                  {submitError}
                </p>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full h-12 text-base font-semibold"
                disabled={submitting}
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> Booking…
                  </span>
                ) : (
                  t('consultation.submit')
                )}
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
              <h2 className="text-xl font-semibold text-foreground">
                {t('consultation.success')}
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                Your appointment has been scheduled. The doctor will confirm shortly.
              </p>
              <Button variant="outline" className="mt-6" onClick={handleReset}>
                Book Another
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}