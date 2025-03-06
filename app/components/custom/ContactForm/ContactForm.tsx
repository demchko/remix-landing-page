import { useFetcher } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import imgLetter from "~/letter_send.png";
import { FormFieldProps, RadioOption } from "./types";
import { z } from "zod";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { action } from "~/routes/_index";
import { Loader } from "lucide-react";

export const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z
    .string()
    .regex(/^\+[0-9]{10,15}$/, "Invalid phone number format"),
  subject: z.enum(["general", "support", "billing", "feedback"]),
  message: z.string().min(1, "Message is required"),
});

export const ContactForm = (): JSX.Element => {
  const [form, fields] = useForm({
    id: "contact-form",
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
    shouldRevalidate: "onBlur",
  });
  const radioOptions: RadioOption[] = [
    { id: "general", value: "general", label: "General Inquiry" },
    { id: "support", value: "support", label: "Technical Support" },
    { id: "billing", value: "billing", label: "Billing Question" },
    { id: "feedback", value: "feedback", label: "Product Feedback" },
  ];

  const fetcher = useFetcher<typeof action>();

  return fetcher.data ? (
    <div className="h-full w-3/5 flex justify-center items-center">
      <div className="text-center">
        <p className="text-[30px] font-semibold">Message sent to</p>
        <p>{fetcher.data?.email}</p>
      </div>
    </div>
  ) : (
    <fetcher.Form
      {...getFormProps(form)}
      className="relative flex w-3/5 flex-col gap-6 px-8 py-6"
      method="post"
    >
      <div className="flex w-full gap-4">
        <FormField
          label="First name"
          id="firstName"
          type="text"
          placeholder="First name"
          className="w-1/2"
          stringType={fields.firstName}
          error={fields.firstName.errors}
        />
        <FormField
          label="Last name"
          id="lastName"
          type="text"
          placeholder="Last name"
          className="w-1/2"
          stringType={fields.lastName}
          error={fields.lastName.errors}
        />
      </div>

      <div className="flex w-full gap-4">
        <FormField
          label="Email"
          id="email"
          type="email"
          placeholder="Email"
          className="w-1/2"
          stringType={fields.email}
          error={fields.email.errors}
        />
        <FormField
          label="Phone number"
          id="phoneNumber"
          type="tel"
          placeholder="+380508280359"
          className="w-1/2"
          stringType={fields.phoneNumber}
          error={fields.phoneNumber.errors}
        />
      </div>

      <div className="flex flex-col gap-6">
        <Label htmlFor="subject">Select Subject?</Label>
        <RadioGroup
          {...getInputProps(fields.subject, { type: "text" })}
          defaultValue="general"
          id="subject"
          className="flex gap-2"
        >
          {radioOptions.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={option.id} />
              <Label htmlFor={option.id} className="text-xs">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="message">Message</Label>
        <Input
          {...getInputProps(fields.message, { type: "text" })}
          id="message"
          placeholder="Write your message.."
        />
        <p className="text-xs text-red-500 h-2">{fields.message.errors}</p>
      </div>

      <div className="flex w-full justify-end">
        <Button
          disabled={fetcher.state !== "idle"}
          type="submit"
          className="px-10 py-6"
        >
          {fetcher.state === "loading" && <Loader className="animate-spin" />}
          Send Message
        </Button>
      </div>

      <img
        className="absolute bottom-0 right-[60px]"
        src={imgLetter}
        alt="Letter icon"
      />
    </fetcher.Form>
  );
};

const FormField = ({
  label,
  id,
  type,
  placeholder,
  className,
  stringType,
  error,
}: FormFieldProps) => (
  <div className={className}>
    <Label htmlFor={id}>{label}</Label>
    <Input
      {...getInputProps(stringType, { type: "text" })}
      type={type}
      id={id}
      name={id}
      placeholder={placeholder}
    />
    <p className="text-xs text-red-500 h-2">{error}</p>
  </div>
);
