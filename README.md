# EcoMarket

EcoMarket is an open marketplace that directly connects buyers of used and recycled plastics with individuals and businesses who want to donate or sell them.

For more details on the vision of EcoMarket, and how it works, refer to [its BUIDL page](https://dorahacks.io/buidl/4860) on DoraHacks.

## Prerequisites

- TRONLink Wallet
- Node, npm, and Yarn
- MongoDB

## Running the application

### Step 1: Clone this repo

`git clone https://github.com/ChainBuilderPO/ecomarket.git`

### Step 2: Run the backend

From within the cloned repo, go to the `backend` folder and do these:

1. Rename the `.env.example` file to `.env`

2. Add relevant variables to the `.env` file.

    - `DELIVERY_EXPIRY_DEFAULT` is the period after which a delivery expires if not completed by a recycler.

    - `COOL_OFF_PERIOD` is the period after which a recycler can claim their rewards, if no dispute was raised by the company.


3. Install dependencies

        npm install

4. Seed sample data, if you like
        
        node seeders/LocationSeeder.js
        node seeders/CategorySeeder.js
        node seeders/CompanySeeder.js
        node seeders/CollectionCenterSeeder.js
        node seeders/CollectorSeeder.js
        node seeders/RequestsSeeder.js

5. start backend

        npm run start:dev

### Step 3: Run the frontend

Browse to the `frontend` folder from the repo, and:

1. Install dependencies

        yarn

2. Run the frontend

        yarn dev

## Smart Contract

The EcoMarket smart contract is currently deployed on the TRON Sashta testnet:

- [EcoMarket contract](https://shasta.tronscan.org/?_ga=2.135466097.1721870514.1681050596-2119576196.1681050596#/address/TEiWrhHweK4haxPXgNcRbropX4prMuLUYy)

- Contract Address - `TEiWrhHweK4haxPXgNcRbropX4prMuLUYy`
