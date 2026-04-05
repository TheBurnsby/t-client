<script>
  import { page } from "$app/state";
  import { goto } from "$app/navigation";

  /**
   * @typedef {Object} NavPage
   * @property {string} label - The display name for the navigation item
   * @property {string} path - The URL path for the navigation item
   */

  /**
   * @type {{
   *   pages?: NavPage[],
   *   children?: import('svelte').Snippet
   * }}
   */
  let { pages = [], children } = $props();

  /**
   * Handles sign-out.
   * Clears the stored JWT and redirects the user to the sign-in page.
   */
  async function handleSignOut() {
    // TODO: Clear the stored JWT here once storage strategy is decided.
    // e.g. localStorage.removeItem('token') or clear your auth store.

    // TODO: Call sign-out API endpoint if the server requires it.
    // e.g. await fetch('/api/auth/sign-out', { method: 'POST' });

    // TODO: Plug in toast notification component here.
    // e.g. toast.success('Signed out')

    await goto('/sign-in');
  }
</script>

<div class="flex flex-col h-screen">
  <!-- ── Header -->
  <header
    class="flex items-center justify-between px-4 h-14 border-b border-gray-200 bg-white shrink-0"
  >
    <!-- Logo (placeholder — swap src once asset is available) -->
    <div class="flex items-center gap-2">
      <div
        class="w-8 h-8 rounded-md bg-gray-200 flex items-center justify-center"
      >
        <!-- TODO: replace with <img src={logo} alt="Logo" /> -->
        <span class="text-xs font-bold text-gray-500">T</span>
      </div>
    </div>

    <!-- Profile selector (placeholder) -->
    <button
      class="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-gray-100 transition-colors"
      aria-label="Profile selector"
    >
      <div
        class="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center"
      >
        <!-- TODO: replace with user avatar -->
        <span class="text-xs font-semibold text-gray-600">P</span>
      </div>
      <!-- Chevron down -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-4 h-4 text-gray-400"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </header>

  <!-- ── Body -->
  <div class="flex flex-1 overflow-hidden">
    <!-- Sidebar -->
    <aside
      class="w-56 flex flex-col border-r border-gray-200 bg-white shrink-0"
    >
      <!-- Page links -->
      <nav class="flex-1 px-2 py-3" aria-label="Main navigation">
        <ul class="space-y-0.5">
          {#each pages as navPage}
            {@const isActive = page.url.pathname === navPage.path}
            <li>
              <a
                href={navPage.path}
                class="flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
                  {isActive
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}"
                aria-current={isActive ? "page" : undefined}
              >
                {navPage.label}
              </a>
            </li>
          {/each}
        </ul>
      </nav>

      <!-- Sign out -->
      <div class="px-2 pb-1">
        <button
          onclick={handleSignOut}
          class="flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          aria-label="Sign out"
        >
          <!-- Arrow-right-on-rectangle (sign out) icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span>Sign out</span>
        </button>
      </div>

      <!-- Settings (placeholder — will expand to admin/profile/settings menu) -->
      <div class="px-2 py-3 border-t border-gray-200">
        <button
          class="flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          aria-label="Settings"
        >
          <!-- Gear icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path
              d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
            />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <span>Settings</span>
        </button>
      </div>
    </aside>

    <!-- Main content area -->
    <main class="flex-1 overflow-auto bg-gray-50">
      {@render children?.()}
    </main>
  </div>
</div>
