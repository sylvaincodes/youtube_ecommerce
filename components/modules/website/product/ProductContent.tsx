import { cn } from "@/lib/utils";
import { Product, SubProduct } from "@/types";
import React, { useState } from "react";
import Container from "../../custom/Container";
import ProductInfo from "./ProductInfo";
import ProductPrice from "./ProductPrice";
import ProductStyleOptions from "./ProductStyleOptions";
import ProductQty from "./ProductQty";
import AdditionnalDescription from "./AdditionnalDescription";
import Loading from "../../custom/Loading";

export default function ProductContent({
  className,
  product,
  setImages,
  setActive,
  active,
}: {
  className: string;
  product: Product;
  active: number;
  setImages: (value: string[]) => void;
  setActive: (value: number) => void;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const options = product.subProducts[active].options;
  const [style, setStyle] = useState(product.subProducts[active].style);

  const styles = product.subProducts.map((item: SubProduct) => {
    return item.style;
  });

  const [option, setOption] = useState(
    product.subProducts[active].options[active]
  );

  const [optionActive, setOptionActive] = useState(0);

  const getStock = () => {
    return option.qty - option.sold;
  };

  return (
    <section>
      {loading && <Loading isLoading={loading} />}
      <Container>
        <div className={cn("flex gap-8 flex-wrap justify-between", className)}>
          <div className="flex flex-col flex-1 gap-4 items-start">
            {/* product info  */}
            <ProductInfo product={product} />

            <div className="flex flex-col gap-4 items-start min-w-full">
              <ProductPrice option={option} />

              <ProductStyleOptions
                style={style}
                styles={styles}
                setStyle={setStyle}
                setActive={setActive}
                setOption={setOption}
                setOptionActive={setOptionActive}
                setImages={setImages}
                getStock={getStock}
                option={option}
                options={options}
              />

              <ProductQty
                setLoading={setLoading}
                active={active}
                optionActive={optionActive}
                product={product}
              />
            </div>

            <AdditionnalDescription product={product} active={active} />
          </div>
        </div>
      </Container>
    </section>
  );
}
