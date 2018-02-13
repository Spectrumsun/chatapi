import async from 'async';
import ForumMessage from '../models/forumMessage';
import Users from '../models/User';

exports.getForumMessage = (req, res) => {
  async.parallel([
    (callback) => {
      Users.findOne({ username: req.user.username })
        .populate('request.userId')
        .exec((err, result) => {
          callback(err, result);
        });
    },
    (callback) => {
      ForumMessage.find({})
        .populate('sender')
        .exec((err, result) => {
          callback(err, result);
        });
    }
  ], (err, results) => {
    const result1 = results[0];
    const result3 = results[1];

    res.status(200).json({
      message: 'Forum Messages',
      groupMsg: result3,
    });
  });
};


exports.postForumMessage = (req, res) => {
  const forum = new ForumMessage();
  forum.sender = req.user._id;
  forum.message = req.body.message;
  forum.forumName = req.params.name;
  forum.createdAt = new Date();

  forum.save((err, msg) => {
    if (err) {
      return res.status(400).json({
        message: 'Failed',
        err: err.errmsg
      });
    }
    console.log(msg);
    return res.status(201).json(msg);
  });
};
