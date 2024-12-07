"use client";

import { useTransactions } from "@/app/cards/cards-information"; // Import the hook
import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart";

// Map chart colors from index.css
const chartColors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

// Generate dynamic chart config
const generateChartConfig = (data: Record<string, { category: string }>, colors: string[]) =>
  Object.keys(data).reduce((config, category, index) => {
    config[category] = {
      label: category,
      color: colors[index % colors.length],
    };
    return config;
  }, {} as Record<string, { label: string; color: string }>);

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

  // Prepare chart data with percentages
  const prepareChartData = (data: typeof exitsData, totalValue: number) =>
    Object.values(data).map((item, index) => ({
      ...item,
      percentage: totalValue ? ((item.totalValue / totalValue) * 100).toFixed(0) : 0, // Calculate percentage with no decimal places
      fill: chartColors[index % chartColors.length], // Cycle through colors
    }));

  const exitsChartData = prepareChartData(exitsData, totalExitsValue);

  const exitsChartConfig: ChartConfig = {
    totalValue: { label: "Total Value" },
    ...generateChartConfig(exitsData, chartColors),
  };

  return (
    <Card className="border-none flex flex-col">
    <CardContent className="flex-1">
      <div className="flex flex-row justify-around gap-4">
        {/* Chart for Entries */}
        <ChartContainer
            config={exitsChartConfig}
            className="flex-1 aspect-square max-w-[30%] [&_.recharts-pie-label-text]:fill-foreground"
          >
            <PieChart>
              <Pie
                className="text-base"
                data={exitsChartData}
                dataKey="totalValue"
                label={({ percentage }) => `${percentage}%`} // Show only the percentage
                nameKey="category"
                outerRadius="80%"
              >
                <LabelList
                  dataKey="category"
                  className="fill-background"
                  stroke="none"
                  fontSize={18}
                />
              </Pie>
            </PieChart>
          </ChartContainer>

        {/* Chart for Exits */}
        <ChartContainer
          config={exitsChartConfig}
          className="flex-1 aspect-square max-w-[30%] [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <Pie
              className="text-base"
              data={exitsChartData}
              dataKey="totalValue"
              label={({ percentage }) => `${percentage}%`} // Show only the percentage
              nameKey="category"
              outerRadius="80%"
            >
              <LabelList
                dataKey="category"
                className="fill-background"
                stroke="none"
                fontSize={18}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>
    </CardContent>

    <CardFooter className="flex-col gap-2 text-sm">
      <div className="text-xl flex items-center gap-2 font-medium leading-none">
        Saídas por Categoria <TrendingUp className="h-4 w-4" />
      </div>
    </CardFooter>
  </Card>
  );
}
