<script>
  import Header from '$lib/components/Header.svelte';
  import ConversationInput from '$lib/components/ConversationInput.svelte';
  import StyleSelector from '$lib/components/StyleSelector.svelte';
  import TransformedOutput from '$lib/components/TransformedOutput.svelte';
  
  let conversation = "";
  let selectedStyle = "shakespeare";
  let transformedText = "";
  let isLoading = false;
  let error = null;
  
  async function transformConversation() {
    if (!conversation.trim()) {
      error = "Please enter a conversation to transform";
      return;
    }
    
    error = null;
    isLoading = true;
    
    try {
      const response = await fetch('/api/transform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          conversation,
          style: selectedStyle
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to transform conversation');
      }
      
      const data = await response.json();
      transformedText = data.transformedText;
    } catch (err) {
      error = err.message || 'Something went wrong. Please try again.';
      console.error('Error:', err);
    } finally {
      isLoading = false;
    }
  }
</script>

<Header />

<main>
  <ConversationInput bind:conversation />
  
  <StyleSelector bind:selectedStyle />
  
  {#if error}
    <div class="error">
      {error}
    </div>
  {/if}
  
  <button class="transform-btn" on:click={transformConversation} disabled={isLoading}>
    {isLoading ? 'Transforming...' : 'Transform Conversation'}
  </button>
  
  <TransformedOutput {transformedText} {isLoading} {selectedStyle} />
</main>

<style>
  main {
    margin-bottom: 3rem;
  }
  
  .transform-btn {
    display: block;
    width: 100%;
    margin: 2rem 0;
    padding: 1rem;
    font-size: 1.1rem;
    background: linear-gradient(135deg, #6e8efb, #a777e3);
  }
  
  .transform-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  .error {
    background-color: #fff0f0;
    color: #e53935;
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    border-left: 4px solid #e53935;
  }
</style>