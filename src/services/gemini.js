import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY?.trim();

let ai = null;

if (API_KEY) {
    // console.log("Initializing Gemini with Key:", API_KEY.substring(0, 5) + "...");
    ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
    console.error("Gemini API Key is missing!");
}

export const checkApiKey = () => {
    return !!API_KEY;
};

const MODEL_NAME = "gemini-2.5-flash";

const HUMANIZER_INSTRUCTIONS = `
  CRITICAL STYLE GUIDELINES:
  - Write like a real, high-performing human, not an AI.
  - Avoid overused corporate buzzwords like "spearheaded", "leveraged", "synergy", "transformative", "unwavering".
  - Use active, punchy verbs (e.g., "Built", "Led", "Fixed", "Saved").
  - Be specific and metric-driven but natural.
  - Tone: Professional yet authentic, confident but humble.
  - If the user's data is casual, polish it but keep the voice.
`;

export const generateResumeLatex = async (jobDescription, userData, latexTemplate) => {
    if (!ai) throw new Error("API Key not found");

    const prompt = `
    You are an expert resume writer who hates generic AI-generated content.
    I have a LaTeX resume template and my user data.
    - Quantify everything possible. There should be impressive numbers.
    - Every skill in job description should be shown in the resume.
    - Make sure hiring manager falls in love with the resume.
    - Show that you are a real person, not an AI.
    - Show behavior-based examples of your skills.
    - Show transferable skills.
    I need you to rewrite the resume content to tailor it specifically for the following Job Description.
    
    ${HUMANIZER_INSTRUCTIONS}

    JOB DESCRIPTION:
    ${jobDescription}

    USER DATA:
    ${JSON.stringify(userData, null, 2)}

    LATEX TEMPLATE:
    ${latexTemplate}

    INSTRUCTIONS:
    1. Keep the exact structure and formatting of the LaTeX template.
    2. Modify the bullet points in the Experience and Projects sections to highlight skills and achievements relevant to the Job Description.
    3. Ensure the output is valid LaTeX code that can be compiled.
    4. Return ONLY the full LaTeX code. Do not include markdown code blocks.
  `;

    try {
        const response = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: prompt,
        });

        // FIX: response.text is a property in @google/genai, not a function
        let text = response.text;
        if (typeof text === 'function') text = text(); // Safety fallback

        if (!text) return "";

        text = text.replace(/^```latex\s*/, "").replace(/^```\s*/, "").replace(/```$/, "");
        return text;
    } catch (error) {
        console.error("generateResumeLatex Error:", error);
        throw error;
    }
};

export const reviseResumeLatex = async (currentLatex, instructions, userData) => {
    if (!ai) throw new Error("API Key not found");

    const prompt = `
    You are an expert resume writer.
    I have a current LaTeX resume and some instructions for revision.
    
    ${HUMANIZER_INSTRUCTIONS}

    CURRENT LATEX RESUME:
    ${currentLatex}

    USER DATA (for reference):
    ${JSON.stringify(userData, null, 2)}

    REVISION INSTRUCTIONS:
    ${instructions}

    INSTRUCTIONS:
    1. Apply the revision instructions to the current LaTeX resume.
    2. Keep the rest of the resume structure and formatting intact.
    3. Ensure the output is valid LaTeX code that can be compiled.
    4. Return ONLY the full LaTeX code.
  `;

    try {
        const response = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: prompt,
        });

        let text = response.text;
        if (typeof text === 'function') text = text();

        if (!text) return "";

        text = text.replace(/^```latex\s*/, "").replace(/^```\s*/, "").replace(/```$/, "");
        return text;
    } catch (error) {
        console.error("reviseResumeLatex Error:", error);
        throw error;
    }
};

