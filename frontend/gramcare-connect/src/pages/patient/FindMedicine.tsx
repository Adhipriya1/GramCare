import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin } from 'lucide-react';

const mockPharmacies = [
  { name: 'Jan Aushadhi Kendra', distance: '2.3 km', status: 'available' as const, medicines: ['Paracetamol', 'Amoxicillin', 'ORS'] },
  { name: 'Village Health Store', distance: '4.1 km', status: 'limited' as const, medicines: ['Paracetamol', 'Cough Syrup'] },
  { name: 'Gram Pharmacy', distance: '6.8 km', status: 'unavailable' as const, medicines: [] },
];

const statusConfig = {
  available: { label: 'medicine.available', className: 'bg-success/10 text-success border-success/20' },
  limited: { label: 'medicine.limited', className: 'bg-warning/10 text-warning border-warning/20' },
  unavailable: { label: 'medicine.unavailable', className: 'bg-emergency/10 text-emergency border-emergency/20' },
};

export default function FindMedicine() {
  const { t } = useApp();
  const [search, setSearch] = useState('');

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-6">{t('medicine.title')}</h1>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            className="pl-10 h-12 text-base"
            placeholder={t('medicine.search')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          {mockPharmacies.map((p, i) => {
            const sc = statusConfig[p.status];
            return (
              <div key={i} className="card-healthcare">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-foreground text-lg">{p.name}</h3>
                  <Badge variant="outline" className={sc.className}>
                    {t(sc.label)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                  <MapPin className="h-4 w-4" /> {p.distance}
                </p>
                {p.medicines.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {p.medicines.map((m) => (
                      <Badge key={m} variant="secondary" className="text-xs">{m}</Badge>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
