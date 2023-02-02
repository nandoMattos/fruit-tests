import app from "index";
import supertest from "supertest";

const api = supertest(app);

describe("GET /fruits", () => {
  it("Should return 200", async () => {
    const result = await api.get("/fruits");

    expect(result.statusCode).toBe(200);

    expect(result.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          price: expect.any(Number),
        }),
      ])
    );
  });
});

describe("GET fruits/:id", () => {
  it("Should respond with status code 200 when sent an id valid!", async () => {
    const result = await api.get("/fruits/4");

    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        price: expect.any(Number),
      })
    );
  });

  it("Should respond with status code 404 when sent an id not valid!", async () => {
    const result = await api.get("/fruits/0");
    expect(result.statusCode).toBe(404);
  });
});

describe("POST fruits", () => {
  it("Should respond with status code 422 when body is invalid", async () => {
    const result = await api.post("/fruits");

    expect(result.statusCode).toBe(422);
  });

  it("Should respond with status code 409 when fruit is already registered", async () => {
    const result = await api.post("/fruits").send({
      name: "Maçã",
      price: 1234123,
    });

    expect(result.statusCode).toBe(409);
  });

  it("Should respond with status code 201 when body is valid and no conlifct", async () => {
    const result = await api.post("/fruits").send({
      name: "Limão",
      price: 13123123,
    });

    expect(result.statusCode).toBe(201);
  });
});
