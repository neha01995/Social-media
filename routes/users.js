const express=require('express');
const router=express.Router();
const passport=require('passport');

const userController=require('../controllers/user_controller');

router.get('/profile/:id',passport.checkAuthentication,userController.profile);
router.post('/update/:id',passport.checkAuthentication,userController.update);

router.get('/sign-Up',userController.signUp);
router.get('/sign-In',userController.signIn);


router.post('/create',userController.create);

router.post('/create-session', passport.authenticate ('local',
   {failureRedirect:'/users/sign-In'},
   ),  userController.createSession);

   router.get('/sign-Out',userController.destroySession);


module.exports=router;