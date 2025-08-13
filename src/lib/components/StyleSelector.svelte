<script>
  import { STYLES } from '$lib/api/gemini';
  
  export let selectedStyle = "shakespeare";
</script>

<div class="style-selector">
  <h2>Choose a Style</h2>
  
  <div class="styles-grid">
    {#each STYLES as style}
      <div 
        class="style-card" 
        class:selected={selectedStyle === style.id}
        on:click={() => selectedStyle = style.id}
      >
        <h3>{style.name}</h3>
        <span class="era">{style.era}</span>
      </div>
    {/each}
  </div>
</div>

<style>
  .style-selector {
    margin-bottom: 2rem;
  }
  
  .styles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .style-card {
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: #f8f8f8;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: center;
    border: 2px solid transparent;
  }
  
  .style-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .style-card.selected {
    border-color: #6e8efb;
    background-color: #f0f4ff;
  }
  
  h3 {
    margin: 0 0 0.3rem 0;
    font-size: 1rem;
  }
  
  .era {
    font-size: 0.8rem;
    color: #666;
  }
</style>