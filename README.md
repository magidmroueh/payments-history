## Pre-requisites

- Make sure you have [Docker](https://www.docker.com/) installed on your machine.
- Make sure you have [NodeJS](https://nodejs.org/en/) installed on your machine.

Then run the following commands

**npm**

```bash
git clone https://github.com/magidmroueh/payment-history.git
cd payment-history
npm install
```

### .env file

1. copy `.env.example` to .env 
2. Copy and paste the database connection information below: (you can change the values)

```bash
PORT=4000
POSTGRES_USER=magid
POSTGRES_PASSWORD=1234
POSTGRES_HOST=localhost
POSTGRES_DB=payments
POSTGRES_PORT=54320
BASE_URL=http://localhost
```

### Database

to build the Postgres container and create the database, run:

```bash
docker-compose up -d
```

### Seeding data

**dump data**

To initialize the dump data for a database, run:

```bash
npm run seed
```

## Development

To run on development environment

```bash
npm run dev
```

### Testing

To run the Test suits, run: (make sure the project is running)

```bash
npm run test
```

## Playground

On your browser, open:

- [http://localhost:4000/graphql](http://localhost:4000/graphql)

**query - without param**

```bash
query getPaymentsWithoutParams {
  PaymentItem {
    sum
    items {
      id
      contractId
      description
      value
      time
      isImported
      createdAt
      updatedAt
      isDeleted
    }
  }
}
```

**query - with param**

```bash
query getPayments {
  PaymentItem(contractId: 17689, startDate: "2016-12-09", endDate: "2016-12-09") {
    sum
    items {
      id
      contractId
      description
      value
      time
      isImported
      createdAt
      updatedAt
      isDeleted
    }
  }
}
```

**mutation - createPaymentItem**

```bash
mutation createPayment {
  createPaymentItem(
    item: { contractId: 123, description: "payment", value: 200, time: "2016-12-09T00:00:00.000Z" }
  ) {
    status
    items {
      id
    }
  }
}
```

**mutation - updatePaymentItem**

```bash
mutation updatePayment {
  updatePaymentItem(
    id: 9
    item: { contractId: 123, description: "payment", value: 250 }
  ) {
    status
    items {
      id
    }
  }
}
```

**mutation - deletePaymentItem**

```bash
mutation deletePayment {
  deletePaymentItem(id: 10) {
    status
    items {
      id
    }
  }
}
```

# Usage

With `express-graphql`, you can just send an HTTP **POST** request to the endpoint you mounted your GraphQL server on, passing the GraphQL query as the query field in a JSON payload.

**POST cURL**

```bash
curl -X POST \
  http://localhost:4000/graphql \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
  "query":  "{ PaymentItem { sum items { id contractId description value time isImported createdAt updatedAt isDeleted}}}"
}'
```

**GET cURL** (url encoded)

```bash
curl -X GET \
  'http://localhost:4000/graphql?query=query%20getPayments%20%7B%0A%20%20PaymentItem%28contractId%3A%2017689%2C%20startDate%3A%20%222016-12-09%22%2C%20endDate%3A%20%222016-12-09%22%29%20%7B%0A%20%20%20%20sum%0A%20%20%20%20items%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20contractId%0A%20%20%20%20%20%20description%0A%20%20%20%20%20%20value%0A%20%20%20%20%20%20time%0A%20%20%20%20%20%20isImported%0A%20%20%20%20%20%20createdAt%0A%20%20%20%20%20%20updatedAt%0A%20%20%20%20%20%20isDeleted%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D' \
  -H 'cache-control: no-cache'
```

**POST fetch**

```js
const contractId = '17689';
const startDate = '2016-12-09';
const endDate = '2016-12-09';
const query = `{ PaymentItem(contractId: "${contractId}", startDate: "${startDate}", endDate: "${endDate}"){ sum, items { id, contractId, description, value, time, isImported, createdAt, updatedAt, isDeleted } } }`;

fetch('/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  body: JSON.stringify({ query }),
})
  .then(res => res.json())
  .then(data => console.log('data returned:', data));
```

**GET fetch**

```js
const query = `
  PaymentItem($contractId:Integer, $startDate:String, $endDate:String){
    PaymentItem(contractId:$contractId, startDate: $stardDate, endDate: $endDate){
      sum
      items{
        id,
        contractId,
        description,
        value,
        time,
        isImported,
        createdAt,
        updatedAt,
        isDeleted
      }
    }
  }
`;

const variables = `{"contractId":17689, "startDate":"2016-12-09", "endDate":"2016-12-09"}`;

fetch(`/graphql?query=query+${query}&variables=${variables}`)
  .then(res => res.json())
  .then(data => console.log('data returned:', data));
```