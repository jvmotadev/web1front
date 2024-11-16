import { TableCell, TableRow } from "@/components/ui/table";
import { ArrowUpToLine } from "lucide-react";

export function ItemTabela() {
  const amount = 820.0; // Example value
  const formattedAmount = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);

  return (
    <TableRow>
      <TableCell>
        <ArrowUpToLine color="#079711" />
      </TableCell>
      <TableCell>{formattedAmount}</TableCell>
      <TableCell>Jogos</TableCell>
      <TableCell>xx/xx/xx</TableCell>
    </TableRow>
  );
}
