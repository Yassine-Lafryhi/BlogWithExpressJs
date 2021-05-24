const {User} = require('../models')
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
                return {message: "Updated successfully !"}
            } else {
                return {message: `Cannot update user with id=${id}. Maybe it does not exist !`}
            }
        }).catch(error => {
            return {message: 'An error occurred : ' + error.message}
        });
    },
    deleteUser(id) {
        return User.destroy({
            where: {id: id}
        }).then(result => {
            if (result) {
                return {message: "Deleted successfully !"}
            } else {
                return {message: `Cannot delete user with id=${id}. Maybe it does not exist !`}
            }
        }).catch(error => {
            return {message: 'An error occurred : ' + error.message}
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
}
