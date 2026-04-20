<script>
  /** @type {{ class?: string }} */
  let { class: cls = '' } = $props();
</script>

<!-- Heart with a small dot badge in the upper-right — represents care bridge/transition -->
<svg
  class={cls}
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="currentColor"
  aria-hidden="true"
>
  <!-- Heart shape, shifted slightly down to make room for dot -->
  <path d="M12 22l-1.5-1.37C4.5 15.36 1 12.28 1 8.5 1 5.42 3.42 3 6.5 3c1.74 0 3.41.81 4.5 2.09C12.09 3.81 13.76 3 15.5 3 18.58 3 21 5.42 21 8.5c0 3.78-3.5 6.86-9.5 12.13L12 22z" />
  <!-- Dot badge -->
  <circle cx="19" cy="4" r="3" fill="currentColor" />
</svg>
