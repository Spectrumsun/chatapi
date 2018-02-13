exports.validateSignup = (req, res, next) => {
  req.sanitizeBody('username');
  req.checkBody('username', 'You must supply a username!').notEmpty();
  req.checkBody('email', 'That Email is not valid!').isEmail();
  req.sanitizeBody('email').normalizeEmail({ remove_dots: false, remove_extension: false, gmail_remove_subaddress: false });
  req.checkBody('sex', 'Sex Cannot be Blank!').notEmpty();
  req.checkBody('lanuguage', 'Lanuguage Cannot be Blank!').notEmpty();
  req.checkBody('password', 'Password Cannot be Blank!').notEmpty();
  req.checkBody('confirmPassword', 'Oops! Your passwords do not match').equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    res.status(400).send({ message: 'Signup Errors', errors });
    return; // stop the fn from running
  }
  next(); // there were no errors!
};

exports.validateLogin = (req, res, next) => {
  req.checkBody('email', 'Email Cannot be Blank!').notEmpty();
  req.checkBody('email', 'That Email is not valid!').isEmail();
  req.sanitizeBody('email').normalizeEmail({ remove_dots: false, remove_extension: false, gmail_remove_subaddress: false });
  req.checkBody('password', 'Password Cannot be Blank!').notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    res.status(400).send({ message: 'Login Errors', errors });
    return; // stop the fn from running
  }
  next(); // there were no errors!
};


exports.validateChat = (req, res, next) => {
  req.checkBody('composedMessage', 'Chat can not be empty!').notEmpty();
  req.sanitizeBody('composedMessage').normalizeEmail({ remove_dots: false, remove_extension: false, gmail_remove_subaddress: false });
  const errors = req.validationErrors();
  if (errors) {
    res.status(400).send({ message: 'Chat Errors', errors });
    return; // stop the fn from running
  }
  next(); // there were no errors!
};
