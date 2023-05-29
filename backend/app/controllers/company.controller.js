const db = require("../models");

const Requests = db.requests;
const Delivery = db.deliveries;
const Company = db.companies;
const CollectionCenter = db.collectioncenter;
const Location = db.locations;
const Category = db.categories;

const getRandom = (array) => array[Math.floor(Math.random() * array.length)];

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
        try {
            const company_check = await Company.findOne({
                wallet_address: wallet,
            });
            if (!company_check) {
                let company = new Company({
                    wallet_address: wallet,
                });

                company = await company.save();
                // todo: change `company` to `data: company`
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
                    message: "Company does not exist",
                });
            }
            // see if company has any collection centers, if no, create seeded ones
            // attach company's collection centers, along with random locations (of the locations we have). requirement is that locations have been seeded
            const collection_center = await CollectionCenter.findOne({
                company: company.id
            });
            if (!collection_center) {
                let companyCollectionCenters = [
                    {
                        title: `${company.name} - Akingbile Collection Center`,
                        address: 'Akingbile, Ibadan, Oya State, Nigeria',
                    },
                    {
                        title: `${company.name} - Sodnac MUR Collection Center`,
                        address: 'Avenue des Eperviers, Sodnac, Mauritius',
                    },
                ];
                const akingbile = await Location.findOne({ name: 'Akingbile, Ibadan' });
                const sodnac = await Location.findOne({ name: 'Sodnac' });
                companyCollectionCenters = companyCollectionCenters.map((collectioncenter) => {
                    const modified_collectioncenter = collectioncenter;
                    if (modified_collectioncenter.title === `${company.name} - Akingbile Collection Center`) {
                        modified_collectioncenter.location = akingbile._id;
                    } else if (modified_collectioncenter.title === `${company.name} - Sodnac MUR Collection Center`) {
                        modified_collectioncenter.location = sodnac._id;
                    }
                    modified_collectioncenter.company = company._id;
                    return modified_collectioncenter;
                });
                await CollectionCenter.insertMany(companyCollectionCenters);
            }
            return res.send({ status: true, data: company });
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
                    message: `Could not find company of wallet address ${company}`,
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
                .sort({ createdAt: -1 })
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
            return res.status(500).send({
                message:
                    error.message ||
                    "Some error occurred while retrieving locations.",
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
