import { json } from '@sveltejs/kit';
import { transformPhrase } from '$lib/api/gemini';

export async function POST({ request }) {
  console.log('API endpoint called');
  
  try {
    const body = await request.json();
    console.log('Request body received:', body);
    
    const { phrase, style } = body;
    
    if (!phrase || !style) {
      console.log('Missing required fields');
      return json({ error: 'Phrase and style are required' }, { status: 400 });
    }
    
    console.log(`Processing transformation: style=${style}, phrase="${phrase}"`);
    
    try {
      const transformedText = await transformPhrase(phrase, style);
      console.log('Transformation successful, returning response');
      return json({ transformedText });
    } catch (apiError) {
      console.error('Gemini API Error:', apiError);
      return json({ 
        error: `Error connecting to AI service: ${apiError.message}` 
      }, { status: 500 });
    }
  } catch (parseError) {
    console.error('Request parsing error:', parseError);
    return json({ error: 'Failed to parse request' }, { status: 400 });
  }
}
