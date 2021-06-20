const {Tag} = require('../models')
module.exports = {
    getAllTags() {
        return Tag.findAll().catch(error => {
            return {message: 'Error : ' + error.message}
        });
    },
    getTags(offset = 0, limit = 10) {
        return Tag.findAll({
            offset: parseInt(offset),
            limit: parseInt(limit)
        }).catch(error => {
            return {message: 'Error : ' + error.message}
        });
    },
    getTag(id) {
        return Tag.findByPk(id).then(result => {
            if (result) {
                return {
                    status: 200,
                    content: result
                }
            } else {
                return {
                    status: 404,
                    message: "Tag not found !"
                }
            }
        }).catch(error => {
            return {message: 'Error : ' + error.message}
        });
    },

    addTag(tag) {
        return Tag.create(tag).catch(error => {
            return {message: 'Error : ' + error.message}
        });
    },
    updateTag(id, tag) {
        return Tag.update(tag, {
            where: {id: id}
        }).then(result => {
            if (result) {
                return {message: "Updated successfully !"}
            } else {
                return {message: `Unable to delete tag with id = ${id} !`}
            }
        }).catch(error => {
            return {message: 'Error : ' + error.message}
        });
    },
    deleteTag(id) {
        return Tag.destroy({
            where: {id: id}
        }).then(result => {
            if (result) {
                return {message: "Deleted successfully !"}
            } else {
                return {message: `Unable to delete tag with id = ${id} !`}
            }
        }).catch(error => {
            return {message: 'Error : ' + error.message}
        });
    },
    deleteAllTags() {
        return Tag.destroy({
            where: {},
            truncate: false
        }).then(result => {
            if (result) {
                return {message: "Deleted successfully !"}
            } else {
                return {message: `Unable to delete all tags !`}
            }
        }).catch(error => {
            return {message: 'Error : ' + error.message}
        });
    },
    getAllTagsNumber() {
        return Tag.findAndCountAll({
            where: {},
        })
            .then(result => {
                console.log(result.count);
                return {message: result.count}
            });
    }
}

