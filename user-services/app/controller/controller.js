const User = require("../model/user")
const Pass = require("../model/pass")
const Place = require("../model/place")


exports.createUser = async function (req, res) {
    const { firstName, lastName, age, phoneNumber, address, passId } = req.body
    const user = await new User({
        firstName,
        lastName,
        age,
        phoneNumber,
        address,
        passId
    })
    try {
        const dataToSave = user.save();
        res.status(201).send({message : "success"})
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }

}
exports.createPass = async function (req, res) {
    const { level, createdAt, updatedAt } = req.body
    try {
        await new Pass({
            level,
            createdAt,
            updatedAt
        }).save()
        res.status(201).send({message : "success"})
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }

}
exports.createPlace = async function (req, res) {
    const { address, phoneNumber, requiredPassLevel, requiredAgeLevel } = req.body
    try {
        await new Place({
            address,
            phoneNumber,
            requiredPassLevel,
            requiredAgeLevel
        }).save()
        res.status(201).send({message : "success"})
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }

}

exports.updateUser = async function (req, res) {
    const { id } = req.params;
    User.findByIdAndUpdate(id, req.body, (err, user) => {
        if (err) {
             res
                .status(400)
                .send({ error: "unsuccessful" })
        };
        res.status(200).send({ message: "success" });
    });
}

exports.updatePass = async function (req, res) {
    const { id } = req.params;
    Pass.findByIdAndUpdate(id, req.body, (err, pass) => {
        if (err) {
             res
                .status(400)
                .send({ error: "unsuccessful" })
        };
        res.status(200).send({ message: "success" });
    });
}

exports.updatePlace = async function (req, res) {
    const { id } = req.params;
    Place.findByIdAndUpdate(id, req.body, (err, place) => {
        if (err) {
             res
                .status(500)
                .send({ error: "unsuccessful" })
        };
        res.status(200).send({ message: "success" });
    });
}


exports.getUsers = async function (req, res) {
    const allUsers = await User.find();
    if (allUsers) {
         res.status(200).json(allUsers)
    } else {
         res.status(404).send("there is no users")
    }
    ;
}
exports.getPasses = async function (req, res) {
    const allPasses = await Pass.find();
    if (allPasses) {
         res.status(200).json(allPasses)
    } else {
         res.status(404).send("there is no passes")
    }
}

exports.getPlaces = async function (req, res) {
    const allPlaces = await Place.find();
    if (allPlaces) {
         res.status(200).json(allPlaces)
    } else {
         res.status(404).send("there is no uplaces")
    };
}
exports.deleteUser = async function (req, res) {
    const { id } = req.params;
    const deletedUser = await User.findOneAndRemove(id);

    if (deletedUser) {
         res.status(200).json(deletedUser)
    } else {
         res.status(404).send({ message: "there is no user with this id" })
    };
}
exports.deletePass = async function (req, res) {
    const { id } = req.params;
    const deletedPasses = await Pass.findOneAndRemove(id);
    if (deletedPasses) {
         res.status(200).json(deletedPasses)
    } else {
         res.status(404).send({ message: "there is no pass with this id" })
    };
}
exports.deletePlace = async function (req, res) {
    const { id } = req.params;
    const deletedPlaces = await Place.findOneAndRemove(id);

    if (deletedPlaces) {
         res.status(200).json(deletedPlaces)
    } else {
         res.status(404).send({ message: "there is no place with this id" })
    };
}
exports.verificationForPesmissionsAccess = async function (req, res) {
    const { userId, placeId } = req.body

    const userData = await User.findById(userId)
    if (!userData) {
        res.status(404).send({ message: "user not found!" })
    } else {
        if (userData.passId == undefined || userData.passId == null) {
            res.send({ message: "this user have no passes" })
        } else {
            const passDetails = await Pass.findById(userData.passId)
            if (!passDetails) {
                res.status(404).send({ message: "there is no found with this pass id!" })
            }
            const placeDetails = await Place.findById(placeId)
            if (!placeDetails) {
                res.status(404).send({ message: "there is no places with this id!" })
            } else {
                if (userData.age >= placeDetails.requiredAgeLevel) {
                    if (placeDetails.requiredPassLevel >= passDetails.level) {
                        res.status(200).send({ message: "you have access to this place" })
                    } else {
                        res.status(401).send({ message: "you don't have the sufficient level pass" })
                    }
                } else {
                    res.status(401).send({ message: "you don't have the sufficient age to acces this place" })
                }
            }
        }
    }
}
exports.getAllPlacesAllowedForSpeceficUser = async function (req, res) {
    const { userId } = req.params
    const userData = await User.findById(userId)
    if (!userData) {
        res.status(404).send({ message: "user not found!" })
    } else {
        if (userData.passId == undefined || userData.passId == null) {
            res.send({ message: "this user have no passes" })
        } else {
            const passDetails = await Pass.findById(userData.passId)
            if (!passDetails) {
                res.status(404).send({ message: "there is no found with this pass id!" })
            }
            const Places = await Place.find({ requiredAgeLevel: { $gte: userData.age }, requiredPassLevel: { $gte: passDetails.level } })
            if (!Places) {
                res.status(404).send({ message: "there is no places founded for you!" })
            }
            res.status(200).json(Places)
        }
    }
}

