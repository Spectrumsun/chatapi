import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import path from 'path';
import async from 'async';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import User from '../models/User';

dotenv.config();

const hbs = require('nodemailer-express-handlebars'),
  email = process.env.MAILER_EMAIL_ID,
  pass = process.env.MAILER_PASSWORD;

const smtpTransport = nodemailer.createTransport({
  service: process.env.MAILER_SERVICE_PROVIDER,
  auth: {
    user: email,
    pass
  }
});

const handlebarsOptions = {
  viewEngine: 'handlebars',
  viewPath: path.resolve('../templates'),
  extName: '.html'
};

smtpTransport.use('compile', hbs(handlebarsOptions));

exports.home = (req, res) => {
  res.status(200).json({ message: 'Welcome to the chat App' });
};


exports.register = (req, res) => {
  const newUser = new User(req.body);
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  newUser.save((err, user) => {
    if (err) {
      return res.status(400).send({
        message: 'Failed',
        err: err.errmsg
      });
    }
    user.hash_password = undefined;
    return res.status(200).json(user);
  });
};

exports.sign_in = (req, res) => {
  User.findOne({
    email: req.body.email
  }, (err, user) => {
    if (err) throw err;
    if (!user || !user.comparePassword(req.body.password)) {
      return res.status(401).json({
        message: 'Failed.',
        error: 'Invalid user or password'
      });
    }
    return res.status(200)
      .json({
        message: 'Success',
        _id: user._id,
        user: user.email,
        username: user.username,
        token: jwt.sign({ email: user.email, username: user.username, _id: user._id }, process.env.KEY)
      });
  });
};

exports.loginRequired = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized user! Login or Signup' });
  }
};


exports.allusers = (req, res) => {
  User.find({
  }, (err, user) => {
    console.log(req.user)
    if (err) throw err;
    return res.status(200)
      .json({ user });
  });
};


exports.forgotPassword = (req, res) => {
  async.waterfall([
    (done) => {
      User.findOne({
        email: req.body.email
      }).exec((err, user) => {
        if (user) {
          done(err, user);
        } else {
          done('User not found.');
        }
      });
    },
    (user, done) => {
      // create the random token
      crypto.randomBytes(20, (err, buffer) => {
        const token = buffer.toString('hex');
        done(err, user, token);
      });
    },
    (user, token, done) => {
      User.findByIdAndUpdate(
        { _id: user._id },
        { reset_password_token: token, reset_password_expires: Date.now() + 86400000 },
        { upsert: true, new: true }
      )
        .exec((err, new_user) => {
          done(err, token, new_user);
        });
    },
    (token, user, done) => {
      const data = {
        to: user.email,
        from: email,
        template: 'forgot-password-email',
        subject: 'Password help has arrived!',
        context: {
          url: `http://localhost:8000/auth/reset_password?token=${token}`,
          name: user.fullName.split(' ')[0]
        }
      };

      smtpTransport.sendMail(data, (err) => {
        if (!err) {
          return res.json({ message: 'Kindly check your email for further instructions' });
        }
        return done(err);
      });
    }
  ], err => res.status(422).json({ message: err }));
};

