import React from "react";
import {
  Instagram,
  Mail,
  MapPin,
  PhoneCall,
  Twitch,
  Twitter,
} from "lucide-react";
import {
  ContactDetailType,
  SocialMediaType,
  ContactDetailProps,
  SocialIconProps,
} from "./types";

export const contactDetails: ContactDetailType[] = [
  { icon: PhoneCall, text: "+1012 3456 789" },
  { icon: Mail, text: "demo@gmail.com" },
  {
    icon: MapPin,
    text: "132 Dartmouth Street Boston, Massachusetts 02156 United States",
  },
];

const socialMediaLinks: SocialMediaType[] = [
  { icon: Twitter, ariaLabel: "Twitter" },
  { icon: Instagram, ariaLabel: "Instagram" },
  { icon: Twitch, ariaLabel: "Twitch" },
];

export const ContactDetail = ({ Icon, text }: ContactDetailProps) => (
  <div className="flex gap-4 items-start">
    <Icon
      className={text.length > 30 ? "min-w-6 min-h-6 max-w-6 max-h-6" : ""}
    />
    <p>{text}</p>
  </div>
);

const SocialIcon = ({ Icon, ariaLabel }: SocialIconProps) => (
  <div
    className="bg-[#1B1B1B] w-10 h-10 flex items-center justify-center rounded-full p-1 hover:bg-white group hover:cursor-pointer"
    aria-label={ariaLabel}
    role="button"
  >
    <Icon className="text-white group-hover:text-black" />
  </div>
);

export const ContactInformation: React.FC = () => {
  return (
    <div className="bg-black text-white w-[40%] rounded-xl px-6 py-6 flex flex-col gap-[125px] relative overflow-hidden">
      <div>
        <p className="text-[28px] font-semibold">Contact Information</p>
        <p className="text-lg">Say something to start a live chat!</p>
      </div>

      <div className="flex flex-col gap-10">
        {contactDetails.map((detail, index) => (
          <ContactDetail key={index} Icon={detail.icon} text={detail.text} />
        ))}
      </div>

      <div className="flex items-center gap-4">
        {socialMediaLinks.map((social, index) => (
          <SocialIcon
            key={index}
            Icon={social.icon}
            ariaLabel={social.ariaLabel}
          />
        ))}
      </div>

      <div className="absolute -right-[100px] -bottom-[100px] bg-[#1A1A1A] w-[269px] h-[269px] rounded-full" />
      <div className="absolute right-[50px] bottom-[50px] bg-[#484848] w-[138px] h-[138px] rounded-full opacity-50" />
    </div>
  );
};
