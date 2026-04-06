import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ROUTE_ROOT } from "App/constants";

const NotFoundView = () => (
  <>
    <Helmet title="Not found | Imli" />
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 text-center">
      <h2 className="text-4xl font-bold text-text">404</h2>
      <p className="text-lg text-text-muted">Page not found</p>
      <Link
        to={ROUTE_ROOT}
        className="mt-2 rounded-lg bg-secondary px-6 py-3 text-sm font-bold uppercase text-text-inv transition-colors hover:brightness-110"
      >
        Go home
      </Link>
    </div>
  </>
);

export default NotFoundView;
