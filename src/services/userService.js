import User from "../model/User.js";

export const getUserById = async (_id) => {
    const user = await User.findOne({ _id }).select('fullName phoneNumber email isVerified isSuspended');
    return user;
}

export const getUserByCondition = async (condition) => {
    const user = await User.findOne({ ...condition }).select('fullName phoneNumber email isVerified isSuspended');
    return user;
}

export const getUserPassword = async (condition) => {
    const user = await User.findOne({ ...condition }).select('password');
    return user;
}

export const createUser = async (data) => {
    // remove isAdmin key, so it doesnt update by mistake
    const { isAdmin, ...varData } = data;
    const user = await User.create({ ...varData });
    return user;
}

export const updateUser = async (id, data) => {
    // remove isAdmin key so ,, idoesnt update by mistake
    const { isAdmin, ...varData } = data;
    const user = await User.findByIdAndUpdate(id, { ...varData });
    return user;
}

export const getAllUsers = async (condition) => {
    const users = await User.find({ ...condition });
    return users;
}