import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import ConectWallet from '../../components/ConectWallet';
const CollectorAuth = () => {
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  router.id = 2;

  console.log(router.id);
  return (
    <>
      <section className="h-screen">
        <div className="  h-full">
          <div className="flex justify-between items-center h-full g-6 text-gray-800">
            <div className=" w-full md:w-1/2 lg:w-1/2  bg-white h-full overflow-y-auto px-4 md:px-[60px] lg:px-[80px] xl:px-[100px] pt-[50px] pb-7 scrollbar ">
              <div className="container mx-auto fixed top-0 right-0 left-0 w-full px-6 py-3 bg-white">
                <Link href="/">
                  <a>
                    <img src="/images/ecomarket-logo.svg" />
                  </a>
                </Link>
              </div>
              <div className="max-w-[500px] mx-auto flex flex-col justify-between h-full">
                <div className="flex items-center flex-grow">
                  <ConectWallet page={router.id} />
                </div>

                <div className="container mx-auto w-full px-6 mt-4">
                  <div className="flex items-center justify-between flex-wrap gap-3">
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
