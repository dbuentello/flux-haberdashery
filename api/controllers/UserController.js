/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var userArr1 = [
  {
    id: '1',
    firstName: 'Ralph',
    lastName: 'Barry',
    email: 'RalphKBarry@dayrep.com'
  },
  {
    id: '3',
    firstName: 'Tyrone',
    lastName: 'Moore',
    email: 'TyroneCMoore@dayrep.com'
  },
  {
    id: '4',
    firstName: 'Sterling',
    lastName: 'Watts',
    email: 'SterlingSWatts@teleworm.us'
  },
  {
    id: '5',
    firstName: 'Zachary',
    lastName: 'Khan',
    email: 'ZacharyHKhan@teleworm.us'
  },
  {
    id: '5',
    firstName: 'Benjamin',
    lastName: 'Ritter',
    email: 'BenjaminMRitter@rhyta.com'
  }
];

var userArr2 = [
  {
    id: '6',
    firstName: 'first1',
    lastName: 'last1',
    email: 'email1@gmail.com'
  },
  {
    id: '7',
    firstName: 'first2',
    lastName: 'last2',
    email: 'email2@gmail.com'
  },
  {
    id: '8',
    firstName: 'first3',
    lastName: 'last3',
    email: 'email3@gmail.com'
  },
  {
    id: '9',
    firstName: 'first4',
    lastName: 'last4',
    email: 'email4@gmail.com'
  },
  {
    id: '10',
    firstName: 'first5',
    lastName: 'last5',
    email: 'email5@gmail.com'
  }
];

module.exports = {

  listUsers: function(req, res) {
    var scope = {};

    var page = req.query.page;

    if (page == 2) {
      scope.page = 2;
      scope.users = userArr2;
    } else {
      scope.page = 1;
      scope.users = userArr1;
    }

    if (req.wantsJSON) {
      return res.jsonx(scope);
    }

    res.view('userPage', scope);
  }

};

