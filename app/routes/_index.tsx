import { LoaderFunction, type MetaFunction } from "@remix-run/node";
import { Header } from "~/components/custom/Header/Header";
import { DayPhotoWidget } from "~/components/UAHWidget/DayPhoto";
import axios from "axios";
import { CloseAsteroidsWidget } from "~/components/custom/Asteroids/CloseAsteroids";
import {
  AsteroidsSchema,
  NasaApodSchema,
} from "~/components/custom/Asteroids/types";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async () => {
  const res = await axios.get(
    "https://api.nasa.gov/planetary/apod?api_key=Np9nhqQW7CqArwsLRUMH9EXCATWlitVqzCP5IF94"
  );
  const asteroids = await axios.get(
    "https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=Np9nhqQW7CqArwsLRUMH9EXCATWlitVqzCP5IF94"
  );

  const validatedData = NasaApodSchema.parse(res.data);
  const validatedAsteroids = AsteroidsSchema.parse(asteroids.data);
  return {
    dayPhoto: validatedData,
    asteroids: validatedAsteroids,
  };
};

export default function Index() {
  return (
    <div className="w-full h-screen p-3 bg-background">
      <Header />
      <div className="pt-4 flex items-start gap-4">
        <DayPhotoWidget />
        <CloseAsteroidsWidget />
      </div>
    </div>
  );
}
