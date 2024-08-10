/* eslint-disable  no-useless-escape */
"use client";
import { User } from "@/types";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import Toast from "../../custom/Toast";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import Loading from "../../custom/Loading";
import axios from "axios";

type initialValuesProps = {
  _id: string;
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  image: string;
};

export default function Profil({ user }: { user: User }) {
  const router = useRouter();
  const initialValues = {
    _id: user._id,
    name: user.name,
    email: user.email,
    password: user.password,
    confirm_password: user.password,
    image: user.image,
  };

  const validate = Yup.object({
    name: Yup.string().required().min(2).max(60),
    email: Yup.string().required().email(),
    password: Yup.string()
      .required("required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    confirm_password: Yup.string()
      .required("The passwords are not the same")
      .oneOf([Yup.ref("password"), "null"], "Passwords must match"),
  });

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(
    "https://cdn-icons-png.flaticon.com/128/236/236831.png"
  );

  const handleSave = async (values: initialValuesProps) => {
    setLoading(true);
    const data = {
      id: values._id,
      name: values.name,
      email: values.email,
      image: file,
      password: values.password,
      confirm_password: values.confirm_password,
    };

    // try {
    //   const response = await fetch(
    //     process.env.NEXT_PUBLIC_API_URL + "/api/account/profil",
    //     {
    //       method: "PUT",
    //       body: JSON.stringify(data),
    //     }
    //   );

    //   if (!response.ok) {
    //     response.json().then((data) => {
    //       console.log(data);
    //       toast.custom(<Toast message={data.message} status="error" />);
    //       return data;
    //     });
    //   } else {
    //     response.json().then((data) => {
    //       console.log(data);
    //       toast.custom(<Toast message={data.message} status="success" />);
    //       return data;
    //     });
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
    axios
      .put(process.env.NEXT_PUBLIC_API_URL + "/api/account/profil", data)
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

    setLoading(false);
  };

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const files = target.files as FileList;
    setLoading(true);

    if (!files[0]) {
      setLoading(false);
      return;
    }
    const formData = new FormData();
    console.log(files[0]);

    formData.append("file", files[0]);

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_SERVER_URL + "/api/cloudinary",
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!response.ok) {
        response.json().then((data) => {
          console.log(data);
          toast.custom(<Toast message={data.message} status="error" />);
          setLoading(true);
        });
      } else {
        response.json().then((data) => {
          console.log(data);
          setFile(data.imgUrl);
          toast.custom(<Toast message={data.message} status="success" />);
          setLoading(false);
        });
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const imageRef = useRef<HTMLInputElement>(null);

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validate}
      onSubmit={async (values) => {
        handleSave(values);
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
              <label htmlFor="name">Name</label>
              <Field
                type="text"
                name="name"
                className={cn(
                  "border border-black px-4 text-black py-2 rounded-",
                  errors.name && "border border-red-300"
                )}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="py-2 font-bold text-red-900"
              />
            </div>

            <div className="flex flex-col gap-4 sm:w-[320px] grow">
              <label htmlFor="email">Email</label>
              <Field
                type="text"
                name="email"
                className={cn(
                  "border border-black px-4 text-black py-2 rounded-",
                  errors.email && "border border-red-300"
                )}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="py-2 font-bold text-red-900"
              />
            </div>
          </div>

          <div className="flex w-full gap-4 flex-wrap mb-4">
            <div className="flex flex-col gap-4 sm:w-[320px] grow">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                name="password"
                className={cn(
                  "w-full border border-black px-4 py-2 text-black ",
                  errors.password && "border border-red-300"
                )}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="py-2 font-bold text-red-900"
              />
            </div>

            <div className="flex flex-col gap-4 sm:w-[320px] grow">
              <label htmlFor="password">Confirm Password</label>
              <Field
                type="password"
                name="confirm_password"
                className={cn(
                  "w-full border border-black px-4 py-2 text-black ",
                  errors.password && "border border-red-300"
                )}
              />
              <ErrorMessage
                name="confirm_password"
                component="div"
                className="py-2 font-bold text-red-900"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:w-[320px] grow my-10">
            <label htmlFor="password">Image</label>
            <input
              hidden
              disabled={loading}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleImage(e)
              }
              ref={imageRef}
              type="file"
              name="image"
              accept="image/png, image/jpg"
              className={cn(
                "w-full border border-black px-4 py-2 rounded-md text-black ",
                errors.image && "border border-red-300"
              )}
            />
            <div
              role="button"
              onClick={() => imageRef?.current?.click()}
              className="cursor-pointer flex flex-wrap item-center justify-center border border-gray-300 p-4"
            >
              {file ? "change the image" : " select an image"}
            </div>
            <ErrorMessage
              name="image"
              component="div"
              className="py-2 font-bold text-red-900"
            />
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
              <span className="text-xl">Update </span>
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
