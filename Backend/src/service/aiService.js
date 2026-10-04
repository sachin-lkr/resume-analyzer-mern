
import "dotenv/config";
import { GoogleGenAI, Type } from "@google/genai";
import puppeteer from "puppeteer";

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

// Direct Native Schema for Gemini (No need for zod-to-json-schema)
const interviewReportSchema = {
    type: Type.OBJECT,
    properties: {
        matchScore: {
            type: Type.NUMBER,
            description: "A score between 0 and 100 indicating how well the candidate matches the job description."
        },
        title: {
            type: Type.STRING,
            description: "The job title."
        },
        technicalQuestions: {
            type: Type.ARRAY,
            description: "Technical questions with intentions and ideal answers.",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING },
                    intention: { type: Type.STRING },
                    answer: { type: Type.STRING }
                },
                required: ["question", "intention", "answer"]
            }
        },
        behavioralQuestions: {
            type: Type.ARRAY,
            description: "Behavioral questions with intentions and ideal answers.",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING },
                    intention: { type: Type.STRING },
                    answer: { type: Type.STRING }
                },
                required: ["question", "intention", "answer"]
            }
        },
        skillGaps: {
            type: Type.ARRAY,
            description: "Candidate skill gaps and severity.",
            items: {
                type: Type.OBJECT,
                properties: {
                    skill: { type: Type.STRING },
                    severity: { 
                        type: Type.STRING, 
                        enum: ["low", "medium", "high"] 
                    }
                },
                required: ["skill", "severity"]
            }
        },
        preparationPlan: {
            type: Type.ARRAY,
            description: "Day-by-day preparation schedule.",
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.INTEGER },
                    focus: { type: Type.STRING },
                    tasks: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING }
                    }
                },
                required: ["day", "focus", "tasks"]
            }
        }
    },
    required: [
        "matchScore", 
        "title", 
        "technicalQuestions", 
        "behavioralQuestions", 
        "skillGaps", 
        "preparationPlan"
    ]
};

async function generateInterviewReport({
    resume,
    selfDescription,
    jobDescription,
    retries = 3
}) {
    const prompt = `
Generate an interview preparation report based strictly on the provided candidate resume, self-description, and target job description.

Candidate Resume:
${resume}

Candidate Self Description:
${selfDescription}

Target Job Description:
${jobDescription}

Strict Instructions:
1. Provide a realistic matchScore (0-100).
2. Generate at least 3 relevant Technical Questions with answer guidance.
3. Generate at least 2 Behavioral Questions.
4. List key Skill Gaps with severity (low, medium, high).
5. Outline a structured multi-day Preparation Plan with daily tasks.
`;

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            console.log(`Sending request to Gemini API (Attempt ${attempt}/${retries})...`);

            const response = await ai.models.generateContent({
                model: "gemini-3.8-flash",
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: interviewReportSchema
                }
            });

            console.log("RAW AI RESPONSE:", response.text);

            const parsedResponse = JSON.parse(response.text);

            return parsedResponse;

        } catch (error) {
            console.error(`Attempt ${attempt} failed:`, error.message);

            if (attempt === retries) {
                throw new Error(`Failed to generate interview report after ${retries} attempts: ${error.message}`);
            }

            console.log("Waiting 2 seconds before retrying...");
            await new Promise((resolve) => setTimeout(resolve, 2000));
        }
    }
}

async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
        format: "A4",
        margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm"
        }
    });

    await browser.close();
    return pdfBuffer;
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
    const resumePdfSchema = {
        type: Type.OBJECT,
        properties: {
            html: { 
                type: Type.STRING, 
                description: "Clean and modern HTML/CSS formatted string of the candidate resume." 
            }
        },
        required: ["html"]
    };

    const prompt = `Generate a modern, clean HTML resume tailored for the job description.
    
    Resume: ${resume}
    Self Description: ${selfDescription}
    Job Description: ${jobDescription}`;

    const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: resumePdfSchema
        }
    });

    const jsonContent = JSON.parse(response.text);
    return await generatePdfFromHtml(jsonContent.html);
}

export { generateInterviewReport, generateResumePdf };