import { Helmet } from 'react-helmet-async';
import ProductList from './ProductList';
import { useQuery } from '@apollo/client';
import MealDropdown from './MealDropdown';
import style from './style.module.scss';
import { PRODUCT_LIST_DATA } from 'Schema/queries/productQueries';
import { ReactComponent as MealAddIcon } from 'Images/icons/meal.svg';
import { ReactComponent as Cancel } from 'Images/icons/cancel.svg';
import { useState } from 'react';
import ProductCancelModal from './ProductCancelModal';

const ProductListView = () => {
  const [toggleMealModal, setToggleMealModal] = useState(false);
  const [openCancelModal, setCancelModal] = useState(false);
  const { loading, data, error, refetch } =
    useQuery(PRODUCT_LIST_DATA, { errorPolicy: 'all', fetchPolicy: "network-only" });

  const handleModalToggle = () => {
    setToggleMealModal(prev => !prev);
  }

  const handleCancelList = () => {
    setCancelModal(prev => !prev);
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
        <ProductCancelModal
          title={'Complete product list?'}
          isOpen={openCancelModal}
          onClose={handleCancelList}
          onChange={() => {
            refetch();
            setCancelModal(false);
          }}
        />
        <ProductList
          data={data?.products}
          isLoading={loading}
          error={error}
          onChange={refetch}
        />
        <div className={style.productListButtons}>
          <button
            className={style.mealDropdownAddButton}
            onClick={handleModalToggle}
          >
            <MealAddIcon className={style.mealListAddIcon} />
          </button>
          <button
            className={style.cancelList}
            onClick={handleCancelList}
          >
            <Cancel
              width="50px"
              height="50px"
              className={style.cancelListIcon}
            />
          </button>
        </div>
      </section>
    </>
  );
};

export default ProductListView;
