"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { deleteTransaction } from "./delete-transaction";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpToLine, ArrowDownToLine } from "lucide-react";
import { Transaction } from "@/types/transaction"; // Import shared Transaction type

export const createColumns = (includeSelectColumn: boolean, actions: boolean): ColumnDef<Transaction>[] => {
  const baseColumns: ColumnDef<Transaction>[] = [
    {
      accessorKey: "type",
      header: () => <div className="text-center">Status</div>,
      cell: ({ row }) => {
        const type = row.getValue("type") as string;
        return (
          <div className="flex justify-center">
            {type === "entrada" ? (
              <ArrowUpToLine className="text-green-500 h-5 w-5" />
            ) : type === "saida" ? (
              <ArrowDownToLine className="text-red-500 h-5 w-5" />
            ) : (
              <span>{type}</span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "value",
      header: ({ column }) => (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }
          >
            Valor
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => {
        const value = parseFloat(row.getValue("value"));
        const formatted = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(value);

        return <div className="text-center font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }
          >
            Nome
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: ({ column }) => (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }
          >
            Categoria
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }
          >
            Data
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => {
        const rawDate = row.getValue("date") as string; // Informe que o valor é uma string
        const date = new Date(rawDate); // Converta a string para Date
        const formatted = new Intl.DateTimeFormat("pt-BR").format(date); // Formata a data
      
        return <div className="text-center font-medium">{formatted}</div>;
      },    
    },
  ];

  if (includeSelectColumn) {
    baseColumns.unshift({
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    });
  }

  if (actions) {
    baseColumns.push({
      id: "actions",
      cell: ({ row }) => {
        const transaction = row.original;
  
        const handleDelete = async () => {
          if (window.confirm("Tem certeza que deseja deletar esta transação?")) {
            try {
              await deleteTransaction(transaction.id);
              alert("Transação deletada com sucesso!");
              window.location.reload(); // Recarregar a página para refletir a exclusão (pode ser substituído por atualização de estado)
            } catch (error) {
              alert("Erro ao deletar a transação.");
              console.error(error);
            }
          }
        };
  
        return (
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Opções</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(transaction.id)}
                >
                  Copiar Informações
                </DropdownMenuItem>
                <DropdownMenuItem>Editar</DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete}>
                  Deletar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          );
        },
      },
    )
  };

  return baseColumns;
};
