import request from "supertest";
import app from "../utils/app";
import bcrypt from "bcryptjs";
import type { Server } from "http";
import {
  createUser,
  findUser,

  deleteUser,
} from "../services/user.service";
import mongoose from "mongoose";
import redisClient from "../utils/connectRedis";
// define reusable password value
const password: string = "12345678";
const email: string = "test@login.com";
const userName: string = "testUser";
const firstName: string = "test";
const lastName: string = "user";
let server:Server
describe("Test route for login", () => {
    beforeAll( async ()=>{
        server = app.listen(8888)
        await redisClient.connect()
    })
  beforeEach(async () => {
    // encrypt reusable password
    const hashed_password = await bcrypt.hash(password, 12);
    // create user
    await createUser({
      email: email,
      userName: userName,
      firstName: firstName,
      lastName: lastName,
      password: hashed_password,
    });

    afterEach(async () => {
      await deleteUser(email);
    });
    afterEach(async () => {
        await redisClient.quit();
      });
    afterAll(async () => {
      try {
        await deleteUser(email );
      } catch (e) {}
    });
    afterAll(async () => {
        // Closing the DB connection allows Jest to exit successfully.
        await redisClient.quit();
       
      });
 

    test("Login: Test for valid inputs should redirect", (done) => {
      request(app)
        .post("/api/auth/login")
        .send({
          email: email,
          password: password,
        })
        .then((response: any) => {
          expect(response.statusCode).toBe(302);
          done();
        });
    });

    test("Login: Test for invalid email", (done) => {
      request(app)
        .post("/api/auth/login")
        .send({
          email: "invalid@test.com",
          password: password,
        })
        .then((response: any) => {
          expect(response.statusCode).toBe(400);
          done();
        });
    });

    test("Login: Test for invalid password", (done) => {
      request(app)
        .post("/api/auth/login")
        .send({
          email: email,
          password: "wrongPassword123",
        })
        .then((response: any) => {
          expect(response.statusCode).toBe(400);
          done();
        });
    });
  });
});
