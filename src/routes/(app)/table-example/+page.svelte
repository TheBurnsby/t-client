<script>
  import { Table } from "$lib";

  /** @type {import('$lib/types').ColumnSchema[]} */
  const schema = [
    { key: "name", label: "Name", type: "string" },
    { key: "role", label: "Role", type: "string" },
    { key: "age", label: "Age", type: "number" },
    { key: "startDate", label: "Start Date", type: "date" },
  ];

  const data = [
    {
      name: "Alice Johnson",
      role: "Engineer",
      age: 31,
      startDate: "2021-03-15",
    },
    { name: "Bob Smith", role: "Designer", age: 27, startDate: "2022-07-01" },
    { name: "Carol White", role: "Manager", age: 45, startDate: "2019-11-20" },
    { name: "David Lee", role: "Engineer", age: 29, startDate: "2023-01-10" },
    { name: "Eva Martinez", role: "Analyst", age: 34, startDate: "2020-06-05" },
  ];
</script>

<div class="mx-auto mt-8 px-4">
  <h1 class="text-2xl font-bold text-gray-900 mb-6">Table Example</h1>
  <Table {schema} {data} />
</div>
