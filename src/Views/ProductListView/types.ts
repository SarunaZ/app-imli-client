import { ComponentProps } from "react";
import { ProductListQuery } from "Schema/types";
import ErrorHandler from "Components/ErrorHandler";

export type ProductListData = ProductListQuery["products"];
export type ProductError = ComponentProps<typeof ErrorHandler>["error"];
