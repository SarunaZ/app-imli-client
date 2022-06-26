import { AuthenticationProvider } from 'Providers/Authentication/Authentication';
import { useContext } from 'react';
import style from './style.module.scss';

const Dashboard = () => {
  const { username } = useContext(AuthenticationProvider);
  return (
    <>
      <h1 className={style.dashboardTitle}>
        Hello, {username}
      </h1>
    </>
  );
};

export default Dashboard;
