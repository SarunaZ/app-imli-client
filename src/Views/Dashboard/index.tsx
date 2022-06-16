import { AuthenticationProvider } from 'Providers/Authentication/Authentication';
import { SyntheticEvent, useContext, useState } from 'react';
import style from './style.module.scss';

const Dashboard = () => {
  const { username } = useContext(AuthenticationProvider);
  const [inputValue, setInputValue] = useState<string | undefined>(undefined);

  return (
    <>
      <h1 className={style.dashboardTitle}>
        Hello, {username}
      </h1>
    </>
  );
};

export default Dashboard;
