const secret = 'fpm@DFG346&ƒgDFG346&ƒgdf#jd]}A{hbsfS43jdf#jd]}A{hbsfS43j';
var jwt = require('express-jwt');
var express = require('express');
var router = express.Router();
const commentsRepo = require('../repositories/comments')
router.get('/', async function (req, res, next) {
    const number = req.query.number;
    if (number === undefined)
        res.send(await commentsRepo.getAllComments())
    else
        res.send(await commentsRepo.getAllCommentsNumber())
});

router.get('/offset/:offset/limit/:limit', async function (req, res, next) {
    const offset = req.params.offset
    const limit = req.params.limit
    res.send(await commentsRepo.getComments(offset, limit))
});

router.get('/:id', async function (req, res, next) {
    const id = req.params.id;
    const message = await commentsRepo.getComment(id);
    res.status(message.status).send(message)
});

router.delete('/:id', jwt({algorithms: ['HS256'], secret: secret}), async function (req, res, next) {
    if (req.user.role === 'admin' || req.user.role === 'author') {
        const id = req.params.id;
        res.send(await commentsRepo.deleteComment(id));
    } else {
        res.sendStatus(403);
    }
});

router.delete('/', jwt({algorithms: ['HS256'], secret: secret}), async function (req, res, next) {
    if (req.user.role === 'admin' || req.user.role === 'author') {
        res.send(await commentsRepo.deleteAllComments());
    } else {
        res.sendStatus(403);
    }
});

router.post('/', jwt({algorithms: ['HS256'], secret: secret}), async function (req, res, next) {
    if (req.user.role === 'admin' || req.user.role === 'author') {
        const comment = req.body;
        res.send(await commentsRepo.addComment(comment));
    } else {
        res.sendStatus(403);
    }
});

router.put('/:id', jwt({algorithms: ['HS256'], secret: secret}), async function (req, res, next) {
    if (req.user.role === 'admin' || req.user.role === 'author') {
        const id = req.params.id;
        const comment = req.body;
        res.send(await commentsRepo.updateComment(id, comment));
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;



