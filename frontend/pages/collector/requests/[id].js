import axios from 'axios';
import Link from 'next/link';
import React, { useState, useEffect, Suspense } from 'react';
import Final from '../../../components/FormComponents/formsteps/Final';
import FormStepper from '../../../components/FormComponents/formsteps/FormStepper';
import StepApprove from '../../../components/FormComponents/formsteps/StepApprove';
import StepOne from '../../../components/FormComponents/formsteps/StepOne';
import StepThree from '../../../components/FormComponents/formsteps/StepThree';
import StepTwo from '../../../components/FormComponents/formsteps/StepTwo';
import DropdownIcon from '../../../components/Icons/DropdownIcon';
import LoadingState from '../../../components/LoadingState';
import backend from '../../../components/services/backend';
import UserLayout from '../../../components/UserLayout/Layout';
import { UseContextProvider } from '../../../contexts/NavigationContext';
import {
  dateConv,
  getRequestById,
  findProfile,
  getRequestDeliveryForCollector,
} from '../../../utils/utils';
import Waiting from '../../../components/Waiting';
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';

const RequestDetail = ({ id }) => {
  const [request, setRequest] = useState({});
  const [user, setUser] = useState();
  const [delivery, setDelivery] = useState();

  const {
    wallet,
    address,
    connected,
    select,
    connect,
    disconnect,
    signMessage,
    signTransaction,
  } = useWallet();

  const getRequest = async () => {
    const request = await getRequestById(id);

    console.log(request.data);
    setRequest(request.data);
  };

  useEffect(() => {
    getRequest();
  }, [id]);

  const [fulfillRequest, setfulfillRequest] = useState();
  const [confirmTransfer, setConfirmTransfer] = useState();
  const [successTransfer, setSuccessTransfer] = useState();
  const [deliverySize, setDeliverySize] = useState(0);

  const handlefulfillRequest = () => {
    setfulfillRequest(!fulfillRequest);
  };
  const handleconfirmTransfer = () => {
    setConfirmTransfer(!confirmTransfer);
  };
  const handleSuccessTransfer = () => {
    setConfirmTransfer(false);
    setSuccessTransfer(!successTransfer);
  };

  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    'Fulfill request',
    'Waiting for Approval',
    'Gather Plastics',
    'Complete',
  ];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return (
          <StepOne
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
            data={request}
            setDeliverySize={setDeliverySize}
            quantity={request.quantity_required}
          />
        );
      case 2:
        return (
          <StepApprove
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
            data={request}
            quantity={deliverySize}
          />
        );
      case 3:
        return (
          <StepTwo
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
            data={request}
            quantity={deliverySize}
          />
        );

      case 4:
        return <Final />;
      default:
    }
  };

  const createDelivery = async () => {
    const payload = JSON.stringify({
      requestId: id,
      collectorId: user.id,
      delivery_size: deliverySize,
    });

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/deliveries`,
      {
        method: 'POST',
        body: payload,
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const delivery = await res.json();

    setDelivery(delivery.data);
  };

  const getUser = async () => {
    const profile = await findProfile(address, 'collectors');

    console.log(profile, 'User');
    setUser(profile.data);
  };

  const getDelivery = async () => {
    if (user.id && request.id) {
      const res = await getRequestDeliveryForCollector(request.id, user.id);

      console.log(res, 'Delivery');
      setDelivery(res.data);
    }
  };

  useEffect(() => {
    if (address) {
      getUser();
    }
  }, [connected]);

  useEffect(() => {
    if (user && request) {
      getDelivery();
    }
  }, [user, request]);

  const handleClick = (direction) => {
    let newStep = currentStep;

    switch (newStep) {
      case 1: //Create Delivery
        createDelivery();
        break;
    }

    direction === 'next' ? newStep++ : newStep--;
    // check if steps are within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  useEffect(() => {

    if (delivery?.delivery_status) {
      switch (delivery.delivery_status) {
        case 'AWAITING_APPROVAL':
          setCurrentStep(2);
          setDeliverySize(delivery.delivery_size);
          break;
        case 'APPROVED':
          setCurrentStep(3);
          setDeliverySize(delivery.delivery_size);
          break;
      }
    }
  }, [delivery]);

  return (
    <>
      <UserLayout>
        <div>
          {request && (
            <section className="py-12">
              <div className="container mx-auto px-6">
                <div className="md:px-6 ">
                  <div className="flex items-start w-full py-6 gap-9 flex-col lg:flex-row">
                    <div className="w-full lg:w-4/12">
                      <div className="px-4 py-3 ">
                        <div className="flex w-full py-4 pb-10 mb-8 items-center">
                          <h3 className="h2  mt-3">Request Details</h3>
                        </div>

                        <div className="card shadow-lg rounded-md">
                          <div className="">
                            <div className="w-full h-56">
                              <img
                                src="/images/marketimage.png"
                                className="w-full h-full object-cover rounded-md"
                              />
                            </div>
                          </div>
                          <div className=" flex items-start justify-between mt-3 px-5 py-4 flex-col w-full gap-2">
                            <div className="flex items-center justify-between w-full">
                              <h4 className="font-semibold text-[#3D4044] text-lg">
                                {request.title}
                              </h4>
                            </div>

                            <div className="flex items-center justify-between w-full">
                              <h4 className="font-semibold text-[#3D4044] text-lg">
                                {request?.scrap_subcategory?.name}
                              </h4>
                              <p>{request.quantity_required}kg</p>
                            </div>

                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center justify-start gap-2">
                                <img src="/images/location.svg" className="" />
                                <div>
                                  <p className="text-base text-[#6D747D]">
                                    {request?.collection_center?.title}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flex  w-full flex-row gap-2">
                              <div className="w-full">
                                <p className="text-xs text-[rgb(135,138,144)]">
                                  {request.description?.substring(0, 150)}
                                </p>
                              </div>
                            </div>
                            <div className="w-full   flex-row ">
                              <p className="text-xs">Request expires in:</p>
                              <div>
                                <p className="text-base text-[#3D4044] font-semibold capitalize">
                                  {/* 12d : 24h : 34m : 32s */}
                                  {dateConv(request.request_expires_at)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-5 py-4 relative rounded-full flex-1  items-center grow flex w-full ">
                          <div className="rounded-full w-full bg-gray-200 h-2">
                            <div
                              className="bg-[#DD7D37] h-2 rounded-full wrapper relative "
                              style={{ width: '55%' }}
                            ></div>
                          </div>

                          <div className="h-10 w-10">
                            <img
                              src="/images/plastics.svg "
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-full lg:w-8/12">
                      <div className="px-4 py-3 ">
                        <div>
                          <FormStepper
                            steps={steps}
                            currentStep={currentStep}
                          />
                        </div>

                        <UseContextProvider>
                          {displayStep(currentStep)}
                        </UseContextProvider>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {!request && (
            <section className="py-12">
              <div className="container mx-auto px-6">
                <Waiting />
              </div>
            </section>
          )}
        </div>
      </UserLayout>
    </>
  );
};

RequestDetail.getInitialProps = ({ query }) => {
  return { id: query.id };
};

export default RequestDetail;
