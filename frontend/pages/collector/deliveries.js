import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { Tabs } from 'react-tabs';
import Tab from 'react-tabs/lib/components/Tab';
import TabList from 'react-tabs/lib/components/TabList';
import TabPanel from 'react-tabs/lib/components/TabPanel';
import UserLayout from '../../components/UserLayout/Layout';
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import { useRouter } from 'next/router';

import {
  findProfile,
  newProfile,
  getPage,
  dateConv,
  getCollectorDeliveries,
} from '../../utils/utils';

const Deliveries = () => {
  const [user, setUser] = useState();
  const [pendingDeliveries, setPendingDeliveries] = useState([]);
  const [completedDeliveries, setCompletedDeliveries] = useState([]);
  const router = useRouter();

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

  const getUser = async () => {
    const profile = await findProfile(address, 'collectors');

    if (!profile?.status) {
      router.push(`/${getPage()}/profile`);
    } else {
      if (!profile?.data?.name) {
        router.push(`/${getPage()}/profile`);
      }
      setUser(profile?.data);
    }
  };

  const getDeliveries = async (user) => {
    const deliveries = await getCollectorDeliveries(user.id);

    console.log(deliveries?.data?.approved, 'Approved');
    setPendingDeliveries(deliveries?.data?.pending_approval);
    setCompletedDeliveries(deliveries?.data?.approved);
  };

  useEffect(() => {
    if (address) {
      getUser(address);
    }
  }, [address]);

  useEffect(() => {
    if (user) {
      console.log(user, 'User');
      getDeliveries(user);
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Ecomarket | Collector Deliveries</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Ecomarket Collector Deliveries" />
      </Head>

      <UserLayout>
        <section className="eco__orders">
          <div className="container mx-auto px-6">
            <div className="h-full pb-24 px-4 md:px-12 py-12">
              <Tabs>
                <div className="flex items-center py-4 mb-3 flex-col lg:flex-row">
                  <div className="flex-1 w-full">
                    <h3 className="h2">Deliveries</h3>
                  </div>

                  <TabList className="flex flex-row items-center justify-end  tabs-header rounded-md gap-3">
                    <Tab className="">
                      <button className="flex items-center text-sm border-white border-1 px-5 py-2 rounded h-12">
                        Awaiting Approval
                      </button>
                    </Tab>
                    <Tab className="">
                      <button className="flex items-center text-sm border-white border-1 px-5 py-2 rounded h-12">
                        Completed
                      </button>
                    </Tab>
                  </TabList>
                </div>

                <div className="py-6">
                  <TabPanel>
                    <div className=" w-full bg-white mt-3 md:mt-0  relative overflow-hidden rounded h-full fade-in">
                      {pendingDeliveries.length > 0 ? (
                        pendingDeliveries.map((delivery) => (
                          <div className="flex items-start gap-3 w-full">
                            <div className="w-full">
                              <div className="flex gap-1 items-center flex-row justify-between w-full">
                                <p className="text-lg text-[#5B5B5B] font-semibold">
                                  {delivery?.request?.title}
                                </p>

                                <p className="text-xs font-normal">
                                  Status: {delivery.delivery_status} on{' '}
                                  {dateConv(delivery.updatedAt)}
                                </p>
                              </div>
                              <div className="flex gap-1 flex-row justify-between items-end w-full">
                                <p className="text-sm text-[#5B5B5B] font-normal">
                                  Volume provided: {delivery.delivery_size}kg
                                </p>
                                <p className="text-sm text-[#12B76A]">
                                  {(delivery.delivery_size /
                                    delivery?.request?.total_amount) *
                                    100}
                                  % Provided
                                </p>
                              </div>
                              <div className="flex gap-1 flex-row justify-between items-center w-full">
                                <p className="text-sm text-[#5B5B5B] font-normal">
                                  Offer:{' '}
                                  {delivery.request.amount_per_unit *
                                    delivery.request.quantity_required}{' '}
                                  TRX / for {delivery.request.amount_per_unit}{' '}
                                  kg (Earned:{' '}
                                  {delivery.request.amount_per_unit *
                                    delivery.delivery_size}{' '}
                                  TRX)
                                </p>
                              </div>

                              <div className="flex gap-1 flex-row justify-between items-end w-full">
                                <p className="text-sm">
                                  Dropoff location:{' '}
                                  {delivery.request?.collection_center?.title}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="flex items-center justify-center flex-col gap-4">
                          <img src="/images/file-not-found.svg" />
                          <p>You have no pending orders yet.</p>
                        </div>
                      )}
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className=" w-full bg-white mt-3 md:mt-0  relative overflow-hidden rounded h-full fade-in">
                      {completedDeliveries.length > 0 ? (
                        completedDeliveries.map((delivery) => (
                          <div className="flex items-start gap-3 w-full border py-4 px-4">
                            <div className="w-full">
                              <div className="flex gap-1 items-center flex-row justify-between w-full">
                                <p className="text-lg text-[#5B5B5B] font-semibold">
                                  {delivery?.request?.title}
                                </p>

                                <p className="text-xs font-normal">
                                  {dateConv(delivery?.updatedAt)}
                                </p>
                              </div>
                              <div className="flex gap-1 flex-row justify-between items-end w-full">
                                <p className="text-sm text-[#5B5B5B] font-normal">
                                  Volume provided: {delivery.delivery_size}kg
                                </p>
                                <p className="text-sm text-[#12B76A]">
                                  {(delivery.delivery_size /
                                    delivery?.request?.total_amount) *
                                    100}
                                  % Provided
                                </p>
                              </div>
                              <div className="flex gap-1 flex-row justify-between items-center w-full">
                                <p className="text-sm text-[#5B5B5B] font-normal">
                                  Offer: {delivery.request.total_amount} TRX for{' '}
                                  {delivery.request.quantity_required} kg
                                  (Earned:{' '}
                                  {delivery.request.amount_per_unit *
                                    delivery.delivery_size}{' '}
                                  TRX)
                                </p>
                              </div>

                              <div className="flex gap-1 flex-row justify-between items-end w-full">
                                <p className="text-sm font-semibold ">
                                  Status: {delivery.delivery_status}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="flex items-center justify-center flex-col gap-4">
                          <img src="/images/file-not-found.svg" />
                          <p>You have no completed orders yet.</p>
                        </div>
                      )}
                    </div>
                  </TabPanel>
                </div>
              </Tabs>

              {/* <div className="mt-1 relative rounded-full flex-1  items-center grow flex h-12 w-full ">
                                <div className=" font-normal flex items-center justify-end flex-row gap-3 flex-1">
                            
                                    
                                    
                                </div>
                            </div> */}
            </div>
          </div>
        </section>
      </UserLayout>
    </>
  );
};

export default Deliveries;
