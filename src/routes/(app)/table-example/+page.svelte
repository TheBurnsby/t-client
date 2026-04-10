<script>
  import { Table } from "$lib";
  import CheckCircleIcon from "$lib/components/icons/CheckCircleIcon.svelte";
  import Drawer from "$lib/components/Drawer.svelte";
  import Card from "$lib/components/Card.svelte";

  /** @type {Record<string, any> | null} */
  let selectedRow = $state(null);

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
    {
      key: "lastLogin",
      label: "Last Check-In",
      type: "datetime",
      minWidth: 180,
    },
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
    {
      name: "Dr. Robert Chen",
      role: "Attending Physician",
      department: "Neurology",
      active: true,
      badge: CheckCircleIcon,
      startDate: "2017-11-15",
      lastLogin: "2026-04-09T08:30:00",
      tags: ["neurology", { label: "stroke", color: "#dc2626" }],
    },
    {
      name: "Nurse Patricia Garcia",
      role: "Registered Nurse",
      department: "Cardiology",
      active: true,
      badge: CheckCircleIcon,
      startDate: "2019-05-20",
      lastLogin: "2026-04-09T07:45:00",
      tags: ["cardiology", "ICU"],
    },
    {
      name: "Dr. Elena Rossini",
      role: "Resident",
      department: "Pathology",
      active: true,
      badge: CheckCircleIcon,
      startDate: "2025-01-10",
      lastLogin: "2026-04-08T16:20:00",
      tags: ["pathology", "lab"],
    },
    {
      name: "Nurse David Kim",
      role: "Registered Nurse",
      department: "Emergency",
      active: false,
      badge: CheckCircleIcon,
      startDate: "2022-03-01",
      lastLogin: "2026-04-06T12:00:00",
      tags: ["emergency", "trauma"],
    },
    {
      name: "Dr. Maria Santos",
      role: "Surgeon",
      department: "General Surgery",
      active: true,
      badge: CheckCircleIcon,
      startDate: "2014-08-10",
      lastLogin: "2026-04-09T09:00:00",
      tags: [{ label: "surgery", color: "#dc2626" }, "laparoscopic"],
    },
    {
      name: "Nurse Jennifer Wong",
      role: "Charge Nurse",
      department: "ICU",
      active: true,
      badge: CheckCircleIcon,
      startDate: "2016-09-12",
      lastLogin: "2026-04-09T08:15:00",
      tags: ["ICU", { label: "critical care", color: "#b45309" }],
    },
    {
      name: "Dr. Thomas Mueller",
      role: "Attending Physician",
      department: "Radiology",
      active: true,
      badge: CheckCircleIcon,
      startDate: "2013-02-18",
      lastLogin: "2026-04-08T14:30:00",
      tags: ["radiology", "imaging"],
    },
    {
      name: "Nurse Sophia Andersson",
      role: "Registered Nurse",
      department: "Oncology",
      active: true,
      badge: CheckCircleIcon,
      startDate: "2020-10-05",
      lastLogin: "2026-04-09T07:30:00",
      tags: ["oncology", "chemo"],
    },
    {
      name: "Dr. Hassan Al-Rashid",
      role: "Resident",
      department: "Psychiatry",
      active: true,
      badge: CheckCircleIcon,
      startDate: "2024-09-01",
      lastLogin: "2026-04-09T06:45:00",
      tags: ["psychiatry", "mental health"],
    },
    {
      name: "Nurse Katherine Lewis",
      role: "Registered Nurse",
      department: "Orthopedics",
      active: true,
      badge: CheckCircleIcon,
      startDate: "2018-12-10",
      lastLogin: "2026-04-09T08:00:00",
      tags: ["orthopedics", "surgery"],
    },
    {
      name: "Dr. Yuki Tanaka",
      role: "Attending Physician",
      department: "Gastroenterology",
      active: false,
      badge: CheckCircleIcon,
      startDate: "2012-04-22",
      lastLogin: "2026-04-07T10:15:00",
      tags: ["gastroenterology", "endoscopy"],
    },
    {
      name: "Nurse Marcus Johnson",
      role: "Registered Nurse",
      department: "Nephrology",
      active: true,
      badge: CheckCircleIcon,
      startDate: "2021-06-14",
      lastLogin: "2026-04-09T07:00:00",
      tags: ["nephrology", { label: "dialysis", color: "#1d4ed8" }],
    },
    {
      name: "Dr. Alejandra Morales",
      role: "Surgeon",
      department: "Vascular Surgery",
      active: true,
      badge: CheckCircleIcon,
      startDate: "2015-01-05",
      lastLogin: "2026-04-09T09:30:00",
      tags: [{ label: "surgery", color: "#dc2626" }, "vascular"],
    },
    {
      name: "Nurse Oliver Schmidt",
      role: "Registered Nurse",
      department: "Pulmonology",
      active: true,
      badge: CheckCircleIcon,
      startDate: "2019-08-26",
      lastLogin: "2026-04-09T07:45:00",
      tags: ["pulmonology", "respiratory"],
    },
    {
      name: "Dr. Priya Krishnan",
      role: "Attending Physician",
      department: "Endocrinology",
      active: true,
      badge: CheckCircleIcon,
      startDate: "2016-07-11",
      lastLogin: "2026-04-08T15:45:00",
      tags: ["endocrinology", "diabetes"],
    },
    {
      name: "Nurse Isabella Rossi",
      role: "Charge Nurse",
      department: "Maternal Health",
      active: true,
      badge: CheckCircleIcon,
      startDate: "2017-11-20",
      lastLogin: "2026-04-09T08:30:00",
      tags: ["obstetrics", { label: "midwifery", color: "#059669" }],
    },
    {
      name: "Dr. Kwame Asante",
      role: "Resident",
      department: "Dermatology",
      active: false,
      badge: CheckCircleIcon,
      startDate: "2024-06-01",
      lastLogin: "2026-04-05T11:00:00",
      tags: ["dermatology", "skin"],
    },
    {
      name: "Nurse Franz Weber",
      role: "Registered Nurse",
      department: "Infectious Disease",
      active: true,
      badge: CheckCircleIcon,
      startDate: "2020-02-03",
      lastLogin: "2026-04-09T08:15:00",
      tags: ["infectious disease", "isolation"],
    },
    {
      name: "Dr. Nora O'Brien",
      role: "Attending Physician",
      department: "Rheumatology",
      active: true,
      badge: CheckCircleIcon,
      startDate: "2010-09-06",
      lastLogin: "2026-04-09T09:00:00",
      tags: ["rheumatology", { label: "autoimmune", color: "#7c3aed" }],
    },
  ];

  /** @type {import('$lib/types').TableEvents} */
  const events = {
    onRowClick: (row) => (selectedRow = row),
    onCellClick: (value, key, row) =>
      console.log("Cell clicked:", { key, value, row }),
    onHeaderClick: (key) => console.log("Header clicked:", key),
  };

  /** @type {import('$lib/types').TableAddOns} */
  const addOns = { pagination: { pageSize: 10 } };
