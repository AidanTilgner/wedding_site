<script lang="ts">
  interface FAQ {
    question: string;
    answer: string;
  }

  export let question: FAQ["question"], answer: FAQ["answer"];

  let open = false;
</script>

<div class="faq">
  <div class="top">
    <p>{question}</p>
    {#if !open}
      <i
        class="ph-plus"
        on:click={() => (open = true)}
        on:keydown={(e) => {
          if (e.key === "Enter") {
            open = true;
          }
        }}
      />
    {:else}
      <i
        class="ph-minus"
        on:click={() => (open = false)}
        on:keydown={(e) => {
          if (e.key === "Enter") {
            open = false;
          }
        }}
      />
    {/if}
  </div>
  {#if open}
    <div class="bottom">
      <p>{answer}</p>
    </div>
  {/if}
</div>

<style lang="scss">
  .faq {
    margin: 8px 0;
    width: 100%;
    box-sizing: border-box;
    padding: 8px 0;

    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;

      p {
        font-size: 18px;
        font-weight: 500;
        margin: 0;
        padding: 0;
      }

      i {
        font-size: 20px;
        padding: 8px;
        transition: all 0.2s ease-in-out;
        border-radius: 50%;

        &:hover {
          cursor: pointer;
          background-color: #eaeaea;
        }
      }
    }
  }
</style>
