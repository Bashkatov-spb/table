const router = require('express').Router();
const { EducationType, User, Education } = require('../db/models');

router
  .get('/educations', async (req, res) => {
    try {
      const educationTypes = await EducationType.findAll({ raw: true, order: [['id', 'ASC']] });
      res.json(educationTypes);
    } catch ({ message }) {
      res.json(message);
    }
  })
  .post('/educations', async (req, res) => {
    try {
      const { education } = req.body;
      const newEducation = await EducationType.create({ education });
      res.json(newEducation.dataValues);
    } catch ({ message }) {
      res.json(message);
    }
  })
  .delete('/educations/:educationId', async (req, res) => {
    try {
      const { educationId } = req.params;
      const result = await EducationType.destroy({ where: { id: educationId } });
      if (result) {
        res.json(educationId);
      }
      res.end();
    } catch ({ message }) {
      res.json(message);
    }
  })
  .put('/educations/:educationId', async (req, res) => {
    try {
      const { educationId } = req.params;
      const { education: newEducation } = req.body;
      const education = await EducationType.findOne({ where: { id: educationId } });
      education.education = newEducation;
      education.save();
      res.json(education);
    } catch ({ message }) {
      res.json(message);
    }
  });

router
  .get('/users', async (req, res) => {
    try {
      const users = await User.findAll({ include: EducationType, order: [['id', 'ASC']] });
      res.json(users);
    } catch ({ message }) {
      res.json(message);
    }
  })
  .post('/users', async (req, res) => {
    try {
      const { name, education } = req.body;
      const newUser = await User.create({ name });
      await Education.create({
        user_id: newUser.dataValues.id,
        educationType_id: Number(education),
      });
      const us = await User.findOne({ where: { id: newUser.id }, include: EducationType });
      res.json(us.dataValues);
    } catch ({ message }) {
      res.json(message);
    }
  })
  .delete('/users/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const result = await User.destroy({ where: { id: Number(userId) } });
      console.log(result);
      if (result) {
        res.json(userId);
      }
      res.end();
    } catch ({ message }) {
      res.json(message);
    }
  })
  .put('/users/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const { name, education } = req.body;
      const user = await User.findOne({ where: { id: userId } });
      user.name = name;
      user.save();
      const result = await Education.destroy({ where: { user_id: userId } });
      const newEducation = await Education.create({
        user_id: userId,
        educationType_id: Number(education),
      });
      res.json(user);
    } catch ({ message }) {
      res.json();
    }
  });

// const path = require('path');
// const util = require('util');

// const storage = async (file) => {
//   const fileName = file.name;
//   const size = file.data.length;
//   const extension = path.extname(fileName);
//   const allowedExtensions = /png|jpeg|jpg|gif|webp/;
//   if (!allowedExtensions.test(extension)) throw 'Unsupported extension !';
//   if (size > 5000000) throw 'File must be less than 5MB';
//   const { md5 } = file;
//   const URL = `/photo/${md5}${extension}`;
//   await util.promisify(file.mv)(`./images${URL}`);
//   return URL;
// };

router.post('/photo', async (req, res) => {
  console.log(req.files.foo);
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  const sampleFile = req.files.foo;
  const uploadPath = `${__dirname}/photos/${sampleFile.name}`;
  console.log(uploadPath);
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send('File uploaded!');
  });
});

module.exports = router;
