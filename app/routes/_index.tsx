import { json, type MetaFunction } from "@remix-run/node";
import { LoaderFunction } from "react-router";
import { Header } from "~/components/custom/Header/Header";
import { PlnAndEurWidget } from "~/components/UAHWidget/UAHWidget";
import axios from "axios";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async () => {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 2);
  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const twoMonthAgoStr = formatDate(oneMonthAgo);

  const latestPlnToUsdPromise = axios.get(
    "https://api.frankfurter.dev/v1/latest?base=USD&symbols=PLN"
  );
  const twoMonthAgoPlnToUsdPromise = axios.get(
    `https://api.frankfurter.dev/v1/${twoMonthAgoStr}?base=USD&symbols=PLN`
  );
  const latestEurToUsdPromise = axios.get(
    "https://api.frankfurter.dev/v1/latest?base=USD&symbols=EUR"
  );
  const twoMonthAgoEurToUsdPromise = axios.get(
    `https://api.frankfurter.dev/v1/${twoMonthAgoStr}?base=USD&symbols=EUR`
  );

  const [
    latestPlnToUsd,
    twoMonthAgoPlnToUsd,
    latestEurToUsd,
    twoMonthAgoEurToUsd,
  ] = await Promise.all([
    latestPlnToUsdPromise,
    twoMonthAgoPlnToUsdPromise,
    latestEurToUsdPromise,
    twoMonthAgoEurToUsdPromise,
  ]);

  return json({
    plnNow: latestPlnToUsd.data,
    eurNow: latestEurToUsd.data,
    previousPln: twoMonthAgoPlnToUsd.data,
    previousEur: twoMonthAgoEurToUsd.data,
  });
};

export default function Index() {
  return (
    <div className="w-full h-screen p-3 bg-background">
      <Header />
      <div className="pt-4">
        <PlnAndEurWidget />
      </div>
    </div>
  );
}
