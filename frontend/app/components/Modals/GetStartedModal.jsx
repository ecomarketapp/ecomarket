'use client';

import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionPanel,
} from '@chakra-ui/react';
import Image from 'next/image';
import { Timer, Wallet } from 'iconsax-react';
import Link from 'next/link';

function GetStartedModal({ isOpen, onClose }) {
  const [option, setOption] = useState(null);

  return (
    <>
      <Modal onClose={onClose} size="xl" isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent bg="#282827" color="#fff">
          <ModalHeader>
            <div className="text-[15px] ">
              <Link
                href="/"
                className="text-xl text-gray-800 font-semibold font-heading"
              >
                <Image
                  src="/images/ecomarket-logo-white2.png"
                  width={150}
                  height={100}
                  alt="logo"
                />
              </Link>
            </div>
          </ModalHeader>
          <ModalCloseButton
            onClick={() => {
              onClose;
            }}
          />
          <ModalBody>
            <div>
              <>
                <div className="w-full pb-4">
                  {/* <div className=""> */}
                  <div className=" p-3 py-3">
                    <div className="flex flex-col justify-between h-full p-1 ">
                      <div className="p-1 text-center flex items-center flex-col gap-2 text-white">
                        <h3 className="">
                          <Timer size={40} color='#12B76A'/>
                        </h3>
                        <h2 className="text-base text-white font-semibold">
                          Software Setup in progress
                        </h2>
                        <p className="text-sm py-1">
                          Apologies, the software isnt fully set up yet. For
                          further details, kindly fill the form provided. We
                          appreciate your understanding.
                        </p>
                      </div>
                    </div>

                    <Link
                      href="/"
                      className="text-white bg-[#12B76A] h-12 flex items-center justify-center w-full rounded-lg cursor-pointer"
                    >
                      <span className="text-white font-semibold">
                        Go to Form
                      </span>
                    </Link>
                  </div>
                </div>
              </>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default GetStartedModal;
