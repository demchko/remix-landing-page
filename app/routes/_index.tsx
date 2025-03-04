import { LoaderFunction, type MetaFunction } from "@remix-run/node";
import { Header } from "~/components/custom/Header/Header";
import { DayPhotoWidget } from "~/components/UAHWidget/UAHWidget";
import axios from "axios";
import { z } from "zod";

const NasaApodSchema = z.object({
  title: z.string(),
  url: z.string().url(),
});

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
  const validatedData = NasaApodSchema.parse(res.data);
  return validatedData;
};

export default function Index() {
  return (
    <div className="w-full h-screen p-3 bg-background">
      <Header />
      <div className="pt-4">
        <DayPhotoWidget />
      </div>
    </div>
  );
}
