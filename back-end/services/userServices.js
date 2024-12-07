import User from "../models/userModel.js"; 

const getUsers = async () => {
    return await User.findAll();
};

const getRandomUser = async () => {
    const users = await User.findAll();
    const randomIndex = Math.floor(Math.random() * users.length);
    return users[randomIndex];
};

const search = async (username) => {
    return await User.findOne({ where: { username } });
};

const getById = async (id) => {
    return await User.findByPk(id); 
};

const createUser = async ({ username, firstName, lastName, role }) => {
    try {
        const newUser = await User.create({
            username,
            firstName,
            lastName,
            role 
        });

        return newUser;
    } catch (error) {
        throw new Error(error.message); 
    }
};


export { getUsers, getRandomUser, search, getById, createUser };
