"use client";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface UserChartInterface {
  name: string;
  total: number;
}

export default function UsersChart({
  data,
}: Readonly<{ data: UserChartInterface[] }>) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="w-full flex flex-col gap-2">
            <CardTitle>Adhésion des utilisateurs</CardTitle>
            <CardDescription>
              Utilisateurs ayant rejoint l&apos;application cette semaine
            </CardDescription>
          </div>
          <Tabs defaultValue="week">
            <TabsList>
              <TabsTrigger value="week">Cette semaine</TabsTrigger>
              <TabsTrigger value="month">Ce mois-ci</TabsTrigger>
              <TabsTrigger value="year">Cette année</TabsTrigger>
              <TabsContent value="week"></TabsContent>
              <TabsContent value="month"></TabsContent>
              <TabsContent value="year"></TabsContent>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="mt-4">
        <ChartContainer
          config={{
            total: {
              label: "Utilisateurs de l&apos;application",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="total"
                fill="var(--color-total)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
