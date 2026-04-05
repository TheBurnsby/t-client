<script>
  import { goto } from '$app/navigation';

  /** @type {string} */
  let username = $state('');

  /** @type {string} */
  let password = $state('');

  /** @type {boolean} */
  let loading = $state(false);

  /**
   * Handles sign-in form submission.
   * Sends credentials to the API and stores the returned JWT on success.
   *
   * @param {SubmitEvent} event
   */
  async function handleSignIn(event) {
    event.preventDefault();
    loading = true;

    try {
      // TODO: Replace with real API endpoint once available.
      // Expected request:  POST /auth/sign-in  { username, password }
      // Expected response: { token: string }
      //
      // Example:
      // const response = await fetch('/api/auth/sign-in', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ username, password }),
      // });
      // const { token } = await response.json();
      //
      // TODO: Decide on JWT storage strategy (localStorage, cookie, in-memory store, etc.)
      // and store the token here before redirecting.

      // TODO: Plug in toast notification component here to show success/error messages.
      // e.g. toast.success('Signed in') or toast.error('Invalid credentials')

      await goto('/');
    } finally {
      loading = false;
    }
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50">
  <div class="w-full max-w-sm bg-white rounded-lg border border-gray-200 p-8">
    <h1 class="text-xl font-semibold text-gray-900 mb-6">Sign in</h1>

    <form onsubmit={handleSignIn} class="space-y-4">
      <div>
        <label for="username" class="block text-sm font-medium text-gray-700 mb-1">
          Username
        </label>
        <input
          id="username"
          type="text"
          bind:value={username}
          required
          autocomplete="username"
          class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          bind:value={password}
          required
          autocomplete="current-password"
          class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        class="w-full py-2 px-4 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  </div>
</div>
