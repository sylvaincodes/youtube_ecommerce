"use client";
import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import Container from "../../custom/Container";
import { sendEmailTypes } from "@/types";
import Toast from "../../custom/Toast";
import { ClipLoader } from "react-spinners";
import axios from "axios";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const validate = Yup.object({
    subject: Yup.string()
      .required("required")
      .min(3, "6 letters at least")
      .max(60, "60 letters max"),
    email: Yup.string()
      .email()
      .required("required")
      .min(3, "6 letters at least")
      .max(60, "60 letters max"),

    message: Yup.string()
      .required("required")
      .min(3, "6 letters at least")
      .max(60, "60 letters max"),
  });

  const initialValues = {
    subject: "subject",
    email: "emailexample@gmail.com",
    message: "message",
  };

  const handleSave = async (values: sendEmailTypes) => {
    if (loading) {
      return;
    }
    setLoading(true);

    const sendEmail = () => {
      axios
        .post(process.env.NEXT_PUBLIC_API_URL + "/api/sendemail", values)
        .then((response) => {
          const data = response.data;
          toast.custom(<Toast status="success" message={data.message} />);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    await sendEmail();
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      {loading ? (
        <ClipLoader
          className="fixed inset-0 m-auto z-20"
          size={100}
          color="#3c38ca"
        />
      ) : (
        ""
      )}

      <Container>
        <div className="py-0 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h1 className="text-3xl  text-center mb-8 capitalize">contact</h1>
          <p className="mb-2 lg:mb-8 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
            Got a technical issue? Want to send feedback about a beta feature?
            Need details custom service? Let us know.
          </p>
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
              touched,
              /* and other goodies */
            }) => (
              <Form className="space-y-8">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Your email
                  </label>
                  <Field
                    data-testid="email"
                    data-cy="email"
                    name="email"
                    type="text"
                    id="email"
                    className={cn(
                      "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light",
                      errors?.email && touched?.email && "border border-red-900"
                    )}
                    placeholder="name@gmail.com"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="py-2 font-bold text-red-900"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Subject
                  </label>
                  <Field
                    data-testid="subject"
                    data-cy="subject"
                    name="subject"
                    type="text"
                    id="subject"
                    className={cn(
                      "block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500dark:focus:border-primary-500 dark:shadow-sm-light",
                      errors?.subject &&
                        touched?.subject &&
                        "border border-red-900"
                    )}
                    placeholder="Let us know how we can help you"
                  />{" "}
                  <ErrorMessage
                    name="subject"
                    component="div"
                    className="py-2 font-bold text-red-900"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                  >
                    Your message
                  </label>
                  <Field
                    data-testid="message"
                    data-cy="message"
                    name="message"
                    component="textarea"
                    id="message"
                    rows={6}
                    className={cn(
                      "block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",

                      errors?.message &&
                        touched?.message &&
                        "border border-red-900"
                    )}
                    placeholder="Leave a comment..."
                  ></Field>

                  <ErrorMessage
                    name="message"
                    component="div"
                    className="py-2 font-bold text-red-900"
                  />
                </div>
                <button
                  id="submitForm"
                  data-testid="submitForm"
                  data-cy="submitForm"
                  disabled={loading}
                  type="submit"
                  className="w-full  py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Send message
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </section>
  );
}
