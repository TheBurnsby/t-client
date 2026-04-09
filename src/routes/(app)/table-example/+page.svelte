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
      tooltip: { getValue: (row) => `${row.name} — ${row.department}` },
    },
    { key: "role", label: "Role", type: "string" },
    { key: "department", label: "Department", type: "string" },
    { key: "active", label: "On Duty", type: "boolean" },
    { key: "badge", label: "Verified", type: "icon" },
    { key: "startDate", label: "Hire Date", type: "date" },
    { key: "lastLogin", label: "Last Check-In", type: "datetime", minWidth: 180 },
    { key: "tags", label: "Specialties", type: "tags" },
  ];

  const data = [
    {
      name: "Dr. Sarah Okonkwo",
      role: "Attending Physician",
      department: "Cardiology",
      active: true,
      badge: CheckCircleIcon,
      startDate: "2018-06-01",
      lastLogin: "2026-04-09T07:45:00",
      tags: [{ label: "cardiology", color: "#1d4ed8" }, "ICU"],
    },
    {
      name: "Dr. Marcus Hale",
      role: "Resident",
      department: "Emergency",
      active: true,
      badge: CheckCircleIcon,
      startDate: "2024-07-01",
      lastLogin: "2026-04-09T06:30:00",
      tags: [{ label: "emergency", color: "#b45309" }, "trauma"],
    },
    {
      name: "Nurse Linda Tran",
      role: "Charge Nurse",
      department: "Oncology",
      active: true,
      badge: CheckCircleIcon,
      startDate: "2015-03-14",
      lastLogin: "2026-04-09T08:00:00",
      tags: ["oncology", { label: "palliative", color: "#7c3aed" }],
    },
    {
      name: "Dr. James Patel",
      role: "Surgeon",
      department: "Orthopedics",
      active: false,
      badge: CheckCircleIcon,
      startDate: "2011-09-20",
      lastLogin: "2026-04-07T14:00:00",
      tags: [{ label: "surgery", color: "#dc2626" }, "sports medicine"],
    },
    {
      name: "Nurse Aisha Bello",
      role: "Registered Nurse",
      department: "Pediatrics",
      active: true,
      badge: CheckCircleIcon,
      startDate: "2021-02-08",
      lastLogin: "2026-04-09T07:15:00",
      tags: ["pediatrics", { label: "neonatal", color: "#059669" }],
    },
  ];

  /** @type {import('$lib/types').TableEvents} */
  const events = {
    onRowClick: (row) => console.log("Row clicked:", row),
    onCellClick: (value, key, row) =>
      console.log("Cell clicked:", { key, value, row }),
    onHeaderClick: (key) => console.log("Header clicked:", key),
  };

  /** @type {import('$lib/types').TableAddOns} */
  const addOns = {};
</script>

<div class="mx-auto mt-8 px-4">
  <h1 class="text-2xl font-bold text-gray-900 mb-6">Staff Directory</h1>
  <Table {schema} {data} {events} {addOns} />
</div>
