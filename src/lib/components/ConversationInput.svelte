<script>
  export let conversation = "";
  
  // Default sample conversation
  const sampleConversation = `Alice: Hey, can you help me with this project?
Bob: Sure, what do you need?
Alice: I'm stuck on the data analysis part.
Bob: No problem, I can look at it tomorrow.
Alice: Thanks! I'll send you the files tonight.
Bob: Sounds good. Don't forget to include the spreadsheets.`;
  
  function loadSample() {
    conversation = sampleConversation;
  }
  
  function clearText() {
    conversation = "";
  }
</script>

<div class="input-container">
  <h2>Enter your conversation</h2>
  <p class="tip">Format as "Name: Message" with each person on a new line</p>
  
  <textarea 
    bind:value={conversation} 
    placeholder="Enter your conversation here..."
    rows="8"
  ></textarea>
  
  <div class="actions">
    <button on:click={loadSample} class="secondary">Load Sample</button>
    <button on:click={clearText} class="secondary">Clear</button>
  </div>
</div>

<style>
  .input-container {
    margin-bottom: 2rem;
  }
  
  h2 {
    margin-bottom: 0.5rem;
  }
  
  .tip {
    font-size: 0.9rem;
    margin-top: 0;
    color: #666;
    margin-bottom: 1rem;
  }
  
  textarea {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    font-family: inherit;
    resize: vertical;
    margin-bottom: 1rem;
  }
  
  .actions {
    display: flex;
    gap: 1rem;
  }
  
  button.secondary {
    background-color: #f0f0f0;
    color: #333;
    border: 1px solid #ddd;
  }
  
  button.secondary:hover {
    background-color: #e0e0e0;
  }
</style>