## Next steps 
- ~~Card component~~
- ~~Tabs component~~
    ```JS
    <Tabs tabs={[{ id: 'overview', label: 'Overview' }, { id: 'details', label: 'Details' }]}>
        {#snippet children(activeTab)}
        {#if activeTab === 'overview'}
            <Card>...</Card>
        {:else if activeTab === 'details'}
            <Card>...</Card>
        {/if}
        {/snippet}
    </Tabs>
    ```
    The component owns the tab bar and active state. It passes activeTab down to a children snippet so the
    caller controls what content renders:

    - Simple, one file
    - Component handles tab bar + active state; caller handles content
    - Easy to reuse anywhere

    Proposed props:
    - tabs: Array<{ id: string, label: string }> — defines the tab bar
    - children: snippet receiving activeTab — caller renders content
    - defaultTab (optional): which tab is active on mount, defaults to first
- ~~Calendar~~
    - ~~Modal on event click~~
- Table updates:
    - Row action buttons
    - Column type action
    - Optional Table footer that shows total results (row count)
        - add paginate arrows 
        - show number of results / total results 
-  Build an example of insight
    - Generate example data from episodes query columns
    - 
 - TS conversion:
    1. Add lang="ts" to all <script> tags in components and routes
    2. Rename .js files to .ts (mainly stores and any utility files)
    3. Convert @typedef → interface/type declarations
    4. Convert @type {SomeType} → : SomeType annotations
    5. Convert JSDoc function comments → TS function signatures
    6. Run npm run check and fix any type errors that surface

