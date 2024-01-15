import style from "./style.scss";
import SidebarContent from "./SidebarContent";
import SidebarFooter from "./SidebarFooter";
import classnames from "classnames";
import RightArrow from "Images/icons/arrow-right.svg";
import ErrorBoundary from "Components/ErrorHandler/ErrorBoundary";
import useState from "Hooks/useState";

interface State {
  isSidebarShow: boolean;
}

const Sidebar = () => {
  const [state, setState] = useState<State>({ isSidebarShow: false });
  const toggleSiderbar = () =>
    setState({ isSidebarShow: !state.isSidebarShow });

  const sidebarClasses = classnames(style.sidebarWrapper, {
    [style.active]: state.isSidebarShow,
  });

  const siderbarToggleClasses = classnames(style.sidebarToggle, {
    [style.active]: state.isSidebarShow,
  });

  return (
    <aside className={sidebarClasses}>
      <div className={style.siderbar}>
        <ErrorBoundary>
          <SidebarContent onSelect={toggleSiderbar} />
          <SidebarFooter />
          <button className={siderbarToggleClasses} onClick={toggleSiderbar}>
            <RightArrow height="25px" />
          </button>
        </ErrorBoundary>
      </div>
    </aside>
  );
};

export default Sidebar;
