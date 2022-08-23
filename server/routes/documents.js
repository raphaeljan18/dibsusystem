const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes
router.get('/', userController.view);
router.post('/', userController.find);
router.get('/adddocument', userController.form);
router.post('/adddocument', userController.create);
router.get('/editdocument/:id', userController.edit);
router.post('/editdocument/:id', userController.update);
router.get('/viewdocument/:id', userController.viewall);
router.get('/deletedocument/:id',userController.delete);
router.get('/downloadDisuAsWord/:id',userController.downloadDisuAsWord);
router.get(`/addVulnerabilities/:id`, userController.vulnerabilityForm);
router.get(`/addingVulnerability/:id`, userController.createVulnerability);
// router.get(`/deleteVulnerabilities/:id`,userController.deleteVulnerabilities);
// router.get(`/editVulnerabilities/:id`, userController.editVulnerabilities);
module.exports = router;