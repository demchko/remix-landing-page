import { useLoaderData } from "@remix-run/react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import { loader } from "~/routes/_index";
import { NearEarthObject } from "./types";

const chartConfig = {
  meters: {
    label: "Meters",
  },
  asteroid: {
    color: "hsl(var(--chart-6))",
  },
} satisfies ChartConfig;

export const CloseAsteroidsWidget = () => {
  const { asteroids } = useLoaderData<typeof loader>();

  const asteroidsData = asteroids.near_earth_objects["2015-09-08"]
    .map((item: NearEarthObject) => {
      return {
        name: item.name || "Asteroid",
        meters: item.estimated_diameter.meters.estimated_diameter_min,
        is_potentially_hazardous_asteroid:
          item.is_potentially_hazardous_asteroid,
        fill: "var(--color-asteroid)",
      };
    })
    .splice(0, 6);
  return (
    <div className="w-1/3 bg-gray-200 rounded-lg p-3">
      <Card>
        <CardHeader>
          <CardTitle>Nearest asteroids</CardTitle>
          <CardDescription>
            General count - {asteroids.element_count}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={asteroidsData}
              layout="vertical"
              margin={{
                left: 0,
              }}
            >
              <YAxis
                dataKey="name"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(val) => val.slice(0, 13)}
              />
              <XAxis dataKey="meters" type="number" hide />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar dataKey="meters" layout="vertical" radius={5} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
