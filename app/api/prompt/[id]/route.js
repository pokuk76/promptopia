import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET
export const GET = async (request, { params }) => {
    try {
        await connectToDB(); 

        const prompt = await Prompt.findById(params.id).populate('creator');
        if (!prompt) return new Response("Prompt not found", { status: 404 });


        return new Response(JSON.stringify(prompt), {status: 200});

    } catch (error) {
        return new Response("Failed to retrieve prompts", {status: 500});  // 500 => "Server" Error
    }
}

// PATCH
export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);

        if (!prompt) return new Response("Prompt not found", { status: 404 });

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), {status: 200});

    } catch (error) {
        return new Response("Failed to update this prompt", {status: 500});
    }
}

// DELETE
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // const existingPrompt = await Prompt.findById(params.id);
        // if (!prompt) return new Response("Prompt not found", { status: 404 });
        // await existingPrompt.remove();

        /* What is the difference between this and `findByIdAndDelete` ?? */
        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt deleted successfully", {status: 200});

    } catch (error) {
        return new Response("Failed to delete this prompt", {status: 500});
    }
}
