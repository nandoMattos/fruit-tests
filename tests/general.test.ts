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
})
