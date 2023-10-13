import express from 'express';
import { createUser, deleteOneUser, findOneUser, findUsers, signinUser } from '../controller/authController';

const router= express.Router();

router.route("/create-user").post(createUser)
router.route("/sign-in-user").post(signinUser)

router.route("/view-user").get(findUsers)
router.route("/:UserID/view-user").get(findOneUser)

router.route("/UserID/delete").delete(deleteOneUser)



export default router