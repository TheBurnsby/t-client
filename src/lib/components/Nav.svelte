<script>
  import { page } from '$app/state';

  /**
   * @typedef {Object} NavPage
   * @property {string} label - The display name for the navigation item
   * @property {string} path - The URL path for the navigation item
   */

  /**
   * @type {{ pages?: NavPage[] }}
   */
  let { pages = [] } = $props();
</script>

<nav class="flex justify-center">
  <ul class="flex flex-row overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
    {#each pages as navPage}
      {@const isActive = page.url.pathname === navPage.path}
      <li>
        <a
          href={navPage.path}
          class="block whitespace-nowrap px-4 py-2 text-sm font-medium transition-colors
            {isActive
              ? 'bg-gray-900 text-white rounded'
              : 'text-gray-600 hover:text-gray-900'}"
        >
          {navPage.label}
        </a>
      </li>
    {/each}
  </ul>
</nav>
