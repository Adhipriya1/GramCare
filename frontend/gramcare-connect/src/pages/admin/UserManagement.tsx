import { useApp } from '@/contexts/AppContext';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, XCircle } from 'lucide-react';

const users = {
  patients: [
    { name: 'Ramesh Kumar', village: 'Devpur', status: 'Active' },
    { name: 'Sita Devi', village: 'Rampur', status: 'Active' },
    { name: 'Mohan Lal', village: 'Devpur', status: 'Active' },
  ],
  doctors: [
    { name: 'Dr. Anita Sharma', specialty: 'General', verified: true },
    { name: 'Dr. Ravi Kumar', specialty: 'Pediatrics', verified: true },
    { name: 'Dr. Priya Singh', specialty: 'Dermatology', verified: false },
  ],
  pharmacists: [
    { name: 'Vikram Patel', pharmacy: 'Jan Aushadhi Kendra', status: 'Active' },
    { name: 'Sunil Yadav', pharmacy: 'Village Health Store', status: 'Active' },
  ],
};

export default function UserManagement() {
  const { t } = useApp();

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-6">{t('nav.users')}</h1>

        <Tabs defaultValue="doctors">
          <TabsList className="mb-4">
            <TabsTrigger value="patients">Patients ({users.patients.length})</TabsTrigger>
            <TabsTrigger value="doctors">Doctors ({users.doctors.length})</TabsTrigger>
            <TabsTrigger value="pharmacists">Pharmacists ({users.pharmacists.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="patients">
            <div className="space-y-3">
              {users.patients.map((p, i) => (
                <div key={i} className="card-healthcare flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{p.name}</h3>
                    <p className="text-sm text-muted-foreground">🏘️ {p.village}</p>
                  </div>
                  <Badge variant="outline" className="urgency-low">{p.status}</Badge>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="doctors">
            <div className="space-y-3">
              {users.doctors.map((d, i) => (
                <div key={i} className="card-healthcare flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{d.name}</h3>
                    <p className="text-sm text-muted-foreground">{d.specialty}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {d.verified ? (
                      <Badge variant="outline" className="urgency-low">
                        <CheckCircle className="h-3 w-3 mr-1" /> Verified
                      </Badge>
                    ) : (
                      <>
                        <Badge variant="outline" className="urgency-moderate">
                          <XCircle className="h-3 w-3 mr-1" /> Unverified
                        </Badge>
                        <Button size="sm">{t('admin.verifyDoctor')}</Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pharmacists">
            <div className="space-y-3">
              {users.pharmacists.map((p, i) => (
                <div key={i} className="card-healthcare flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{p.name}</h3>
                    <p className="text-sm text-muted-foreground">🏥 {p.pharmacy}</p>
                  </div>
                  <Badge variant="outline" className="urgency-low">{p.status}</Badge>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
