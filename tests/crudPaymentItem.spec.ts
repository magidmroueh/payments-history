import request from 'supertest'
require('dotenv').config();

const server = process.env.BASE_URL + ":" + process.env.PORT;
let paymentId = 0;
const createpaymentItem = `mutation { 
  createPaymentItem( 
    item: { contractId: 123, description: "payment", value: 200, time: "2016-12-09T00:00:00.00Z" }
    ) { status items {id}}}`

describe('POST /createPaymentItem', () => {
  it('should add new payment item to the database', async done => {
    request(server)
      .post(`/graphql`)
      .send({
        query: createpaymentItem
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.text).toContain('"status":"success"')
        const parsedResponse = JSON.parse(res.text)
        paymentId = parsedResponse.data.createPaymentItem.items[0].id
        done()
      })
  })
})

const updatePaymentItem = `mutation updatePayment {
  updatePaymentItem(
    id: 7
    item: { contractId: 123, description: "payment", value: 250 }
  ) {
    status
    items {
      id
    }
  }
}`

describe('POST /updatePaymentItem', () => {
  it('should update a payment item in the database', async done => {
    request(server)
      .post(`/graphql`)
      .send({
        query: updatePaymentItem
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.text).toContain('data')
        done()
      })
  })
})

const deletePaymentItem = `mutation deletePayment {
  deletePaymentItem(id: 8) {
    status
    items {
      id
    }
  }
}`
describe('POST /deletePaymentItem', () => {
  it('should set the payment as deleted', async done => {
    request(server)
      .post(`/graphql`)
      .send({
        query: deletePaymentItem
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.text).toContain('data')
        done()
      })
  })
})