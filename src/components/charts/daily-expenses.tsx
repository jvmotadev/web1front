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
  const { transactions, loading, error } = useTransactions();
  const [activeChart, setActiveChart] = React.useState<
    keyof typeof chartConfig
  >("dailyTotal");

  const today = new Date();
  const threeMonthsAgo = new Date(today);
  threeMonthsAgo.setMonth(today.getMonth() - 3);

  // Filtra as transações nos últimos 3 meses
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

  // Agrega transações por dia
  const aggregatedData = React.useMemo(() => {
    return filteredTransactions.reduce((acc, transaction) => {
      const formattedDate = new Date(transaction.date).toISOString().split("T")[0];

      if (!acc[formattedDate]) {
        acc[formattedDate] = {
          date: formattedDate,
          dailyTotal: 0,
          transactionCount: 0,
          transactions: [],
        };
      }

      acc[formattedDate].dailyTotal += transaction.value;
      acc[formattedDate].transactionCount += 1;
      acc[formattedDate].transactions.push(transaction);

      return acc;
    }, {} as Record<string, {
      date: string;
      dailyTotal: number;
      transactionCount: number;
      transactions: { name: string; value: number }[];
    }>);
  }, [filteredTransactions]);

  const chartData = Object.values(aggregatedData).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const total = React.useMemo(() => ({
    dailyTotal: chartData.reduce((sum, item) => sum + item.dailyTotal, 0),
    transactionCount: chartData.reduce((sum, item) => sum + item.transactionCount, 0),
  }), [chartData]);

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
          className="aspect-auto h-[450px] w-full"
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
                  className="w-[250px]"
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
                  formatter={(value, _name, props) => {
                    if (props.payload && props.payload.transactions) {
                      const { transactions, dailyTotal, transactionCount } = props.payload;

                      const transactionDetails = transactions
                        .map(
                          (transaction: { name: string; value: number }) =>
                            `${transaction.name} - ${new Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(transaction.value)}`
                        )
                        .join("<br />"); // Adiciona <br /> entre as transações

                      const totalDetails =
                        activeChart === "transactionCount"
                          ? `Total de ${transactionCount} transações`
                          : `Total - ${new Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(dailyTotal)}`;

                      return (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: `${transactionDetails}<br /><br />${totalDetails}`,
                          }}
                        />
                      );
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
