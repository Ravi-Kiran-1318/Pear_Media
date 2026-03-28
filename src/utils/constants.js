export const GROQ_MODELS = {
  TEXT: 'llama-3.1-8b-instant',
  VISION: 'meta-llama/llama-4-scout-17b-16e-instruct',
  IMAGE: 'dall-e-3' // Groq lacks an image generation API currently
};

// Fallback image URL in case generation fails but we still want to show UI flow
export const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop';
