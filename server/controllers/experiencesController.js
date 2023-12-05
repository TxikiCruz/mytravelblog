const experiences = require('../models/experiencesModel');

class experiencesController {
  async findAllExperiences(req, res) {
    try {
      const exps = await experiences.find();
      res.send(exps);
    }
    catch (error) {
      res.send({ error })
    }
  }

  async findExperience(req, res) {
    let expId = req.params.id;
    try {
      const exp = await experiences.findById(expId);
      res.send(exp);
    }
    catch (error) {
      res.send({ error })
    }
  }

  async addNewExperience(req, res) {
    let params = req.body;
    try {
      const done = await experiences.create({user: params.user, title: params.title, image: params.image, category: params.category, content: params.content, score: params.score});
      res.send(done);
    }
    catch (error) {
      res.send({ error })
    }
  }

  async deleteExperience(req, res) {
    let { _id } = req.body;
    try {
      const removed = await experiences.deleteOne({ _id: _id });
      res.send({ removed });
    }
    catch (error) {
      res.send({ error })
    }
  }

  async updateExperience(req, res) {
    let params = req.body;  
    
    try {
      const updated = await experiences.updateOne(
        { _id: params._id }, {user: params.user, image: params.image, title: params.title, category: params.category, content: params.content, score: params.score}
      );
      res.send({ updated });
    }
    catch (error) {
      res.send({ error });
    };
  }

  async updateScoreExperience(req, res) {
    let params = req.body;  
    
    try {
      const updated = await experiences.updateOne(
        { _id: params._id }, { score: params.score }
      );
      res.send({ updated });
    }
    catch (error) {
      res.send({ error });
    };
  }
}

module.exports = new experiencesController();