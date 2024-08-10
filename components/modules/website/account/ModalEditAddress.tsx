import { Address } from "@/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import Toast from "../../custom/Toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit, Send } from "lucide-react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Loading from "../../custom/Loading";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function ModalEditAddress({
  item,
  openModal,
  setOpenModal,
}: {
  item: Address;
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}) {
  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);

  const initialValues = {
    _id: item._id,
    firstName: item.firstName,
    lastName: item.lastName,
    city: item.city,
    country: item.country,
    zipCode: item.zipCode,
    address: item.address,
    phoneNumber: item.phoneNumber,
    state: item.state,
  };

  const validate = Yup.object({
    firstName: Yup.string().required().min(3).max(60),
    lastName: Yup.string().required().min(3).max(60),
    city: Yup.string().required().min(3).max(60),
    zipCode: Yup.string().required().min(3).max(60),
    country: Yup.string().required().min(3).max(60),
    address: Yup.string().required().min(3).max(60),
    state: Yup.string().required().min(3).max(60),
    phoneNumber: Yup.string().required().min(3).max(60),
  });
  const router = useRouter();

  const handleEdit = (values: Address) => {
    if (loading) {
      return;
    }

    setLoading(true);
    const data = {
      user_id: session?.user?.id,
      newAddress: values,
    };
    axios
      .put(process.env.NEXT_PUBLIC_API_URL + "/api/account/address", data)
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
    <Dialog>
      <DialogTrigger asChild>
        <Edit
          className="cursor-pointer"
          onClick={() => setOpenModal(!openModal)}
        />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update address</DialogTitle>
          <DialogDescription>Complete the forms and submit.</DialogDescription>
        </DialogHeader>

        <div>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validate}
            onSubmit={async (values) => {
              handleEdit(values);
            }}
          >
            {({
              errors,

              /* and other goodies */
            }) => (
              <Form className="w-full">
                {loading && <Loading isLoading={loading} />}
                <input type="hidden" name="_id" value={initialValues._id} />

                <div className="flex w-full gap-4 flex-wrap mb-4 ">
                  <div className="flex flex-col gap-4 sm:w-[320px] grow">
                    <label htmlFor="name">first Name</label>
                    <Field
                      type="text"
                      name="firstName"
                      className={cn(
                        "border border-black px-4 text-black py-2 rounded-",
                        errors.firstName && "border border-red-300"
                      )}
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="py-2 font-bold text-red-900"
                    />
                  </div>

                  <div className="flex flex-col gap-4 sm:w-[320px] grow">
                    <label htmlFor="lastName">Last name</label>
                    <Field
                      type="text"
                      name="lastName"
                      className={cn(
                        "border border-black px-4 text-black py-2 rounded-",
                        errors.lastName && "border border-red-300"
                      )}
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="py-2 font-bold text-red-900"
                    />
                  </div>
                </div>

                <div className="flex w-full gap-4 flex-wrap mb-4">
                  <div className="flex flex-col gap-4 sm:w-[320px] grow">
                    <label htmlFor="city">city</label>
                    <Field
                      type="text"
                      name="city"
                      className={cn(
                        "w-full border border-black px-4 py-2 text-black ",
                        errors.city && "border border-red-300"
                      )}
                    />
                    <ErrorMessage
                      name="city"
                      component="div"
                      className="py-2 font-bold text-red-900"
                    />
                  </div>

                  <div className="flex flex-col gap-4 sm:w-[320px] grow">
                    <label htmlFor="country">Country</label>
                    <Field
                      type="text"
                      name="country"
                      className={cn(
                        "w-full border border-black px-4 py-2 text-black ",
                        errors.country && "border border-red-300"
                      )}
                    />
                    <ErrorMessage
                      name="country"
                      component="div"
                      className="py-2 font-bold text-red-900"
                    />
                  </div>
                </div>

                <div className="flex w-full gap-4 flex-wrap mb-4">
                  <div className="flex flex-col gap-4 sm:w-[320px] grow">
                    <label htmlFor="city">zipCode</label>
                    <Field
                      type="text"
                      name="zipCode"
                      className={cn(
                        "w-full border border-black px-4 py-2 text-black ",
                        errors.zipCode && "border border-red-300"
                      )}
                    />
                    <ErrorMessage
                      name="zipCode"
                      component="div"
                      className="py-2 font-bold text-red-900"
                    />
                  </div>

                  <div className="flex flex-col gap-4 sm:w-[320px] grow">
                    <label htmlFor="address">Address</label>
                    <Field
                      type="text"
                      name="address"
                      className={cn(
                        "w-full border border-black px-4 py-2 text-black ",
                        errors.address && "border border-red-300"
                      )}
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="py-2 font-bold text-red-900"
                    />
                  </div>
                </div>

                <div className="flex w-full gap-4 flex-wrap mb-4">
                  <div className="flex flex-col gap-4 sm:w-[320px] grow">
                    <label htmlFor="address">State</label>
                    <Field
                      type="text"
                      name="state"
                      className={cn(
                        "w-full border border-black px-4 py-2 text-black ",
                        errors.state && "border border-red-300"
                      )}
                    />
                    <ErrorMessage
                      name="state"
                      component="div"
                      className="py-2 font-bold text-red-900"
                    />
                  </div>
                </div>

                <div className="flex sm:w-full">
                  <Button
                    disabled={loading}
                    type="submit"
                    variant="primary"
                    className="w-full inline-flex gap-4 items-center"
                    size="lg"
                  >
                    <Send />
                    <span className="text-xl">Save </span>
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </DialogContent>
    </Dialog>
  );
}
