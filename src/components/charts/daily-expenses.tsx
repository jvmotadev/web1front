"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTransactions } from "@/app/cards/cards-information"; // Custom hook for transactions

const chartConfig = {
  dailyTotal: {
    label: "Gasto Trimestral (R$)",
    color: "hsl(var(--chart-1))",
  },
  transactionCount: {
    label: "Número de Transações",
    color: "hsl(var(--chart-2))",
  },
};

export function DailyExpenses() {
  // Declare hooks at the top level, without conditional rendering
  const { transactions, loading, error } = useTransactions();
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("dailyTotal");

  // Get today's date and calculate the date 3 months ago
  const today = new Date();
  const threeMonthsAgo = new Date(today);
  threeMonthsAgo.setMonth(today.getMonth() - 3);

  // Filter transactions for exits only and for the last 3 months
  const filteredTransactions = React.useMemo(
    () =>
      transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return (
          transaction.type === "saida" &&
          transactionDate >= threeMonthsAgo &&
          transactionDate <= today
        );
      }),
    [transactions, threeMonthsAgo, today]
  );

  // Aggregate data by day
  const aggregatedData = React.useMemo(
    () =>
      filteredTransactions.reduce((acc, transaction) => {
        const formattedDate = new Date(transaction.date).toISOString().split("T")[0];

        if (!acc[formattedDate]) {
          acc[formattedDate] = {
            date: formattedDate,
            dailyTotal: 0,
            transactionCount: 0,
          };
        }

        acc[formattedDate].dailyTotal += transaction.value;
        acc[formattedDate].transactionCount += 1;

        return acc;
      }, {} as Record<string, { date: string; dailyTotal: number; transactionCount: number }>),
    [filteredTransactions]
  );

  const chartData = Object.values(aggregatedData).sort(
    (a, b) => new globalThis.Date(a.date).getTime() - new globalThis.Date(b.date).getTime()
  );
  

  // Calculate overall totals for buttons
  const total = React.useMemo(
    () => ({
      dailyTotal: chartData.reduce((sum, item) => sum + item.dailyTotal, 0),
      transactionCount: chartData.reduce((sum, item) => sum + item.transactionCount, 0),
    }),
    [chartData]
  );

  // Handle loading and error states
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading transactions: {error.message}</p>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Gastos diários:</CardTitle>
          <CardDescription>
            Mostrando os gastos diários dos últimos 3 meses
          </CardDescription>
        </div>
        <div className="flex">
          {Object.keys(chartConfig).map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[chart].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  labelFormatter={(value) => {
                    if (typeof value === "string") {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      });
                    }
                    return value;
                  }}
                  formatter={(
                    value: string | number | (string | number)[] | null | undefined,
                    name: string | number | undefined
                  ) => {
                    if (typeof value === "number" && typeof name === "string") {
                      if (name === chartConfig.dailyTotal.label) {
                        return `R$ ${value.toFixed(2)}`;
                      }
                      if (name === chartConfig.transactionCount.label) {
                        return `${value} transações`;
                      }
                    }
                    return value;
                  }}
                />
              }
            />
            <Bar
              dataKey={activeChart}
              name={chartConfig[activeChart].label}
              fill={chartConfig[activeChart].color}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
