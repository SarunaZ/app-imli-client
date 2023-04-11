import React from 'react';
import { ROUTE_MEAL_PAGE, ROUTE_PRODUCT_LIST_PAGE } from 'App/constants';
import style from './style.scss';
import Kitchen from 'Images/icons/kitchen.svg';
import SidebarItem from './SidebarItem';

const kitchenLinkMap = [
  {
    key: 'meal_view',
    name: 'Meal list',
    pathname: ROUTE_MEAL_PAGE,
  },
  {
    key: 'product_list_view',
    name: 'Product list',
    pathname: ROUTE_PRODUCT_LIST_PAGE,
  }
];

const itemMap = [
  {
    title: 'Kitchen',
    icon: <Kitchen />,
    routes: kitchenLinkMap,
    defaultPath: ROUTE_PRODUCT_LIST_PAGE
  },
];

const SidebarContent = () => (
  <div className={style.sidebarContent}>
    {itemMap.map(item => (
      <SidebarItem
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
