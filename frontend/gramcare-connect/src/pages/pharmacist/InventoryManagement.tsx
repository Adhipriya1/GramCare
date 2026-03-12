import { useApp } from '@/contexts/AppContext';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const inventory = [
  { name: 'Paracetamol 500mg', stock: 450, status: 'ok' },
  { name: 'Amoxicillin 500mg', stock: 120, status: 'ok' },
  { name: 'ORS Sachets', stock: 35, status: 'low' },
  { name: 'Ibuprofen 400mg', stock: 8, status: 'critical' },
  { name: 'Cough Syrup', stock: 22, status: 'low' },
  { name: 'Metformin 500mg', stock: 200, status: 'ok' },
  { name: 'Domperidone 10mg', stock: 5, status: 'critical' },
];

export default function InventoryManagement() {
  const { t } = useApp();

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-6">{t('nav.inventory')}</h1>
        <div className="card-healthcare overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Medicine Name</TableHead>
                <TableHead className="text-right">Stock Qty</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.map((item, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="text-right">{item.stock}</TableCell>
                  <TableCell className="text-right">
                    {item.status === 'ok' && <Badge variant="outline" className="urgency-low">Available</Badge>}
                    {item.status === 'low' && <Badge variant="outline" className="urgency-moderate">Low Stock</Badge>}
                    {item.status === 'critical' && <Badge variant="outline" className="urgency-high">Critical</Badge>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}
