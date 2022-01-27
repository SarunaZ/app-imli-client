import { useMutation } from '@apollo/client';
import Box from 'Components/Box';
import style from './style.module.scss';
import DeleteButton from 'Components/DeleteButton';
import { MEAL_DELETE } from 'Schema/mutations/mealMutations';

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
  const [deleteProductM, deleteProductMData] = useMutation(MEAL_DELETE);
  const deleteProduct = (id?: string) => {
    if (id) {
      deleteProductM({
        variables: {
          id
        },
        update: () => onDelete()
      })
    }
  };

  return (
    <Box>
      <li className={style.mealListItem}>
        <div className={style.mealListItemHeader}>
          <p className={style.mealListItemTitle}>{data?.name}</p>
          <DeleteButton
            onClick={() => deleteProduct(data?.id)}
            isLoading={deleteProductMData.loading}
          />
        </div>
        <ol className={style.mealListItemIngredients}>
          {data?.ingredients.map(ingredient => (
            <li
              key={data?.id + ingredient.name}
              className={style.mealListItemIngredientsItem}
            >
              {ingredient.name}
            </li>
          ))}
        </ol>
      </li>
    </Box>
  );
};

export default MealListItem;
