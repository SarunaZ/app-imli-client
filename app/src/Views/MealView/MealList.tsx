import React from 'react';
import Loader from 'Components/Loader';
import { useQuery } from '@apollo/client';
import style from './style.scss';
import MealListItem from './MealListItem';
import AddMealModal from './AddMealModal';
import Add from 'Images/icons/add.svg';
import { useState } from 'react';
import ErrorHandler from 'Components/ErrorHandler';
import { MEAL_LIST_DATA } from 'Schema/queries/mealQueries';

interface Meal {
  id: string;
  name: string;
  ingredients: {
    name: string
  }[]
}

const MealList = () => {
  const { loading, error, data, refetch }
    = useQuery(MEAL_LIST_DATA, { errorPolicy: 'all' });
  const [isShowAddModal, setShowAddModal] = useState<boolean>(false);

  if (loading) {
    return <Loader />;
  }


  const toggleAddModal = () => {
    setShowAddModal(prev => !prev);
  }

  return (
    <>
      {!loading && (!data?.meals || !data?.meals?.length) && (
        <p>No data found</p>
      )}
      <ul className={style.mealList}>
        {data?.meals?.map((meal: Meal, index: number) => (
          <MealListItem
            data={meal}
            onDelete={refetch}
            key={meal.id}
          />
        ))}
      </ul>
      <ErrorHandler error={error} />
      <AddMealModal
        onClose={toggleAddModal}
        isOpen={isShowAddModal}
        title="Add new meals"
        onChange={refetch}
      />
      <button
        className={style.mealListAddButton}
        onClick={toggleAddModal}
      >
        <Add className={style.mealListAddIcon} />
      </button>
    </>
  );
};

export default MealList;
