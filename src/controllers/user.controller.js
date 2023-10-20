const { typeCheck } = require('type-check');
const { BadResponse } = require('../core/error.response');
const { OK } = require('../core/sucess.response');
const { getUser: getUserService } = require('../services/user.service');
const { getProfile: getProfileService, getSearchUser: getSearchUserService } = require('../services/user.service');
const optionType = require('../utils/checkType');

class User {
  async getUser(req, res) {
    const userId = req.query?.userId;
    const page = req.query?.page;
    const limit = req.query?.limit;
    if (userId) {
      const resultService = await getUserService(userId, page, limit);
      console.log('resultService:::', resultService);
      new OK(undefined, resultService).send(res);
      return null;
    }
    new BadResponse();
  }

  async getProfile(req, res) {
    const userId = req.userId;
    const profileId = req.params.userId;
    const resultService = await getProfileService(userId, profileId);
    new OK(undefined, resultService).send(res);
  }

  async searchUser(req, res) {
    const userId = req.userId;
    const dataBody = req.body;
    const decriptionCheck = '{text:String, page: Number, limit:Number}';
    const checkBody = typeCheck(decriptionCheck, dataBody);

    const resultService = await getSearchUserService(userId, dataBody);
    new OK(undefined, resultService).send(res);
  }
}

module.exports = User;
