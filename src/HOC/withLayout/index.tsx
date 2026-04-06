import { ReactNode, Suspense } from "react";
import ErrorBoundary from "Components/ErrorHandler/ErrorBoundary";
import Loader from "Components/Loader";
import Sidebar from "Components/Sidebar";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => (
  <>
    <ErrorBoundary>
      <Sidebar />
    </ErrorBoundary>
    <main className="min-h-dvh px-4 pt-14 pb-6 md:pt-4 md:pl-68 md:pr-6">
      <Suspense fallback={<Loader />}>
        <ErrorBoundary>{children}</ErrorBoundary>
      </Suspense>
    </main>
  </>
);

export default Layout;
