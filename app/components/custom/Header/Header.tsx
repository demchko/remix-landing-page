import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { BgSwitch } from "../BgSwitch";
import { Theme, useTheme } from "remix-themes";
import { CircleDollarSign } from "lucide-react";

export const Header = () => {
  const [theme, setTheme] = useTheme();

  return (
    <div className="w-full bg-gray-200 p-3 rounded-lg flex items-center justify-between">
      <div className="flex items-center gap-2">
        <CircleDollarSign className="text-purple-600 animate-spin duration-1000" />
        <p className="text-purple-600 font-semibold ">Currency</p>
      </div>
      <Tabs defaultValue="dashboard" className="w-[400px]">
        <TabsList className="">
          <TabsTrigger value="dashboard">Dasboard</TabsTrigger>
          <TabsTrigger value="courses" disabled>
            Courses
          </TabsTrigger>
          <TabsTrigger value="scedule" disabled>
            Schedule
          </TabsTrigger>
          <TabsTrigger value="support" disabled>
            Support
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <BgSwitch
        checked={theme === "dark" ? true : false}
        onCheckedChange={() =>
          theme === "light" ? setTheme(Theme.DARK) : setTheme(Theme.LIGHT)
        }
      />
    </div>
  );
};
