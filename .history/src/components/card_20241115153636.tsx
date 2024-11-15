import React from 'react';
import { cn } from "@shadcn/utils";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  

// Define the props for the Card component
interface CardProps {
  title: string;
  description: string;
  status?: "success" | "error" | "info";
}

export const Cards: React.FC<CardProps> = ({ title, description, status }) => {
  return (
    <Card className={cn("max-w-md rounded-lg", {
      "bg-emerald-100": status === "success",
      "bg-red-100": status === "error",
      "bg-sky-100": status === "info",
      "shadow-lg border": true,
    })}>
      <CardHeader className="p-4 border-b">
        <CardTitle className="text-2xl font-semibold text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 text-muted-foreground">
        {description}
      </CardContent>
    </Card>
  );
};