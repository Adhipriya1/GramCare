import { ReactNode } from 'react';

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  trend?: string;
  color?: 'primary' | 'secondary' | 'warning' | 'emergency';
}

const colorMap = {
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary/10 text-secondary',
  warning: 'bg-warning/10 text-warning',
  emergency: 'bg-emergency/10 text-emergency',
};

export function StatCard({ icon, label, value, trend, color = 'primary' }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="flex items-center justify-between">
        <div className={`p-2 rounded-lg ${colorMap[color]}`}>
          {icon}
        </div>
        {trend && <span className="text-xs text-muted-foreground">{trend}</span>}
      </div>
      <div className="mt-2">
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
