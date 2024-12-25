import { LayoutDashboard, FileText, Users } from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: any;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/",
          label: "Dashboard",
          active: pathname === "/admin",
          icon: LayoutDashboard,
          submenus: [],
        },
      ],
    },

    {
      groupLabel: "",
      menus: [
        {
          href: "/orders",
          label: "Tax Return Orders",
          active: pathname.includes("/orders"),
          icon: FileText,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "/users",
          label: "Users",
          active: pathname.includes("/users"),
          icon: Users,
          submenus: [],
        },
      ],
    },
  ];
}
