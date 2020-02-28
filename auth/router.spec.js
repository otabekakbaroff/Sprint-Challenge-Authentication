const request = require("supertest");

const server = require("../api/server.js");

describe("users router", function() {
  it("should run the tests", function() {
    expect(true).toBe(true);
  });

  describe("POST /api/auth/register", function() {
    it("should return 500, UNIQUE constraint", function() {
      return request(server)
        .post("/api/auth/register")
        .send({
            "username": "username4",
            "password": "123"
       })
        .then(res => {
          expect(res.status).toBe(500);
        });
    });

    it("should return JSON formatted body", function() {
      return request(server)
        .post("/api/auth/register")
        .send({
            "username": "username2",
            "password": "123"
       })
        .then(res => {
          expect(res.type).toMatch(/json/);
        });
    });
  });
  describe("POST /api/auth/login", function() {
    it("should return 500, UNIQUE constraint", function() {
      return request(server)
        .post("/api/auth/login")
        .send({
            "username": "username1",
            "password": "123"
       })
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it("should return JSON formatted body", function() {
      return request(server)
        .post("/api/auth/login")
        .send({
            "username": "username1",
            "password": "123"
       })
        .then(res => {
          expect(res.body.message).toBe('You\'re logged in!!!');
        });
    });
  });
});
