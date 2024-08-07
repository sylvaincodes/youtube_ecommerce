"use client";
import React, { useState } from "react";
import Container from "../../custom/Container";
import Loading from "../../custom/Loading";
import { z } from "zod";
import toast from "react-hot-toast";
import Toast from "../../custom/Toast";

export default function Newletter() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSave = async () => {
    setLoading(true);

    const Email = z.object({
      email: z.string().email().min(5),
    });
    const validatedFields = Email.safeParse({
      email: email,
    });

    if (!validatedFields.success) {
      toast.custom(
        <Toast message="Validation failed Try again!" status="error" />
      );
      setLoading(false);
      return;
    }

    if (loading) {
      return;
    }

    const sendEmail = async () => {
      const values = {
        subject: "Subscribe to the newsletter",
        email: email,
        message: "Ijust subscribed to your newsletter",
      };

      // Fetch api
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "/api/sendemail",
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
            return data;
          });
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    await sendEmail();
  };

  return (
    <section className="bg-primary-600 py-10 my-10 xl:px-40">
      <Container>
        {loading && <Loading isLoading={loading} />}

        <div className="flex justify-center gap-10 flex-wrap lg:flex-nowrap lg:justify-between">
          <div className="flex flex-col gap-4 items-center justify-center">
            <h1 className="text-xl xl:text-2xl font-bold text-white tracking-tigh w-full leading-8 text-center ">
              Subscribe to our newsletter
            </h1>

            <p className="text-white text-center">
              Subscribe to our newsletter & get notification about discouts.
            </p>
          </div>

          <CustomInput
            handleSave={handleSave}
            email={email}
            loading={loading}
            setEmail={setEmail}
          />
        </div>
      </Container>
    </section>
  );
}

export const CustomInput = ({
  setEmail,
  handleSave,
  loading,
  email,
}: {
  setEmail: (value: string) => void;
  loading: boolean;
  email: string;
  handleSave: () => void;
}) => {
  return (
    <div className="flex bg-white h-14 w-[560px] rounded-full">
      <input
        data-testid="newsletterEmail"
        data-cy="email"
        type="text"
        name="email"
        className="w-full outline-none rounded-full px-4"
        value={email}
        onChange={(e) => {
          setEmail(e.currentTarget.value);
        }}
      />

      <button
        data-cy="btn"
        data-testid="newsletterBtn"
        disabled={loading}
        onClick={handleSave}
        className={`bg-primary-600 rounded-full text-white ms-auto px-6 py-2 m-2 hover:bg-primary-900 ${
          loading ? "cursor-wait" : ""
        }`}
      >
        subscribe
      </button>
    </div>
  );
};
