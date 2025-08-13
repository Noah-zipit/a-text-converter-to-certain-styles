<script>
  import Header from '$lib/components/Header.svelte';
  import PhraseInput from '$lib/components/PhraseInput.svelte';
  import StyleSelector from '$lib/components/StyleSelector.svelte';
  import TransformedOutput from '$lib/components/TransformedOutput.svelte';
  
  let phrase = "";
  let selectedStyle = "shakespeare";
  let transformedText = "";
  let isLoading = false;
  let error = "";
  
  async function transformPhrase() {
    if (!phrase.trim()) {
      error = "Please enter a phrase to transform";
      return;
    }
    
    error = "";
    isLoading = true;
    transformedText = "";
    
    try {
      console.log('Sending request to transform API');
      const response = await fetch('/api/transform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phrase,
          style: selectedStyle
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to transform phrase');
      }
      
      transformedText = data.transformedText;
      console.log('Transformation successful');
    } catch (err) {
      console.error('Error in transformation:', err);
      error = err.message || 'Something went wrong. Please try again.';
    } finally {
      isLoading = false;
    }
  }
</script>

<Header />

<main>
  <PhraseInput bind:phrase />
  
  <StyleSelector bind:selectedStyle />
  
  <button class="transform-btn" on:click={transformPhrase} disabled={isLoading}>
    {isLoading ? 'Transforming...' : 'Transform Phrase'}
  </button>
  
  <TransformedOutput {transformedText} {isLoading} {selectedStyle} {error} />
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
</style>
