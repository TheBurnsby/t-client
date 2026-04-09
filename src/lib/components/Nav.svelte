<script>
  import { page } from "$app/state";
  import { goto } from "$app/navigation";
  import ChevronDownIcon from '$lib/components/icons/ChevronDownIcon.svelte';
  import SignOutIcon from '$lib/components/icons/SignOutIcon.svelte';
  import SettingsIcon from '$lib/components/icons/SettingsIcon.svelte';

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
    class="flex items-center justify-between px-4 h-14 border-b border-border bg-surface shrink-0"
  >
    <!-- Logo (placeholder — swap src once asset is available) -->
    <div class="flex items-center gap-2">
      <div
        class="w-8 h-8 rounded-md bg-surface-alt flex items-center justify-center"
      >
        <!-- TODO: replace with <img src={logo} alt="Logo" /> -->
        <span class="text-xs font-bold text-muted">T</span>
      </div>
    </div>

    <!-- Profile selector (placeholder) -->
    <button
      class="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-surface-alt transition-colors"
      aria-label="Profile selector"
    >
      <div
        class="w-7 h-7 rounded-full bg-surface-alt flex items-center justify-center"
      >
        <!-- TODO: replace with user avatar -->
        <span class="text-xs font-semibold text-muted">P</span>
      </div>
      <ChevronDownIcon class="w-4 h-4 text-muted" />
    </button>
  </header>

  <!-- ── Body -->
  <div class="flex flex-1 overflow-hidden">
    <!-- Sidebar -->
    <aside
      class="w-56 flex flex-col border-r border-border bg-surface shrink-0"
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
                  ? 'bg-surface-alt text-foreground'
                  : 'text-muted hover:bg-surface-alt hover:text-foreground'}"
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
          class="flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm font-medium text-muted hover:bg-surface-alt hover:text-foreground transition-colors"
          aria-label="Sign out"
        >
          <SignOutIcon class="w-5 h-5 shrink-0" />
          <span>Sign out</span>
        </button>
      </div>

      <!-- Settings (placeholder — will expand to admin/profile/settings menu) -->
      <div class="px-2 py-3 border-t border-border">
        <button
          class="flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm font-medium text-muted hover:bg-surface-alt hover:text-foreground transition-colors"
          aria-label="Settings"
        >
          <SettingsIcon class="w-5 h-5 shrink-0" />
          <span>Settings</span>
        </button>
      </div>
    </aside>

    <!-- Main content area -->
    <main class="flex-1 overflow-auto bg-background">
      {@render children?.()}
    </main>
  </div>
</div>
