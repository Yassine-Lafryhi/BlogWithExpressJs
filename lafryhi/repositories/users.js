const {User} = require('../models')
module.exports = {
    getAllUsers() {
        return User.findAll()
    },
    getUsers(offset = 0, limit = 10) {
    },
    getAdmins() {
        return User.findAll({where: {role: 'admin'}})
    },
    getAuthors() {
        return User.findAll({where: {role: 'author'}})
    },
    getGuests() {
        return User.findAll({where: {role: 'guest'}})
    },
    getUser(id) {
        return User.findByPk(id)
    },
    getUserByEmail(email) {
    },
    addUser(user) {
        return User.create(user)
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
        })
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
        })
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
        })
    },
}
