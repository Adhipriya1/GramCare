import { useApp } from '@/contexts/AppContext';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Phone, MapPin, Hospital } from 'lucide-react';
import { motion } from 'framer-motion';

const emergencyContacts = [
  { name: 'District Hospital', distance: '12 km', phone: '108' },
  { name: 'PHC Devpur', distance: '5 km', phone: '1800-XXX-XXXX' },
  { name: 'Ambulance Service', distance: '-', phone: '102' },
];

export default function EmergencyHelp() {
  const { t } = useApp();

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-emergency/10 border-2 border-emergency/30 rounded-xl p-8 text-center mb-8"
        >
          <AlertTriangle className="h-16 w-16 text-emergency mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-emergency">🚨 {t('emergency.alert')}</h1>
          <p className="text-muted-foreground mt-2">
            If you are experiencing a medical emergency, call for help immediately.
          </p>
          <Button size="lg" variant="destructive" className="mt-6 h-14 text-lg font-bold px-8">
            <Phone className="h-5 w-5 mr-2" />
            Call 108 - Emergency
          </Button>
        </motion.div>

        <h2 className="text-xl font-semibold text-foreground mb-4">{t('emergency.nearest')}</h2>
        <div className="space-y-4">
          {emergencyContacts.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card-healthcare flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Hospital className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">{c.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {c.distance}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-emergency/30 text-emergency hover:bg-emergency/10">
                <Phone className="h-4 w-4 mr-1" />
                {t('emergency.call')}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
