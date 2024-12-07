"use client";

import { useTransactions } from "@/app/cards/cards-information"; // Import the hook
import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Map chart colors from index.css
const chartColors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export function ExitChart() {
  const { transactions, loading, error } = useTransactions(); // Use the custom hook

  if (loading) {
    return <p>Loading...</p>; // Show loading state
  }

  if (error) {
    return <p>Error loading transactions: {error.message}</p>; // Show error state
  }

  // Filter transactions for exits only
  const exits = transactions.filter((transaction) => transaction.type === "saida");

  // Process transactions for chart data
  const processChartData = (transactions: typeof exits) =>
    transactions.reduce((acc, transaction) => {
      const { category, value } = transaction;
      if (!acc[category]) {
        acc[category] = { category, totalValue: 0 }; // Initialize category
      }
      acc[category].totalValue += value; // Sum up values
      return acc;
    }, {} as Record<string, { category: string; totalValue: number }>);

  const exitsData = processChartData(exits);

  // Calculate total value for exits
  const totalExitsValue = Object.values(exitsData).reduce((sum, { totalValue }) => sum + totalValue, 0);

  // Round up the maximum value to the nearest thousand
  const maxExitValue = Math.ceil(
    Math.max(...Object.values(exitsData).map(({ totalValue }) => totalValue)) / 1000
  ) * 1000;

  // Prepare chart data with percentages
  const prepareChartData = (data: typeof exitsData, totalValue: number) =>
    Object.values(data).map((item, index) => ({
      ...item,
      percentage: totalValue ? ((item.totalValue / totalValue) * 100).toFixed(0) : 0, // Calculate percentage
      fill: chartColors[index % chartColors.length], // Cycle through colors
    }));

  const exitsChartData = prepareChartData(exitsData, totalExitsValue);

  const exitsChartConfig: ChartConfig = {
    category: { label: "Category", color: "hsl(var(--chart-label))" },
  };

  return (
    <Card>
      <CardContent>
        <ChartContainer config={exitsChartConfig}>
          <BarChart
            accessibilityLayer
            data={exitsChartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="category"
              type="category"
              tickLine={false}
              fontSize={16}
              tickMargin={10}
              axisLine={false}
              width={150}
              tickFormatter={(value) =>
                value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
              }
            />
            <XAxis
              type="number"
              domain={[0, maxExitValue]} // Adjust the domain to the max value
              tickFormatter={(value) => value.toLocaleString("pt-BR")} // Format the value
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  labelFormatter={(value) => {
                    if (typeof value === "string") {
                      return `Categoria: ${value}`;
                    }
                    return value;
                  }}
                  formatter={(
                    value: string | number | (string | number)[] | null | undefined,
                    _name: string | number | undefined,
                    props: any
                  ) => {
                    if (typeof value === "number") {
                      const percentage = props.payload.percentage;
                      return [
                        `${new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(value)} (${percentage}%)`,
                        
                      ];
                    }
                    return value;
                  }}
                />
              }
            />
            <Bar
              dataKey="totalValue"
              layout="vertical"
              fill="var(--color-desktop)"
              radius={4}
            >
              <LabelList
                dataKey="totalValue"
                position="right"
                offset={8}
                formatter={(value: number) =>
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(value)
                } // Show value in BRL format
                className="fill-foreground"
                fontSize={16}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-lg leading-none">
          Saídas por Categoria <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Mostrando valores reais e porcentagens de contribuição de saídas por categoria.
        </div>
      </CardFooter>
    </Card>
  );
}
