
import OpenAI from "openai";
import JobApplication from "../persistance/entities/jobApplications";

const client = new OpenAI({ apiKey: -key });

export async function generateRating(jobApplicationId) {
    const jobApplication = await JobApplication.findById(jobApplicationId).populate("job");
    // Role: Software Architect, Description: "fsjafksdjfklsja"
    const content = `Role:${jobApplication?.job.title}, User Description : ${jobApplication?.answers.join(". ")}`
    
    const completion = await client.chat.completions.create(
        {
            messages:[{role:"user",content}],
            model: "ft:gpt-3.5-turbo-0125:stemlink:aidriven:AeDPqlDW"
        }
    );
    const response = JSON.parse(completion.choices[0].message.content);
  
    if (!response.rate) {
        return;
    }
    await JobApplication.findOneAndUpdate({_id:jobApplicationId},{rating:response.rate})
} 