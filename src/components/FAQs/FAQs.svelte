<script lang="ts">
  import FAQ from "./FAQ.svelte";

  interface FAQs {
    questions: {
      question: string;
      answer: string;
    }[];
  }

  export let questions: FAQs["questions"];
</script>

<div class="faqs">
  {#each questions as { question, answer }}
    <div class="faq">
      <FAQ {question} {answer} />
    </div>
  {/each}
</div>

<style lang="scss">
  .faqs {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 56px 20px;
    border: 1px solid #eaeaea;
    padding: 0 14px;

    .faq {
      width: 100%;
      box-sizing: border-box;
    }
  }
</style>
