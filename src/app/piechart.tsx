"use client"

import { TrendingUp } from "lucide-react"
import { LabelList, Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart"

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function Chart() {
  return (
    <Card className="border-none flex flex-col">
      <CardContent className="flex-1">
        <div className="flex flex-row justify-around gap-4"> {/* Flexbox to align side by side */}
          {/* First Chart */}
          <ChartContainer
            config={chartConfig}
            className="flex-1 aspect-square max-w-[30%] [&_.recharts-pie-label-text]:fill-foreground"
          >
            <PieChart>
              <Pie
                className="text-lg"
                data={chartData}
                dataKey="visitors"
                label
                nameKey="browser"
              >
                <LabelList
                  dataKey="browser"
                  className="fill-background"
                  stroke="none"
                  fontSize={24}
                  formatter={(value: keyof typeof chartConfig) =>
                    chartConfig[value]?.label
                  }
                />
              </Pie>
            </PieChart>
          </ChartContainer>

          {/* Second Chart */}
          <ChartContainer
            config={chartConfig}
            className="flex-1 aspect-square max-w-[30%] [&_.recharts-pie-label-text]:fill-foreground"
          >
            <PieChart>
              <Pie
                className="text-lg"
                data={chartData}
                dataKey="visitors"
                label
                nameKey="browser"
              >
                <LabelList
                  dataKey="browser"
                  className="fill-background"
                  stroke="none"
                  fontSize={24}
                  formatter={(value: keyof typeof chartConfig) =>
                    chartConfig[value]?.label
                  }
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="text-xl flex items-center gap-2 font-medium leading-none">
          Entradas por categoria <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
