import * as userService from "../services/userServices.js";
import bcrypt from "bcrypt";


const users=['daria2110','pichi18','andreiutzatha03']

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();
        res.send({ users });
    } catch (error) {
        res.status(500).send({ message: "Error fetching users", error: error.message });
    }
};

const getAllAuthors = async (req, res) => {
    try {
        const users = await userService.getAuthors();
        res.send({ users });
    } catch (error) {
        res.status(500).send({ message: "Error fetching users", error: error.message });
    }
};

const getAllOrganizers= async (req, res) => {
    try {
        const users = await userService.getOrganizers();
        res.send({ users });
    } catch (error) {
        res.status(500).send({ message: "Error fetching users", error: error.message });
    }
};


const getAllReviewers= async (req, res) => {
    try {
        const users = await userService.getReviewers();
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
        const { username, firstName, lastName, password } = req.body;
        const role = req.body.role || 'author';
       
        if (!username || !firstName || !lastName) {
            return res.status(400).json({ message: "Toate datele sunt necesare!" });
        }
        const newUser = await userService.createUser({ username, firstName, lastName, role, password });
        res.status(201).json({ message: "User created successfully", user: newUser });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
};

const updateUser = async(req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    if (!id || !updatedData) {
        return res.status(400)
        .send({ message: "ID-ul și datele actualizate sunt necesare" });
    }

    const updatedUser = await userService.updateUser(id, updatedData);
    if(updatedUser){
        res.send({ message: "User actualizat cu succes", user: updatedUser });
    } else {
        res.status(404).send({ message: "User-ul nu a fost găsit" });
    }

  } catch (error) {
    res.status(500).send({ message: "Eroare la actualizarea user-ului", error: error.message });
  }  
};

const deleteUser = async(req, res) =>{
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).send({ message: "ID-ul este necesar" });
        }

        const isDeleted = await userService.deleteUser(id);
        if (isDeleted) {
            res.send({ message: "User șters cu succes" });
        } else {
            res.status(404).send({ message: "User-ul nu a fost găsit" });
        }
    } catch (error) {
        res.status(500).send({ message: "Eroare la ștergerea user-ului", error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userService.search(username);

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: "Invalid password" });
        }

        res.send({ 
            message: "Login successful!", 
            user: {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).send({ message: "Error logging in", error: error.message });
    }
};

export {
    getAllUsers,
    getRandomUser,
    search,
    getById,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
    getAllAuthors,
    getAllOrganizers,
    getAllReviewers
}