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
      <div className={style.suprise}>
        <h2>{'Welcome back, my love!'}</h2>
        <form>
          <label>Please enter YOUR favourite password</label>
          <input type="text" onInput={(e: SyntheticEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value)} />
        </form>
        {inputValue === '10pyrageliu' && (
          <div className={style.supriseShow}>
            <h3>{'Congratulations'}</h3>
            <img src="https://c.tenor.com/KVosJDEqP_UAAAAC/bo-burnham-inside.gif" alt="" />
            <h3 className={style.supriseShowText}>{'Your surprise is in a Cold bag'}</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
