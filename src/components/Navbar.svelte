<script lang="ts">
    let open = false;
</script>

{#if !open}
  <div class="navbar">
    <h3 class="title">Laney & Aidan</h3>
    <i
      class="burger ph-list"
      on:click={() => open = !open}
      on:keydown={e => {
        if (e.key === 'Enter') {
          open = !open;
        }
      }}
    ></i>
  </div>
{:else}
  <div class="nav-open">
    <div class="navbar">
      <h3 class="title">Laney & Aidan</h3>
      <i
        class="burger ph-x"
        on:click={() => open = !open}
        on:keydown={e => {
          if (e.key === 'Enter') {
            open = !open;
          }
        }}
      ></i>
    </div>
    <div class="menu">
      <ul class="menu__list">
        <li>
          <a 
            href="/"
          >Home</a>
        </li>
        <li>
          <a 
            href="/gifts"
          >Gifts</a>
        </li>
        <li>
          <a 
            href="/gallery"
          >Gallery</a>
        </li>
      </ul>
    </div>
  </div>
{/if}

<style>
  .navbar {
    overflow: hidden;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 3;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav-open {
    overflow: hidden;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(3px);
  }

  .menu {
    position: absolute;
    top: 56px;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .menu__list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .menu__list li {
    margin: 0 0 16px;
  }

  .menu__list li a {
    color: #fff;
    text-decoration: none;
    font-size: 32px;
    font-weight: 400;
    font-family: "Cormorant Garamond", serif;
  }

  /* .active {
    text-decoration: underline !important;
  } */

  .title {
    font-family: "Dancing Script", cursive;
    font-size: 25px;
    color: white;
  }

  .burger {
    color: white;
    position: absolute;
    right: 20px;
    top: calc(50% - 18px);
    font-size: 36px;
    cursor: pointer;
  }
</style>
