import { Address } from "@/types";
import axios from "axios";
import { Trash2Icon } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Toast from "../../custom/Toast";
import { useRouter } from "next/navigation";
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
import { useSession } from "next-auth/react";
import Loading from "../../custom/Loading";

export default function ModalDeleteAddress({ item }: { item: Address }) {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const router = useRouter();

  const handleCancelAddress = async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    const data = {
      user_id: session?.user?.id,
      newAddress: item,
    };
    await axios
      .delete(process.env.NEXT_PUBLIC_API_URL + "/api/account/address", {
        data,
      })
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
    <>
      {loading && <Loading isLoading={loading} />}
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
            <AlertDialogAction onClick={handleCancelAddress}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
