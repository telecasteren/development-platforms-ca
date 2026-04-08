import { useState } from "react";
import { NavLink, useFetcher } from "react-router";
import { items } from "./items";
import type { SidebarGroup, SidebarItem } from "./types";

const isGroupItem = (item: SidebarItem): item is SidebarGroup =>
  item.kind === "group";

const Sidebar = () => {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const logoutFetcher = useFetcher();

  const toggleGroup = (groupId: string) => {
    setOpenGroups((previous) => ({
      ...previous,
      [groupId]: !previous[groupId],
    }));
  };

  return (
    <div>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-md sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        onClick={() => setSidebarOpen((open) => !open)}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidenav"
      >
        {sidebarOpen && (
          <button
            type="button"
            className="absolute top-2 right-2 sm:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        <div className="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-950 dark:border-gray-700">
          {items.map((section) => (
            <ul key={section.id} className={section.className}>
              {section.items.map((item) => (
                <li key={item.id}>
                  {isGroupItem(item) ? (
                    <>
                      <button
                        type="button"
                        className="flex items-center p-2 w-full text-base font-normal rounded-md group text-gray-900 bg-white dark:text-white dark:bg-gray-950 hover:bg-gray-100 dark:hover:text-gray-900 dark:hover:bg-amber-400 transition duration-200"
                        aria-controls={item.submenuId}
                        aria-expanded={Boolean(openGroups[item.id])}
                        onClick={() => toggleGroup(item.id)}
                      >
                        <span className="shrink-0 text-gray-900 dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-900 transition duration-200">
                          {item.icon}
                        </span>
                        <span className="flex-1 ml-3 text-left whitespace-nowrap">
                          {item.label}
                        </span>
                        <svg
                          aria-hidden="true"
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                      <ul
                        id={item.submenuId}
                        className={`py-2 space-y-2 ${
                          openGroups[item.id] ? "block" : "hidden"
                        }`}
                      >
                        {item.children.map((child) => (
                          <li key={child.id}>
                            {child.id === "logout" ? (
                              <button
                                type="button"
                                onClick={() =>
                                  logoutFetcher.submit(null, {
                                    method: "post",
                                    action: "/auth/logout",
                                  })
                                }
                                className="flex items-center p-2 pl-11 w-full text-base font-normal rounded-sm group text-gray-900 bg-white dark:text-white dark:bg-gray-950 hover:bg-gray-100 dark:hover:text-gray-900 dark:hover:bg-amber-400 transition duration-200"
                              >
                                {child.label}
                              </button>
                            ) : (
                              <NavLink
                                to={child.to}
                                className="flex items-center p-2 pl-11 w-full text-base font-normal rounded-sm group text-gray-900 bg-white dark:text-white dark:bg-gray-950 hover:bg-gray-100 dark:hover:text-gray-900 dark:hover:bg-amber-400 transition duration-200"
                              >
                                {child.label}
                              </NavLink>
                            )}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        [
                          "flex items-center p-2 text-base font-normal rounded-sm group",
                          isActive
                            ? "text-gray-900 bg-gray-100 dark:text-gray-900 dark:bg-amber-400 transition duration-200"
                            : "text-gray-900 bg-white dark:text-white dark:bg-gray-950 transition duration-200 hover:bg-gray-100 dark:hover:text-gray-900 dark:hover:bg-amber-400",
                        ].join(" ")
                      }
                      {...(item.id === "docs"
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {({ isActive }) => (
                        <>
                          <span
                            className={
                              isActive
                                ? "shrink-0 text-gray-900 bg-gray-100 dark:text-gray-900 dark:bg-amber-400 transition duration-200"
                                : "shrink-0 text-gray-900 dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-900 transition duration-200"
                            }
                          >
                            {item.icon}
                          </span>
                          <span
                            className={
                              item.badge
                                ? "flex-1 ml-3 whitespace-nowrap"
                                : "ml-3"
                            }
                          >
                            {item.label}
                          </span>
                          {item.badge ? (
                            <span className="inline-flex justify-center items-center w-5 h-5 text-xs font-semibold rounded-full text-primary-800 bg-primary-100 dark:bg-primary-200 dark:text-primary-800">
                              {item.badge}
                            </span>
                          ) : null}
                        </>
                      )}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          ))}
        </div>

        {/* Bottom section */}
        <div className="hidden absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex bg-white dark:bg-gray-950 z-20 border-r border-gray-200 dark:border-gray-700">
          <a
            href="#"
            className="inline-flex justify-center rounded p-2 cursor-pointer text-gray-900 bg-white dark:text-white dark:bg-gray-950 hover:bg-gray-100 dark:hover:text-gray-900 dark:hover:bg-amber-400 transition duration-200"
          >
            <svg
              aria-hidden="true"
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path>
            </svg>
          </a>
          <a
            href="#"
            data-tooltip-target="tooltip-settings"
            className="inline-flex justify-center rounded p-2 cursor-pointer text-gray-900 bg-white dark:text-white dark:bg-gray-950 hover:bg-gray-100 dark:hover:text-gray-900 dark:hover:bg-amber-400 transition duration-200"
          >
            <svg
              aria-hidden="true"
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
          <div
            id="tooltip-settings"
            role="tooltip"
            className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-md shadow-sm opacity-0 transition-opacity duration-300 tooltip"
          >
            Settings page
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
