async function findProfile(address, type = 'companies') {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/${type}/${address}`
    );
    const data = res.json();

    if (res.ok) {
      return data;
    } else {
      return { status: false, data: { name: undefined } };
    }
  } catch (error) {
    console.log(error);

    return { status: false, data: { name: '' } };
  }
}

async function getCategories() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/categories`
  );

  const data = await res.json();

  return data;
}

async function getCollectionLocations() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/locations`
  );

  const data = await res.json();

  return data;
}

async function getCollectionCenter(company) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/companies/${company}/collectioncenters`
  );

  const data = await res.json();

  return data;
}

async function getCompanyRequests(company) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/companies/${company}/requests`
  );

  const data = await res.json();

  return data;
}

async function getCollectorDeliveries(collector) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/deliveries/${collector}/collector`
  );

  const data = await res.json();

  return data;
}

async function getRequestById(request) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/requests/${request}`
  );

  const data = await res.json();

  return data;
}

async function getDeliveryById(delivery) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/deliveries/${delivery}`
  );

  const data = await res.json();

  return data;
}

async function getRequestDelivery(request) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/requests/${request}/deliveries`
  );

  const data = await res.json();

  return data;
}

async function getRequestDeliveryForCollector(request, collector) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/requests/${request}/collectors/${collector}`
  );

  const data = await res.json();

  return data;
}

async function getRequestsByLocation(location) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/locations/${location}/requests`
  );

  const data = await res.json();

  return data;
}

async function newProfile(address, type = 'companies') {
  const payload = JSON.stringify({ wallet: address });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/${type}`,
    {
      method: 'POST',
      body: payload,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const data = await res.json();

  return data;
}

async function finalizeDelivery(deliveryID, collectorWalletAddress, requestID) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/deliveries/${deliveryID}/rewards`,
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        collector_wallet_address: collectorWalletAddress,
        requestId: requestID,
      }),
    }
  );

  const data = await res.json();

  return data;
}

function getPage() {
  return window.location.pathname.split('/')[1];
}

const dateConv = (date) => {
  const newDate = new Date(date);

  return `${newDate.getUTCDay()} d : ${newDate.getUTCHours()} h : ${newDate.getUTCMinutes()} m : ${newDate.getUTCSeconds()} s`;
};

const getTrxPrice = async () => {
  const res2 = await fetch(
    'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=TRX&tsyms=USD'
  );

  const data = await res2.json();

  if (res2.ok) {
    const price = data.RAW.TRX.USD.PRICE;

    console.log('TRX price:', price);
    return price;
  } else {
    return 0;
  }
};

export {
  findProfile,
  newProfile,
  getPage,
  getCollectionCenter,
  getCategories,
  getCompanyRequests,
  getCollectionLocations,
  getRequestsByLocation,
  getRequestById,
  dateConv,
  getRequestDelivery,
  getRequestDeliveryForCollector,
  getDeliveryById,
  getTrxPrice,
  getCollectorDeliveries,
  finalizeDelivery,
};
