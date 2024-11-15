import {
    TableCell,
    TableRow,
  } from "@/components/ui/table";

import { ArrowUpToLine } from 'lucide-react';


export function ItemTabela(){
    return(
        <TableRow>
              <TableCell><ArrowUpToLine color="#079711" /></TableCell> 
              <TableCell>R$820,00</TableCell>
              <TableCell>Jogos</TableCell>
              <TableCell>xx/xx/xx</TableCell>
            </TableRow>
    )
}