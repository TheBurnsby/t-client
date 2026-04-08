<script>
  /** @type {{ class?: string }} */
  let { class: cls = '' } = $props();
</script>

<svg
  class={cls}
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden="true"
>
  <circle cx="12" cy="12" r="9" />
  <path d="M6 18L18 6" />
</svg>
