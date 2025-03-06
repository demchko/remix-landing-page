import { ActionFunctionArgs, type MetaFunction } from "@remix-run/node";
import { z } from "zod";
import {
  ContactForm,
  schema,
} from "~/components/custom/ContactForm/ContactForm";
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

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const formValues = Object.fromEntries(formData);

  try {
    const validatedData = schema.parse(formValues);
    return { success: true, email: validatedData.email };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.format(),
      };
    }
    return {
      success: false,
      errors: { _form: "Form submission failed" },
    };
  }
}

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
