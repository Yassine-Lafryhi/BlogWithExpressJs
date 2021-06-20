const secret = 'fpm@DFG346&ƒgDFG346&ƒgdf#jd]}A{hbsfS43jdf#jd]}A{hbsfS43j';
var jwt = require('express-jwt');
var express = require('express');
var router = express.Router();
const tagsRepo = require('../repositories/tags')

router.get('/', async function (req, res, next) {
    const number = req.query.number;
    if (number === undefined)
        res.send(await tagsRepo.getAllTags())
    else
        res.send(await tagsRepo.getAllTagsNumber())
});

router.get('/offset/:offset/limit/:limit', async function (req, res, next) {
    const offset = req.params.offset
    const limit = req.params.limit
    res.send(await tagsRepo.getTags(offset, limit))
});

router.get('/:id', async function (req, res, next) {
    const id = req.params.id;
    const message = await tagsRepo.getTag(id);
    res.status(message.status).send(message)
});

router.delete('/:id', jwt({algorithms: ['HS256'], secret: secret}), async function (req, res, next) {
    if (req.user.role === 'admin' || req.user.role === 'author') {
        const id = req.params.id;
        res.send(await tagsRepo.deleteTag(id));
    } else {
        res.sendStatus(403);
    }
});

router.delete('/', jwt({algorithms: ['HS256'], secret: secret}), async function (req, res, next) {
    if (req.user.role === 'admin' || req.user.role === 'author') {
        res.send(await tagsRepo.deleteAllTags());
    } else {
        res.sendStatus(403);
    }
});

router.post('/', jwt({algorithms: ['HS256'], secret: secret}), async function (req, res, next) {
    if (req.user.role === 'admin' || req.user.role === 'author') {
        const tag = req.body;
        res.send(await tagsRepo.addTag(tag));
    } else {
        res.sendStatus(403);
    }
});

router.put('/:id', jwt({algorithms: ['HS256'], secret: secret}), async function (req, res, next) {
    if (req.user.role === 'admin' || req.user.role === 'author') {
        const id = req.params.id;
        const tag = req.body;
        res.send(await tagsRepo.updateTag(id, tag));
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;
