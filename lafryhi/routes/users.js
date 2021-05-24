var express = require('express');
var router = express.Router();
const usersRepo = require('../repositories/users')

router.get('/', async function (req, res, next) {
    const offset = req.query.offset
    const limit = req.query.limit
    if (typeof offset != 'undefined' && typeof limit != 'undefined') {
        res.send(await usersRepo.getUsers(offset, limit))
    } else {
        res.send(await usersRepo.getAllUsers())
    }
});

router.get('/:offset/:offset', async function (req, res, next) {
    const id = req.params.id;
    res.send(await usersRepo.getUser(id))
});

router.get('/admins', async function (req, res, next) {
    res.send(await usersRepo.getAdmins())
});

router.get('/guests', async function (req, res, next) {
    res.send(await usersRepo.getGuests())
});

router.get('/authors', async function (req, res, next) {
    res.send(await usersRepo.getAuthors())
});

router.get('/:id', async function (req, res, next) {
    const id = req.params.id;
    res.send(await usersRepo.getUser(id))
});

router.get('/email/:email', async function (req, res, next) {
    const email = req.params.email;
    res.send(await usersRepo.getUserByEmail(email))
});

router.delete('/:id', async function (req, res, next) {
    const id = req.params.id;
    res.send(await usersRepo.deleteUser(id))
});

router.delete('/', async function (req, res, next) {
    res.send(await usersRepo.deleteAllUsers())
});

router.post('/', async function (req, res, next) {
    const user = req.body;
    res.send(await usersRepo.addUser(user))
});

router.put('/:id', async function (req, res, next) {
    const id = req.params.id;
    const user = req.body;
    res.send(await usersRepo.updateUser(id, user))
});

module.exports = router;
