const db = require('../models/index');
const {QueryTypes} = require('sequelize');
const {Comment} = require('../models');
module.exports = {
    getAllComments() {
        return Comment.findAll().catch(error => {
            return {message: 'Error' + error.message}
        });
    },
    getComments(offset = 0, limit = 10) {
        return Comment.findAll({
            offset: parseInt(offset),
            limit: parseInt(limit)
        }).catch(error => {
            return {message: 'Error : ' + error.message}
        });
    },
    getComment(id) {
        return Comment.findByPk(id).then(result => {
            if (result) {
                return {
                    status: 200,
                    content: result
                }
            } else {
                return {
                    status: 404,
                    message: "Comment not found !"
                }
            }
        }).catch(error => {
            return {message: 'Error : ' + error.message}
        });
    },
    getCommentByArticleId(articleId) {
        return Comment.findAll({where: {ArticleId: articleId}}).then(result => {
            if (result) {
                return result
            } else {
                return {message: "Comment not found !"}
            }
        }).catch(error => {
            return {message: 'Error : ' + error.message}
        });
    },
    getArticleTitleAndNbrOfComments() {
        return db.sequelize.query("SELECT DISTINCT Articles.title, COUNT(Comments.articleId) AS \"CommentsNumber\" from Articles INNER JOIN Comments ON articles.id = Comments.articleId GROUP BY ArticleId", {type: QueryTypes.SELECT});
    },
    addComment(comment) {
        return Comment.create(comment).catch(error => {
            return {message: 'Error : ' + error.message}
        });
    },
    updateComment(id, comment) {
        return Comment.update(comment, {
            where: {id: id}
        }).then(result => {
            if (result) {
                return {message: "Updated successfully !"}
            } else {
                return {message: `Unable to find comment with id = ${id} !`}
            }
        }).catch(error => {
            return {message: 'Error : ' + error.message}
        });
    },
    deleteComment(id) {
        return Comment.destroy({
            where: {id: id}
        }).then(result => {
            if (result) {
                return {message: "Deleted successfully !"}
            } else {
                return {message: `Unable to delete comment with id = ${id} !`}
            }
        }).catch(error => {
            return {message: 'Error : ' + error.message}
        });
    },
    deleteAllComments() {
        return Comment.destroy({
            where: {},
            truncate: false
        }).then(result => {
            if (result) {
                return {message: "Deleted successfully !"}
            } else {
                return {message: `Unable to delete all comments !`}
            }
        }).catch(error => {
            return {message: 'Error : ' + error.message}
        });
    },
    getAllCommentsNumber() {
        return Comment.findAndCountAll({
            where: {},
        })
            .then(result => {
                console.log(result.count);
                return {message: result.count}
            });

    }
}

