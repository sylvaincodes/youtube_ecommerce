import { Option, Review, SubProduct } from "./../types/index";
import { Product } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Get the discount from an option of a  product */
export const discountPrice = (price: number, discount: number): number => {
  let final_price: number = 0;
  final_price = (price * (100 * discount)) / 100;

  return parseInt(final_price.toFixed(2));
};

/** Get the best low price from a list of number of option for a product with considering its discount */
export const getBestPriceWithDiscountFromProduct = (
  product: Product
): number => {
  const data = product.subProducts.map((subProduct: SubProduct) => {
    return subProduct.options.map((options: Option) => {
      return options.discount
        ? discountPrice(options.price, options.discount)
        : options.price;
    });
  });

  const sort = data.map((item: Array<number>) => {
    return item.sort((a: number, b: number) => {
      return a - b;
    });
  });

  const finalSort = sort
    .map((item: Array<number>) => {
      return item[0];
    })
    .sort((a: number, b: number) => {
      return a - b;
    })[0];

  return finalSort;
};

/** Get the best low price from a list of number of option for a product without considering its discount */
export const getBestPriceWithoutDiscountFromProduct = (
  product: Product
): number => {
  const data = product.subProducts.map((subProduct: SubProduct) => {
    return subProduct.options.map((options: Option) => {
      return options.price;
    });
  });

  const sort = data.map((item: Array<number>) => {
    return item.sort((a: number, b: number) => {
      return a - b;
    });
  });

  const finalSort = sort
    .map((item: Array<number>) => {
      return item[0];
    })
    .sort((a: number, b: number) => {
      return a - b;
    })[0];

  return finalSort;
};

export const getDiscountRate = (
  price: number,
  discountPrice: number
): number => {
  const d = (price - discountPrice) * (100 / price);
  return parseFloat(d.toFixed(2));
};

export const getRating = (product: Product) => {
  const ratingTotal = product.reviews.reduce(
    (acc: number, value: Review) => acc + value?.rating,
    0
  );

  const rating = ratingTotal / product.reviews.length;

  return rating;
};

export const getDate = (date: Date) => {
  const newDate = new Date(date).toDateString();

  return newDate;
};
