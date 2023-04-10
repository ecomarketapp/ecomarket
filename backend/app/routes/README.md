## Delivery Endpoints

### Get all deliveries for a request

**Endpoint**

- `/requests/:id/deliveries`

**Type**

- `GET`

**Params**

- `:id` - Request ID

**Body Fields**

- None

**Returns**
- `status: true`
- `deliveries` array, containing:
    - all deliveries
    - deliveries pending approval
    - deliveries approved
    - deliveries with reward claimed
    - deliveries disputed
---

### Create delivery

**Endpoint**

- `/deliveries`

**Type**

- `POST`

**Params**

- None

**Body Fields**

- `collectorId`
- `requestId`

**What it does**

- checks if request has expired. if yes, `403` error is sent and delivery can't be created

**Returns**
- `status: true`
- `delivery` object, with delivery details from DB
    - `delivery.can_claim` which is a boolean that highlights if the collector can claim the delivery
    - `delivery.collector`, which are the collector details
---

### Get single delivery details

**Endpoint**

- `/deliveries/:id`

**Type**

- `GET`

**Params**

- `:id` - delivery ID

**Body Fields**

- None

**Returns**
- `status: true`
- `delivery` object, with delivery details from DB
    - `delivery.can_claim` which is a boolean that highlights if the collector can claim the delivery
    - `delivery.collector`, which are the collector details
---
### Approve delivery

**Endpoint**

- `/deliveries/:id/approval`

**Type**

- `POST`

**Params**

- `:id` - delivery ID

**Body Fields**

- `approver_signature`
- `approver_wallet_address`: we first use this to validate that the company trying to approve the delivery is the owner of the request. We also add it to the `delivery` document as a field afterwards.
- `requestId`: to verify that request has not expired before approving delivery

**What it does**

- first checks that request has not expired. if it has, a `403` is sent and delivery can't be approved
- can only be done by company, so it then makes sure the logged-in user doing this approval is the company that owns the request
- Check if the delivery exists, and that it is awaiting approval. if it doesn't, throws an error
- if valid, it updates the delivery status, and adds approval date, approver signature, and approver wallet address

**Returns**
- `status: true`
- `delivery` object, with delivery details from DB
    - `delivery.can_claim` which is a boolean that highlights if the collector can claim the delivery
    - `delivery.collector`, which are the collector details
---
### Approve delivery

**Endpoint**

- `/deliveries/:id/completion`

**Type**

- `POST`

**Params**

- `:id` - delivery ID

**Body Fields**

- `delivery_size - Number`
- `delivery_amount - Number`: this is the total amount that will be received when claiming
- `delivery_proof - Mixed`: this ideally should be a series of URLs containing links to images and videos. the upload itself should be handled by an external service
- `collector_wallet_address`: we use this to validate that the person trying to complete the delivery is the one who created it in the first place
- `requestId`: to verify that request has not expired before completing delivery

**What it does**

- first checks that request has not expired. if it has, a `403` is sent and delivery can't be approved
- then, check delivery expiry, just to be safe. if expired, it sets status to expired and approval won't work. returns a `403` error
- makes sure the logged-in user completing this delivery is the collector that set up the initial delivery. if no, returns a `403` error
- makes sure size, amount and proof are provided, and if not, sends a `403` error
- if they are present, check for `APPROVED` delivery. if it doesn't exist, push a `404` error
- if approved delivery is found, it adds the size, amount, and proof, sets the status to `DELIVERED`, and also adds delivery date

**Returns**
- `status: true`
- `delivery` object, with delivery details from DB
    - `delivery.can_claim` which is a boolean that highlights if the collector can claim the delivery
    - `delivery.collector`, which are the collector details
---
### Claim reward for delivery

**Endpoint**

- `/deliveries/:id/rewards`

**Type**

- `POST`

**Params**

- `:id` - delivery ID

**Body Fields**

- `collector_wallet_address`: we use this to validate that the person trying to claim the reward for the delivery is the one who created it in the first place
- `requestId`: to verify that request has not expired before claiming delivery reward

**What it does**

To use this endpoint, I'd recommed first checking the `delivery.can_claim` property when you access `/deliveries/:id` on the page. If `can_claim` is true, then add the other required fields, and proceed with the endpoint.

Now, to what the endpoint does:

- first checks that request has not expired. if it has, a `403` is sent and delivery reward can't be claimed
- then, checks delivery expiry, just to be safe. if expired, it sets delivery status to expired and returns a `403` error
- makes sure the logged-in user claiming the reward for this delivery is the collector that set up the initial delivery. if it fails, a `403` eerror is returned
- check conditions for claiming
    - `delivery_status` is `DELIVERED`
    - `approver_signature` exists
    - delivery date is past 48 hours, (cool-off period has expired)
    - N.B - we DON'T check that signer address matches company address - since in `approveDelivery`, we've made sure the company adding the address is valid
- if any of the above checks fails, we push an error (`404` or `403`, depending on the specific condition).
- if delivery is valid for claim, run a  delivery is found, it adds the size, amount, and proof, sets the status to `DELIVERED`, and also adds delivery date

**Returns**
- `status: true`
- `delivery` object, with delivery details from DB
    - `delivery.collector`, which are the collector details