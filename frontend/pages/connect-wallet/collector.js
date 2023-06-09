import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import ConectWallet from '../../components/ConectWallet';
const CollectorAuth = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Head>
        <title>Ecomarket | Connect-Wallet - Collector</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Ecomarket Connect Wallet Collector" />
      </Head>
      <section className="h-screen">
        <div className="  h-full">
          <div className="flex justify-between items-center h-full g-6 text-gray-800">
            <div className=" w-full md:w-1/2 lg:w-1/2  bg-white h-full overflow-y-auto px-4 md:px-[60px] lg:px-[80px] xl:px-[100px] pt-[50px] pb-7 scrollbar ">
              <div className="container mx-auto fixed top-0 right-0 left-0 w-full px-6 py-3 bg-white">
                <Link href="/">
                  <a>
                    <img src="/images/ecomarket-logo.png" width={150} className="object-contain"/>
                  </a>
                </Link>
              </div>
              <div className="max-w-[500px] mx-auto flex flex-col justify-between h-full">
                <div className="flex items-center flex-grow">
                  <ConectWallet page={'collector'} />
                </div>

                <div className="container mx-auto w-full px-6 mt-4">
                  <div className="flex sitems-center justify-between flex-wrap gap-3">
                    <div>
                      <p>&copy; EcoMarket {currentYear}</p>
                    </div>

                    <div>
                      <a href="mailto://help@EcoMarket.com">
                        help@EcoMarket.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className=" left w-full md:w-1/2 lg:w-1/2 py-5 md:py-5 md:mb-0  relative hidden md:block h-full bg-slate-400 rounded-tl-[60px] rounded-bl-[60px]"
              style={{
                backgroundImage: 'url(/images/LoginHero.png)',
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
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

export default CollectorAuth;
