import SidebarContent from "./SidebarContent";
import SidebarFooter from "./SidebarFooter";
import ErrorBoundary from "Components/ErrorHandler/ErrorBoundary";
import useState from "Hooks/useState";

interface State {
  isOpen: boolean;
}

const Sidebar = () => {
  const [state, setState] = useState<State>({ isOpen: false });
  const toggle = () => setState({ isOpen: !state.isOpen });
  const close = () => setState({ isOpen: false });

  return (
    <>
      <button
        onClick={toggle}
        className="fixed top-4 left-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white shadow-lg transition-colors hover:bg-primary-light md:hidden"
        aria-label="Toggle menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 transition-transform ${state.isOpen ? "rotate-90" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          {state.isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {state.isOpen && (
        <div
          className="fixed inset-0 z-40 bg-overlay backdrop-blur-sm md:hidden"
          onClick={close}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-primary transition-transform duration-200 ease-in-out md:translate-x-0 ${
          state.isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ErrorBoundary>
          <SidebarContent onSelect={close} />
          <SidebarFooter />
        </ErrorBoundary>
      </aside>
    </>
  );
};

export default Sidebar;
