import { Helmet } from 'react-helmet-async';
import ProductList from './ProductList';
import { useQuery } from '@apollo/client';
import MealDropdown from './MealDropdown';
import style from './style.module.scss';
import { PRODUCT_LIST_DATA } from 'Schema/queries/productQueries';

const ProductListView = () => {
  const { loading, data, error, refetch } = useQuery(PRODUCT_LIST_DATA);

  return (
    <>
      <Helmet title={'Product list | Imli'} />
      <section className={style.productListWrapper}>
        <h2 className={style.productListTitle}>Product list</h2>
        <MealDropdown onChange={refetch} data={data?.meals} />
        <ProductList
          data={data?.products}
          isLoading={loading}
          error={error}
          onChange={refetch}
        />
      </section>
    </>
  );
};

export default ProductListView;
