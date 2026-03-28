import axios from 'axios';
import { GROQ_MODELS } from './constants';

const GROQ_API_URL = 'https://api.groq.com/openai/v1';

// Internal helper to get API key from Vite environment variables
const getApiKey = () => {
  const key = import.meta.env.REACT_APP_GROQ_KEY || import.meta.env.VITE_GROQ_KEY || import.meta.env.REACT_APP_GROK_KEY;
  if (!key) {
    throw new Error("Groq API key is missing. Please add REACT_APP_GROQ_KEY to your .env file.");
  }
  return key;
};

// Internal axios instance creator
const getGroqClient = () => {
  return axios.create({
    baseURL: GROQ_API_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getApiKey()}`,
    },
  });
};

/**
 * Enhances a simple user prompt into a high-quality descriptive prompt for image generation.
 */
export const getEnhancedPrompt = async (input) => {
  try {
    const client = getGroqClient();
    const response = await client.post('/chat/completions', {
      model: GROQ_MODELS.TEXT,
      messages: [
        {
          role: 'system',
          content: 'You are an expert prompt engineer. Transform the following simple request into a 50-word descriptive masterpiece including lighting, camera angle, and artistic style. Only return the final prompt, nothing else, no quotes around it.'
        },
        {
          role: 'user',
          content: input
        }
      ],
      temperature: 0.7,
    });
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Enhancement failed:", error);
    // If there is an error (e.g., missing API key), fallback to original
    if (error.response?.data?.error?.message) {
      throw new Error(error.response.data.error.message);
    }
    throw error;
  }
};

/**
 * Generates an image using OpenAI DALL-E.
 */
export const generateImage = async (prompt) => {
  // We use Hugging Face's free Inference API for Stability AI (SDXL) as per project options.
  const hfToken = import.meta.env.VITE_HF_TOKEN || import.meta.env.REACT_APP_HF_TOKEN;
  
  if (!hfToken) {
    throw new Error("To generate images, please get a free Hugging Face token from huggingface.co/settings/tokens and add VITE_HF_TOKEN=hf_... to your .env file!");
  }

  try {
    const response = await fetch(
      'https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0',
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${hfToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      if (response.status === 401 || response.status === 403) {
        throw new Error("Your Hugging Face token is invalid or lacks permissions.");
      }
      throw new Error(`API Error (${response.status}): ${errorText}`);
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Image generation failed:", error);
    // Explicitly throw the exact error so the user can see what's wrong instead of a generic "warming up" text
    throw new Error(error.message || "Failed to fetch from Hugging Face.");
  }
};

/**
 * Analyzes an image (base64) using OpenAI Vision API.
 */
export const analyzeImage = async (base64Image) => {
  try {
    const client = getGroqClient();
    const response = await client.post('/chat/completions', {
      model: GROQ_MODELS.VISION,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Analyze this image and list: \n1. Main Subject \n2. Color Palette \n3. Lighting \n4. Artistic Style. \nFormat your response as a tight paragraph describing all of these, no bullet points. Be descriptive so this paragraph can be used to generate a very similar image.'
            },
            {
              type: 'image_url',
              image_url: {
                url: base64Image
              }
            }
          ]
        }
      ],
      max_tokens: 300,
    });
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Image analysis failed:", error);
    if (error.response?.data?.error?.message) {
      throw new Error(error.response.data.error.message);
    }
    throw error;
  }
};
