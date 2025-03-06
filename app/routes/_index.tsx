import { type MetaFunction } from "@remix-run/node";
import { ContactForm } from "~/components/custom/ContactForm/ContactForm";
import { ContactInformation } from "~/components/custom/ContactInformation/ContactInformation";
import { ContactUs } from "~/components/custom/ContactUs/ContactUs";
import { Footer } from "~/components/custom/Footer/Footer";
import { Header } from "~/components/custom/Header/Header";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="w-full bg-background h-full flex flex-col gap-6">
      <Header />
      <ContactUs />
      <div className="w-full flex justify-center">
        <div className="w-[85%] bg-background-block rounded-xl p-2 flex">
          <ContactInformation />
          <ContactForm />
        </div>
      </div>
      <Footer />
    </div>
  );
}
