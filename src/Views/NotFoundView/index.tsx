import { Helmet } from 'react-helmet-async';

const NotFoundView = () => (
  <>
    <Helmet title="Not found | Imli" />
    <div className="NotFound">
      <h2>Page not found</h2>
    </div>
  </>
);

export default NotFoundView;
