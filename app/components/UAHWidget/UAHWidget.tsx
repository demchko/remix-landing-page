import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { loader } from "~/routes/_index";
import { useLoaderData } from "@remix-run/react";

const chartConfig = {
  plnCur: {
    label: "PLN to USD",
    color: "hsl(var(--chart-1))",
  },
  eurCur: {
    label: "EUR to USD",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export const PlnAndEurWidget = () => {
  const data = useLoaderData<typeof loader>();
  const widgetData = [
    {
      month: data.previousPln.date,
      plnCur: data.previousPln.rates.PLN,
      eurCur: data.previousEur.rates.EUR,
    },
    {
      month: data.plnNow.date,
      plnCur: data.plnNow.rates.PLN,
      eurCur: data.eurNow.rates.EUR,
    },
  ];
  return (
    <div className="w-1/3 bg-gray-200 rounded-lg p-3">
      <Card>
        <CardHeader>
          <CardTitle>PLN & EUR Exchange</CardTitle>
          <CardDescription>
            Comparing PLN to USD and EUR to USD exchange rates between now and
            two months ago.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={widgetData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="plnCur"
                type="natural"
                fill="var(--color-plnCur)"
                fillOpacity={0.4}
                stroke="var(--color-plnCur)"
                stackId="a"
              />
              <Area
                dataKey="eurCur"
                type="natural"
                fill="var(--color-eurCur)"
                fillOpacity={0.4}
                stroke="var(--color-eurCur)"
                stackId="a"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Two mon. Ago - Now
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
