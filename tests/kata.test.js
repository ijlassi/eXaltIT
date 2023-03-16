import app from "../server.js";
import * as db from "../app/config/db.config.js";
import supertest from "supertest";
const request = supertest(app);

describe("/api/user", () => {
  it("should create a user", async () => {
    const res = await request.post("/api/user").send({
      firstName: "test 5",
      lastName: "test 5",
      age: 18,
      phoneNumber: "0625197923",
      address: "france",
      passId: "64135c13c1af08bb8d35b5c2",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("success");
  });
});
describe("api/user", () => {
  it("should get all the users", async () => {
    const res = await request.get("/api/user");
    expect(res.statusCode).toBe(200);
  });
});
describe("api/user/:id", () => {
  it("should get user by id", async () => {
    const res = await request.get("/api/user/64135e41ac7ba57a28581ee6");
    expect(res.statusCode).toBe(200);
  });
});
describe("/api/user/:id", () => {
  it("should update a user data", async () => {
    const res = await request.put("/api/user/64135e41ac7ba57a28581ee6").send({
      firstName: "",
      lastName: "test test",
      age: 24,
      phoneNumber: 123456789,
      address: "",
      passId: "64135c13c1af08bb8d35b5c2",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("success");
  });
});
describe("/api/user/:id", () => {
  it("should delete a user", async () => {
    const res = await request.delete("/api/user/640f7e51b73a8e4c033bd89c");
    expect(res.statusCode).toBe(200);
  });
});
describe("/api/pass/", () => {
  it("should create a pass", async () => {
    const res = await request.post("/api/pass").send({
      level: 4,
      createdAt: "2023-03-16",
      updatedAt: "2023-03-16",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("success");
  });
});
describe("api/pass", () => {
  it("should get all the passes", async () => {
    const res = await request.get("/api/pass");
    expect(res.statusCode).toBe(200);
  });
});
describe("api/pass/:id", () => {
  it("should get pass by id", async () => {
    const res = await request.get("/api/pass/64135383beff5b6e1b221a36");
    expect(res.statusCode).toBe(200);
  });
});
describe("/api/pass/:id", () => {
  it("should update a pass data", async () => {
    const res = await request.put("/api/pass/64135383beff5b6e1b221a36").send({
      level: "",
      createdAt: "",
      updatedAt: "2023-03-16",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("success");
  });
});
describe("/api/pass/:id", () => {
  it("should delete a pass", async () => {
    const res = await request.delete("/api/pass/63f37ff4bea2e2aefbcd59b5");
    expect(res.statusCode).toBe(200);
  });
});
describe("/api/place", () => {
  it("should create a place", async () => {
    const res = await request.post("/api/place").send({
      address: "36 rue chardon lagache",
      phoneNumber: "0625197923",
      requiredPassLevel: 1,
      requiredAgeLevel: 18,
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("success");
  });
});
describe("api/place", () => {
  it("should get all the places", async () => {
    const res = await request.get("/api/place");
    expect(res.statusCode).toBe(200);
  });
});
describe("api/place/:id", () => {
  it("should get place by id", async () => {
    const res = await request.get("/api/place/64135e93864e81d4e59cd34b");
    expect(res.statusCode).toBe(200);
  });
});
describe("/api/place/:id", () => {
  it("should update a place data", async () => {
    const res = await request.put("/api/place/64135e93864e81d4e59cd34b").send({
      address: "36 rue chardon lagache",
      phoneNumber: "0625197923",
      requiredPassLevel: 5,
      requiredAgeLevel: 18,
    });
    expect(res.statusCode).toBe(200 || 404);
    expect(res.body.message).toBe("success");
  });
});
describe("/api/place/:id", () => {
  it("should delete a place", async () => {
    const res = await request.delete("/api/place/6409d61527ac7718202a3d5f");
    expect(res.statusCode).toBe(200);
  });
});
describe("/api/placeAccessVerification", () => {
  it("should verify if a user have access to a specific place", async () => {
    const res = await request.get("/api/placeAccessVerification").query({
      userId: "64135e41ac7ba57a28581ee6",
      placeId: "64135e93864e81d4e59cd34b",
    });
    expect(res.statusCode).toBe(200);
  });
});
describe("api/userAccessiblePlaces", () => {
  it("should get all the places that a sepecfic user hase permissions for", async () => {
    const res = await request.get("/api/userAccessiblePlaces").query({
      userId: "64135e41ac7ba57a28581ee6",
    });
    expect(res.statusCode).toBe(200 || 404);
  });
});
