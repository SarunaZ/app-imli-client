import {
  ROUTE_MEAL_PAGE,
  ROUTE_PRODUCT_LIST_PAGE,
  ROUTE_CHORES_PAGE,
} from "App/constants";
import SidebarItem from "./SidebarItem";

const cookingLinkMap = [
  { key: "meal_view", name: "Meal list", pathname: ROUTE_MEAL_PAGE },
  { key: "product_list_view", name: "Product list", pathname: ROUTE_PRODUCT_LIST_PAGE },
];

const choresLinkMap = [
  { key: "chores_view", name: "Chores", pathname: ROUTE_CHORES_PAGE },
];

const itemMap = [
  { title: "Cooking", routes: cookingLinkMap, defaultPath: ROUTE_PRODUCT_LIST_PAGE },
  { title: "Chores", routes: choresLinkMap, defaultPath: ROUTE_CHORES_PAGE },
];

interface Props {
  onSelect: () => void;
}

const SidebarContent = ({ onSelect }: Props) => (
  <nav className="mt-6 flex-1 space-y-1 px-3">
    {itemMap.map((item) => (
      <SidebarItem
        key={item.title}
        title={item.title}
        routes={item.routes}
        defaultPath={item.defaultPath}
        onSelect={onSelect}
      />
    ))}
  </nav>
);

export default SidebarContent;
