<script>
  /** @type {{ class?: string }} */
  let { class: cls = '' } = $props();
</script>

<svg
  class={cls}
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="currentColor"
  aria-hidden="true"
>
  <path d="M4 4v16" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none" />
  <path d="M4 4l16 5.5L4 15V4z" />
</svg>
