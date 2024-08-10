import { Button } from "@/components/ui/button";
import { getDate } from "@/lib/utils";
import { Review } from "@/types";
import { Rating } from "@mui/material";
import { ThumbsUp } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";

export default function ReviewItem({ item }: { item: Review }) {
  const { data: session } = useSession();
  const handleLike = () => {
    if (likeDisabled) {
      setLikes(likes - 1);
    } else {
      setLikes(likes - 1);
    }

    // const data = {
    //   reviewId: item._id,
    //   likeBy: item?.reviewBy?._id,
    //   remove: likeDisabled,
    // };
  };

  const [likes, setLikes] = useState(item.likes.length);

  const likeDisabled = item.likes.find((i: string) => i === session?.user?.id)
    ? true
    : false;

  const loading = false;

  return (
    <article className="p-6 text-base bg-white rounded-lg ">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <div className="inline-flex item-center mr-3 text-sm text-gray-900">
            <Image
              alt="review"
              src={
                item?.reviewBy?.image
                  ? item?.reviewBy?.image
                  : "https://cdn-icons-png.flaticon.com/128/149/149071.png"
              }
              width="40"
              height="40"
              className="mr-2 w-auto rounded-full"
            />
            <div className="flex flex-col">
              <span className="text-black">
                {item.reviewBy?.name ? item.reviewBy?.name : "unknown"}
              </span>
              <div className="flex"> {getDate(item.createdAt)}</div>
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="bg-transparent rounded-full w-24  px-4 py-2 flex gap-4 justify-around"
          disabled={loading}
          onClick={() => handleLike()}
        >
          <ThumbsUp />
          <span>Like</span>
          <span>{likes}</span>
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <p>{item.review} </p>
        <Rating value={item.rating} precision={0.5} readOnly />
      </div>
    </article>
  );
}