</script>

<div class="mx-auto mt-8 px-4">
  <h1 class="text-2xl font-bold text-gray-900 mb-6">Table Example</h1>
  <Table {schema} {data} {events} {addOns} />
</div>

<Drawer
  open={selectedRow !== null}
  onclose={() => (selectedRow = null)}
  width="w-1/3"
  title={selectedRow?.name ?? ""}
  subtitle={selectedRow?.role}
>
  {#snippet children()}
    {#if selectedRow}
      {@const staff = /** @type {Record<string, any>} */ (selectedRow)}
      <div class="flex flex-col gap-3">
        <!-- Identity -->
        <Card>
          {#snippet header()}
            <h2 class="text-sm font-semibold text-foreground">{staff.name}</h2>
          {/snippet}
          <div class="flex flex-col gap-1 text-sm">
            <p>
              <span class="font-medium text-foreground">Role:</span>
              <span class="text-muted">{staff.role}</span>
            </p>
            <p>
              <span class="font-medium text-foreground">Department:</span>
              <span class="text-muted">{staff.department}</span>
            </p>
            <p>
              <span class="font-medium text-foreground">Status:</span>
              <span
                class="{staff.active ? 'text-green-600' : 'text-red-400'} ml-1"
              >
                {staff.active ? "On Duty" : "Off Duty"}
              </span>
            </p>
          </div>
        </Card>

        <!-- Activity -->
        <Card>
          {#snippet header()}
            <h2 class="text-sm font-semibold text-foreground">Activity</h2>
          {/snippet}
          <div class="flex flex-col gap-1 text-sm">
            <p>
              <span class="font-medium text-foreground">Hire Date:</span>
              <span class="text-muted">{staff.startDate}</span>
            </p>
            <p>
              <span class="font-medium text-foreground">Last Check-In:</span>
              <span class="text-muted">{staff.lastLogin}</span>
            </p>
          </div>
        </Card>

        <!-- Specialties -->
        <Card>
          {#snippet header()}
            <h2 class="text-sm font-semibold text-foreground">Specialties</h2>
          {/snippet}
          <div class="flex flex-wrap gap-1.5">
            {#each staff.tags ?? [] as tag}
              {@const label = typeof tag === "string" ? tag : tag.label}
              {@const color =
                typeof tag === "string" ? "#efefef" : (tag.color ?? "#efefef")}
              <span
                class="rounded-full px-2.5 py-0.5 text-xs font-medium"
                style="background-color: {color};">{label}</span
              >
            {/each}
          </div>
        </Card>
      </div>
    {/if}
  {/snippet}
</Drawer>
