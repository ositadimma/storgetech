const UserController= require('../controller/userController');
const express = require('express');
const router = express.Router();
const Joi= require('joi');
const md5= require('md5');

router.post('/api/v1/inventory/login', async (req, res) => {
 const  email  = req.body.email;
 const password  = req.body.password;
 if (!email || !password) {
  res
   .send('incorrect email or password')
 } else {
  UserController
   .findUserByEmail(email)
   .then((result) => {
    if (result) {
     if (result.isDelete === 1) {
      return res
        .send('This account is inactive. Please contact administrator.')
     }
     const password_enc = result.password;
     if (md5(password) === password_enc) {
      const response_data = {
       id: result.id,
       firstname: result.firstname,
       lastname: result.lastname,
       fullname: `${result.firstname} ${result.lastname}`,
       email: result.email,
       photoUrl: result.photoUrl,
      };
      console.log(response_data)
      res
      .status(200)
      .send(response_data)
     } else {
      res
      .status(400)
      .send('password is not correct')
     }
    } else {
     res
     .status(400)
     .send('The account does not exist in the system')
    }
   })
   .catch((err) => {
     res
     .status(400)
     .send(err)
   });
 }
});

router.get('/api/v1/inventory/users', async (req, res) => {
    UserController
     .loadTotalUsers()
     .then((data) => {
      res.status(200).send(data);
     })
     .catch((err) => {
      res.status(400).send(err);
     });
});

router.get('/api/v1/inventory/user/:id', async (req, res) => {
    const { id } = req.params;
    UserController
     .findUserById(id)
     .then((data) => {
      res.status(200).send(data);
     })
     .catch((err) => {
      res.status(400).send(err);
     });
});

router.post('/api/v1/inventory/user', async (req, res) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', "GET");
  res.header('Access-Control-Allow-Headers', "accept, content-type");
  res.header('Access-Control-Allow-Max-Age', "1728000");
    const data = req.body;
    const user = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: md5(data.password),
      createdAt: new Date(),
      isDeleted: 0
    };     
    UserController
      .addNewUser(user)
      .then((response) => {
      res
      .status(200)
      .send(response)
      })
      .catch((err) => {
      res
      .status(400)
      .send(err)
      });
});

router.put('/api/v1/inventory/user', async (req, res) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', "GET");
  res.header('Access-Control-Allow-Headers', "accept, content-type");
  res.header('Access-Control-Allow-Max-Age', "1728000");
  const data = req.body;
  Joi.validate(data, validateUser, (err, value) => {
    if (err) {
    res.status(422).jsonp(responseUtils.buildResponseErrorDto(422, '', err.details));
    } else {
    const user = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      updatedAt: new Date(),
    };
    UserController
      .updateUser(user, {
        id: data.id,
      })
      .then((response) => {
      res.status(200).send(response);
      })
      .catch((err) => {
      console.log(err);
      res.status(400).send(err);
      });
    }
  });
});

router.delete('/api/v1/inventory/user/:id', async (req, res) => {
    const userId = req.params.id;
        if (itemId < 0) {
            res
            .status(400)
            .send('Invalid input parameter')
        } else {
            UserController
            .deleteUser(userId)
            .then((response) => {
            res
            .status(200)
            .send(response);
            })
            .catch((err) => {
            res.status(400).send(err);
            });
        }
    }
);

module.exports= router;