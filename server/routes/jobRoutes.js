import express from "express";
import {
  getJobs,
  createJob,
  updateJobStatus,
  deleteJob,
} from "../controllers/jobController.js";
import { isAuthenticated } from "../middlewares/auth.js";


const router = express.Router();

router.route("/").get(isAuthenticated , getJobs).post(isAuthenticated , createJob);

router.route("/:id").put(isAuthenticated , updateJobStatus).delete(isAuthenticated , deleteJob);

export default router;
