const express = require('express');
const router = express.Router();
const dealerController = require('../controllers/dealerController');

// Define routes for dealer-related operations
router.get('/', dealerController.getAllDealers);
router.get('/:dealer_uid', dealerController.getDealerByUID);
router.post('/', dealerController.createDealer);
router.put('/:dealer_uid', dealerController.updateDealer);
router.delete('/:dealer_uid', dealerController.deleteDealer);

module.exports = router;
