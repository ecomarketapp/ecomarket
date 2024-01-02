'use client';
import { MenuContext } from '@/app/utils/context';
import React, { useState, useEffect, useRef, useContext } from 'react';
import Link from 'next/link';
import MobileMenu from '../MobileMenu';
import { useRouter } from 'next/navigation';
import Menu from '../../icons/Menu';
import Image from 'next/image';
import '../../../styles/navbar.css';
import { useDisclosure } from '@chakra-ui/react';
import GetStartedModal from '../../Modals/GetStartedModal';

const Navbar = () => {
  const { toggle, showMenu } = useContext(MenuContext) || {};

  const [dropdown, setDropdown] = useState(false);
  const [getstarted, setGetStarted] = useState(0);
  const [mobMenu, setMobMenu] = useState(false);

  const router = useRouter();
  const ref = useRef();
  const testref = useRef();

  const depthLevel = 0;
  const dropdownClass = depthLevel > 1 ? 'inner-menu' : '';

  const user = null;
  // const user = localStorage.getItem('user');

  useEffect(() => {
    const handler = (e) => {
      if (dropdown && ref.current && !ref.current.contains(e.target)) {
        setDropdown(false);
      } else if (
        dropdown &&
        testref.current &&
        !testref.current.contains(e.target)
      ) {
        setDropdown(false);
      }
    };

    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [dropdown]);

  const onClickGetStarted = () => {
    setGetStarted(!getstarted);
  };
  const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(!dropdown);
  };

  const onMouseLeave = () => {
    window.innerWidth > 960 && setDropdown(false);
  };

  const handleMobileMenu = () => {
    setMobMenu((prev) => !prev);
    // console.log(mobMenu, 'mobmenu');
  };

  const onHowItWorks = () => {
    resultRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  function redirectHowItWorks() {
    router.push('/');
    // setTimeout(function(){
    // onHowItWorks()

    // })
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  const modalBtnRef = useRef();

  return (
    <>
      {/* <header className="shadow shadow-slate-300 border border-[#F1F1F3] z-[99999] relative"> */}
      <header className=" z-[99999] relative">
        <div className="container mx-auto max-w-7xl">
          <nav className="flex  flex-wrap items-center justify-between px-6 py-4">
            <div className="lg:order-1 w-auto lg:w-auto lg:text-center flex items-center ">
              <Link
                href="/"
                className="text-xl text-gray-800 font-semibold font-heading"
              >
                <Image
                  src="/images/ecomarket-logo.png"
                  width={150}
                  height={100}
                  alt="logo"
                />
              </Link>

              {/* <div className="navbar-menu flex items-center justify-end gap-6  "> */}

              <Link
                href="/about-us"
                className="hidden lg:inline-block mt-4 lg:mt-0 text-[#272626] hover:text-[#12B76A] px-5 "
              >
                About Us
              </Link>
              <Link
                href="/"
                className="hidden lg:inline-block mt-4 lg:mt-0 text-[#272626] hover:text-[#12B76A] px-5 "
              >
                For Organizations
              </Link>
              <Link
                href="/"
                className="hidden lg:inline-block mt-4 lg:mt-0 text-[#272626] hover:text-[#12B76A] px-5 "
              >
                Contact Us
              </Link>

              {/* </div> */}
            </div>
            <div className="block lg:hidden">
              <button
                className={`navbar-burger flex items-center py-3 px-3 text-indigo-500  rounded relative transition-all duration-150 ease-linear `}
                id="nav-icon3"
                onClick={toggle}
              >
                {/* ${
                  showMenu ? 'open' : ''
                } */}
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
            <div className="hidden lg:order-2 lg:block w-full lg:w-auto lg:text-center">
              <div className="navbar-menu flex items-center justify-end gap-6  ">
                {/* { */}

                {/* <Link href="/about-us"
                  className="block lg:inline-block mt-4 lg:mt-0 text-[#272626] hover:text-[#12B76A] px-5 "
                  
                >
                  About Us
                </Link>
                <Link href="/"
                  className="block lg:inline-block mt-4 lg:mt-0 text-[#272626] hover:text-[#12B76A] px-5 "
                  
                >
                  For Organizations
                </Link> */}
                <div className="block lg:inline-block mt-4 lg:mt-0 text-[#11161F] px-5 ">
                  <div className="flex items-center">
                    <div>
                      <select
                        defaultValue={0}
                        className="px-1 py-1 rounded-lg focus-visible:outline-none focus-within:outline-none focus:outline-none text-sm bg-transparent "
                      >
                        <option value={0}>English</option>
                        <option value={1}>Français</option>
                        <option value={2}>繁體中文</option>
                        <option value={3}>한국어</option>
                        <option value={4}>日本語</option>
                        <option value={5}>Español</option>
                      </select>
                    </div>
                  </div>
                </div>
                <button
                  ref={modalBtnRef}
                  onClick={onOpen}
                  className="block lg:inline-block mt-4 lg:mt-0 text-[#272626] hover:text-[#12B76A] px-5 "
                >
                  Login
                </button>

                {user ? (
                  <Link
                    href="collector/dashboard"
                    className="block lg:inline-block mt-4 lg:mt-0 hover:text-white hover:bg-[#DD7D37] text-[#DD7D37] bg-white hover:border-[#DD7D37] border border-[#DD7D37] rounded-full px-7 py-2 transition duration-300 ease"
                  >
                    0x346932...gq382nk
                  </Link>
                ) : (
                  <button
                    className="block lg:inline-block mt-4 lg:mt-0 text-white hover:text-[#12B76A] hover:bg-white  hover:border-[#12B76A] hover:border  border border-[#12B76A] bg-[#12B76A] rounded-full px-6 py-2 transition duration-300 ease text-sm"
                    ref={modalBtnRef}
                    onClick={onOpen}
                  >
                    Access the EcoMarket app
                  </button>

                  // <WalletConnectButton className='block lg:inline-block mt-4 lg:mt-0 text-white hover:text-[#DD7D37] hover:bg-white hover:border-[#DD7D37] border bg-[#DD7D37] rounded-full px-9 py-3 transition duration-300 ease'/>
                )}
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* <GetStartedModal show={getstarted} setShow={setGetStarted} /> */}

      {/* <div className="block lg:hidden"> */}
      <MobileMenu />

      <GetStartedModal isOpen={isOpen} onClose={onClose} btnRef={modalBtnRef} />
      {/* </div> */}
    </>
  );
};

export default Navbar;
