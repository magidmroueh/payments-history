import request from 'supertest'
require('dotenv').config();

const server = process.env.BASE_URL + ":" + process.env.PORT;

describe('GET /PaymentItem', () => {
    it('should return a list of payments and status 200', async done => {
        const query = `query getPayments {
                PaymentItem(
                    contractId: 17689
                    startDate: "2016-12-09"
                    endDate: "2016-12-09"
                ) {
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
            }`

        const encodedQuery = encodeURI(query)

        request(server)
            .get(`/graphql?query=` + encodedQuery)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.text).toContain('data')
                done()
            })
    })
})