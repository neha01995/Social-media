const express=require('express');
const router=express.Router();

const userController=require('../controllers/user_controller');

router.get('/profile',userController.profile);


router.get('/sign-Up',userController.signUp);
router.get('/sign-In',userController.signIn);

router.post('/create',userController.create);
// router.get('/create-session',userController.);





module.exports=router;