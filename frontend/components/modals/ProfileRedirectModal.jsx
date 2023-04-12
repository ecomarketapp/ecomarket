import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const ProfileRedirectModal = ({ show, setShow, page }) => {
    const router = useRouter();
  useEffect(() => {
    router.prefetch(`/${page}/profile`);
  }, []);
  return (
    <>
      <div className={`modal__box profile_modal ${show ? 'show' : ''}`}>
        <div className="modal__box-wrapper shadow-lg rounded-2xl relative">
          <div className="px-2 py-6   ">
            <div className="flex items-center justify-around py-4">
              <div className="h-12">
                <img src="/images/wood.svg" className="h-full object-cover" />
              </div>
            </div>

            <div className="flex items-center justify-center text-center mb-6 w-full">
              <div className="grow w-full">
                <h1 className="text-2xl font-semibold mb-2">
                  Complete your profile{' '}
                </h1>

                <p className="text-sm text-[#878A90] font-normal">
                  This is to enable EcoMarket deduct the exact amount you're
                  being charged
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center flex-col gap-2 text-center my-6 py-4 w-full">
              <p className="text-sm text-gray-700">
                You need to add your details to complete your Ecomarket setup,
                complete to use Ecomarket
              </p>
            </div>

            <div className="flex items-center justify-center gap-4 mt-5 mx-auto w-full">
              <Link href={`/${page}/profile`}>
                <a className="px-9 w-1/2 py-2 border border-[#DD7D37] bg-[#DD7D37] text-white rounded-full text-center">
                  Complete Profile
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileRedirectModal;
