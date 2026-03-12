import { useApp } from '@/contexts/AppContext';
import { DashboardLayout } from '@/components/DashboardLayout';
import { StatCard } from '@/components/StatCard';
import { Users, Stethoscope, CalendarCheck, Hospital } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const barData = [
  { name: 'Mon', consultations: 12 },
  { name: 'Tue', consultations: 19 },
  { name: 'Wed', consultations: 8 },
  { name: 'Thu', consultations: 15 },
  { name: 'Fri', consultations: 22 },
  { name: 'Sat', consultations: 10 },
  { name: 'Sun', consultations: 5 },
];

const pieData = [
  { name: 'Fever', value: 35 },
  { name: 'Cough', value: 25 },
  { name: 'Stomach', value: 20 },
  { name: 'Injury', value: 12 },
  { name: 'Other', value: 8 },
];

const COLORS = ['hsl(210,100%,65%)', 'hsl(122,39%,49%)', 'hsl(45,100%,51%)', 'hsl(4,82%,56%)', 'hsl(210,15%,45%)'];

export default function AdminDashboard() {
  const { t } = useApp();

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-6">{t('nav.dashboard')}</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={<Users className="h-5 w-5" />} label={t('admin.totalPatients')} value="1,247" trend="+48 this month" color="primary" />
          <StatCard icon={<Stethoscope className="h-5 w-5" />} label={t('admin.totalDoctors')} value={32} color="secondary" />
          <StatCard icon={<CalendarCheck className="h-5 w-5" />} label={t('admin.totalConsultations')} value="3,891" trend="+156 this week" color="primary" />
          <StatCard icon={<Hospital className="h-5 w-5" />} label={t('admin.totalPharmacies')} value={18} color="warning" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card-healthcare">
            <h3 className="font-semibold text-foreground mb-4">Weekly Consultations</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,30%,90%)" />
                <XAxis dataKey="name" tick={{ fill: 'hsl(210,15%,45%)' }} />
                <YAxis tick={{ fill: 'hsl(210,15%,45%)' }} />
                <Tooltip />
                <Bar dataKey="consultations" fill="hsl(210,100%,65%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card-healthcare">
            <h3 className="font-semibold text-foreground mb-4">Common Symptoms</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
