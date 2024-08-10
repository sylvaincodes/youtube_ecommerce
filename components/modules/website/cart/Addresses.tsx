"use client";

import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Address, Cart, Delivery, Payment } from "@/types";
import { deliveries, payments } from "@/constants/index";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ClipLoader } from "react-spinners";
import Toast from "../../custom/Toast";

export default function Adresses() {
  const { data: session } = useSession();

  const initialValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    state: "",
    city: "",
    zipCode: "",
    address: "",
    country: "",
  };

  const initialCoupon = {
    coupon: "",
  };

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discount, setDiscount] = useState();
  const [selectedAddresses, setSelectedAddresses] = useState<Address>();
  const [selectedPayment, setSelectedPayments] = useState<Payment>();
  const [selectedDelivery, setSelectedDeliverys] = useState<Delivery>();
  const [coupon, setCoupon] = useState();
  const [loading, setLoading] = useState(false);

  const validate = yup.object().shape({
    firstName: yup
      .string()
      .min(3, "must have at least 3 characters")
      .max(20, "Maximum 20 characters")
      .required("First name is required"),
    lastName: yup
      .string()
      .min(3, "must have at least 3 characters")
      .max(20, "Maximum 20 characters")
      .required("Last name is required"),
    phoneNumber: yup
      .string()
      .min(3, "must have at least 3 characters")
      .max(20, "Maximum 20 characters")
      .required("Phone is required"),
    state: yup
      .string()
      .min(3, "must have at least 3 characters")
      .max(100, "Maximum 20 characters")
      .required("state is required"),
    city: yup
      .string()
      .min(3, "must have at least 3 characters")
      .max(100, "Maximum 20 characters")
      .required("City is required"),
    zipCode: yup
      .string()
      .min(3, "must have at least 3 characters")
      .max(100, "Maximum 20 characters")
      .required("Zip code is required"),
    address: yup
      .string()
      .min(3, "must have at least 3 characters")
      .max(100, "Maximum 20 characters")
      .required("Adresse  is required"),
    country: yup.string().required("Country is required"),
  });

  const validateCoupon = yup.object().shape({
    coupon: yup
      .string()
      .min(3, "must have at least 3 characters")
      .max(20, "Maximum 20 characters")
      .required("Coupon name is required"),
  });

  const router = useRouter();

  const placeOrderHandler = () => {
    try {
      if (
        !cart ||
        !selectedAddresses ||
        !selectedPayment ||
        !selectedDelivery ||
        !totalAfterDiscount ||
        !session?.user
      ) {
        toast.error(
          "You order is not completed. Choose a address and a payment method"
        );
        return;
      }
      let data = {};

      if (coupon) {
        data = {
          products: cart.products,
          shippingAddress: selectedAddresses,
          paymentMethod: selectedPayment.slug,
          total: totalAfterDiscount,
          user: session.user.id,
          totalBeforeDiscount: cart.cartTotal,
          couponApplied: coupon,
          shippingStatus: "pending",
          shippingTimes: selectedDelivery.times,
          shippingPrice: selectedDelivery.price,
        };
      } else {
        data = {
          products: cart.products,
          shippingAddress: selectedAddresses,
          paymentMethod: selectedPayment.slug,
          total: totalAfterDiscount,
          user: session.user.id,
          totalBeforeDiscount: cart.cartTotal,
          shippingStatus: "pending",
          shippingTimes: selectedDelivery.times,
          shippingPrice: selectedDelivery.price,
        };
      }

      setLoading(true);
      axios
        .post(process.env.NEXT_PUBLIC_API_URL + "/api/order", data)
        .then((response) => {
          const data = response.data;
          router.push(`order/${data.order_id}`);
          toast.custom(<Toast message={data.message} status="success" />);
        })
        .catch((err) => {
          toast.custom(<Toast message={err.message} status="error" />);
          console.log(err);
        })
        .finally(() => {});
    } catch (error) {
      console.log(error);
    }
  };

  const [cart, setCart] = useState<Cart>();

  useEffect(() => {
    const getCart = () => {
      setLoading(true);
      axios
        .get(process.env.NEXT_PUBLIC_API_URL + "/api/cart", {
          params: { user_id: session?.user?.id },
        })
        .then((response) => {
          setCart(response.data.data);
          setTotalAfterDiscount(response.data.data.cartTotal);
        })
        .catch((error) => {
          console.log(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    const getUser = () => {
      setLoading(true);
      axios
        .get(process.env.NEXT_PUBLIC_API_URL + "/api/user", {
          params: { user_id: session?.user?.id },
        })
        .then((response) => {
          setAddresses(response.data.data.address);
        })
        .catch((error) => {
          console.log(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    getCart();
    getUser();
  }, []);

  return (
    <>
      <div className="">
        {loading ? (
          <ClipLoader className="absolute inset-0 m-auto text-primary-900" />
        ) : (
          ""
        )}

        <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
          <div className="flex-1 gap-y-8">
            {/* Adresses form  */}

            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={validate}
              onSubmit={async (values) => {
                if (loading) {
                  return;
                }

                const data = {
                  shipping: values,
                  user_id: session?.user?.id,
                };

                setLoading(true);
                await axios
                  .post(process.env.NEXT_PUBLIC_API_URL + "/api/shipping", data)
                  .then((response) => {
                    const data = response.data;

                    setAddresses((old) => [...old, data]);
                    toast.custom(
                      <Toast message={data.message} status="success" />
                    );
                    router.refresh();
                  })
                  .catch((err) => {
                    console.log(err);
                  })
                  .finally(() => {
                    router.refresh();
                    setLoading(false);
                  });
              }}
            >
              {({
                errors,
                touched,

                /* and other goodies */
              }) => (
                <div className="">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Delivery Details
                  </h2>

                  <Form>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                        >
                          {" "}
                          Your first name{" "}
                        </label>
                        <Field
                          name="firstName"
                          type="text"
                          id="firstName"
                          className={cn(
                            "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500",
                            errors?.firstName &&
                              touched?.firstName &&
                              "border border-red-900"
                          )}
                          placeholder="Bonnie"
                        />
                        <ErrorMessage
                          name="firstName"
                          component="div"
                          className="py-2 font-bold text-red-900"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="lastName"
                          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                        >
                          {" "}
                          Your last name{" "}
                        </label>
                        <Field
                          name="lastName"
                          type="text"
                          id="lastName"
                          className={cn(
                            "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500",
                            errors?.lastName &&
                              touched?.lastName &&
                              "border border-red-900"
                          )}
                          placeholder="Green"
                        />
                        <ErrorMessage
                          name="lastName"
                          component="div"
                          className="py-2 font-bold text-red-900"
                        />
                      </div>

                      <div>
                        <div className="mb-2 flex items-center gap-2">
                          <label
                            htmlFor="select-country-input-3"
                            className="block text-sm font-medium text-gray-900 dark:text-white"
                          >
                            {" "}
                            Country*{" "}
                          </label>
                        </div>
                        <Field
                          as="select"
                          name="country"
                          id="country"
                          className={cn(
                            "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500",
                            errors?.country &&
                              touched?.country &&
                              "border border-red-900"
                          )}
                        >
                          <option value="">Select</option>
                          <option value="usa">Usa</option>
                          <option value="france">France</option>
                          <option value="spain">Spain</option>
                        </Field>
                        <ErrorMessage
                          name="country"
                          component="div"
                          className="py-2 font-bold text-red-900"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="phoneNumber"
                          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                        >
                          {" "}
                          Your phone{" "}
                        </label>
                        <Field
                          name="phoneNumber"
                          type="text"
                          id="phoneNumber"
                          className={cn(
                            "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500",
                            errors?.phoneNumber &&
                              touched?.phoneNumber &&
                              "border border-red-900"
                          )}
                          placeholder="New York"
                        />
                        <ErrorMessage
                          name="phoneNumber"
                          component="div"
                          className="py-2 font-bold text-red-900"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="city"
                          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                        >
                          {" "}
                          Your city{" "}
                        </label>
                        <Field
                          name="city"
                          type="text"
                          id="city"
                          className={cn(
                            "placeholder:block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500",
                            errors?.city &&
                              touched?.city &&
                              "border border-red-900"
                          )}
                          placeholder="New York"
                        />
                        <ErrorMessage
                          name="city"
                          component="div"
                          className="py-2 font-bold text-red-900"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="firstName"
                          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                        >
                          {" "}
                          Your state{" "}
                        </label>
                        <Field
                          name="state"
                          type="text"
                          id="state"
                          className={cn(
                            "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500",
                            errors?.state &&
                              touched?.state &&
                              "border border-red-900"
                          )}
                          placeholder="USA nevada"
                        />
                        <ErrorMessage
                          name="state"
                          component="div"
                          className="py-2 font-bold text-red-900"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="firstName"
                          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                        >
                          {" "}
                          Your adresse{" "}
                        </label>
                        <Field
                          name="address"
                          type="text"
                          id="address"
                          className={cn(
                            "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500",
                            errors?.address &&
                              touched?.address &&
                              "border border-red-900"
                          )}
                          placeholder="Address"
                        />
                        <ErrorMessage
                          name="address"
                          component="div"
                          className="py-2 font-bold text-red-900"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="zipCode"
                          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                        >
                          {" "}
                          Your zip code{" "}
                        </label>
                        <Field
                          name="zipCode"
                          type="text"
                          id="zipCode"
                          className={cn(
                            "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500",
                            errors?.zipCode &&
                              touched?.zipCode &&
                              "border border-red-900"
                          )}
                          placeholder="zip"
                        />
                        <ErrorMessage
                          name="zipCode"
                          component="div"
                          className="py-2 font-bold text-red-900"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <button
                          disabled={loading}
                          type="submit"
                          className="flex bg-primary-700 text-white w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium hover:bg-primary-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                        >
                          <Plus className="text-white" />
                          <span>Save</span>
                        </button>
                      </div>
                    </div>
                  </Form>
                </div>
              )}
            </Formik>

            {/* Addresse list  */}
            <div className="space-y-4 my-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Address list
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {addresses &&
                  addresses.map((item: Address, idx: number) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedAddresses(item)}
                      className={cn(
                        "rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800 cursor-pointer",
                        item._id === selectedAddresses?._id &&
                          "border-primary-700"
                      )}
                    >
                      <div className="flex items-start">
                        <div className="ms-4 text-sm">
                          <label
                            htmlFor="credit-card"
                            className="font-medium leading-none text-gray-900 dark:text-white"
                          >
                            {" "}
                            address{idx + 1}
                          </label>

                          <p className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                            {item.city} {item.address}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Addresse payment  */}
            <div className="space-y-4 my-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Payment
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {payments &&
                  payments.map((item: Payment, idx: number) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedPayments(item)}
                      className={cn(
                        "rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800  cursor-pointer",
                        item.id == selectedPayment?.id && "border-primary-700"
                      )}
                    >
                      <div className="flex items-start">
                        <div className="text-sm">
                          <label
                            htmlFor="credit-card"
                            className="font-medium leading-none text-gray-900 dark:text-white capitalize"
                          >
                            {" "}
                            {item.title}
                          </label>
                          <p
                            id="credit-card-text"
                            className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                          >
                            {item.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-2">
                        <Image src={item.image} alt="" width={50} height={50} />
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Address method */}
            <div className="space-y-4 my-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Delivery Methods
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {deliveries &&
                  deliveries.map((item: Delivery, idx: number) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedDeliverys(item)}
                      className={cn(
                        "rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800 cursor-pointer",
                        item.id == selectedDelivery?.id && "border-primary-700"
                      )}
                    >
                      <div className="flex items-start">
                        <div className="text-sm">
                          <label
                            htmlFor="credit-card"
                            className="font-medium leading-none text-gray-900 dark:text-white capitalize"
                          >
                            {" "}
                            {item.title}
                          </label>
                          <p
                            id="credit-card-text"
                            className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                          >
                            {item.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-2">
                        <Image src={item.image} alt="" width={50} height={50} />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="w-full space-y-11 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Summary Details
            </h2>

            {/* Address reduction  */}
            <Formik
              enableReinitialize
              initialValues={initialCoupon}
              validationSchema={validateCoupon}
              onSubmit={async (values) => {
                if (loading) {
                  return;
                }

                const data = {
                  coupon: values.coupon,
                  user: session?.user?.id,
                };

                setLoading(true);
                axios
                  .post(process.env.NEXT_PUBLIC_API_URL + "/api/coupon", data)
                  .then((response) => {
                    const data = response.data;

                    if (data.data === null) {
                      toast.custom(
                        <Toast message={data.message} status="error" />
                      );
                      return;
                    }
                    setTotalAfterDiscount(data.totalAfterDiscount);
                    setCoupon(data.coupon);
                    setDiscount(data.discount);
                    toast.custom(
                      <Toast message={data.message} status="success" />
                    );
                  })
                  .catch((err) => {
                    console.log(err);
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              }}
            >
              {({ errors, touched, handleSubmit }) => (
                <Form>
                  <div className="flex  max-w-md items-center gap-4">
                    <Field
                      name="coupon"
                      id="coupon"
                      className={cn(
                        "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500",
                        errors?.coupon &&
                          touched?.coupon &&
                          "border border-red-900"
                      )}
                      placeholder="Enter a coupon code"
                    />

                    <button
                      disabled={loading}
                      onClick={() => handleSubmit()}
                      type="button"
                      className="flex items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Apply
                    </button>
                  </div>
                  <ErrorMessage
                    name="coupon"
                    component="div"
                    className="py-2 font-bold text-red-900"
                  />
                </Form>
              )}
            </Formik>

            <div className="flow-root">
              <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Subtotal
                  </dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-white">
                    ${cart?.cartTotal}
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Shipping
                  </dt>
                  <dd className="text-base font-medium text-green-500">0</dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Coupon
                  </dt>
                  <dd className="text-base font-medium text-green-500">
                    -{discount ? discount : 0}%
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">
                    Total
                  </dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white">
                    ${totalAfterDiscount}
                  </dd>
                </dl>
              </div>
            </div>

            <div className="space-y-3">
              <button
                disabled={loading}
                onClick={() => placeOrderHandler()}
                type="submit"
                className="flex w-full items-center justify-center rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
