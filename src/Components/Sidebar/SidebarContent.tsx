import { ROUTE_MEAL_PAGE, ROUTE_PRODUCT_LIST_PAGE } from 'App/constants';
import style from './style.module.scss';
import { ReactComponent as Kitchen } from 'Images/icons/kitchen.svg';
import SidebarItem from './SidebarItem';

const kitchenLinkMap = [
  {
    key: 'meal_view',
    name: 'Meal list',
    pathname: ROUTE_MEAL_PAGE
  },
  {
    key: 'product_list_view',
    name: 'Product list',
    pathname: ROUTE_PRODUCT_LIST_PAGE
  }
];

const itemMap = [
  {
    title: 'Kitchen',
    icon: <Kitchen />
  }
];

const SidebarContent = () => (
    <div className={style.sidebarContent}>
      {itemMap.map(item => (
        <SidebarItem
          key={item.title}
          title={item.title}
          icon={item.icon}
          links={kitchenLinkMap}
        />
      ))}
    </div>
  );

export default SidebarContent;
