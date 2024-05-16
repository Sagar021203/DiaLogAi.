const { aiSchema } = require("../config/input_validation");
const {GoogleGenerativeAI,HarmBlockThreshold,HarmCategory} = require("@google/generative-ai")
const MODEL_NAME = process.env.MODEL_NAME
const API_KEY = process.env.API_KEY

const ai = async (req, res) => {
    try {
        const userInputs = aiSchema.safeParse(req.body)
        if (userInputs) {
            const prompt = userInputs.data.prompt

            const genAI = new GoogleGenerativeAI(API_KEY);
            const model = genAI.getGenerativeModel({ model: MODEL_NAME });
            const safetySettings = [
                {
                    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },-
                {
                    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
            ];
            const generationConfig = {
                temperature: 0.9,
                topK: 1,
                topP: 1,
                maxOutputTokens: 2048,
            }
            const chat = model.startChat({
                generationConfig,
                safetySettings,
                history: [
                ],
            });

            const result = await chat.sendMessage(prompt);
            const response = result.response.candidates[0].content
            .parts[0].text
            res.status(200).json({ response });
        } else {
            res.status(411).json({ msg: "Invalid inputs" })
        }
    } catch (err) {
        res.status(500).json({ msg: "Error occured in ai route", err })
        //console.log(err)
    }
}

module.exports = ai