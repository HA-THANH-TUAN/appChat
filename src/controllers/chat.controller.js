const { typeCheck } = require('type-check');
const { BadResponse } = require('../core/error.response');
const { OK, Created } = require('../core/sucess.response');
const ChatService = require('../services/chat.service');

class Chat {
  constructor() {
    this.service = new ChatService();
  }

  static checkConficUserId(array) {
    try {
      const objectContainUserId = {};
      array?.forEach((userId) => {
        objectContainUserId[userId] = undefined;
      });
      const lengthProps = Object.keys(objectContainUserId).length;

      if (lengthProps === array.length) {
        return false;
      }
      return true;
    } catch (error) {
      console.log('error controller checkconflicUserId:::', error);
      return true;
    }
  }

  async createConversation(req, res, next) {
    const userId = req.userId;
    const members = req.body.members;
    const isMembersHaveMe = members?.includes(userId);
    const isConflicUserId = Chat.checkConficUserId(members);
    if (isMembersHaveMe || !Array.isArray(members) || isConflicUserId) throw new BadResponse();

    await this.service.createConversationGroup(userId, members);
    new Created('successfully create conversation').send(res);
  }

  async renameConversation(req, res, next) {
    const userId = req.userId;
    const name = req.body.name;
    const conversationId = req.body.conversationId;
    await this.service.renameConversation(userId, name, conversationId);
    new Created('successfully update conversation name').send(res);
  }
  async leaderConversation(req, res, next) {
    const userId = req.userId;
    const leaderId = req.body.leaderId;
    const conversationId = req.body.conversationId;

    if (userId === leaderId) {
      throw new BadResponse('Bad request');
    }

    await this.service.leaderConversation(userId, leaderId, conversationId);
    new Created('successfully change conversation leader').send(res);
  }

  async addMemberConversation(res, req, next) {
    const conversationId = res.body.conversationId;
    const members = res.body.members;
    await this.service.addMemberConversation(conversationId, members);
  }

  async outConversation(req, res, next) {
    const conversationId = req.body.conversationId;
    const userId = req.userId;
    await this.service.outConversation(userId, conversationId);
    new OK('successfully out conversation').send(res);
  }

  async getConversations(req, res, next) {
    const userId = req.userId;
    const queryData = req.query;
    const checkDataQuery = typeCheck('{page:String, limit:String}', queryData);
    if (!checkDataQuery) {
      throw new BadResponse();
    }
    const dt = await this.service.getConversations(userId, queryData.page, queryData.limit);
    new OK('', dt).send(res);
  }

  async getMessageConversation(req, res, next) {
    const userId = req.userId;
    const id = req.params.id;
    if (!id) throw new BadResponse();

    console.log('getMessageConversation:::');

    const result = await this.service.getMessageConversation(userId, id);

    new OK('', result).send(res);
  }

  async acceptConversation(res, req, next) {}
  async deleteConversation(res, req, next) {}
}
module.exports = Chat;
