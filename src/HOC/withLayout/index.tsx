import React, { ReactNode } from "react";
import ErrorBoundary from "Components/ErrorHandler/ErrorBoundary";
import Loader from "Components/Loader";
import Sidebar from "Components/Sidebar";
import { Suspense } from "react";
import style from "./style.scss";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <ErrorBoundary>
        <Sidebar />
      </ErrorBoundary>
      <ErrorBoundary>
        <main className={style.mainContent}>
          <Suspense fallback={<Loader />}>{children}</Suspense>
        </main>
      </ErrorBoundary>
    </>
  );
};

export default Layout;