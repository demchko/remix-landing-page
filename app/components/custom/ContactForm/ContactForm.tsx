import { Form } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import imgLetter from "~/letter_send.png";
import { FormFieldProps, RadioOption } from "./types";

export const ContactForm = (): JSX.Element => {
  const radioOptions: RadioOption[] = [
    { id: "general", value: "general", label: "General Inquiry" },
    { id: "support", value: "support", label: "Technical Support" },
    { id: "billing", value: "billing", label: "Billing Question" },
    { id: "feedback", value: "feedback", label: "Product Feedback" },
  ];

  return (
    <Form
      className="relative flex w-3/5 flex-col gap-8 px-8 py-6"
      method="post"
    >
      <div className="flex w-full gap-4">
        <FormField
          label="First name"
          id="firstName"
          type="text"
          placeholder="First name"
          className="w-1/2"
        />
        <FormField
          label="Last name"
          id="lastName"
          type="text"
          placeholder="Last name"
          className="w-1/2"
        />
      </div>

      <div className="flex w-full gap-4">
        <FormField
          label="Email"
          id="email"
          type="email"
          placeholder="Email"
          className="w-1/2"
        />
        <FormField
          label="Phone number"
          id="phoneNumber"
          type="tel"
          placeholder="+380508280359"
          className="w-1/2"
        />
      </div>

      <div className="flex flex-col gap-6">
        <Label htmlFor="subject">Select Subject?</Label>
        <RadioGroup defaultValue="general" id="subject" className="flex gap-2">
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
        <Input id="message" placeholder="Write your message.." />
      </div>

      <div className="flex w-full justify-end">
        <Button className="px-10 py-6">Send Message</Button>
      </div>

      <img
        className="absolute bottom-0 right-[60px]"
        src={imgLetter}
        alt="Letter icon"
      />
    </Form>
  );
};

const FormField = ({
  label,
  id,
  type,
  placeholder,
  className,
}: FormFieldProps) => (
  <div className={className}>
    <Label htmlFor={id}>{label}</Label>
    <Input type={type} id={id} placeholder={placeholder} />
  </div>
);
