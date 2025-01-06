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

const createUser = async ({ username, firstName, lastName, role,password }) => {
    try {
        const newUser = await User.create({
            username,
            firstName,
            lastName,
            password,
            role 
        });

        return newUser;
    } catch (error) {
        throw new Error(error.message); 
    }
};

const updateUser = async(userId, updatedData) =>{
    const updatedUser = await User.update(updatedData, {
        where:{id: userId},
        returning: true,
        plain: true
    });

    return updatedUser[1];
}

const deleteUser = async(userId) => {
    const deletedCount = await User.destroy({
        where: {id: userId}
    });
    return deletedCount > 0;
}


export { 
    getUsers, 
    getRandomUser, 
    search, 
    getById, 
    createUser, 
    updateUser, 
    deleteUser };
