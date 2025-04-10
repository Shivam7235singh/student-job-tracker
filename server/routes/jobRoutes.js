import express from "express";
import {
  getJobs,
  createJob,
  updateJobStatus,
  deleteJob,
} from "../controllers/jobController.js";
import  {isAuthenticated}  from "../middlewares/auth.js";


const router = express.Router();

router.route("/").get( getJobs).post(createJob);

router.route("/:id").put( updateJobStatus).delete( deleteJob);

export default router;
