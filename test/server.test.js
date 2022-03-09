const request = require('supertest')('http://localhost:3000/SDC/api');
const expect = require('chai').expect;
const express = require('express');

describe("GET /reviews", () => {
  it("returns reviews for a product", async function() {
    const response = await request.get('/reviews').query({ product_id: 40344 });
    expect(response.status).to.eql(200);
    expect(response.body.product).to.eql("40344");
  });
  it("returns an empty array for a non-existant product", async function() {
    const response = await request.get('/reviews').query({ product_id: 403440000 });
    expect(response.status).to.eql(200);
    expect(response.body.results.length).to.eql(0);
  });
});

describe("GET /reviews/meta", () => {
  it("returns the meta data for a product", async function() {
    const response = await request.get('/reviews/meta').query({ product_id: 40344 });
    expect(response.status).to.eql(200);
    expect(response.body).to.have.own.property('product_id');
    expect(response.body).to.have.own.property('ratings');
    expect(response.body).to.have.own.property('recommended');
    expect(response.body).to.have.own.property('characteristics');
  })
});

describe("POST /reviews", () => {
  it("can post a review", async function() {
    const response = await request.post('/reviews').send({
      "product_id": 40344,
      "rating": 3,
      "summary": "what up",
      "body": "adfuheqrguegrugrenjgfjnfgjnfaff aadfsjfdkjdfasjkldfasjkladfsj",
      "recommend": true,
      "name": "Bill",
      "email": "notReal@notReal.com",
      "photos": [],
      "characteristics": {
          "134988": 5,
      }
    });
    expect(response.status).to.eql(201);
  });
  it("recieves a 500 for adding an invalid review", async function() {
    const response = await request.post('/reviews').send({
      "product_id": 40344,
      "summary": "what up",
      "body": "adfuheqrguegrugrenjgfjnfgjnfaff aadfsjfdkjdfasjkldfasjkladfsj",
      "recommend": true,
      "name": "Bill",
      "email": "notReal@notReal.com",
      "photos": [],
      "characteristics": {
          "134988": 5,
      }
    });
    expect(response.status).to.eql(500);
  });
});

describe("PUT /reviews mark helpful", () => {
  it("can mark a review helpful ", async function() {
    const response = await request.put('/reviews/622261356961da27eb9ca23a/helpful');
    expect(response.status).to.eql(201);
  });
});

// describe("PUT /reviews report review", () => {
//   it("can report a review", async function() {
//     // post, get, report, get
//     const posted = await request.post('/reviews').send({
//       "product_id": 40344,
//       "rating": 3,
//       "summary": "a review not long for the world",
//       "body": "I exist to be reported fillerfillerfillerfillerfillerfillerfillerfillerfillerfillerfiller",
//       "recommend": true,
//       "name": "Bill",
//       "email": "notReal@notReal.com",
//       "photos": [],
//       "characteristics": {
//         "134988": 5,
//       }
//     });
//     expect(posted.status).to.eql(201);
//     const retrieved =  await request.get('/reviews').query({ product_id: 40344, sort: 'newest' });
//     console.log(retrieved);
//     expect(retrieved.results[0].summary).to.be("a review not long for this world");
//     await request.put(`/reviews/${retrived.results[0].review_id}/report`).send();
//     const findReported = await request.get('/reviews').query({ product_id: 40344, sort: 'newest' });
//     expect(findReported.results[0].review_id).to.not.be("a review not long for this world");
//   });
// });