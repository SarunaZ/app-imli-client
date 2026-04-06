import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Routes } from "./types";
import { getSanitizedPathname, isSamePathNameInRoutes } from "./utils";

interface Props {
  title: string;
  routes: Routes[];
  defaultPath: string;
  onSelect: () => void;
}

const SidebarItem = ({ title, routes = [], defaultPath, onSelect }: Props) => {
  const navigate = useNavigate();
  const isSameRoute = isSamePathNameInRoutes(
    routes,
    getSanitizedPathname(useLocation().pathname),
  );
  const [isExpanded, setIsExpanded] = useState(isSameRoute);

  const handleToggle = () => {
    navigate(defaultPath);
    setIsExpanded((prev) => !prev);
    onSelect();
  };

  return (
    <div className="mb-1">
      <button
        onClick={handleToggle}
        className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
      >
        <span>{title}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="mt-0.5 space-y-0.5 pl-3">
          {routes.map((route) => (
            <NavLink
              key={route.name}
              to={route.pathname}
              onClick={onSelect}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-primary-light font-semibold text-white"
                    : "text-white/70 hover:bg-primary-light hover:text-white"
                }`
              }
            >
              {route.name}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
