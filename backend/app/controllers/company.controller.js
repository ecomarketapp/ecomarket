const db = require("../models");

const Requests = db.requests;
const Delivery = db.deliveries;
const Company = db.companies;
const CollectionCenter = db.collectioncenter;
const Location = db.locations;
const Category = db.categories;

module.exports = {
    getCompanies: async (req, res) => {
        try {
            const companies = await Company.find({});
            return res.json({ status: true, companies });
        } catch (error) {
            return res.status(500).send({
                message:
                    error.message ||
                    "Some error occurred while retrieving companies.",
            });
        }
    },
    createCompany: async (req, res) => {
        const { wallet } = req.body;

        console.log(req.body, wallet);

        try {
            // return console.log(wallet);
            const company_check = await Company.findOne({
                wallet_address: wallet,
            });
            if (!company_check) {
                let company = new Company({
                    wallet_address: wallet,
                });
                // return console.log(company);

                company = await company.save();
                return res.json({ status: true, company });
            } else {
                return res.json({
                    status: false,
                    msg: "Company already exists",
                });
            }
        } catch (error) {
            return res.status(500).send({
                message:
                    error.message ||
                    "Some error occurred while retrieving companies.",
            });
        }
    },
    saveProfile: async (req, res) => {
        const { id: wallet } = req.params;
        const { name, contact_person, contact_email, contact_phone } = req.body;
        try {
            let company = await Company.findOneAndUpdate(
                {
                    wallet_address: wallet,
                },
                {
                    name,
                    contact_person,
                    contact_email,
                    contact_phone,
                },
                {
                    new: true,
                }
            ).exec();

            if (!company) {
                return res.status(404).json({
                    status: false,
                    message: "Company Does not exist",
                });
            }
            return res.send({ status: true, data: company });
            // return res.json({ status: true, data: company });
            // console.log(company);
        } catch (error) {
            return res.status(500).send({
                message:
                    error.message ||
                    "Some error occurred while retrieving companies.",
            });
        }
    },
    getOneCompany: async (req, res) => {
        const { id: wallet } = req.params;
        try {
            const company = await Company.findOne({
                wallet_address: wallet,
            }).exec();
            if (!company) {
                return res.status(404).json({
                    status: false,
                    message: `Could not find company of ID ${company}`,
                });
            }
            return res.json({ status: true, data: company });
        } catch (error) {
            return res.status(500).send({
                message:
                    error.message ||
                    "Some error occurred while retrieving companies.",
            });
        }
    },
    companyRequests: async (req, res) => {
        const { id: companyId } = req.params;
        try {
            const requests = await Requests.find({ company: companyId })
                .populate({ path: "location", model: Location })
                .populate({ path: "company", model: Company })
                .populate({ path: "scrap_category", model: Category })
                .populate({
                    path: "collection_center",
                    model: CollectionCenter,
                })
                .populate({
                    path: "scrap_subcategory",
                    model: Category,
                    populate: { path: "children", model: Category },
                });
            res.json({ success: true, data: requests });
        } catch (error) {
            res.status(500).send({
                message: `Error retrieving company requests`,
            });
        }
    },
    companyCollectionCenters: async (req, res) => {
        const { id: companyId } = req.params;
        try {
            const collection_centers = await CollectionCenter.find({
                company: companyId,
            })
                .populate({ path: "location", model: Location })
                .populate({ path: "company", model: Company });
            return res.json({ status: true, collection_centers });
        } catch (error) {
            return res.status(500).send({
                message:
                    error.message ||
                    "Some error occurred while retrieving locations.",
            });
        }
    },
    companyAmountLocked: async (req, res) => {
        const { id: companyId } = req.params;
        try {
            const requests = await Request.find({
                company: companyId,
                request_expires_at: { $gt: new Date() }, // not yet expired
            })
                .lean()
                .exec();
            const request_amounts = [
                ...new Set(requests.map((request) => request.total_amount)),
            ];

            const deliveries = await Delivery.find({
                request: {
                    $nin: [...new Set(requests.map((request) => request._id))],
                },
                delivery_status: "REWARD_CLAIMED",
            });
            const delivered_amounts = [
                ...new Set(
                    deliveries.map((delivery) => delivery.delivery_amount)
                ),
            ];

            const amount_locked =
                request_amounts.reduce((a, b) => a + b) -
                delivered_amounts.reduce((a, b) => a + b);
            return res.json({
                status: true,
                amount_locked,
            });
        } catch (error) {
            return res.status(500).send({
                message:
                    error.message ||
                    "Some error occurred while computing total amount locked.",
            });
        }
    },
};
