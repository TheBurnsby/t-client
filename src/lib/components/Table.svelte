<script>
  /**
   * @typedef {Object} ColumnSchema
   * @property {string} key - The property key to read from each row object
   * @property {string} label - The column header display name
   * @property {'string'|'number'|'boolean'|'date'} type - The data type of the column
   */

  /**
   * @type {ColumnSchema[]}
   */
  export let schema = [];

  /**
   * @type {Record<string, any>[]}
   */
  export let data = [];
</script>

<div class="overflow-x-auto">
  <table class="min-w-full border border-gray-200 text-sm">
    <thead class="bg-gray-100 text-left">
      <tr>
        {#each schema as col}
          <th class="px-4 py-2 font-semibold text-gray-700 border-b border-gray-200">
            {col.label}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each data as row, i}
        <tr class={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
          {#each schema as col}
            <td class="px-4 py-2 text-gray-800 border-b border-gray-100">
              {row[col.key] ?? ''}
            </td>
          {/each}
        </tr>
      {/each}
      {#if data.length === 0}
        <tr>
          <td
            colspan={schema.length}
            class="px-4 py-4 text-center text-gray-400"
          >
            No data
          </td>
        </tr>
      {/if}
    </tbody>
  </table>
</div>
