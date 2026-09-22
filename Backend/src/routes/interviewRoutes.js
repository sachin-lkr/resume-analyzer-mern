import express from "express";

import authUser from "../middlewares/authMIddlewares.js";

import {
  generateInterViewReportController,
  getInterviewReportByIdController,
  getAllInterviewReportsController,
  generateResumePdfController,
} from "../controllers/interviewController.js";

import upload from "../middlewares/filemiddleware.js";

const interviewRouter = express.Router();

// generate new interview report on the basis of user self description,resume pdf and job description.

interviewRouter.post(
  "/",
  authUser,
  upload.single("resume"),
  generateInterViewReportController,
);

// get interview report by interviewId.

interviewRouter.get(
  "/report/:interviewId",
  authUser,
  getInterviewReportByIdController,
);

// get all interview reports of logged in user.

interviewRouter.get(
  "/",
  authUser,
  getAllInterviewReportsController,
);

// generate resume pdf on the basis of user self description, resume content and job description.

interviewRouter.post(
  "/resume/pdf/:interviewReportId",
  authUser,
  generateResumePdfController,
);

export default interviewRouter;