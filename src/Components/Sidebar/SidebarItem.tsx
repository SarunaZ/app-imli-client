import { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './style.module.scss';

interface Links {
  name: string;
  pathname: string,
}

interface Props {
  title: string;
  icon: React.ReactNode,
  links: Links[]
}

const SidebarItem = ({ icon, title, links = [] }: Props) => {
  const [isShowItems, setShowItems] = useState<boolean>(false);
  const handleToggle = () => {
    setShowItems(prevValue => !prevValue);
  }

  return (
    <div className={style.sidebarItem}>
      <div 
        className={style.sidebarItemTitle}
      >
        <h3>{title}</h3>
        <button onClick={handleToggle} className={style.sidebarItemToggle}>
          {icon}
        </button>
      </div>
      {isShowItems && (
        <div className={style.sidebarLinkList}>
          {links.map((link) => (
            <Link 
              key={link.name}
              to={link.pathname}
              className={style.sidebarLink}
              >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default SidebarItem;