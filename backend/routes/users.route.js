const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const multer = require('multer');

//----- MULTER

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); 
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.fieldname === 'picture') {
      cb(null, true);
    } else {
      cb(new Error('Unexpected field name'));
    }
  },
}).array('picture', 5); 

const uploadMiddleware = (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      
      return res.status(400).json({ message: 'File upload error', error: err.message });
    }
    next(); 
  });
};


//  

  


  router.post('/post', uploadMiddleware, userController.posting);
  router.post('/like/:postid', userController.likingPost);
  router.post('/comment/:postid', userController.comment);
  router.delete('/comment/:postid', userController.deletingComment);
  router.post('/follow', userController.followUnfollow);
  router.get('/getfollow', userController.getFollows);
  router.get('/profile', userController.gettingProfileInfo);
  router.post('/addskills', userController.addSkills);
  router.get('/search/:query', userController.searchForUser);
  router.post('/book', userController.bookSchedule);
  router.get('/getscheule', userController.getSchedule);
  router.get('/getorgs', userController.getAllOrgs);
  router.get('/getposts', userController.getAllPosts);
  router.get('/getOrg/:orgId', userController.getOrg);


  router.post('/available-time-slots/:organizationId', userController.postTimeSlotForOrganization);
  router.get('/available-time-slots/:organizationId', userController.getTimeSlotForOrganization);
router.get('/appointments/:organizationId',userController.getAllAppointmentsForSpecificOrganization);
router.post('/appointments', userController.createNewAppointment);

  

module.exports = router