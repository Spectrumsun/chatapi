import userHandlers from '../controllers/userController';
import vaildate from '../middleware/validator';
import verifyToken from '../middleware/verifyToken';
import forumController from '../controllers/forumController';
import forumMessage from '../controllers/forumMessage';
import privateChat from '../controllers/privateController';

export default function (app) {
  app.get(
    '/api/v1/',
    userHandlers.home
  );

  app.post(
    '/api/v1/user/signup',
    vaildate.validateSignup,
    userHandlers.register
  );

  app.post(
    '/api/v1/user/login',
    vaildate.validateLogin,
    userHandlers.sign_in
  );

  app.get(
    '/api/v1/forum/',
    verifyToken.verify,
    forumController.forumPages
  );


  app.get(
    '/api/v1/forum/:name',
    verifyToken.verify,
    forumController.forumPage
  );


  app.post(
    '/api/v1/forum/',
    verifyToken.verify,
    forumController.adminPostForum
  );

  app.get(
    '/api/v1/forum/message/:name',
    verifyToken.verify,
    forumMessage.getForumMessage
  );


  app.post(
    '/api/v1/forum/message/:name',
    verifyToken.verify,
    forumMessage.postForumMessage
  );


  app.get(
    '/api/v1/chat/:name',
    verifyToken.verify,
    privateChat.getAllChat
  );

  app.post(
    '/api/v1/chat/:name',
    verifyToken.verify,
    privateChat.chatPostPage
  );

  app.get(
    '/api/v1/chats/messages',
    verifyToken.verify,
    privateChat.message
  );
}
