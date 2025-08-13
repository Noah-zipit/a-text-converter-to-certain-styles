<script>
  import { STYLES } from '$lib/api/gemini';
  
  export let transformedText = "";
  export let isLoading = false;
  export let selectedStyle = "";
  
  $: styleInfo = STYLES.find(s => s.id === selectedStyle) || {};
</script>

<div class="output-container">
  <h2>
    {#if transformedText}
      Your {styleInfo.name} Conversation
    {:else}
      Transformed Conversation
    {/if}
  </h2>
  
  {#if isLoading}
    <div class="loading">
      <div class="spinner"></div>
      <p>Transforming your conversation through time...</p>
    </div>
  {:else if transformedText}
    <div class="output-text">
      <pre>{transformedText}</pre>
    </div>
    <button on:click={() => navigator.clipboard.writeText(transformedText)} class="copy-btn">
      Copy to Clipboard
    </button>
  {:else}
    <div class="placeholder">
      <p>Your transformed conversation will appear here after you click "Transform"</p>
    </div>
  {/if}
</div>

<style>
  .output-container {
    background-color: #f9f9f9;
    padding: 1.5rem;
    border-radius: 0.5rem;
    border: 1px solid #e0e0e0;
  }
  
  h2 {
    margin-top: 0;
    margin-bottom: 1rem;
  }
  
  .output-text {
    background-color: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    border: 1px solid #eee;
    margin-bottom: 1rem;
    white-space: pre-wrap;
  }
  
  pre {
    font-family: inherit;
    margin: 0;
    white-space: pre-wrap;
  }
  
  .placeholder {
    color: #888;
    text-align: center;
    padding: 3rem 1rem;
  }
  
  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 1rem;
  }
  
  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top-color: #6e8efb;
    animation: spin 1s ease-in-out infinite;
    margin-bottom: 1rem;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .copy-btn {
    background-color: #f0f0f0;
    color: #333;
    border: 1px solid #ddd;
  }
  
  .copy-btn:hover {
    background-color: #e0e0e0;
  }
</style>