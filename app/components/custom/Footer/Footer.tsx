import { Link, useFetcher } from "@remix-run/react";
import {
  ContactDetail,
  contactDetails,
} from "../ContactInformation/ContactInformation";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { action } from "~/routes/_index";
import { z } from "zod";

const footerLinks = {
  company: [
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "Blogs", path: "/blogs" },
  ],
  legal: [
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Terms & Services", path: "/terms-services" },
    { label: "Terms of Use", path: "/terms-use" },
    { label: "Refund Policy", path: "/refund-policy" },
  ],
  quickLinks: [
    { label: "Techlabz Keybox", path: "/techlabz-keybox" },
    { label: "Downloads", path: "/downloads" },
    { label: "Forum", path: "/forum" },
  ],
};

interface LinkInterface {
  label: string;
  path: string;
}

const FooterSection = ({
  title,
  links,
  isLinkComponent = true,
}: {
  title: string;
  links: LinkInterface[];
  isLinkComponent?: boolean;
}) => (
  <div className="flex flex-col gap-2 mb-6 md:mb-0">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <div className="flex flex-col gap-2">
      {links.map((link, index) =>
        isLinkComponent ? (
          <Link
            key={index}
            to={link.path}
            className="hover:text-gray-300 transition-colors"
          >
            {link.label}
          </Link>
        ) : (
          <p
            key={index}
            className="hover:text-gray-300 cursor-pointer transition-colors"
          >
            {link.label}
          </p>
        )
      )}
    </div>
  </div>
);

export const schema = z.object({
  email: z.string().email("Invalid email address"),
});

const NewsletterSubscription = () => {
  const fetcher = useFetcher<typeof action>();

  return (
    <div className="flex flex-col justify-between bg-[#131313] rounded-lg p-4 w-full md:w-[300px]">
      <h3 className="text-lg font-semibold mb-2">Join Our Newsletter</h3>
      {
        <fetcher.Form className="flex mb-2" method="post">
          <input hidden name="intent" value="subscribe" readOnly />
          <div>
            <Input
              name="email"
              className="bg-[#1e1e1e] h-10 text-white"
              placeholder="Your email address"
              type="email"
            />
          </div>
          <Button className="bg-black h-10 text-white border border-gray-700 hover:bg-gray-800 transition-colors">
            Subscribe
          </Button>
        </fetcher.Form>
      }
      <p className="text-[#898989] text-xs">
        * Will send you weekly updates for your better tool management.
      </p>
    </div>
  );
};

export const Footer = () => {
  return (
    <footer className="w-full bg-black py-4 px-4 md:px-8 text-white">
      <div className="text-center md:text-left mb-8">
        <p className="text-2xl md:text-[36px] font-bold text-white border-b border-white p-4 md:p-7 w-full text-center">
          Logo Here
        </p>
      </div>

      <div className="grid grid-cols-2 grid-rows-2 gap-6 md:flex md:justify-between">
        <div className="flex flex-col gap-2 max-w-[300px]">
          <h3 className="text-lg font-semibold mb-2">Reach us</h3>
          <div className="flex flex-col gap-2">
            {contactDetails.map((detail, index) => (
              <ContactDetail
                key={index}
                Icon={detail.icon}
                text={detail.text}
                isFooter={true}
              />
            ))}
          </div>
        </div>

        <FooterSection title="Company" links={footerLinks.company} />
        <FooterSection
          title="Legal"
          links={footerLinks.legal}
          isLinkComponent={false}
        />
        <FooterSection
          title="Quick Links"
          links={footerLinks.quickLinks}
          isLinkComponent={false}
        />

        <div className="hidden md:block">
          <NewsletterSubscription />
        </div>
      </div>
      <div className="block md:hidden">
        <NewsletterSubscription />
      </div>
      <div className="mt-8 pt-4 border-t border-gray-800 text-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};
