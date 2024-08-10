/* eslint-disable  no-useless-escape */
"use client";
import React, { useState } from "react";
import Container from "../../custom/Container";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import toast from "react-hot-toast";
import Toast from "../../custom/Toast";
import { useRouter } from "next/navigation";
import Loading from "../../custom/Loading";
import Link from "next/link";

export default function Register() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  console.log(session);

  const initialValues = {
    name: "testname",
    email: "tesemail222@gmail.com",
    password: "Testpassword2024&",
    confirm_password: "Testpassword2024&",
  };
  const validate = Yup.object({
    name: Yup.string().required().min(2).max(60),
    email: Yup.string().required().email(),
    password: Yup.string()
      .required("required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, //eslint-disable-next-line
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    confirm_password: Yup.string()
      .required("The passwords are not the same")
      .oneOf([Yup.ref("password"), "null"], "Passwords must match"),
  });

  const router = useRouter();

  const handleSave = async (values: { email: string; password: string }) => {
    if (loading) {
      return;
    }
    setLoading(true);

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/register",
        { method: "POST", body: JSON.stringify(values) }
      );

      if (!response.ok) {
        response.json().then((data) => {
          console.log(data);
          toast.custom(<Toast message={data.message} status="error" />);
          return data;
        });
      } else {
        response.json().then((data) => {
          console.log(data);
          toast.custom(<Toast message={data.message} status="success" />);
          router.push("/signin");
          return data;
        });
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <section className="py-10 my-10">
      {loading && <Loading isLoading={loading} />}
      <Container>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2 items-center">
            <h1 className="text-2xl font-bold tracking-widest">
              Create an account
            </h1>
            <p className="text-center text-base ">
              Fill the forms and then click on the button to submit
            </p>
          </div>

          <div
            className="
                flex flex-col w-full items-center"
          >
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
                <Form>
                  <div className="flex flex-col gap-4 w-[320px]">
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

                  <div className="flex flex-col gap-4 w-[320px]  mt-10">
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

                  <div className="flex flex-col gap-4  mt-10 w-[320px]">
                    <label htmlFor="password">Password</label>
                    <Field
                      type="password"
                      name="password"
                      className={cn(
                        "w-full border border-black px-4 py-2 rounded-md text-black ",
                        errors.password && "border border-red-300"
                      )}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="py-2 font-bold text-red-900"
                    />
                  </div>

                  <div className="flex flex-col gap-4 w-[320px]  mt-10">
                    <label htmlFor="password">Confirm Password</label>
                    <Field
                      type="password"
                      name="confirm_password"
                      className={cn(
                        "w-full border border-black px-4 py-2 rounded-md text-black ",
                        errors.password && "border border-red-300"
                      )}
                    />
                    <ErrorMessage
                      name="confirm_password"
                      component="div"
                      className="py-2 font-bold text-red-900"
                    />
                  </div>

                  <div className="flex mt-10"></div>

                  <div className="flex sm:w-full lg:max-w-lg">
                    <Button
                      disabled={loading}
                      type="submit"
                      variant="primary"
                      className="w-full inline-flex gap-4 items-center"
                      size="lg"
                    >
                      <Send />
                      <span className="text-xl">Register</span>
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          <div className="flex justify-center w-full  items-center mt-10">
            <Link href="/signin" className="text-2x font-bold">
              Login to your account !
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
