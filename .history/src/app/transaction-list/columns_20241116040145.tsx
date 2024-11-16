"use client";

import { ColumnDef } from "@tanstack/react-table";

// Placeholder for Payment type
export type Payment = {
    id: string;
    amount: number;
    status: string; // Change "pending" | "processing" | "success" | "failed" to `string` for simplicity
    email: string;
  };
  

// Placeholder column definitions
export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];
