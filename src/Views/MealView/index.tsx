import { Helmet } from 'react-helmet-async';
import { SyntheticEvent, useRef } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { MEAL_NAME_MUTATION } from 'Schema/mutations';
import MealList from './MealList';
import IngredientField from './IngredientField';
import { IngredientsInput } from './types';
import style from './style.module.scss';

const ProductListView = () => {
  return (
    <>
      <Helmet title={'Meal list | Imli'} />
      <section className={style.mealListWrapper}>
        <h2 className={style.mealListTitle}>Meal list</h2>
        <MealList />
      </section>
    </>
  );
};

export default ProductListView;
