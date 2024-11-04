import axios, { AxiosError } from 'axios';
import { defaultCVData } from "@/constants/default-cv-data";

export async function POST(request: Request) {
  
    const { full_name, prompt } = await request.json();

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4o-mini', // Replace with the correct model name for ChatGPT mini 4, if different
                messages: [
                    {
                        "role": "system",
                        "content": `My name is ${full_name} and here is my brief bio:\n${prompt}\n\n elaborate the summary and fill in this json object (according the bio and job title) and return the modified object as string: \n${JSON.stringify({ name: full_name, currentTitle: defaultCVData.currentTitle, summary: defaultCVData.summary, skills: defaultCVData.skills, workExperiences: defaultCVData.workExperiences.slice(0, 1), otherSections: defaultCVData.otherSections }, null, 2)}`,
                    },
                ],
                max_tokens: 1000, // Adjust based on your needs
                temperature: 0.7,
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return Response.json({
            success: true,
            data: response.data.choices[0]?.message?.content
        })
    } catch (error) {
        console.error((error as AxiosError)?.response?.data)
        return new Response(`Error fetching response: ${(error as Error).message}`, {
            status: 500,
        })
    }
}