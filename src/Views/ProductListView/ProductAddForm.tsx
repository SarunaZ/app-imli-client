import { useMutation } from '@apollo/client';
import style from './style.module.scss';
import { SyntheticEvent, useRef } from 'react';
import Button from 'Components/Button';
import ErrorHandler from 'Components/ErrorHandler';
import { PRODUCT_NAME_MUTATION } from 'Schema/mutations/productMutations';

interface Props {
  onChange: () => void;
}

const ProductAddForm = ({ onChange }: Props) => {
  const productInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [addProductQ, productQData] =
    useMutation(PRODUCT_NAME_MUTATION, { errorPolicy: 'all' });

  const submitProduct = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    addProductQ({
      variables: {
        name: productInputRef.current?.value
      },
      update: () => {
        formRef.current?.reset();
        onChange();
      }
    })
  };

  return (
    <form
      ref={formRef}
      onSubmit={submitProduct}
      className={style.inputForm}
    >
      <label
        className={style.formLabel}
        htmlFor="productName"
      >
        Product
      </label>
      <input
        required
        className={style.formInput}
        ref={productInputRef}
        name="productName"
        type="text"
      />
      <ErrorHandler error={productQData.error} />
      <Button
        type="submit"
        isLoading={productQData.loading}
      >
        <span>Add</span>
      </Button>
    </form>
  );
};

export default ProductAddForm;
