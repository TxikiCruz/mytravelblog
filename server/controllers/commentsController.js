const comments = require('../models/commentsModel');

class commentsController {
  async findAllComments(req, res) {
    try {
      const comms = await comments.find();
      res.send(comms);
    }
    catch (error) {
      res.send({ error })
    }
  }

  async addNewComment(req, res) {
    let params = req.body;
    try {
      const done = await comments.create({user: params.user, experience: params.experience, content: params.content});
      res.send(done);
    }
    catch (error) {
      res.send({ error })
    }
  }

  async deleteComment(req, res) {
    let { _id } = req.body;
    try {
      const removed = await comments.deleteOne({ _id: _id });
      res.send({ removed });
    }
    catch (error) {
      res.send({ error })
    }
  }

  async updateComment(req, res) {
    let params = req.body;  
    
    try {
      const updated = await comments.updateOne(
        { _id: params._id }, { user: params.user, experience: params.experience, content: params.content }
      );
      res.send({ updated });
    }
    catch (error) {
      res.send({ error });
    }
  }
}

module.exports = new commentsController();