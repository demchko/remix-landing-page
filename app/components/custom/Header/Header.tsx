import { Link } from "@remix-run/react";
import {
  ClipboardListIcon,
  GlobeLock,
  ShieldEllipsis,
  ShoppingCart,
  UserCircle,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import { cn } from "~/lib/utils";
import { FeatureLinkType, IconNavLinkType, NavLinkType } from "./types";
import { BgSwitch } from "../BgSwitch";
import { Theme, useTheme } from "remix-themes";

const navLinks: NavLinkType[] = [
  { label: "Home", path: "/" },
  { label: "Blog", path: "/blog" },
  { label: "Shop", path: "/shop" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact", isBold: true },
];

const featureLinks: FeatureLinkType[] = [
  {
    label: "Security",
    path: "/security",
    icon: <ShieldEllipsis className="w-6 h-6 text-gray-700" />,
  },
  {
    label: "Api",
    path: "/api",
    icon: <ClipboardListIcon className="w-6 h-6 text-gray-700" />,
  },
  {
    label: "Privacy",
    path: "/privacy",
    icon: <GlobeLock className="w-6 h-6 text-gray-700" />,
  },
];

const iconNavLinks: IconNavLinkType[] = [
  { icon: <UserCircle />, path: "/user" },
  { icon: <ShoppingCart />, path: "/cart" },
];

const NavLink = ({ label, path, isBold = false }: NavLinkType) => (
  <NavigationMenuItem>
    <Link to={path}>
      <NavigationMenuLink
        className={cn(navigationMenuTriggerStyle(), isBold && "font-bold")}
      >
        {label}
      </NavigationMenuLink>
    </Link>
  </NavigationMenuItem>
);

const IconNavLink = ({ icon, path }: IconNavLinkType) => (
  <NavigationMenuItem>
    <Link to={path}>
      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
        {icon}
      </NavigationMenuLink>
    </Link>
  </NavigationMenuItem>
);

const FeatureNavLink = ({ icon, label, path }: FeatureLinkType) => (
  <Link to={path} className="w-full">
    <NavigationMenuLink
      className={cn(
        navigationMenuTriggerStyle(),
        "w-full flex justify-start gap-2"
      )}
    >
      {icon}
      {label}
    </NavigationMenuLink>
  </Link>
);

const FeaturesDropdown = () => (
  <NavigationMenuItem>
    <NavigationMenuTrigger>Features</NavigationMenuTrigger>
    <NavigationMenuContent>
      <div className="w-[200px] flex flex-col px-2 py-1 gap-1">
        {featureLinks.map((link) => (
          <FeatureNavLink key={link.path} {...link} />
        ))}
      </div>
    </NavigationMenuContent>
  </NavigationMenuItem>
);

export const Header = () => {
  const [theme, setTheme] = useTheme();
  return (
    <div className="w-full flex items-center justify-between px-12 py-4">
      <p className="font-bold text-lg">Logo Here</p>
      <NavigationMenu>
        <NavigationMenuList>
          <NavLink key={navLinks[0].path} {...navLinks[0]} />
          <FeaturesDropdown />
          {navLinks.slice(1).map((link) => (
            <NavLink key={link.path} {...link} />
          ))}
          {iconNavLinks.map((link) => (
            <IconNavLink key={link.path} {...link} />
          ))}
          <NavigationMenuItem>
            <BgSwitch
              checked={theme === "dark" ? true : false}
              onCheckedChange={() =>
                theme === "light" ? setTheme(Theme.DARK) : setTheme(Theme.LIGHT)
              }
            />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
