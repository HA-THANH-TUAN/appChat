const express = require('express');

const FriendShipController = require('../controllers/friendShip.controller');
const controller = new FriendShipController();
const { handleError } = require('../core/error.response');

const router = express.Router();

router.post(
  '/request-friend',
  handleError((req, res, next) => controller.requestFriend(req, res, next)),
);

router.delete(
  '/request-friend',
  handleError((req, res, next) => controller.deleteRequestFriend(req, res, next)),
);

router.post(
  '/unfriend',
  handleError((req, res, next) => controller.unfriend(req, res, next)),
);

router.post(
  '/accept-request-friend',
  handleError((req, res, next) => controller.acceptRequestFriend(req, res, next)),
);

router.post(
  '/reject-request-friend',
  handleError((req, res, next) => controller.rejectRequestFriend(req, res, next)),
);

module.exports = router;
