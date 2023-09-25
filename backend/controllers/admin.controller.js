const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Organization = require('../models/organizations.model');


// ------------------- REGISTERING NEW ORG MEMBERS
const registerNewOrgMember = async (req, res) => {
    const adminId = req.user._id;
    const { password, ...userData } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Organization({
            ...userData,
            password: hashedPassword,
        });

        await newUser.save();

        const organization = await Organization.findById(adminId);

        if (!organization) {
            return res.status(404).json({ error: 'Organization not found' });
        }

        organization.users.push({ user: newUser._id });
        await organization.save();

        const { password: hashingpassword, ...userInfo } = newUser.toJSON();

        res.status(201).json(userInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// ------------------- DELETING A MEMBER
const deleteMember = async (req, res) => {
    const adminId = req.user._id;
    const memberIdToDelete = req.params.memberId;

    try {
        const organization = await Organization.findById(adminId);

        if (!organization) {
            return res.status(404).json({ error: 'Organization not found' });
        }

        if (adminId.equals(memberIdToDelete)) {
            return res.status(400).json({ error: 'Admin cannot delete themselves' });
        }

        const memberIndex = organization.users.findIndex(
            (user) => user.user.equals(memberIdToDelete)
        );

        if (memberIndex === -1) {
            return res.status(404).json({ error: 'Member not found in the organization' });
        }

        organization.users.splice(memberIndex, 1);
        await organization.save();

        res.status(200).json({ message: 'Member deleted successfully' });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



module.exports = { registerNewOrgMember , deleteMember};
