import { Layout } from "@/app/layout";
import { Chart } from "@/app/piechart";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell
} from "@/components/ui/table";
import { ArrowDownToLine } from 'lucide-react';

const Saidas = () => {
  return (
    <div className="flex ">
      <Layout children={undefined} />
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex justify-between gap-x-24">
          <h1 className="text-5xl">Saídas</h1>
        </div>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            <TableRow>
              <TableCell><ArrowDownToLine color="#940707" /></TableCell> 
              <TableCell>R$820,00</TableCell>
              <TableCell>Jogos</TableCell>
              <TableCell>xx/xx/xx</TableCell>
            </TableRow>
            </TableBody>
          </Table>
        </div>
        <Chart Title="Saídas" />
      </main>
    </div>
  );
};

export default Saidas;
