import dotenv from "dotenv";
import supertest from "supertest";
import server from "../src/server";
import mongoose from "mongoose";
import ProductModel from "../src/models/products/index.js";
dotenv.config();

const request = supertest(server);

beforeAll((done) => {
  console.log(process.env.ATLAS_URL);
  mongoose
    .connect(process.env.ATLAS_URL + "/test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => {
      console.log("Successfully connected to Atlas in test.");
      done();
    });
});

afterAll((done) => {
  mongoose.connection.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

describe("Stage I - Testing the env", () => {
  it("should test that true is true", () => {
    expect(true).toBe(true);
  });

  it("should test that false is not true", () => {
    expect(false).not.toBe(true);
  });

  it("should test that false is falsy", () => {
    expect(false).toBeFalsy();
  });

  it("should expect that the test key is 123", () => {
    console.log(process.env.TEST_KEY);
    expect(process.env.TEST_KEY).toBeDefined();
    expect(process.env.TEST_KEY).toBe("123");
  });
});

describe("Checking application main endpoints", () => {
  it("should check that the /test endpoint is working", async () => {
    const response = await request.get("/test");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Test success!");
  });

  it("should check that the /products endpoint is working", async () => {
    const response = await request.get("/products");
    expect(response.status).toBe(200);
    expect(response.body.products).toBeDefined();
    expect(response.body.products.length).toBe(0);
  });

  const validData = {
    description: "Test product",
    price: 30,
  };

  it("should check that the /products endpoint is allowing POST requests with valid data", async () => {
    const response = await request.post("/products").send(validData);
    expect(response.status).toBe(201);
    expect(response.body._id).toBeDefined();
    expect(response.body.description).toEqual(validData.description);
  });

  const invalidData = {
    description: "Test product",
  };

  it("should check that the /products endpoint is NOT allowing POST requests with invalid data", async () => {
    const response = await request.post("/products").send(invalidData);
    expect(response.status).toBe(400);
    expect(response.body._id).not.toBeDefined();
  });

  it("should test that the /products endpoint is returning valid data after creating", async () => {
    const response = await request.post("/products").send(validData);

    expect(response.body._id).toBeDefined();

    const product = await ProductModel.findById(response.body._id);

    expect(product.createdAt).toStrictEqual(new Date(response.body.createdAt));
  });

  it("should test that the /products endpoint is returning all the products available", async () => {
    const productResponse = await request.post("/products").send(validData);

    const response = await request.get("/products");

    const included = response.body.products.some(
      (product) => product._id === productResponse.body._id
    );

    expect(included).toBe(true);
  });

  it("should test that status code is correct for not found /products/:id", async () => {
    const params = "101010101010101010010100";

    const response = await request.get("/products/" + params);

    const product = await ProductModel.findById(params);
    if (!product) {
      expect(response.status).toBe(404);
    } else {
      expect(response.status).toBe(200);
    }
  });

  it("should test that the delete endpoint is returning the correct status code", async () => {
    const product = await ProductModel.create({
      description: "Test for deletion",
      price: 50,
    });
    const { _id } = product;

    const response = await request.delete("/products/" + _id);

    expect(response.status).toBe(204);
  });
});
