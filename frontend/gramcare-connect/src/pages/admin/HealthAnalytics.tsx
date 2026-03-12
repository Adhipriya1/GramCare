import { useApp } from '@/contexts/AppContext';
import { DashboardLayout } from '@/components/DashboardLayout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { AlertTriangle } from 'lucide-react';

const villageData = [
  { village: 'Devpur', fever: 12, flu: 8, dengue: 2 },
  { village: 'Rampur', fever: 18, flu: 5, dengue: 6 },
  { village: 'Sundarpur', fever: 7, flu: 12, dengue: 1 },
  { village: 'Kalyanpur', fever: 15, flu: 3, dengue: 0 },
];

const trendData = [
  { week: 'W1', cases: 25 },
  { week: 'W2', cases: 32 },
  { week: 'W3', cases: 28 },
  { week: 'W4', cases: 45 },
  { week: 'W5', cases: 52 },
];

export default function HealthAnalytics() {
  const { t } = useApp();

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-6">{t('nav.analytics')}</h1>

        <div className="bg-warning/10 border border-warning/30 rounded-xl p-4 mb-6 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
          <div>
            <p className="font-semibold text-foreground">High fever cases detected in Rampur</p>
            <p className="text-sm text-muted-foreground">18 cases reported this week — 50% increase from last week.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="card-healthcare">
            <h3 className="font-semibold text-foreground mb-4">Village Health Breakdown</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={villageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,30%,90%)" />
                <XAxis dataKey="village" tick={{ fill: 'hsl(210,15%,45%)', fontSize: 12 }} />
                <YAxis tick={{ fill: 'hsl(210,15%,45%)' }} />
                <Tooltip />
                <Bar dataKey="fever" fill="hsl(4,82%,56%)" radius={[2, 2, 0, 0]} />
                <Bar dataKey="flu" fill="hsl(45,100%,51%)" radius={[2, 2, 0, 0]} />
                <Bar dataKey="dengue" fill="hsl(210,100%,65%)" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card-healthcare">
            <h3 className="font-semibold text-foreground mb-4">Weekly Case Trend</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,30%,90%)" />
                <XAxis dataKey="week" tick={{ fill: 'hsl(210,15%,45%)' }} />
                <YAxis tick={{ fill: 'hsl(210,15%,45%)' }} />
                <Tooltip />
                <Line type="monotone" dataKey="cases" stroke="hsl(4,82%,56%)" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
