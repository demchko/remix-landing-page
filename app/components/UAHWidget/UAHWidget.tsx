import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { loader } from "~/routes/_index";
import { useLoaderData } from "@remix-run/react";

export const DayPhotoWidget = () => {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="w-1/3 bg-gray-200 rounded-lg p-3">
      <Card>
        <CardHeader>
          <CardTitle>Astronomy picture of the day</CardTitle>
          <CardDescription>{data?.title}</CardDescription>
        </CardHeader>
        <CardContent>
          <img
            className="w-full max-h-[350px] object-contain"
            src={data?.url}
            alt={data?.title}
          />
        </CardContent>
      </Card>
    </div>
  );
};
