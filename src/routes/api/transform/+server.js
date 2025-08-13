import { json } from '@sveltejs/kit';
import { transformConversation } from '$lib/api/gemini';

export async function POST({ request }) {
  try {
    const { conversation, style } = await request.json();
    
    if (!conversation || !style) {
      return new Response(
        JSON.stringify({ error: 'Conversation and style are required' }), 
        { status: 400 }
      );
    }
    
    const transformedText = await transformConversation(conversation, style);
    
    return json({ transformedText });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to transform conversation' }), 
      { status: 500 }
    );
  }
}