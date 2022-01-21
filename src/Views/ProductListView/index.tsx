import { Helmet } from 'react-helmet-async';
import {SyntheticEvent, useRef, useState} from "react";
import ProductList from "./ProductList";
import {useMutation, useQuery} from "@apollo/client";
import {PRODUCT_LIST_DATA} from "Schema/queries";
import {MEAL_ATTACH_TO_PRODUCT_MUTATION, PRODUCT_NAME_MUTATION} from "Schema/mutations";
import MealDropdown from './MealDropdown';
import { IngredientsInput } from 'Views/MealView/types';
import style from './style.module.scss';
import Button from 'Components/Button';

const ProductListView = () => {
  const productInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { loading, data, refetch } = useQuery(PRODUCT_LIST_DATA);  
  const [addProductQ, productQData] = useMutation(PRODUCT_NAME_MUTATION);
  const [attachMealToProductM, attachMealToProductMData] 
    = useMutation(MEAL_ATTACH_TO_PRODUCT_MUTATION);
  
  const submitProduct = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    addProductQ({
      variables: {
        name: productInputRef.current?.value
      },
    })
    .then(() =>{
      formRef.current?.reset();
      refetch()
    });
  }

  const handleMealChange = (data?: IngredientsInput[]) => {
    const normalizeData = data?.map(item => {
      return {
        name: item.name
      }
    });

    attachMealToProductM({
      variables: {
        ingredients: normalizeData
      },
    })
    .then(() => refetch());
  }

  return (
    <>
      <Helmet title={'Product list | Imli'} />
      <section className={style.productListWrapper}>
        <h2 className={style.productListTitle}>Product list</h2>
        <MealDropdown onChange={handleMealChange} data={data?.meals} />
        <ProductList
          onReorder={refetch}
          onDelete={refetch}
          data={data?.products}
          isLoading={loading}
        />
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
          <Button
            type="submit"
            isLoading={productQData.loading}
          >
            <span>Add</span>
          </Button>
        </form>
      </section>
    </>
  );
}

export default ProductListView;