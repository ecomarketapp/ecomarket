const db = require("../models");

const Requests = db.requests;
const Location = db.locations;
const Collectors = db.collectors;

module.exports = {
    register: async (req, res) => {
        try {
            const { name, email, phone, wallet_address } = req.body;
            let location = "6367f57ad6f4b58b9dfc61f1";
            const usercheck = await Collectors.findOne({ email }).populate({
                path: "location",
                model: Location,
            });
            if (usercheck)
                return res.json({ msg: "Email already exists", status: false });

            const locationcheck = await Location.findById(location);
            if (!locationcheck)
                return res.json({
                    msg: "Location does not exist",
                    status: false,
                });

            let user = new Collectors({
                name,
                email,
                phone,
                wallet_address,
                location,
            });
            // Save request in the database
            user = user.save(user);
            return res.send({
                status: true,
                data: user,
                msg: "Successfully registered",
            });
        } catch (ex) {
            next(ex);
        }
    },
    login: async (req, res) => {
        try {
            const { email } = req.body;
            const user = await Collectors.findOne({ email }).populate({
                path: "location",
                model: Location,
            });
            if (!user)
                return res.json({ msg: "Incorrect Email", status: false });
            return res.json({
                status: true,
                user,
                msg: "Logged In Successfully",
            });
        } catch (ex) {
            next(ex);
        }
    },
    createCollector: async (req, res) => {
        const { wallet } = req.body;
        try {
            const collector_check = await Collectors.findOne({
                wallet_address: wallet,
            });
            if (collector_check) {
                return res.json({
                    status: false,
                    msg: "Collector already exists",
                });
            }
            let collector = new Collectors({
                wallet_address: wallet,
            });

            collector = await collector.save();
            return res.json({ status: true, collector });
        } catch (error) {
            return res.status(500).send({
                message:
                    error.message ||
                    "Some error occurred while creating collector.",
            });
        }
    },
    saveProfile: async (req, res) => {
        const { id: wallet } = req.params;
        const { name, email, phone, location } = req.body;
        try {
            // find location
            const found_location = await Location.findById(location).exec();
            if (!found_location) {
                return res.status(404).json({
                    status: false,
                    message: "Location does not exist",
                });
            }
            let collector = await Collectors.findOneAndUpdate(
                {
                    wallet_address: wallet,
                },
                {
                    name,
                    email,
                    phone,
                    location,
                },
                {
                    new: true,
                }
            ).exec();

            if (!collector) {
                // return res.status(404).json({
                //   status: false,
                //   message: 'Collector Does not exist',
                // });

                let collector = new Collectors({
                    wallet_address: wallet,
                });

                collector = await collector.save();
                return res.json({ status: true, collector });
            }
            return res.send({ status: true, data: collector });
        } catch (error) {
            return res.status(500).send({
                message:
                    error.message ||
                    "Some error occurred while saving collector profile retrieving companies.",
            });
        }
    },
    getOneCollector: async (req, res) => {
        const { id: wallet } = req.params;
        try {
            const collector = await Collectors.findOne({
                wallet_address: wallet,
            })
                .populate({
                    path: "location",
                    model: Location,
                })
                .exec();
            if (!collector) {
                return res.json({
                    status: false,
                    msg: "Collector does not exist",
                });
            }

            return res.json({ status: true, data: collector });
        } catch (error) {
            return res.status(500).send({
                status: false,
                message: error.message || "Collector not found.",
            });
        }
    },
    getCollectors: async (req, res) => {
        try {
            const collectors = await Collectors.find({}).populate({
                path: "location",
                model: Location,
            });
            return res.json({ status: true, data: collectors });
        } catch (error) {
            return res.status(500).send({
                message:
                    error.message ||
                    "Some error occurred while retrieving Collectors.",
            });
        }
    },
};
