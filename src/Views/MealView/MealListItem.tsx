import React from 'react';
import { useMutation } from '@apollo/client';
import { MEAL_DELETE } from '../../Schema/mutations';
import Box from 'Components/Box';
import style from './style.module.scss';
import { ReactComponent as Delete } from 'Images/icons/delete.svg';

interface Props {
  onDelete: () => void;
  data?: {
    id: string;
    name: string;
    ingredients: {
      name: string
    }[]
  };
}

const MealListItem = ({ data, onDelete }: Props) => {
  const [deleteProductM] = useMutation(MEAL_DELETE);
  const deleteProduct = (id?: string) => {
    if (id) {
      deleteProductM({
        variables: {
          id
        }
      })
        .then(() => onDelete());
    }
  };

  return (
    <React.Fragment key={data?.id}>
      <Box>
        <li className={style.mealListItem}>
          <p className={style.mealListItemTitle}>{data?.name}</p>
          <ol>
          {data?.ingredients.map(ingredient => (
            <li>{ingredient.name}</li>
          ))}
          </ol>
          <button
            type="button"
            className={style.mealListItemButton}
            onClick={() => deleteProduct(data?.id)}
          >
          <Delete />
        </button>
        </li>
      </Box>
    </React.Fragment>
  );
};

export default MealListItem;
