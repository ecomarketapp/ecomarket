'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className="bg-[#034225] py-5">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between py-10 flex-wrap gap-4">
            <div>
              <Link href={'/'}>
                <Image
                  src="/images/ecomarket-logo-white2.png"
                  width={150}
                  height={150}
                  alt="logo"
                  fetchPriority="high"
                />
              </Link>
            </div>
            <div>
              <p className="text-[#C9C4B5] text-base">
                &copy; {currentYear} EcoMarket. All rights reserved
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
