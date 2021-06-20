const {Article} = require('../models')
module.exports = {
    getAllArticles() {
        return Article.findAll().catch(error => {
            return {message: 'Error : ' + error.message}
        });
    },
    getArticles(offset = 0, limit = 10) {
        return Article.findAll({
            offset: parseInt(offset),
            limit: parseInt(limit)
        }).catch(error => {
            return {message: 'Error : ' + error.message}
        });
    },
    getArticlesByUserId(userId) {
        return Article.findAll({where: {userId: userId}}).then(result => {
            if (result) {
                return {
                    status: 200,
                    content: result
                }
            } else {
                return {message: "This user has no articles !"}
            }
        }).catch(error => {
            return {message: 'Error : ' + error.message}
        });
    },
    getArticlesByTitle(title) {
        return Article.findAll({where: {title: title}}).then(result => {
            if (result) {
                return {
                    status: 200,
                    content: result
                }
            } else {
                return {
                    status: 404,
                    message: "Article not found !"
                }
            }
        }).catch(error => {
            return {message: 'Error : ' + error.message}
        });
    },

    getArticleById(id) {
        return Article.findByPk(id).then(result => {
            if (result) {
                return {
                    status: 200,
                    content: result
                }
            } else {
                return {
                    status: 404,
                    message: "Article not found !"
                }
            }
        }).catch(error => {
            return {message: 'Error : ' + error.message}
        });
    },
    addArticle(article) {
        return Article.create(article).catch(error => {
            return {message: 'Error : ' + error.message}
        });
    },
    updateArticle(id, article) {
        return Article.update(article, {
            where: {id: id}
        }).then(result => {
            if (result) {
                return {message: "Updated successfully !"}
            } else {
                return {message: `Unable to delete the article with id = ${id} !`}
            }
        }).catch(error => {
            return {message: 'Error : ' + error.message}
        });
    },
    deleteArticle(id) {
        return Article.destroy({
            where: {id: id}
        }).then(result => {
            if (result) {
                return {message: "Deleted successfully !"}
            } else {
                return {message: `Unable to delete the article with id = ${id} !`}
            }
        }).catch(error => {
            return {message: 'Error : ' + error.message}
        });
    },
    deleteAllArticles() {
        return Article.destroy({
            where: {},
            truncate: false
        }).then(result => {
            if (result) {
                return {message: "Deleted successfully !"}
            } else {
                return {message: `Unable to delete articles !`}
            }
        }).catch(error => {
            return {message: 'Error : ' + error.message}
        });
    },
    getAllArticlesNumber() {
        return Article.findAndCountAll({
            where: {},
        })
            .then(result => {
                console.log(result.count);
                return {message: result.count}
            });
    }
}

