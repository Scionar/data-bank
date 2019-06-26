const accountController = require('../controllers/accountController');
const sessionController = require('../controllers/sessionController');

const routes = [
  {
    method: 'GET',
    url: '/api/accounts',
    handler: accountController.getAccounts
  },
  {
    method: 'GET',
    url: '/api/accounts/:id',
    handler: accountController.getSingleAccount
  },
  {
    method: 'POST',
    url: '/api/accounts',
    handler: accountController.addAccount
  },
  {
    method: 'PUT',
    url: '/api/accounts/:id',
    handler: accountController.updateAccount
  },
  {
    method: 'DELETE',
    url: '/api/accounts/:id',
    handler: accountController.deleteAccount
  },
  {
    method: 'POST',
    url: '/api/sessions',
    handler: sessionController.addSession
  },
  {
    method: 'GET',
    url: '/api/sessions/:id',
    handler: sessionController.getSingleSession
  },
  {
    method: 'DELETE',
    url: '/api/sessions/:id',
    handler: sessionController.deleteSession
  }
];

module.exports = routes;
