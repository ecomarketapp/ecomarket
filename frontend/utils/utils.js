async function findProfile(address, type = 'companies') {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/${type}/${address}`
  );


  const data = await res.json();

  console.log(data, type)

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
