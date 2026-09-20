
import express from "express"

import authMiddleware from "../middlewares/authMIddlewares.js"

import interviewController from "../controllers/interviewController.js"


import upload from "../middlewares/filemiddleware.js"

const interviewRouter = express.Router()




 // generate new interview report on the basis of user self description,resume pdf and job description.
 
interviewRouter.post("/", authMiddleware.authUser, upload.single("resume"), interviewController.generateInterViewReportController)

// get interview report by interviewId.
 
interviewRouter.get("/report/:interviewId", authMiddleware.authUser, interviewController.getInterviewReportByIdController)


// get all interview reports of logged in user.

interviewRouter.get("/", authMiddleware.authUser, interviewController.getAllInterviewReportsController)


// generate resume pdf on the basis of user self description, resume content and job description.

interviewRouter.post("/resume/pdf/:interviewReportId", authMiddleware.authUser, interviewController.generateResumePdfController)


export default interviewRouter