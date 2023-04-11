import React from 'react';
import { Helmet } from 'react-helmet-async';
import style from './style.scss';

const NotFoundView = () => (
  <>
    <Helmet title="Not found | Imli" />
    <div className={style.notFound}>
      <h2>Page not found</h2>
    </div>
  </>
);

export default NotFoundView;
