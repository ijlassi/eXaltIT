import User from "../model/user.js";
import Pass from "../model/pass.js";
import Place from "../model/place.js";

export async function createUser(req, res) {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    passId: null,
  });
  try {
    const dataToSave = await user.save();
    if (Object.keys(dataToSave) != 0) {
      res.status(201).send({ message: "success" });
    } else {
      res.status(400).send({ message: "somthing went wrong!" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function createPass(req, res, next) {
  const { level, createdAt, updatedAt } = req.body;
  try {
    await new Pass({
      level,
      createdAt,
      updatedAt,
    }).save();
    res.status(201).send({ message: "success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function createPlace(req, res) {
  const { address, phoneNumber, requiredPassLevel, requiredAgeLevel } =
    req.body;
  try {
    await new Place({
      address,
      phoneNumber,
      requiredPassLevel,
      requiredAgeLevel,
    }).save();
    res.status(201).send({ message: "success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function updateUser(req, res) {
  const { id } = req.params;
  const { firstName, lastName, age, phoneNumber, address, passId } = req.body;

  User.findByIdAndUpdate(id, {
    firstName,
    lastName,
    age,
    phoneNumber,
    address,
    passId,
  }).then((response) => {
    if (response) {
      res.status(200).send({ message: "success" });
    } else {
      res.status(400).send({ error: "unsuccessful" });
    }
  });
}

export async function updatePass(req, res) {
  const { id } = req.params;
  const { level, createdAt, updatedAt } = req.body;
  Pass.findByIdAndUpdate(id, { level, createdAt, updatedAt }).then(
    (response) => {
      if (response) {
        res.status(200).send({ message: "success" });
      } else {
        res.status(404).send({ message: "pass not found!" });
      }
    }
  );
}

export async function updatePlace(req, res) {
  const { id } = req.params;
  const { address, phoneNumber, requiredPassLevel, requiredAgeLevel } =
    req.body;
  Place.findByIdAndUpdate(id, {
    address,
    phoneNumber,
    requiredPassLevel,
    requiredAgeLevel,
  }).then((response) => {
    if (response) {
      res.status(200).send({ message: "success" });
    } else {
      res.status(500).send({ error: "unsuccessful" });
    }
  });
}

export default async function getUsers(req, res, next) {
  const allUsers = await User.find();
  if (allUsers) {
    res.status(200).send({ count: allUsers.length, users: allUsers });
  } else {
    res.status(404).send("there is no users");
  }
}

export async function getUser(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (Object.keys(user)) {
      res.status(200).send({ user: user });
    } else {
      res.status(404).send("no user found with this id");
    }
  } catch (err) {
    res.status(404).send(err);
  }
}

export async function getPasses(req, res) {
  const allPasses = await Pass.find();
  if (allPasses) {
    res.status(200).json({ count: allPasses.length, passes: allPasses });
  } else {
    res.status(404).send("there is no passes");
  }
}

export async function getPasse(req, res) {
  const { id } = req.params;
  try {
    const pass = await Pass.findById(id);
    if (Object.keys(pass)) {
      res.status(200).send({ pass: pass });
    } else {
      res.status(404).send("no pass found with this pass id");
    }
  } catch (err) {
    res.status(404).send(err);
  }
}

export async function getPlaces(req, res) {
  const allPlaces = await Place.find();
  if (allPlaces) {
    res.status(200).json({ count: allPlaces.length, places: allPlaces });
  } else {
    res.status(404).send("there is no uplaces");
  }
}

export async function getPlace(req, res) {
  const { id } = req.params;
  try {
    const place = await Place.findById(id);
    if (Object.keys(place)) {
      res.status(200).send({ place: place });
    } else {
      res.status(404).send("no place found with this place id");
    }
  } catch (err) {
    res.status(404).send(err);
  }
}

export async function deleteUser(req, res) {
  const { id } = req.params;
  const deletedUser = await User.findOneAndRemove(id);

  if (deletedUser) {
    res.status(200).json(deletedUser);
  } else {
    res.status(404).send({ message: "there is no user with this id" });
  }
}

export async function deletePass(req, res) {
  const { id } = req.params;
  const deletedPasses = await Pass.findOneAndRemove(id);
  if (deletedPasses) {
    res.status(200).json(deletedPasses);
  } else {
    res.status(404).send({ message: "there is no pass with this id" });
  }
}

export async function deletePlace(req, res) {
  const { id } = req.params;
  const deletedPlaces = await Place.findOneAndRemove(id);

  if (deletedPlaces) {
    res.status(200).json(deletedPlaces);
  } else {
    res.status(404).send({ message: "there is no place with this id" });
  }
}

export async function verificationForPesmissionsAccess(req, res) {
  const { userId, placeId } = req.query;

  const userData = await User.findById(userId);
  if (!userData) {
    res.status(404).send({ message: "user not found!" });
  } else {
    if (userData.passId == undefined || userData.passId == null) {
      res.send({ message: "this user have no passes" });
    } else {
      const passDetails = await Pass.findById(userData.passId);
      if (!passDetails) {
        res
          .status(404)
          .send({ message: "there is no found with this pass id!" });
      }
      const placeDetails = await Place.findById(placeId);
      if (!placeDetails) {
        res.status(404).send({ message: "there is no places with this id!" });
      } else {
        if (userData.age >= placeDetails.requiredAgeLevel) {
          if (placeDetails.requiredPassLevel >= passDetails.level) {
            res.status(200).send({ message: "you have access to this place" });
          } else {
            res
              .status(401)
              .send({ message: "you don't have the sufficient level pass" });
          }
        } else {
          res.status(401).send({
            message: "you don't have the sufficient age to acces this place",
          });
        }
      }
    }
  }
}

export async function getAllPlacesAllowedForSpeceficUser(req, res) {
  const { userId } = req.query;
  const userData = await User.findById(userId);
  if (!userData) {
    res.status(404).send({ message: "user not found!" });
  } else {
    if (userData.passId == undefined || userData.passId == null) {
      res.send({ message: "this user have no passes" });
    } else {
      const passDetails = await Pass.findById(userData.passId);
      if (!passDetails) {
        res
          .status(404)
          .send({ message: "there is no found with this pass id!" });
      }
      const Places = await Place.find({
        requiredAgeLevel: { $gte: userData.age },
        requiredPassLevel: { $gte: passDetails.level },
      });
      if (!Places) {
        res
          .status(404)
          .send({ message: "there is no places founded for you!" });
      }
      res.status(200).send(Places);
    }
  }
}
