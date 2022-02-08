<script>
  export let message = "Hello, world!",
    showing,
    timeout = 5000;

  $: if (showing) {
    console.log("Setting timeout");
    setTimeout(() => {
      console.log("Removing alert");
      showing = false;
    }, timeout);
  }
</script>

{#if showing}
  <div class="alert-banner">
    <p class="alert-banner__message">{message}</p>
  </div>
{/if}

<style lang="scss">
  .alert-banner {
    @keyframes alert-in {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 1rem;
    background-color: #f44336;
    color: #fff;
    z-index: 9999;
    text-align: center;

    // Animation
    animation-name: alert-in;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
    animation-timing-function: ease-in-out;

    &__message {
      margin: 10px 0;
      font-size: 24px;
    }
  }
</style>
