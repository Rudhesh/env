"use client";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import Loader from "../../../components/common/loader";
import Image from "next/image";

type props = {
  title: string;
  button: string;
  footer: string;
};

const inputStyles = `
  w-full 
  border 
  border-gray-300 
  dark:text-white 
  text-black 
  rounded 
  px-2 
  py-2 
  mb-4 
  focus:outline-none 
  focus:border-blue-400 
  focus:text-black
`;

const Login = ({ title, button, footer }: props) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const locale = useLocale();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace(`/${locale}/dashboard`);
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    console.log(email, password);
    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      if (res?.url) router.replace("/dashboard");
    } else {
      setError("");
    }
  };

  if (sessionStatus === "loading") {
    return <Loader />;
  }

  const handleResetPassword = () => {
    // Add logic to navigate to the Forgot Password page
    router.push(`/${locale}/resetPassword`);
  };

  return (
    sessionStatus !== "authenticated" && (
      <div className="flex flex-col h-screen">
        <Image
          className="p-2 mx-5"
          src={"/logo-Envotech(1).png"}
          height={125}
          width={125}
          alt="Envotech Logo"
        />
        <div className=" flex justify-center mt-20  ">
          <div className="w-[450px]">
            <div className=" border bg-slate-50 shadow-xl flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 rounded">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="flex justify-center ">
                  <h1 className="mt-2 text-center text-xl font-bold  mb-2  leading-9 tracking-tight  text-gray-900">
                    BMT DATA HUB
                  </h1>
                </div>

                <h2 className="mt-2 text-center text-xl  mb-10  leading-9 tracking-tight text-gray-900">
                  {title}
                </h2>
              </div>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  className={inputStyles}
                  placeholder="rd@rd.com"
                  required
                />
                <input
                  type="password"
                  className="w-full border border-gray-300 dark:text-white text-black rounded px-2 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
                  placeholder="123456789"
                  required
                />
                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-[#384D6C] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#303f57] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#303f57]"
                >
                  {" "}
                  {button}
                </button>
                <p className="text-red-600 text-[16px] mb-4">
                  {error && error}
                </p>
              </form>

              <div className="mt-4 text-center">
                <button
                  className="text-sm text-[#384D6C] hover:underline focus:outline-none focus:underline"
                  onClick={handleResetPassword}
                >
                  Forgot Password?
                </button>
                {/*  <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </> */}
              </div>

              <p className="mt-10 text-center text-sm text-gray-500">
                {footer}{" "}
                <a
                  href="#"
                  className="font-semibold leading-6 text-red-600 hover:text-[#303f57]"
                >
                  Ecotech
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Login;
