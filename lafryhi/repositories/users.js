const secret = 'fpm@DFG346&ƒgDFG346&ƒgdf#jd]}A{hbsfS43jdf#jd]}A{hbsfS43j';
const {User} = require('../models')
const jwt = require('jsonwebtoken');
module.exports = {
    getAllUsers() {
        return User.findAll().catch(error => {
            return {message: 'An error occurred : ' + error.message}
        });
    },
    getUsers(offset = 0, limit = 10) {
        return User.findAll({
            offset: parseInt(offset),
            limit: parseInt(limit)
        }).catch(error => {
            return {message: 'An error occurred : ' + error.message}
        });
    },
    getAdmins() {
        return User.findAll({where: {role: 'admin'}}).catch(error => {
            return {message: 'An error occurred : ' + error.message}
        });
    },
    getAuthors() {
        return User.findAll({where: {role: 'author'}}).catch(error => {
            return {message: 'An error occurred : ' + error.message}
        });
    },
    getGuests() {
        return User.findAll({where: {role: 'guest'}}).catch(error => {
            return {message: 'An error occurred : ' + error.message}
        });
    },
    getUser(id) {
        return User.findByPk(id).then(result => {
            if (result) {
                return result
            } else {
                return {message: "Cannot find user !"}
            }
        }).catch(error => {
            return {message: 'An error occurred : ' + error.message}
        });
    },
    getUserByEmail(email) {
        return User.findOne({where: {email: email}}).then(result => {
            if (result) {
                return result
            } else {
                return {message: "Cannot find user !"}
            }
        }).catch(error => {
            return {message: 'An error occurred : ' + error.message}
        });
    },
    addUser(user) {
        return User.create(user).catch(error => {
            return {message: 'An error occurred : ' + error.message}
        });
    },
    updateUser(id, user) {
        return User.update(user, {
            where: {id: id}
        }).then(result => {
            if (result) {
                return {
                    status: 200,
                    message: "Updated successfully !"
                }
            } else {
                return {
                    status: 404,
                    message: `Cannot update user with id=${id}. Maybe it does not exist !`
                }
            }
        }).catch(error => {
            return {
                status: 500,
                message: 'An error occurred : ' + error.message
            }
        });
    },
    deleteUser(id) {
        return User.destroy({
            where: {id: id}
        }).then(result => {
            if (result) {
                return {
                    status: 200,
                    message: "Deleted successfully !"
                }
            } else {
                return {
                    status: 404,
                    message: `Cannot delete user with id=${id}. Maybe it does not exist !`
                }
            }
        }).catch(error => {
            return {
                status: 500,
                message: 'An error occurred : ' + error.message
            }
        });
    },
    deleteAllUsers() {
        return User.destroy({
            where: {},
            truncate: false
        }).then(result => {
            if (result) {
                return {message: "Deleted successfully !"}
            } else {
                return {message: `Cannot delete all users !`}
            }
        }).catch(error => {
            return {message: 'An error occurred : ' + error.message}
        });
    },
    getUsersNumber() {
        return User.findAndCountAll({
            where: {},
        })
            .then(result => {
                return {message: result.count}
            });

    },
    login(data) {
        return User.findOne({where: {email: data.email}}).then(result => {
            if (result) {
                if (result.password === data.password) {
                    const token = jwt.sign({id: result, role: result.role}, secret);
                    return {code: 1, message: "Logged in successfully", role: result.role, token: token}
                } else {
                    return {code: 2, message: "Incorrect password"}
                }
            } else {
                return {code: 3, message: "User not found !"}
            }
        }).catch(error => {
            return {message: 'Error : ' + error.message}
        });
    }
}
