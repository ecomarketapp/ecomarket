async function findProfile(address) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/companies/${address}`
  );

  const data = await res.json();

  return data;
}

async function getCategories() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/categories`
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

async function newProfile(address) {
  console.log(address);
  const payload = JSON.stringify({ wallet: address });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/companies`,
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

function getPage() {
  return window.location.pathname.split('/')[1];
}

export {
  findProfile,
  newProfile,
  getPage,
  getCollectionCenter,
  getCategories,
  getCompanyRequests,
};
