import { hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";

export const registerController = async (req, res) => { // Added 'async' here
    try {
        const { name, email, password, phone, address } = req.body;
        // Validations

        if (!name) {
            return res.status(400).send({ error: 'Name is Required' }); // Changed res.send to res.status(400).send
        }
        if (!email) {
            return res.status(400).send({ error: 'Email is Required' }); // Changed 'Name' to 'Email'
        }
        if (!password) {
            return res.status(400).send({ error: 'Password is Required' }); // Changed 'Name' to 'Password'
        }
        if (!phone) {
            return res.status(400).send({ error: 'Phone is Required' }); // Changed 'Name' to 'Phone'
        }
        if (!address) {
            return res.status(400).send({ error: 'Address is Required' }); // Changed 'Name' to 'Address'
        }

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: "Already Registered please login",
            });
        }
        // Register user
        const hashedPassword = await hashPassword(password);
        // Save

        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password:hashedPassword,
        }).save(); // Added 'await' here

        res.status(201).send({
            success: true,
            message: 'User Registered Successfully',
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error,
        });
    }
};
