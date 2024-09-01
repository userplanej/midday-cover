"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { ChevronDown } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@midday/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@midday/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@midday/ui/select"

const chartData = [
  { date: "May 19", price: 90.85, high: 92.85, low: 88.85 },
  { date: "May 28", price: 110.85, high: 112.85, low: 108.85 },
  { date: "Jun 5", price: 120.85, high: 122.85, low: 118.85 },
  { date: "Jun 13", price: 135.85, high: 137.85, low: 133.85 },
  { date: "Jun 24", price: 128.85, high: 130.85, low: 126.85 },
  { date: "Jul 2", price: 138.85, high: 140.85, low: 136.85 },
  { date: "Jul 10", price: 132.85, high: 134.85, low: 130.85 },
  { date: "Jul 18", price: 122.85, high: 124.85, low: 120.85 },
  { date: "Jul 28", price: 112.85, high: 114.85, low: 110.85 },
  { date: "Aug 5", price: 128.85, high: 130.85, low: 126.85 },
  { date: "Aug 13", price: 142.85, high: 144.85, low: 140.85 },
  { date: "Aug 21", price: 138.85, high: 140.85, low: 136.85 },
]

const chartConfig = {
  price: {
    label: "Price",
    color: "hsl(var(--chart-1))",
  },
  high: {
    label: "High",
    color: "hsl(var(--chart-2))",
  },
  low: {
    label: "Low",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export default function StockChart() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-black">
      <Select defaultValue="nvda">
        <SelectTrigger className="w-full mb-4 bg-gray-900 text-white border-gray-700">
          <SelectValue placeholder="Select a stock" />
        </SelectTrigger>
        <SelectContent className="bg-gray-900 text-white border-gray-700">
          <SelectItem value="nvda">Nvidia Corporation</SelectItem>
          <SelectItem value="aapl">Apple Inc.</SelectItem>
          <SelectItem value="googl">Alphabet Inc.</SelectItem>
        </SelectContent>
      </Select>
      
      <Card className="bg-gray-900 text-white border-gray-800">
        <CardHeader className="flex flex-col items-start space-y-0 border-b border-gray-800 p-6">
          <div className="flex flex-col">
            <CardTitle className="text-4xl font-bold">NVDA</CardTitle>
            <CardDescription className="text-gray-400">
              Nvidia Corporation
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <ChartContainer
            config={chartConfig}
            className="aspect-[4/3] w-full"
          >
            <LineChart
              data={chartData}
              margin={{
                top: 20,
                right: 10,
                left: 10,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="date"
                stroke="hsl(var(--muted-foreground))"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `$${value.toFixed(2)}`}
                domain={['dataMin - 10', 'dataMax + 10']}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="bg-gray-900 border-gray-800"
                    nameKey="price"
                  />
                }
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="high"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="low"
                stroke="hsl(var(--chart-3))"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
        <div className="border-t border-gray-800 p-6">
          <p className="text-sm text-gray-400">
            Trending up by <span className="text-green-500 font-bold">10.21%</span> this month <ChevronDown className="inline-block w-4 h-4 text-green-500 rotate-180" />
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Showing stock data for the last 3 months
          </p>
        </div>
      </Card>
    </div>
  )
}