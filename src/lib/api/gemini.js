import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the API with your API key
const getGenerativeAI = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not defined in environment variables');
  }
  return new GoogleGenerativeAI(apiKey);
};

// Available historical styles
export const STYLES = [
  { id: 'shakespeare', name: 'Shakespearean', era: '16th Century' },
  { id: 'victorian', name: 'Victorian', era: '19th Century' },
  { id: 'noir', name: '1940s Film Noir', era: '1940s' },
  { id: 'valley', name: 'Valley Girl', era: '1980s' },
  { id: 'pirate', name: 'Pirate', era: 'Golden Age of Piracy' },
  { id: 'medieval', name: 'Medieval', era: 'Middle Ages' },
  { id: 'scifi', name: 'Space Colony', era: 'Future' },
  { id: 'superhero', name: 'Superhero', era: 'Modern' },
  { id: 'gangster', name: '1920s Gangster', era: '1920s' },
  { id: 'western', name: 'Wild West', era: '19th Century' }
];

// Transform the conversation to the selected style
export async function transformConversation(conversation, style) {
  try {
    const genAI = getGenerativeAI();
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const styleInfo = STYLES.find(s => s.id === style);
    
    const prompt = `
      Transform the following conversation into a ${styleInfo.name} style dialog from the ${styleInfo.era}.
      Make it entertaining and authentic to the time period and style.
      
      Original conversation:
      ${conversation}
      
      Transformed conversation (maintain the back and forth structure):
    `;
    
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Error transforming conversation:', error);
    throw new Error('Failed to transform conversation. Please try again.');
  }
}