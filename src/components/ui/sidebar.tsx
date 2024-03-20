"use client";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MultilineChartIcon from "@mui/icons-material/MultilineChart";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsPausedIcon from "@mui/icons-material/NotificationsPaused";
import StorageIcon from "@mui/icons-material/Storage";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";


const menuItems = [
  {
    heading: "HOME",
    items: [
      { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
      { text: "Panel", icon: <MultilineChartIcon />, path: "/panel" },
    ],
  },
  {
    heading: "VIEW",
    items: [
      { text: "Search", icon: <SearchIcon />, path: "/search" },
      {
        text: "Notification",
        icon: <NotificationsPausedIcon />,
        path: "/notification",
      },
    ],
  },
  {
    heading: "CONFIGURATION",
    items: [
      { text: "Data partition", icon: <StorageIcon />, path: "/datapartition" },
      { text: "Node graph", icon: <WorkspacesIcon />, path: "/nodegraph" },
      { text: "Import", icon: <ImportExportIcon />, path: "/import" },
    ],
  },
  {
    heading: "MANAGEMENT",
    items: [
      { text: "User", icon: <PersonIcon />, path: "/user" },
    ],
  },
];

const menuItemsDe = [
  {
    heading: "HOME",
    items: [
      { text: "Objectschaubilder", icon: <DashboardIcon />, path: "/dashboard" },
      { text: "Panel", icon: <MultilineChartIcon />, path: "/panel" },
    ],
  },
  {
    heading: "SICHT",
    items: [
      { text: "Suchen", icon: <SearchIcon />, path: "/search" },
      {
        text: "Benachrichtigung",
        icon: <NotificationsPausedIcon />,
        path: "/notification",
      },
    ],
  },
  {
    heading: "AUFBAU",
    items: [
      { text: "Data partition", icon: <StorageIcon />, path: "/datapartition" },
      { text: "Node graph", icon: <WorkspacesIcon />, path: "/nodegraph" },
      { text: "Import", icon: <ImportExportIcon />, path: "/import" },
    ],
  },
  {
    heading: "MANAGEMENT",
    items: [
      { text: "Benutzer", icon: <PersonIcon />, path: "/user" },
    ],
  },
];


const Sidebar = () => {

  const locale = useLocale();

  const { data: session, status }: any = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const roles = session?.user?.roles || [];
  return (

    <div >

      <List className="flex flex-col text-xs h-screen">
        <div className="my-10 flex flex-col items-center">
          <AccountCircleIcon style={{ fontSize: "66px" }} />
          {!session ? (
            <div>no name</div>
          ) : (
            <>
              {" "}
              <div className="text-black dark:text-white"></div>
              <div className="text-sm">
                {session.user?.email}
              </div>
              <div className="text-xs mx-5 w-20 text-center" >{session.user?.role}</div>

            </>
          )}
        </div>
        {
          locale === 'en' ? (menuItems.map((menu, index) => (
            <div key={index}>
              {session?.user?.role.includes('User') || session?.user?.role.includes('DataAdmin') ? (
                menu.heading !== "CONFIGURATION" && (
                  <div
                    className={`ml-7 text-sm ${index === 0 ? "" : "mt-10"}`}
                  >
                    {menu.heading}
                  </div>
                )
              ) : (
                <div className={`ml-7 text-sm ${index === 0 ? "" : "mt-10"}`}>
                  {menu.heading}
                </div>
              )}
              <div>
                {menu.items
                  .filter((item) => {
                    // Filter out items based on user's role
                    if (session) {
                      if (session?.user?.role.includes('admin') || session?.user?.role.includes('SuperAdmin')) {
                        // Include all items for UserAdmin role in German locale
                        return true;
                       } else if (session?.user?.role.includes('User') || session?.user?.role.includes('DataAdmin')) {
                        // Exclude items based on user's role
                        return (
                          item.path !== "/datapartition" &&
                          item.path !== "/nodegraph" &&
                          item.path !== "/import"
                        );
                      }
                    }
                    return true; // Include all other items
                  })
                  .map((item, itemIndex) => (
                    <ListItem
                      key={itemIndex}
                      className={`cursor-pointer mt-2 hover:bg-slate-200 hover:dark:bg-slate-700 transition duration-300  rounded ${pathname === item.path
                          ? "bg-gray-200 dark:bg-slate-700 text-black dark:text-white  rounded"
                          : " dark:text-white text-black "
                        }`}
                      onClick={() => router.push(item.path)}
                    >
                      <div className="ml-10 flex items-center">
                        <span className="mr-2"> {item.icon}</span>
                        <div style={{ whiteSpace: 'nowrap' }}>{item.text}</div>
                      </div>
                    </ListItem>
                  ))}
              </div>
            </div>
          ))) : (menuItemsDe.map((menu, index) => (
            <div key={index}>
              {session?.user?.roles === "User" ? (
                menu.heading !== "AUFBAU" && (
                  <div
                    className={`ml-7 text-sm ${index === 0 ? "" : "mt-10"}`}
                  >
                    {menu.heading}
                  </div>
                )
              ) : (
                <div className={`ml-7 text-sm ${index === 0 ? "" : "mt-10"}`}>
                  {menu.heading}
                </div>
              )}
              <div>
                {menu.items
                  .filter((item) => {
                    // Filter out items based on user's role
                    if (session) {
                      if (session?.user?.role.includes('UserAdmin') || session?.user?.role.includes('SuperAdmin')) {
                        // Include all items for UserAdmin role in German locale
                        return true;
                       } else if (session?.user?.role.includes('User') || session?.user?.role.includes('DataAdmin')) {
                        // Exclude items based on user's role
                        return (
                          item.path !== "/datapartition" &&
                          item.path !== "/nodegraph" &&
                          item.path !== "/import"
                        );
                      }
                    }
                    return true; // Include all other items
                  })
                  .map((item, itemIndex) => (
                    <ListItem
                      key={itemIndex}
                      className={`cursor-pointer mt-2 hover:bg-slate-200 hover:dark:bg-slate-700 transition duration-300  rounded ${pathname === item.path
                          ? "bg-gray-200 dark:bg-slate-700 text-black dark:text-white  rounded"
                          : " dark:text-white text-black "
                        }`}
                      onClick={() => router.push(item.path)}
                    >
                      <div className="ml-10 flex items-center">
                        <span className="mr-2"> {item.icon}</span>
                        <div style={{ whiteSpace: 'nowrap' }}>{item.text}</div>
                      </div>
                    </ListItem>
                  ))}
              </div>
            </div>
          )))}


        <ListItem
          className={`cursor-pointer  mt-2 hover:bg-slate-200 hover:dark:bg-slate-700 transition duration-300 rounded ${pathname === "/"
              ? "bg-white dark:bg-black text-black dark:text-white rounded"
              : "dark:text-white text-black"
            }`}
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <div className="ml-10 flex items-center">
            <span className="mr-2">
              <LogoutIcon />
            </span>
            <div style={{ whiteSpace: 'nowrap' }}>Logout</div>
          </div>

        </ListItem>

      </List> </div>
  )
}

export default Sidebar