export const generateCoverLetter = async (jobDescription, userData, tone = "confident") => {
    if (!ai) throw new Error("API Key not found");

    const toneGuidelines = {
        confident: "Professional, confident, metric-driven, and authoritative yet humble. Highlight strong quantifiable metrics and leadership potential.",
        quirky: "Conversational, highly engaging, creative, and quirky. Highlight authentic personality traits, stories, and memorable hooks while maintaining respect.",
        technical: "Highly technical, structural, logical, and focused heavily on code/hardware engineering. Mention specialized languages, tools, frameworks, and system design insights.",
        passionate: "Mission-driven, extremely enthusiastic, showing genuine interest in the company's culture, vision, and growth. Express a strong desire to make an impact."
    };

    const selectedToneGuideline = toneGuidelines[tone] || toneGuidelines.confident;

    const prompt = `
    You are an expert career coach. Write a compelling cover letter for the following job. Sound human, Make recruiter or hiring manager fall in love with me. Show transferable skills. Show every skill listed in job description. - Show behavior-based examples of your skills.

    ${HUMANIZER_INSTRUCTIONS}

    TONE/STYLE GUIDELINE:
    ${selectedToneGuideline}

    JOB DESCRIPTION:
    ${jobDescription}

    USER DATA:
    ${JSON.stringify(userData, null, 2)}

    INSTRUCTIONS:
    1. Apply the TONE/STYLE GUIDELINE provided above strictly to shape the cover letter's voice.
    2. Highlight relevant experience and projects from the user data.
    3. Explain why the user is a great fit for this specific role.
    4. Keep it concise (under 300 words).
    5. Format it as a standard cover letter.
    6. Do NOT sound like a robot. Write as if you are the candidate speaking passionately.
    7. Show every skill listed in job description.
    8. Show behavior-based examples of your skills.
    9. Show how inclined you are with the company and the job.
    10. Show how you can add value to the company.
  `;

    try {
        const response = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: prompt,
        });

        let text = response.text;
        if (typeof text === 'function') text = text();
        return text;

    } catch (error) {
        console.error("generateCoverLetter Error:", error);
        throw error;
    }
};

export const generateColdDM = async (recipientInfo, jobDescription, userData, tone = "confident") => {
    if (!ai) throw new Error("API Key not found");

    const toneGuidelines = {
        confident: "Bold, confident, short, metric-driven, and high-impact. Clear value proposition.",
        quirky: "Warm, witty, personal, high energy, and highly engaging. Mentions a fun fact or unique hook.",
        technical: "Precise, structured, and focused on specific technologies/problem statements. Highly engineering-centric.",
        passionate: "Extremely enthusiastic, deeply culture-driven, highlighting strong alignment with the company's vision and product."
    };

    const selectedToneGuideline = toneGuidelines[tone] || toneGuidelines.confident;

    const prompt = `
    You are an expert networker. Write a cold DM (LinkedIn message or email) to a recruiter or hiring manager.
    
    ${HUMANIZER_INSTRUCTIONS}

    TONE/STYLE GUIDELINE:
    ${selectedToneGuideline}

    RECIPIENT INFO / CONTEXT:
    ${recipientInfo}

    JOB DESCRIPTION (Optional context):
    ${jobDescription || "N/A"}

    USER DATA:
    ${JSON.stringify(userData, null, 2)}

    INSTRUCTIONS:
    1. Keep it short and punchy (under 150 words for LinkedIn, slightly longer for email).
    2. Mention a specific reason for reaching out (e.g., shared interest, specific role).
    3. Highlight 1-2 key achievements relevant to them.
    4. End with a clear but low-pressure call to action.
    5. Make it sound like a real person reaching out, not a marketing bot.
    6. Strictly apply the TONE/STYLE GUIDELINE to frame the voice.
  `;

    try {
        const response = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: prompt,
        });

        let text = response.text;
        if (typeof text === 'function') text = text();
        return text;

    } catch (error) {
        console.error("generateColdDM Error:", error);
        throw error;
    }
};

export const chatWithExperience = async (history, message, userData, options = {}) => {
    if (!ai) throw new Error("API Key not found");

    const { resumeContext, detailed } = options;

    let systemPrompt = `Here is my background information. Answer all future questions based on this data, acting as my personal career assistant. \n\n ${JSON.stringify(userData, null, 2)}`;

    if (resumeContext) {
        systemPrompt += `\n\nCONTEXT: The user has generated a resume. Here is the LaTeX content:\n${resumeContext}\n\nIf the user asks about the resume, refer to this content.`;
    }

    if (detailed) {
        systemPrompt += `\n\nINSTRUCTION: Provide detailed, comprehensive responses. Do not be brief. Expand on your points and provide examples where possible.`;
    }

    const contents = [
        {
            role: "user",
            parts: [{ text: systemPrompt }],
        },
        {
            role: "model",
            parts: [{ text: "Understood. I have your background information and am ready to assist you with any questions about your experience, projects, or career advice." }],
        },
        ...history,
        {
            role: "user",
            parts: [{ text: message }]
        }
    ];

    try {
        const response = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: contents,
        });

        let text = response.text;
        if (typeof text === 'function') text = text();
        return text;

    } catch (error) {
        console.error("chatWithExperience Error:", error);
        throw error;
    }
};

