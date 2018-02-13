import Forum from '../models/forum';
import User from '../models/User';

exports.forumPages = (req, res) => {
  Forum.find({
  }, (err, forum) => {
    if (err) throw err;
    res.status(200).send({
      message: 'Forum Page', forum
    });
  });
};


exports.forumPage = (req, res) => {
  const { name } = req.params;
  Forum.findOne({
    name
  }, (err, forum) => {
    if (err) {
      return res.status(401).json({
        message: 'Failed',
        error: 'Forum Not Found'
      });
    }
    res.status(200).json({
      message: 'Forum Page', forum
    });
  });
};

exports.adminPostForum = (req, res) => {
  const newForum = new Forum(req.body);

  newForum.save((err, forum) => {
    if (err) {
      return res.status(400)({
        message: 'forum already exist'
      });
    }
    return res.status(200).json({ messgae: 'New Forum Added', forum, user: req.user });
  });
};


exports.forumMessage = (req, res) => {
  Forum.find({
  }, (err, user) => {
    if (err) throw err;
    return res.status(200)
      .json({ user });
  });
};
