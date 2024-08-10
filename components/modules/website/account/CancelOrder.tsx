import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Order } from "@/types";
import axios from "axios";
import { Trash2Icon } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Toast from "../../custom/Toast";
import { useRouter } from "next/navigation";

export default function CancelOrder({ item }: { item: Order }) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleCancelOrder = () => {
    if (loading) {
      return;
    }

    setLoading(true);
    const data = {
      id: item._id,
      user: item.user._id,
    };
    axios
      .put(process.env.NEXT_PUBLIC_API_URL + "/api/account/order", data)
      .then((response) => {
        const data = response.data;
        toast.custom(<Toast message={data.message} status="success" />);
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        router.refresh();
      });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash2Icon className="text-red-800" />
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleCancelOrder}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
