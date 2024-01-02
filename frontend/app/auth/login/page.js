import React from "react";
import Link from "next/link";
import Head from "next/head";
import LoginForm from "@/app/components/Forms/LoginForm";
import Image from "next/image";

export const metadata = {
  title: "EcoMarket | Login",
  metadataBase: new URL("https://ecomarket.xyz"),
  description: "Open Marketplace for Recycled Materials",
  keyword: ["Recycle", "Ecomarket"],
  openGraph: {
    title: "Open Marketplace for Recycled Materials",
    description: "Open Marketplace for Recycled Materials",

    url: "https://ecomarket.xyz",
    siteName: "EcoMarket",
    images: [
      {
        url: "https://www.ecomarket.xyz/images/ecomarket-logo.png",
        width: 800,
        height: 600,
      },
      {
        url: "https://www.ecomarket.xyz/images/ecomarket-logo.png",
        width: 1800,
        height: 1600,
        alt: "EcoMarket Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/images/favicon/favicon-16x16.png", size: "16x16" },
      { url: "/images/favicon/favicon-32x32.png", size: "32x32" },
    ],
    shortcut: "/images/favicon/favicon-32x32.png",
    apple: "/images/favicon/apple-touch-icon.png",
    andriod: [
      {
        url: "/images/favicon/android-chrome-192x192.png",
        size: "192x192",
      },
      {
        url: "/images/favicon/android-chrome-512x512.png",
        size: "512x512",
      },
    ],
  },
};

const Login = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <section className="h-screen">
        <div className="  h-full">
          <div className="flex justify-between items-center h-full g-6 text-gray-800">
            <div className=" w-full md:w-1/2 lg:w-1/2  bg-white h-screen overflow-y-auto px-4 md:px-[60px] lg:px-[80px] xl:px-[100px] pt-[50px] pb-7 scrollbar ">
              <div className="container mx-auto fixed top-0 right-0 left-0 w-full px-6 py-3 bg-white">
                <Link href="/">
                  <Image
                    src="/images/ecomarket-logo.png"
                    width={150}
                    className="object-contain"
                    alt="..."
                  />
                </Link>
              </div>
              <div className="max-w-[500px] mx-auto flex items-center h-full">
                <div className="w-full">
                  <div className="mb-10 text-left">
                    <h2 className="text-4xl font-semibold text-gray-700 capitalize  mb-3">
                      Log In
                    </h2>
                    <p className="mt-3 text-gray-500 ">
                      Welcome back. Please enter your details.
                    </p>
                  </div>
                  <LoginForm />
                </div>
              </div>

              <div className="container mx-auto w-full px-6 mt-4">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <p>&copy; EcoMarket {currentYear}</p>
                  </div>

                  <div>
                    <a href="mailto://help@EcoMarket.com">help@EcoMarket.com</a>
                  </div>
                </div>
              </div>
            </div>

            <div
              className=" left w-full md:w-1/2 lg:w-1/2 py-5 md:py-5 md:mb-0  relative hidden md:block h-full bg-slate-400 rounded-tl-[60px] rounded-bl-[60px]"
              style={{
                backgroundImage: "url(/images/LoginHero.png)",
                backgroundPosition: "center center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              {/* <div className="overlay"></div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
