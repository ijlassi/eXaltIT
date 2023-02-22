module.exports = function (app) {
  const controller = require("../controller/controller.js");
 
  app.post("/api/users/createUser", controller.createUser);
  app.get("/api/users/getUsers", controller.getUsers);
  app.put("/api/users/updateUser/:id", controller.updateUser);
  app.delete("/api/users/deleteUser/:id", controller.deleteUser);


  app.post("/api/users/createPass", controller.createPass);
  app.get("/api/users/getPasses", controller.getPasses);
  app.put("/api/users/updatePass/:id", controller.updatePass);
  app.delete("/api/users/deletePass/:id", controller.deletePass);


  app.post("/api/users/createPlace", controller.createPlace);
  app.get("/api/users/getPlaces", controller.getPlaces);
  app.put("/api/users/updatePlace/:id", controller.updatePlace);
  app.delete("/api/users/deletePlace/:id", controller.deletePlace);


  app.post("/api/users/verificationForPesmissionsAccess", controller.verificationForPesmissionsAccess);
  app.get("/api/users/getAllPlacesAllowedForSpeceficUser/:userId", controller.getAllPlacesAllowedForSpeceficUser);

};
