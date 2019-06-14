// Import our Controllers
const accountController = require('../controllers/accountController');

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
  }
];

module.exports = routes;