export const generateInterviewQuestions = async (jobDescription, userData) => {
    if (!ai) throw new Error("API Key not found");

    const prompt = `
    You are a tough but fair hiring manager.
    Generate 3 challenging interview questions based on the user's background and the job description.
    
    JOB DESCRIPTION:
    ${jobDescription}

    USER DATA:
    ${JSON.stringify(userData, null, 2)}

    INSTRUCTIONS:
    1. Question 1: Technical/Skill-based related to the role.
    2. Question 2: Behavioral (STAR method opportunity).
    3. Question 3: Project-specific deep dive.
    4. Return ONLY the questions as a JSON array of strings. Example: ["Question 1", "Question 2", "Question 3"]
  `;

    try {
        const response = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: prompt,
            config: { responseMimeType: "application/json" }
        });

        let text = response.text;
        if (typeof text === 'function') text = text();
        return JSON.parse(text);

    } catch (error) {
        console.error("generateInterviewQuestions Error:", error);
        throw error;
    }
};

export const evaluateInterviewAnswer = async (question, answer, userData) => {
    if (!ai) throw new Error("API Key not found");

    const prompt = `
    You are an interview coach. Evaluate the candidate's answer.
    
    QUESTION:
    ${question}

    CANDIDATE ANSWER:
    ${answer}

    USER DATA (Context):
    ${JSON.stringify(userData, null, 2)}

    INSTRUCTIONS:
    1. Provide a rating (1-10).
    2. Give specific feedback on what was good.
    3. Give specific feedback on what to improve (e.g., "You forgot to mention the impact", "Too vague").
    4. Suggest a better way to phrase it using the STAR method.
    5. Keep it constructive and encouraging.
  `;

    try {
        const response = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: prompt,
        });

        let text = response.text;
        if (typeof text === 'function') text = text();
        return text;

    } catch (error) {
        console.error("evaluateInterviewAnswer Error:", error);
        throw error;
    }
};

export const optimizeLinkedInProfile = async (targetRole, userData) => {
    if (!ai) throw new Error("API Key not found");

    const prompt = `
    You are a LinkedIn profile expert. Optimize the user's profile for a specific target role.
    
    ${HUMANIZER_INSTRUCTIONS}

    TARGET ROLE:
    ${targetRole}

    USER DATA:
    ${JSON.stringify(userData, null, 2)}

    INSTRUCTIONS:
    1. Generate a catchy, keyword-rich **Headline**.
    2. Write a compelling **About** section (first person, engaging hook).
    3. Suggest 3 key **Skills** to pin.
    4. Rewrite the most recent experience bullet points to be more impactful for this role.
    5. Return the result in Markdown format with clear headings.
  `;

    try {
        const response = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: prompt,
        });

        let text = response.text;
        if (typeof text === 'function') text = text();
        return text;

    } catch (error) {
        console.error("optimizeLinkedInProfile Error:", error);
        throw error;
    }
};

export const generateCareerRoadmap = async (dreamRole, userData) => {
    if (!ai) throw new Error("API Key not found");

    const prompt = `
    You are an expert career architect and technical strategist who helps professionals build transition blueprints.
    I want to design a detailed, step-by-step career transition roadmap to reach my target Dream Role.
    
    ${HUMANIZER_INSTRUCTIONS}
    
    DREAM ROLE:
    ${dreamRole}
    
    MY CURRENT BACKGROUND:
    ${JSON.stringify(userData, null, 2)}
    
    INSTRUCTIONS:
    1. Conduct a brief skill "Gap Analysis" highlighting which skills from my current background are highly transferable, and which core skills are missing for the Dream Role. Show this as a structured table.
    2. Create a comprehensive, realistic month-by-month timeline (covering 6 months) to bridge this gap.
    3. For each phase, provide:
       - **Focus Area**: Core skills, tools, or theoretical frameworks to master.
       - **Practical Projects**: Specific, high-impact projects to build (e.g. system architectures, specific features) with concrete technical details.
       - **Key Certifications & Courses**: Industry-recognized credentials or specialized learning tracks.
       - **Outreach & Networking Strategy**: Practical networking tasks, target communities, or professional groups.
    4. Write in a highly encouraging, structured, strategic, and professional tone.
    5. Return the response in clean, beautiful Markdown format. Do not include a markdown code block wrapper itself.
    `;

    try {
        const response = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: prompt,
        });

        let text = response.text;
        if (typeof text === 'function') text = text();
        return text;
    } catch (error) {
        console.error("generateCareerRoadmap Error:", error);
        throw error;
    }
};
