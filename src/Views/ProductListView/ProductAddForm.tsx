import { ElementRef, SyntheticEvent, useRef } from "react";
import ErrorHandler from "Components/ErrorHandler";
import { PRODUCT_NAME_MUTATION } from "Schema/mutations/product.mutations";
import { Product } from "Schema/types";
import useMutation from "Hooks/useMutation";
import Loader from "Components/Loader";

interface Props {
  onChange: (productItem: Product) => void;
}

const ProductAddForm = ({ onChange }: Props) => {
  const formRef = useRef<ElementRef<"form">>(null);
  const [addProductQ, productQData] = useMutation(PRODUCT_NAME_MUTATION);

  const submitProduct = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);

    addProductQ({
      variables: { name: formData.get("productName") as string },
      update: (_, res) => {
        const newItem = {
          name: res?.data.createProduct.name,
          isDone: res?.data.createProduct.isDone,
          id: res.data.createProduct.id,
        };
        formRef.current?.reset();
        onChange(newItem);
      },
    });
  };

  return (
    <form ref={formRef} onSubmit={submitProduct} className="shrink-0 flex flex-col">
      <label className="mb-2 text-base font-medium text-text" htmlFor="productName">
        Product
      </label>
      <div className="relative">
        <input
          required
          className="w-full rounded-lg border-2 border-text bg-surface-alt px-4 py-3 pr-10 text-base text-text focus:border-secondary focus:ring-2 focus:ring-secondary/30 focus:outline-none"
          name="productName"
          type="text"
        />
        {productQData.loading && (
          <div className="absolute right-2.5 top-3.5">
            <Loader />
          </div>
        )}
      </div>
      <ErrorHandler error={productQData.error} />
    </form>
  );
};

export default ProductAddForm;
