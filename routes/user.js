import express from 'express';
import { 
    getall,
    login, 
    logout, 
    myProfile, 
    register} from '../controllers/userControllers.js';
import { authenticated } from '../middlewares/auth.js';

const router = express.Router();

//path /user/all
router.get("/all",  getall);


router.post("/login",  login);
router.get("/logout",logout);
router.post("/new",  register);

router.get("/me",authenticated,myProfile);
// .put( userUpdate).delete( userDelt);

// router.put("/:id", userUpdate);

// router.delete("/:id", userDelt);


// router.post("/new",  createNew);


export default router;
