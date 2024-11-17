import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ItemTabela } from "./entradas-item";

export function Tabela() {
  return (
    <div className="py-8">
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
          <ItemTabela/>
          <ItemTabela/>                
        </TableBody>
      </Table>
    </div>
  );
}
