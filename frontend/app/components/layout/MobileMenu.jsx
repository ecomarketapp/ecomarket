'use client';
import React, { useState, useEffect, useRef, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { MenuContext } from '@/app/utils/context';

const MobileMenu = () => {
  const { toggle, showMenu } = useContext(MenuContext) || {};

  const [dropdown, setDropdown] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState();

  const router = useRouter();

  const user = null;
  const ref = useRef();

  const depthLevel = 0;
  const dropdownClass = depthLevel > 1 ? 'inner-menu' : '';

  const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(!dropdown);
  };

  const onMouseLeave = () => {
    window.innerWidth > 960 && setDropdown(false);
  };
  const ToggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };
  const handleGetStarted = () => {
    dismiss();
    setShowUserMenu(false);
    onClickGetStarted();
  };
  const handleHowItWorks = () => {
    dismiss();
    setShowUserMenu(false);
    onHowItWorks();
  };

  function redirectHowItWorks() {
    router.push('/');
    // setTimeout(function(){
    // onHowItWorks()

    // })
  }

  return (
    <>
      <div
        className={`w-full bg-slate-500 h-full lg:hidden sidemenu ${
          showMenu ? 'show' : ''
        }`}
      >
        <nav className="flex items-center flex-col px-4 py-4 h-full">
          <div className="w-full text-center flex items-center justify-between">
            <Link
              href="/"
              className="text-xl text-gray-800 font-semibold font-heading h-12 w-36 relative block"
            >
              <Image
                src={'/images/ecomarket-logo.png'}
                alt={'logo'}
                fill
                priority
                className=" object-contain"
              />
            </Link>

            <button
              onClick={(e) => {
                toggle();
              }}
              className="p-3    "
            >
              <span>
                <svg
                  className="h-7 w-7 "
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 5L5 15M5 5L15 15"
                    stroke="currentColor"
                    strokeWidth="1.67"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
          <div className="w-full h-full">
            <div className="navbar-menu flex items-start justify-start flex-col h-full  w-full mt-3 gap-3">
              <Link
                href="/about-us"
                className="block  text-[#272C35] hover:text-indigo-600 px-5 py-3 text-sm w-full text-left border-b border-[#D0D5DD]"
              >
                About Us
              </Link>

              <Link
                href="/"
                className="block text-[#272C35] hover:text-indigo-600 px-5 py-3 text-sm w-full text-left border-b border-[#D0D5DD]"
              >
                For Organizations
              </Link>
              <Link
                href="/"
                className="block text-[#272C35] hover:text-indigo-600 px-5 py-3 text-sm w-full text-left border-b border-[#D0D5DD]"
              >
                Contact us
              </Link>
              <div className="block  px-5 py-3 text-sm w-full text-left border-b border-[#D0D5DD]">
                <select
                  defaultValue={0}
                  className="rounded-lg focus-visible:outline-none focus-within:outline-none focus:outline-none text-sm bg-transparent w-full"
                >
                  <option value={0}>English</option>
                  <option value={1}>Français</option>
                  <option value={2}>繁體中文</option>
                  <option value={3}>한국어</option>
                  <option value={4}>日本語</option>
                  <option value={5}>Español</option>
                </select>
              </div>
              {user ? (
                <div>
                  <Link
                    href="collector/dashboard"
                    className="block lg:inline-block mt-4 lg:mt-0 hover:text-white hover:bg-[#DD7D37] text-[#DD7D37] bg-white hover:border-[#DD7D37] border border-[#DD7D37] rounded-full px-7 py-2 transition duration-300 ease"
                  >
                    0x346932...gq382nk
                  </Link>
                </div>
              ) : (
                <div className="flex mx-auto ">
                  <button
                    className="block lg:inline-block mt-4 lg:mt-0 text-white hover:text-[#12B76A] hover:bg-white hover:border-[#12B76A] border bg-[#12B76A] rounded-full px-9 py-3 transition duration-300 ease"
                    onClick={handleGetStarted}
                  >
                    Access the EcoMarket app
                  </button>
                </div>

                // <WalletConnectButton className='block lg:inline-block mt-4 lg:mt-0 text-white hover:text-[#DD7D37] hover:bg-white hover:border-[#DD7D37] border bg-[#DD7D37] rounded-full px-9 py-3 transition duration-300 ease'/>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;
