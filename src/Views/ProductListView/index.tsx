import { Helmet } from 'react-helmet-async';
import ProductList from './ProductList';
import { useQuery } from '@apollo/client';
import MealDropdown from './MealDropdown';
import style from './style.module.scss';
import { PRODUCT_LIST_DATA } from 'Schema/queries/productQueries';
import { ReactComponent as MealAddIcon } from 'Images/icons/meal.svg';
import { useState } from 'react';

const ProductListView = () => {
  const [toggleMealModal, setToggleMealModal] = useState(false);
  const { loading, data, error, refetch } =
    useQuery(PRODUCT_LIST_DATA, { errorPolicy: 'all' });

  const handleModalToggle = () => {
    setToggleMealModal(prev => !prev);
  }

  return (
    <>
      <Helmet title={'Product list | Imli'} />
      <section className={style.productListWrapper}>
        <h2 className={style.productListTitle}>Product list</h2>
        <MealDropdown
          title={'Please select meal'}
          isOpen={toggleMealModal}
          onClose={handleModalToggle}
          onChange={refetch}
          data={data?.meals}
        />
        <ProductList
          data={data?.products}
          isLoading={loading}
          error={error}
          onChange={refetch}
        />
        <button
          className={style.mealDropdownAddButton}
          onClick={handleModalToggle}
        >
          <MealAddIcon className={style.mealListAddIcon} />
        </button>
      </section>
    </>
  );
};

export default ProductListView;
