import { type MetaFunction } from "@remix-run/node";
import { Header } from "~/components/custom/Header/Header";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Cart() {
  return (
    <div className="w-full h-screen bg-background">
      <Header />
      <p>Cart page</p>
    </div>
  );
}
