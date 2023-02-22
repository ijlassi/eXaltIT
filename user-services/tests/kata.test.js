const request = require("supertest");
const app = require("../server");

describe("User Services Test", () => {
    describe("/api/users/createUser", () => {
        it("should create a user", async () => {
            const res = await request(app).post("/api/users/createUser").send({
                firstName: "test 3",
                lastName: "test 3",
                age: 1,
                phoneNumber: "0625197923",
                address: "france",
                passId: "63f52e8275fbfce70cba5f20"
            });
            expect(res.statusCode).toBe(201);
            expect(res.body.message).toBe("success");
        });
    })
    describe("api/users/getUsers", () => {
        it("should get all the users", async () => {
            const res = await request(app).get("/api/users/getUsers")
            expect(res.statusCode).toBe(200);
        });
    })
    describe("/api/users/updateUser/:id", () => {
        it("should update a user data", async () => {
            const res = await request(app).put("/api/users/updateUser/63f4a8180fec69adecc63d3d").send({
                firstName: "",
                lastName: ""
            });
            expect(res.statusCode).toBe(200);
            expect(res.body.message).toBe("success");;
        });
    })
    describe("/api/users/deleteUser/:id", () => {
        it("should delete a user", async () => {
            const res = await request(app).delete("/api/users/deleteUser/63f52f9eb8dd040a4c32a6bd")
                expect(res.statusCode).toBe(200);
                expect(res.body._id).toBe("63f52f9eb8dd040a4c32a6bd");
        });
    })
    describe("/api/users/createPass", () => {
        it("should create a pass", async () => {
            const res = await request(app).post("/api/users/createPass").send({
                level: 4,
                createdAt: "2023-02-20",
                updatedAt: "2023-02-20"
            });
            expect(res.statusCode).toBe(201);
            expect(res.body.message).toBe("success");
        });
    })
    describe("api/users/getPasses", () => {
        it("should get all the passes", async () => {
            const res = await request(app).get("/api/users/getPasses")
            expect(res.statusCode).toBe(200);
        });
    })
    describe("/api/users/updatePass/:id", () => {
        it("should update a pass data", async () => {
            const res = await request(app).put("/api/users/updatePass/63f4a8180fec69adecc63d3d").send({
                updatedAt: "2023-02-21"
            });
            expect(res.statusCode).toBe(200);
            expect(res.body.message).toBe("success");
        });
    })
    describe("/api/users/deletePass/:id", () => {
        it("should delete a pass", async () => {
            const res = await request(app).delete("/api/users/deletePass/63f37cd172e56b8ce84da182")
                expect(res.statusCode).toBe(200);
                expect(res.body._id).toBe("63f37cd172e56b8ce84da182");
        });
    })
    describe("/api/users/createPlace", () => {
        it("should create a place", async () => {
            const res = await request(app).post("/api/users/createPlace").send({
                address: "36 rue chardon lagache",
                phoneNumber: "0625197923",
                requiredPassLevel: 4,
                requiredAgeLevel: 23
            });
            expect(res.statusCode).toBe(201);
            expect(res.body.message).toBe("success");
        });
    })
    describe("api/users/getPlaces", () => {
        it("should get all the places", async () => {
            const res = await request(app).get("/api/users/getPlaces")
            expect(res.statusCode).toBe(200);
        });
    })
    describe("/api/users/updatePlace/:id", () => {
        it("should update a place data", async () => {
            const res = await request(app).put("/api/users/updatePlace/63f3805456e00e1897c2a98c").send({
                updatedAt: "2023-02-21"
            });
            expect(res.statusCode).toBe(200 || 404);
            expect(res.body.message).toBe("success");
        });
    })
    describe("/api/users/deletePLace/:id", () => {
        it("should delete a place", async () => {
            const res = await request(app).delete("/api/users/deletePlace/63f4e3e25d5f99cb85acb98c")
                expect(res.statusCode).toBe(200);
                expect(res.body._id).toBe("63f4e3e25d5f99cb85acb98c");
        });
    })
    describe("/api/users/verificationForPesmissionsAccess", () => {
        it("should verify if a user have access to a specific place", async () => {
            const res = await request(app).post("/api/users/verificationForPesmissionsAccess").send({
                userId: "63f53941da1785662b3a1310",
                placeId: "63f53942da1785662b3a131c"
            });
            expect(res.statusCode).toBe(200);
        });
    })
    describe("api/users/getAllPlacesAllowedForSpeceficUser/:userId", () => {
        it("should get all the places that a sepecfic user hase permissions for", async () => {
            const res = await request(app).get("/api/users/getAllPlacesAllowedForSpeceficUser/63f53941da1785662b3a1310")
            expect(res.statusCode).toBe(200 || 404);
        });
    })
})