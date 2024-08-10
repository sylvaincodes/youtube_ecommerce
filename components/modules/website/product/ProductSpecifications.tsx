import React from "react";
import Container from "../../custom/Container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Detail, Product } from "@/types";
import { Card } from "@/components/ui/card";

export default function ProductSpecifications({
  product,
}: {
  product: Product;
}) {
  return (
    <section className="hidden lg:block my-10">
      <Container>
        <div className="flex flex-col col-span-2">
          <Tabs defaultValue="desc">
            <TabsList className="grid w-fit grid-cols-2">
              <TabsTrigger value="desc">Descriptions</TabsTrigger>
              <TabsTrigger value="spec">Specifications</TabsTrigger>
            </TabsList>
            <TabsContent value="desc">
              <Card className="p-10 tracking-wider txt-sm leading-8 ">
                {product.content}
              </Card>
            </TabsContent>
            <TabsContent value="spec">
              <Card className="p-10 flex flex-col gap-4">
                {product.details.map((item: Detail, idx: number) => (
                  <div key={idx} className="grid grid-cols-2">
                    <span className="w-80 font-bold text-xl capitalize">
                      {item.name}
                    </span>
                    <span className="text-base font-light ">{item.value}</span>
                  </div>
                ))}
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Container>
    </section>
  );
}
