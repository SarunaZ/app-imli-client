import { AuthenticationProvider } from "Providers/Authentication/Authentication";
import { useContext } from "react";

const Logout = () => {
  const { logout } = useContext(AuthenticationProvider);

  return (
    <button
      onClick={logout}
      className="rounded-lg px-3 py-2 text-sm font-semibold text-white/70 transition-colors hover:bg-primary-light hover:text-white"
    >
      Logout
    </button>
  );
};

export default Logout;
