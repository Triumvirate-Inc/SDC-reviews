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
          "135219": 1,
          "135220": 2,
          "135221": 3,
          "135222": 4
      }
    });
    expect(response.status).to.eql(201);
  });
});

describe("PUT /reviews mark helpful", () => {
  it("can post a review", async function() {
    const response = await request.post('/reviews/622261356961da27eb9ca23e/helpful').send();
    expect(response.status).to.eql(201);
  });
});

describe("PUT /reviews report review", () => {

});