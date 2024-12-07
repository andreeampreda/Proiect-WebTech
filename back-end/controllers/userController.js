import * as userService from "../services/userServices.js";

const users=['daria2110','pichi18','andreiutzatha03']

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();
        res.send({ users });
    } catch (error) {
        res.status(500).send({ message: "Error fetching users", error: error.message });
    }
};

const getRandomUser = async (req, res) => {
    try {
        const user = await userService.getRandomUser();
        res.send({ record: user });
    } catch (error) {
        res.status(500).send({ message: "Error fetching random user", error: error.message });
    }
};

const search = async (req, res) => {
    try {
        const identifiedUser = await userService.search(req.query.username);

        if (identifiedUser) {
            res.send({ user: identifiedUser });
        } else {
            res.status(404).send({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error searching for user", error: error.message });
    }
};

const getById = async (req, res) => {
    try {
        const identifiedUser = await userService.getById(req.params.id);

        if (identifiedUser) {
            res.send({ user: identifiedUser });
        } else {
            res.status(404).send({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error fetching user by ID", error: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const { username, firstName, lastName, role } = req.body;
        if (!username || !firstName || !lastName) {
            return res.status(400).json({ message: "Toate datele sunt necesare!" });
        }
        const newUser = await userService.createUser({ username, firstName, lastName, role });
        res.status(201).json({ message: "User created successfully", user: newUser });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
};

export {
    getAllUsers,
    getRandomUser,
    search,
    getById,
    createUser
}