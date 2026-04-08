<script>
  import { Table } from "$lib";
  import CheckCircleIcon from "$lib/components/icons/CheckCircleIcon.svelte";

  /** @type {import('$lib/types').ColumnSchema[]} */
  const schema = [
    {
      key: "name",
      label: "Name",
      type: "string",
      minWidth: 160,
      tooltip: { getValue: (row) => `Full name: ${row.name} (${row.role})` },
    },
    { key: "role", label: "Role", type: "string" },
    { key: "active", label: "Active", type: "boolean" },
    { key: "badge", label: "Badge", type: "icon" },
    { key: "startDate", label: "Start Date", type: "date" },
    { key: "lastLogin", label: "Last Login", type: "datetime", minWidth: 180 },
    { key: "tags", label: "Tags", type: "tags" },
  ];

  const data = [
    {
      name: "Alice Johnson",
      role: "Engineer",
      active: true,
      badge: CheckCircleIcon,
      startDate: "2021-03-15",
      lastLogin: "2025-04-03T14:30:00",
      tags: [{ label: "admin", color: "#1d4ed8" }, "engineer"],
    },
    {
      name: "Bob Smith",
      role: "Designer",
      active: false,
      badge: CheckCircleIcon,
      startDate: "2022-07-01",
      lastLogin: "2025-03-28T09:15:00",
      tags: [{ label: "contractor", color: "#b45309" }, "design"],
    },
    {
      name: "Carol White",
      role: "Manager",
      active: true,
      badge: CheckCircleIcon,
      startDate: "2019-11-20",
      lastLogin: "2025-04-07T16:45:00",
      tags: ["manager"],
    },
    {
      name: "David Lee",
      role: "Engineer",
      active: true,
      badge: CheckCircleIcon,
      startDate: "2023-01-10",
      lastLogin: "2025-04-06T11:00:00",
      tags: [{ label: "lead", color: "#7c3aed" }, "engineer"],
    },
    {
      name: "Eva Martinez",
      role: "Analyst",
      active: false,
      badge: CheckCircleIcon,
      startDate: "2020-06-05",
      lastLogin: "2025-03-15T08:30:00",
      tags: ["analyst"],
    },
  ];

  /** @type {import('$lib/types').TableEvents} */
  const events = {
    onRowClick: (row) => console.log("Row clicked:", row),
    onCellClick: (value, key, row) =>
      console.log("Cell clicked:", { key, value, row }),
    // onCellHover: (value, key, row) => console.log("Cell hovered:", { key, value }),
    onHeaderClick: (key) => console.log("Header clicked:", key),
  };

  /** @type {import('$lib/types').TableAddOns} */
  const addOns = {};
</script>

<div class="mx-auto mt-8 px-4">
  <h1 class="text-2xl font-bold text-gray-900 mb-6">Table Example</h1>
  <Table {schema} {data} {events} {addOns} />
</div>
