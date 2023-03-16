import express from "express";
let router = express.Router();

import getUsers from "../controller/controller.js";
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  createPass,
  getPasses,
  getPasse,
  updatePass,
  deletePass,
  createPlace,
  getPlaces,
  getPlace,
  updatePlace,
  deletePlace,
  verificationForPesmissionsAccess,
  getAllPlacesAllowedForSpeceficUser,
} from "../controller/controller.js";

router.post(
  "/user",
  createUser
  // #swagger.tags = ['User']
);
router.get(
  "/user",
  getUsers
  // #swagger.tags = ['User']
);
router.get(
  "/user/:id",
  getUser
  // #swagger.tags = ['User']
);
router.put(
  "/user/:id",
  updateUser
  // #swagger.tags = ['User']
);
router.delete(
  "/user/:id",
  deleteUser
  // #swagger.tags = ['User']
);

router.post(
  "/pass",
  createPass
  // #swagger.tags = ['Pass']
);
router.get(
  "/pass",
  getPasses
  // #swagger.tags = ['Pass']
);
router.get(
  "/pass/:id",
  getPasse
  // #swagger.tags = ['Pass']
);
router.put(
  "/pass/:id",
  updatePass
  // #swagger.tags = ['Pass']
);
router.delete(
  "/pass/:id",
  deletePass
  // #swagger.tags = ['Pass']
);

router.post(
  "/place",
  createPlace
  // #swagger.tags = ['Place']
);
router.get(
  "/place",
  getPlaces
  // #swagger.tags = ['Place']
);
router.get(
  "/place/:id",
  getPlace
  // #swagger.tags = ['Place']
);
router.put(
  "/place/:id",
  updatePlace
  // #swagger.tags = ['Place']
);
router.delete(
  "/place/:id",
  deletePlace
  // #swagger.tags = ['Place']
);

router.get(
  "/placeAccessVerification",
  verificationForPesmissionsAccess
  // #swagger.tags = ['placeAccessVerification']
);
router.get(
  "/userAccessiblePlaces",
  getAllPlacesAllowedForSpeceficUser
  // #swagger.tags = ['userAccessiblePlaces']
);

export default router;
