"use client";
import { cn } from "@/lib/utils";
import { Product } from "@/types";
import React, { useEffect, useState } from "react";
import Container from "../../custom/Container";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

import { m } from "framer-motion";
import Loading from "../../custom/Loading";

export default function ProductImage({
  className,
  product,
  images,
  active,
}: {
  className: string;
  product: Product;
  images: string[];
  active: number;
}) {
  const [loading, setLoading] = useState(false);
  const [changeImage, setChangeImage] = useState(images[active]);

  useEffect(() => {
    setLoading(false);
    setChangeImage(images[active]);
  }, [product, images, active]);

  return (
    <section>
      <Container>

        { loading && <Loading isLoading={loading} /> }
        <div className={cn("flex flex-col gap-y-6", className)}>
          <div className="border py-10 border-slate-200 grid place-content-center h-[320px] p-2">
            <Zoom>
              <m.img
                src={changeImage}
                alt="image"
                width="400"
                height="400"
                className="object-contain cursor-pointer !max-h-[400px] w-[500px]"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              />
            </Zoom>
          </div>

          <div className="flex items-center justify-center gap-4 mt-10">
            {images.map((item: string, idx: number) => (
              <div
                onClick={() => setChangeImage(item)}
                key={idx}
                className="grid border-2 w-full border-slate-100 place-content-center cursor-pointer hover:border-primary-400 h-14"
                style={{
                  backgroundImage: `url(${item})`,
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
