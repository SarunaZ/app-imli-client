import React from "react";
import {
  ROUTE_MEAL_PAGE,
  ROUTE_PRODUCT_LIST_PAGE,
  ROUTE_CHORES_PAGE,
} from "App/constants";
import style from "./style.scss";
import Kitchen from "Images/icons/kitchen.svg";
import SidebarItem from "./SidebarItem";

const cookingLinkMap = [
  {
    key: "meal_view",
    name: "Meal list",
    pathname: ROUTE_MEAL_PAGE,
  },
  {
    key: "product_list_view",
    name: "Product list",
    pathname: ROUTE_PRODUCT_LIST_PAGE,
  },
];

const choresLinkMap = [
  {
    key: "chores_view",
    name: "Chores",
    pathname: ROUTE_CHORES_PAGE,
  },
];

const itemMap = [
  {
    title: "Cooking",
    icon: <Kitchen />,
    routes: cookingLinkMap,
    defaultPath: ROUTE_PRODUCT_LIST_PAGE,
  },
  {
    title: "Chores",
    icon: <Kitchen />,
    routes: choresLinkMap,
    defaultPath: ROUTE_CHORES_PAGE,
  },
];

interface Props {
  onSelect: () => void;
}

const SidebarContent = ({ onSelect }: Props) => (
  <div className={style.sidebarContent}>
    {itemMap.map((item) => (
      <SidebarItem
        onSelect={onSelect}
        key={item.title}
        title={item.title}
        icon={item.icon}
        routes={item.routes}
        defaultPath={item.defaultPath}
      />
    ))}
  </div>
);

export default SidebarContent;
