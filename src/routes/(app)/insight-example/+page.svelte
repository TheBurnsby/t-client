<script>
  import Table from '$lib/components/Table.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import Drawer from '$lib/components/Drawer.svelte';
  import Calendar from '$lib/components/Calendar.svelte';
  import Card from '$lib/components/Card.svelte';
  import FlagIcon from '$lib/components/icons/FlagIcon.svelte';
  import AlertTriangleIcon from '$lib/components/icons/AlertTriangleIcon.svelte';
  import BridgeIcon from '$lib/components/icons/BridgeIcon.svelte';
  import LockIcon from '$lib/components/icons/LockIcon.svelte';
  import CalendarIcon from '$lib/components/icons/CalendarIcon.svelte';
  import NoteIcon from '$lib/components/icons/NoteIcon.svelte';
  import PaperclipIcon from '$lib/components/icons/PaperclipIcon.svelte';
  import CheckIcon from '$lib/components/icons/CheckIcon.svelte';
  import NoSymbolIcon from '$lib/components/icons/NoSymbolIcon.svelte';

  /**
   * @typedef {{ name: string, description: string, color: string }} Alert
   */

  /**
   * @typedef {{
   *   EPISODE_ID: number,
   *   OASIS_LOCKED: boolean,
   *   FLAGGED: boolean,
   *   PATIENT_NAME: string,
   *   COMMUNITY_ALERT_COUNT: number,
   *   BRIDGED: boolean,
   *   BRANCH_CODE: string,
   *   TEAM: string,
   *   STATUS: string,
   *   AVG_GM: number,
   *   ALERTS: Alert[],
   *   BRIDGE_PROBABILITY: string,
   *   HOSPITALIZATION_PROBABILITY: string,
   *   SOC: string,
   *   SOE: string,
   *   IS_PDGM: boolean,
   *   PAYOR_TYPE: string
   * }} Episode
   */

  /** @type {Episode[]} */
  const episodes = $state([
    { EPISODE_ID: 1001, OASIS_LOCKED: true,  FLAGGED: false, PATIENT_NAME: 'Alice Johnson',    COMMUNITY_ALERT_COUNT: 2, BRIDGED: true,  BRANCH_CODE: 'NW',  TEAM: 'Alpha', STATUS: 'CURRENT',    AVG_GM: 87,  ALERTS: [{ name: 'L P2', description: 'Lupa Period 2', color: '#ff8181' }],                                                             BRIDGE_PROBABILITY: 'high',   HOSPITALIZATION_PROBABILITY: 'medium', SOC: '2026-01-05', SOE: '2026-07-04', IS_PDGM: true,  PAYOR_TYPE: 'Medicare'  },
    { EPISODE_ID: 1002, OASIS_LOCKED: false, FLAGGED: true,  PATIENT_NAME: 'Bob Martinez',      COMMUNITY_ALERT_COUNT: 0, BRIDGED: false, BRANCH_CODE: 'SE',  TEAM: 'Beta',  STATUS: 'CURRENT',    AVG_GM: 72,  ALERTS: [],                                                                                                                            BRIDGE_PROBABILITY: 'low',    HOSPITALIZATION_PROBABILITY: 'low',    SOC: '2026-02-10', SOE: '2026-08-09', IS_PDGM: true,  PAYOR_TYPE: 'Medicaid'  },
    { EPISODE_ID: 1003, OASIS_LOCKED: true,  FLAGGED: false, PATIENT_NAME: 'Carol White',       COMMUNITY_ALERT_COUNT: 1, BRIDGED: false, BRANCH_CODE: 'NE',  TEAM: 'Alpha', STATUS: 'DISCHARGED',  AVG_GM: 95,  ALERTS: [{ name: 'HH', description: 'High Hospitalization Risk', color: '#fbbf24' }],                                                BRIDGE_PROBABILITY: 'medium', HOSPITALIZATION_PROBABILITY: 'high',   SOC: '2025-10-15', SOE: '2026-04-13', IS_PDGM: false, PAYOR_TYPE: 'Private'   },
    { EPISODE_ID: 1004, OASIS_LOCKED: false, FLAGGED: false, PATIENT_NAME: 'David Lee',         COMMUNITY_ALERT_COUNT: 3, BRIDGED: true,  BRANCH_CODE: 'SW',  TEAM: 'Gamma', STATUS: 'TRANSFER',   AVG_GM: 61,  ALERTS: [{ name: 'L P1', description: 'Lupa Period 1', color: '#ff8181' }, { name: 'BR', description: 'Bridge Alert', color: '#60a5fa' }], BRIDGE_PROBABILITY: 'high',   HOSPITALIZATION_PROBABILITY: 'high',   SOC: '2025-11-20', SOE: '2026-05-19', IS_PDGM: true,  PAYOR_TYPE: 'Medicare'  },
    { EPISODE_ID: 1005, OASIS_LOCKED: true,  FLAGGED: true,  PATIENT_NAME: 'Emma Davis',        COMMUNITY_ALERT_COUNT: 0, BRIDGED: false, BRANCH_CODE: 'CEN', TEAM: 'Beta',  STATUS: 'CURRENT',    AVG_GM: 103, ALERTS: [],                                                                                                                            BRIDGE_PROBABILITY: 'low',    HOSPITALIZATION_PROBABILITY: 'low',    SOC: '2026-01-18', SOE: '2026-07-17', IS_PDGM: true,  PAYOR_TYPE: 'HMO'       },
    { EPISODE_ID: 1006, OASIS_LOCKED: false, FLAGGED: false, PATIENT_NAME: 'Frank Thompson',    COMMUNITY_ALERT_COUNT: 1, BRIDGED: true,  BRANCH_CODE: 'NW',  TEAM: 'Delta', STATUS: 'CURRENT',    AVG_GM: 78,  ALERTS: [{ name: 'OA', description: 'Outcome Alert', color: '#a78bfa' }],                                                          BRIDGE_PROBABILITY: 'medium', HOSPITALIZATION_PROBABILITY: 'medium', SOC: '2026-03-01', SOE: '2026-08-30', IS_PDGM: true,  PAYOR_TYPE: 'PPO'       },
    { EPISODE_ID: 1007, OASIS_LOCKED: true,  FLAGGED: false, PATIENT_NAME: 'Grace Wilson',      COMMUNITY_ALERT_COUNT: 0, BRIDGED: false, BRANCH_CODE: 'SE',  TEAM: 'Alpha', STATUS: 'CURRENT',    AVG_GM: 91,  ALERTS: [],                                                                                                                            BRIDGE_PROBABILITY: 'high',   HOSPITALIZATION_PROBABILITY: 'low',    SOC: '2026-02-14', SOE: '2026-08-13', IS_PDGM: false, PAYOR_TYPE: 'Medicare'  },
    { EPISODE_ID: 1008, OASIS_LOCKED: false, FLAGGED: false, PATIENT_NAME: 'Henry Brown',       COMMUNITY_ALERT_COUNT: 2, BRIDGED: true,  BRANCH_CODE: 'NE',  TEAM: 'Gamma', STATUS: 'DISCHARGED',  AVG_GM: 66,  ALERTS: [{ name: 'L P2', description: 'Lupa Period 2', color: '#ff8181' }, { name: 'HH', description: 'High Hospitalization Risk', color: '#fbbf24' }], BRIDGE_PROBABILITY: 'low', HOSPITALIZATION_PROBABILITY: 'medium', SOC: '2025-09-08', SOE: '2026-03-07', IS_PDGM: true, PAYOR_TYPE: 'Medicaid' },
    { EPISODE_ID: 1009, OASIS_LOCKED: true,  FLAGGED: false, PATIENT_NAME: 'Iris Chen',         COMMUNITY_ALERT_COUNT: 1, BRIDGED: false, BRANCH_CODE: 'SW',  TEAM: 'Beta',  STATUS: 'CURRENT',    AVG_GM: 84,  ALERTS: [{ name: 'HH', description: 'High Hospitalization Risk', color: '#fbbf24' }],                                                BRIDGE_PROBABILITY: 'medium', HOSPITALIZATION_PROBABILITY: 'high',   SOC: '2026-01-25', SOE: '2026-07-24', IS_PDGM: true,  PAYOR_TYPE: 'Private'   },
    { EPISODE_ID: 1010, OASIS_LOCKED: false, FLAGGED: true,  PATIENT_NAME: 'James Miller',      COMMUNITY_ALERT_COUNT: 4, BRIDGED: true,  BRANCH_CODE: 'CEN', TEAM: 'Delta', STATUS: 'TRANSFER',   AVG_GM: 55,  ALERTS: [{ name: 'L P1', description: 'Lupa Period 1', color: '#ff8181' }],                                                         BRIDGE_PROBABILITY: 'high',   HOSPITALIZATION_PROBABILITY: 'high',   SOC: '2025-12-03', SOE: '2026-06-01', IS_PDGM: false, PAYOR_TYPE: 'HMO'       },
    { EPISODE_ID: 1011, OASIS_LOCKED: true,  FLAGGED: false, PATIENT_NAME: 'Karen Anderson',    COMMUNITY_ALERT_COUNT: 0, BRIDGED: false, BRANCH_CODE: 'NW',  TEAM: 'Alpha', STATUS: 'CURRENT',    AVG_GM: 99,  ALERTS: [],                                                                                                                            BRIDGE_PROBABILITY: 'low',    HOSPITALIZATION_PROBABILITY: 'low',    SOC: '2026-03-07', SOE: '2026-09-03', IS_PDGM: true,  PAYOR_TYPE: 'Medicare'  },
    { EPISODE_ID: 1012, OASIS_LOCKED: false, FLAGGED: false, PATIENT_NAME: 'Louis Taylor',      COMMUNITY_ALERT_COUNT: 1, BRIDGED: true,  BRANCH_CODE: 'SE',  TEAM: 'Gamma', STATUS: 'CURRENT',    AVG_GM: 81,  ALERTS: [{ name: 'BR', description: 'Bridge Alert', color: '#60a5fa' }],                                                          BRIDGE_PROBABILITY: 'medium', HOSPITALIZATION_PROBABILITY: 'medium', SOC: '2026-02-22', SOE: '2026-08-21', IS_PDGM: true,  PAYOR_TYPE: 'PPO'       },
    { EPISODE_ID: 1013, OASIS_LOCKED: true,  FLAGGED: false, PATIENT_NAME: 'Maria Garcia',      COMMUNITY_ALERT_COUNT: 2, BRIDGED: false, BRANCH_CODE: 'NE',  TEAM: 'Beta',  STATUS: 'DISCHARGED',  AVG_GM: 73,  ALERTS: [{ name: 'HH', description: 'High Hospitalization Risk', color: '#fbbf24' }],                                                BRIDGE_PROBABILITY: 'high',   HOSPITALIZATION_PROBABILITY: 'medium', SOC: '2025-08-11', SOE: '2026-02-07', IS_PDGM: false, PAYOR_TYPE: 'Private'   },
    { EPISODE_ID: 1014, OASIS_LOCKED: false, FLAGGED: false, PATIENT_NAME: 'Nathan Rodriguez',  COMMUNITY_ALERT_COUNT: 0, BRIDGED: true,  BRANCH_CODE: 'SW',  TEAM: 'Delta', STATUS: 'CURRENT',    AVG_GM: 88,  ALERTS: [],                                                                                                                            BRIDGE_PROBABILITY: 'low',    HOSPITALIZATION_PROBABILITY: 'low',    SOC: '2026-01-12', SOE: '2026-07-11', IS_PDGM: true,  PAYOR_TYPE: 'Medicare'  },
    { EPISODE_ID: 1015, OASIS_LOCKED: true,  FLAGGED: true,  PATIENT_NAME: 'Olivia Harris',     COMMUNITY_ALERT_COUNT: 2, BRIDGED: false, BRANCH_CODE: 'CEN', TEAM: 'Alpha', STATUS: 'CURRENT',    AVG_GM: 70,  ALERTS: [{ name: 'OA', description: 'Outcome Alert', color: '#a78bfa' }],                                                          BRIDGE_PROBABILITY: 'medium', HOSPITALIZATION_PROBABILITY: 'high',   SOC: '2026-03-15', SOE: '2026-09-11', IS_PDGM: true,  PAYOR_TYPE: 'Medicaid'  },
    { EPISODE_ID: 1016, OASIS_LOCKED: false, FLAGGED: false, PATIENT_NAME: 'Peter Jackson',     COMMUNITY_ALERT_COUNT: 3, BRIDGED: true,  BRANCH_CODE: 'NW',  TEAM: 'Beta',  STATUS: 'TRANSFER',   AVG_GM: 58,  ALERTS: [{ name: 'L P2', description: 'Lupa Period 2', color: '#ff8181' }, { name: 'BR', description: 'Bridge Alert', color: '#60a5fa' }], BRIDGE_PROBABILITY: 'high', HOSPITALIZATION_PROBABILITY: 'high', SOC: '2025-11-01', SOE: '2026-04-30', IS_PDGM: false, PAYOR_TYPE: 'HMO' },
    { EPISODE_ID: 1017, OASIS_LOCKED: true,  FLAGGED: false, PATIENT_NAME: 'Quinn Murphy',      COMMUNITY_ALERT_COUNT: 0, BRIDGED: false, BRANCH_CODE: 'SE',  TEAM: 'Gamma', STATUS: 'CURRENT',    AVG_GM: 96,  ALERTS: [],                                                                                                                            BRIDGE_PROBABILITY: 'low',    HOSPITALIZATION_PROBABILITY: 'low',    SOC: '2026-02-03', SOE: '2026-08-02', IS_PDGM: true,  PAYOR_TYPE: 'Medicare'  },
    { EPISODE_ID: 1018, OASIS_LOCKED: false, FLAGGED: false, PATIENT_NAME: 'Rachel Clark',      COMMUNITY_ALERT_COUNT: 1, BRIDGED: true,  BRANCH_CODE: 'NE',  TEAM: 'Delta', STATUS: 'CURRENT',    AVG_GM: 82,  ALERTS: [{ name: 'L P1', description: 'Lupa Period 1', color: '#ff8181' }],                                                         BRIDGE_PROBABILITY: 'medium', HOSPITALIZATION_PROBABILITY: 'medium', SOC: '2026-03-20', SOE: '2026-09-16', IS_PDGM: true,  PAYOR_TYPE: 'PPO'       },
    { EPISODE_ID: 1019, OASIS_LOCKED: true,  FLAGGED: true,  PATIENT_NAME: 'Samuel Lewis',      COMMUNITY_ALERT_COUNT: 1, BRIDGED: false, BRANCH_CODE: 'SW',  TEAM: 'Alpha', STATUS: 'DISCHARGED',  AVG_GM: 67,  ALERTS: [{ name: 'HH', description: 'High Hospitalization Risk', color: '#fbbf24' }],                                                BRIDGE_PROBABILITY: 'high',   HOSPITALIZATION_PROBABILITY: 'medium', SOC: '2025-07-28', SOE: '2026-01-24', IS_PDGM: false, PAYOR_TYPE: 'Private'   },
    { EPISODE_ID: 1020, OASIS_LOCKED: false, FLAGGED: false, PATIENT_NAME: 'Tina Walker',       COMMUNITY_ALERT_COUNT: 2, BRIDGED: true,  BRANCH_CODE: 'CEN', TEAM: 'Beta',  STATUS: 'CURRENT',    AVG_GM: 77,  ALERTS: [{ name: 'HH', description: 'High Hospitalization Risk', color: '#fbbf24' }, { name: 'OA', description: 'Outcome Alert', color: '#a78bfa' }], BRIDGE_PROBABILITY: 'low', HOSPITALIZATION_PROBABILITY: 'high', SOC: '2026-01-30', SOE: '2026-07-29', IS_PDGM: true, PAYOR_TYPE: 'Medicare' },
    { EPISODE_ID: 1021, OASIS_LOCKED: true,  FLAGGED: false, PATIENT_NAME: 'Ulysses Hall',      COMMUNITY_ALERT_COUNT: 0, BRIDGED: false, BRANCH_CODE: 'NW',  TEAM: 'Gamma', STATUS: 'CURRENT',    AVG_GM: 93,  ALERTS: [],                                                                                                                            BRIDGE_PROBABILITY: 'medium', HOSPITALIZATION_PROBABILITY: 'low',    SOC: '2026-02-08', SOE: '2026-08-07', IS_PDGM: true,  PAYOR_TYPE: 'HMO'       },
    { EPISODE_ID: 1022, OASIS_LOCKED: false, FLAGGED: false, PATIENT_NAME: 'Vivian Allen',      COMMUNITY_ALERT_COUNT: 2, BRIDGED: true,  BRANCH_CODE: 'SE',  TEAM: 'Delta', STATUS: 'TRANSFER',   AVG_GM: 63,  ALERTS: [{ name: 'L P2', description: 'Lupa Period 2', color: '#ff8181' }],                                                         BRIDGE_PROBABILITY: 'high',   HOSPITALIZATION_PROBABILITY: 'medium', SOC: '2025-10-22', SOE: '2026-04-20', IS_PDGM: false, PAYOR_TYPE: 'Medicaid'  },
    { EPISODE_ID: 1023, OASIS_LOCKED: true,  FLAGGED: true,  PATIENT_NAME: 'Walter Young',      COMMUNITY_ALERT_COUNT: 0, BRIDGED: false, BRANCH_CODE: 'NE',  TEAM: 'Alpha', STATUS: 'CURRENT',    AVG_GM: 101, ALERTS: [],                                                                                                                            BRIDGE_PROBABILITY: 'low',    HOSPITALIZATION_PROBABILITY: 'low',    SOC: '2026-03-25', SOE: '2026-09-21', IS_PDGM: true,  PAYOR_TYPE: 'Medicare'  },
    { EPISODE_ID: 1024, OASIS_LOCKED: false, FLAGGED: false, PATIENT_NAME: 'Xena King',         COMMUNITY_ALERT_COUNT: 1, BRIDGED: true,  BRANCH_CODE: 'SW',  TEAM: 'Beta',  STATUS: 'CURRENT',    AVG_GM: 85,  ALERTS: [{ name: 'BR', description: 'Bridge Alert', color: '#60a5fa' }],                                                          BRIDGE_PROBABILITY: 'medium', HOSPITALIZATION_PROBABILITY: 'high',   SOC: '2026-01-08', SOE: '2026-07-07', IS_PDGM: true,  PAYOR_TYPE: 'PPO'       },
    { EPISODE_ID: 1025, OASIS_LOCKED: true,  FLAGGED: false, PATIENT_NAME: 'Yolanda Wright',    COMMUNITY_ALERT_COUNT: 3, BRIDGED: false, BRANCH_CODE: 'CEN', TEAM: 'Gamma', STATUS: 'DISCHARGED',  AVG_GM: 59,  ALERTS: [{ name: 'L P1', description: 'Lupa Period 1', color: '#ff8181' }, { name: 'HH', description: 'High Hospitalization Risk', color: '#fbbf24' }], BRIDGE_PROBABILITY: 'high', HOSPITALIZATION_PROBABILITY: 'high', SOC: '2025-06-15', SOE: '2025-12-12', IS_PDGM: false, PAYOR_TYPE: 'Medicare' },
    { EPISODE_ID: 1026, OASIS_LOCKED: false, FLAGGED: false, PATIENT_NAME: 'Zachary Scott',     COMMUNITY_ALERT_COUNT: 0, BRIDGED: true,  BRANCH_CODE: 'NW',  TEAM: 'Delta', STATUS: 'CURRENT',    AVG_GM: 90,  ALERTS: [{ name: 'OA', description: 'Outcome Alert', color: '#a78bfa' }],                                                          BRIDGE_PROBABILITY: 'low',    HOSPITALIZATION_PROBABILITY: 'low',    SOC: '2026-02-17', SOE: '2026-08-16', IS_PDGM: true,  PAYOR_TYPE: 'HMO'       },
    { EPISODE_ID: 1027, OASIS_LOCKED: true,  FLAGGED: false, PATIENT_NAME: 'Amy Adams',         COMMUNITY_ALERT_COUNT: 1, BRIDGED: false, BRANCH_CODE: 'SE',  TEAM: 'Alpha', STATUS: 'CURRENT',    AVG_GM: 79,  ALERTS: [{ name: 'HH', description: 'High Hospitalization Risk', color: '#fbbf24' }],                                                BRIDGE_PROBABILITY: 'medium', HOSPITALIZATION_PROBABILITY: 'medium', SOC: '2026-03-10', SOE: '2026-09-06', IS_PDGM: false, PAYOR_TYPE: 'Private'   },
    { EPISODE_ID: 1028, OASIS_LOCKED: false, FLAGGED: true,  PATIENT_NAME: 'Brian Cooper',      COMMUNITY_ALERT_COUNT: 4, BRIDGED: true,  BRANCH_CODE: 'NE',  TEAM: 'Beta',  STATUS: 'TRANSFER',   AVG_GM: 53,  ALERTS: [{ name: 'L P1', description: 'Lupa Period 1', color: '#ff8181' }, { name: 'HH', description: 'High Hospitalization Risk', color: '#fbbf24' }], BRIDGE_PROBABILITY: 'high', HOSPITALIZATION_PROBABILITY: 'high', SOC: '2025-12-19', SOE: '2026-06-17', IS_PDGM: true, PAYOR_TYPE: 'Medicaid' },
    { EPISODE_ID: 1029, OASIS_LOCKED: true,  FLAGGED: false, PATIENT_NAME: 'Cathy Nelson',      COMMUNITY_ALERT_COUNT: 1, BRIDGED: false, BRANCH_CODE: 'SW',  TEAM: 'Gamma', STATUS: 'CURRENT',    AVG_GM: 86,  ALERTS: [{ name: 'L P2', description: 'Lupa Period 2', color: '#ff8181' }],                                                         BRIDGE_PROBABILITY: 'low',    HOSPITALIZATION_PROBABILITY: 'medium', SOC: '2026-01-22', SOE: '2026-07-21', IS_PDGM: true,  PAYOR_TYPE: 'Medicare'  },
    { EPISODE_ID: 1030, OASIS_LOCKED: false, FLAGGED: false, PATIENT_NAME: 'Derek Carter',      COMMUNITY_ALERT_COUNT: 0, BRIDGED: true,  BRANCH_CODE: 'CEN', TEAM: 'Delta', STATUS: 'CURRENT',    AVG_GM: 94,  ALERTS: [],                                                                                                                            BRIDGE_PROBABILITY: 'medium', HOSPITALIZATION_PROBABILITY: 'medium', SOC: '2026-03-28', SOE: '2026-09-24', IS_PDGM: true,  PAYOR_TYPE: 'PPO'       },
  ]);

  /** @type {import('$lib/types').ColumnSchema[]} */
  const schema = [
    { key: 'OASIS_LOCKED',                label: 'Oasis',     type: 'custom',  minWidth: 60  },
    { key: 'FLAGGED',                      label: '',          type: 'custom',  minWidth: 40  },
    { key: 'PATIENT_NAME',                 label: 'Patient',   type: 'string',  minWidth: 160 },
    { key: 'COMMUNITY_ALERT_COUNT',        label: '',          type: 'number',  minWidth: 50  },
    { key: 'BRIDGED',                      label: '',          type: 'custom',  minWidth: 50  },
    { key: 'BRANCH_CODE',                  label: 'Branch',    type: 'custom',  minWidth: 80  },
    { key: 'TEAM',                         label: 'Team',      type: 'custom',  minWidth: 80  },
    { key: 'STATUS',                       label: 'Status',    type: 'custom',  minWidth: 100 },
    { key: 'AVG_GM',                       label: 'Avg GM',    type: 'custom',  minWidth: 80  },
    { key: 'ALERTS',                       label: 'Alerts',    type: 'custom',  minWidth: 140 },
    { key: 'BRIDGE_PROBABILITY',           label: 'BP',        type: 'custom',  minWidth: 50  },
    { key: 'HOSPITALIZATION_PROBABILITY',  label: 'HP',        type: 'custom',  minWidth: 50  },
    { key: 'SOC',                          label: 'SOC',       type: 'date',    minWidth: 110 },
    { key: 'SOE',                          label: 'SOE',       type: 'date',    minWidth: 110 },
    { key: 'IS_PDGM',                      label: 'PDGM',      type: 'boolean', minWidth: 70  },
    { key: 'PAYOR_TYPE',                   label: 'Payor Type',type: 'custom',  minWidth: 100 },
  ];

  /** @type {Episode|null} */
  let selectedEpisode = $state(null);

  let detailDrawerOpen = $state(false);
  let notesDrawerOpen  = $state(false);
  let calendarModalOpen = $state(false);
  let attachModalOpen   = $state(false);

  /** @type {{ date: string, label: string, details?: Record<string, string>, color?: string }[]} */
  let calendarEvents = $state([]);

  /** @type {{ id: number, text: string, created_by: string, created_at: string }[]} */
  let episodeNotes = $state([]);

  let newNoteText = $state('');

  /**
   * Opens the row detail drawer for the clicked episode.
   * @param {Record<string, any>} row
   */
  function handleRowClick(row) {
    selectedEpisode = /** @type {Episode} */ (row);
    detailDrawerOpen = true;
  }

  /**
   * Handles individual cell clicks for toggling FLAGGED and BRIDGED state.
   * @param {any} value
   * @param {string} key
   * @param {Record<string, any>} row
   */
  async function handleCellClick(value, key, row) {
    const idx = episodes.findIndex((e) => e.EPISODE_ID === row.EPISODE_ID);
    if (idx < 0) return;

    if (key === 'FLAGGED') {
      const endpoint = row.FLAGGED ? '/api/v1/remove_flag' : '/api/v1/add_flag';
      await fetch(endpoint, { method: 'POST', body: JSON.stringify({ episode_id: row.EPISODE_ID }), headers: { 'Content-Type': 'application/json' } });
      episodes[idx] = { ...episodes[idx], FLAGGED: !episodes[idx].FLAGGED };
    }

    if (key === 'BRIDGED') {
      const endpoint = row.BRIDGED ? '/api/v1/remove_bridge' : '/api/v1/add_bridge';
      await fetch(endpoint, { method: 'POST', body: JSON.stringify({ episode_id: row.EPISODE_ID }), headers: { 'Content-Type': 'application/json' } });
      episodes[idx] = { ...episodes[idx], BRIDGED: !episodes[idx].BRIDGED };
    }
  }

  /**
   * Opens the visit calendar modal for the given episode.
   * @param {Episode} episode
   * @param {MouseEvent} e
   */
  async function openCalendar(episode, e) {
    e.stopPropagation();
    selectedEpisode = episode;
    try {
      const res = await fetch(`/api/v1/list-episode-visits?episode_id=${episode.EPISODE_ID}`);
      const visits = await res.json();
      calendarEvents = visits.map((/** @type {any} */ v) => ({ date: v.date, label: v.label ?? v.visit_type ?? 'Visit', color: v.color }));
    } catch {
      calendarEvents = [];
    }
    calendarModalOpen = true;
  }

  /**
   * Opens the notes drawer for the given episode.
   * @param {Episode} episode
   * @param {MouseEvent} e
   */
  async function openNotes(episode, e) {
    e.stopPropagation();
    selectedEpisode = episode;
    newNoteText = '';
    try {
      const res = await fetch(`/api/v1/list-episode-notes?episode_id=${episode.EPISODE_ID}`);
      episodeNotes = await res.json();
    } catch {
      episodeNotes = [];
    }
    notesDrawerOpen = true;
  }

  /**
   * Opens the HIE attach modal for the given episode.
   * @param {Episode} episode
   * @param {MouseEvent} e
   */
  function openAttach(episode, e) {
    e.stopPropagation();
    selectedEpisode = episode;
    attachModalOpen = true;
  }

  /** Submits a new note for the selected episode. */
  async function submitNote() {
    if (!newNoteText.trim() || !selectedEpisode) return;
    await fetch('/api/v1/create-note', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ episode_id: selectedEpisode.EPISODE_ID, text: newNoteText.trim() }),
    });
    newNoteText = '';
    // Re-fetch notes to reflect the new entry
    try {
      const res = await fetch(`/api/v1/list-episode-notes?episode_id=${selectedEpisode.EPISODE_ID}`);
      episodeNotes = await res.json();
    } catch {
      // Keep existing notes if refresh fails
    }
  }

  /**
   * Returns a contrasting text color (black or white) for a given background hex.
   * @param {string} hex
   * @returns {string}
   */
  function contrastColor(hex) {
    if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return '#000000';
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    /** @param {number} c */
    const lin = (c) => {
      c /= 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };
    const L = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
    return L > 0.179 ? '#000000' : '#ffffff';
  }

  /**
   * Returns the dot color class for a probability value.
   * @param {string} prob
   * @returns {string}
   */
  function probColor(prob) {
    if (prob === 'high')   return 'text-danger';
    if (prob === 'medium') return 'text-warning';
    return 'text-success';
  }

  /**
   * Formats a date string as "MMM d, yyyy".
   * @param {string|null|undefined} value
   * @returns {string}
   */
  function formatDate(value) {
    if (!value) return '';
    return new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
</script>

<!-- ─── Header snippets (no parameters → no implicit-any concern) ────────── -->

{#snippet flagHeader()}
  <FlagIcon class="w-4 h-4 text-muted" />
{/snippet}

{#snippet alertHeader()}
  <AlertTriangleIcon class="w-4 h-4 text-alert" />
{/snippet}

{#snippet bridgeHeader()}
  <BridgeIcon class="w-4 h-4 text-bridge" />
{/snippet}

<!-- ─── Page ─────────────────────────────────────────────────────────────── -->

<div class="flex flex-col gap-6 p-6">
  <div class="flex items-center justify-between">
    <h1 class="text-h2 font-semibold text-foreground">Episode Insights</h1>
    <span class="text-sm text-muted">{episodes.length} episodes</span>
  </div>

  <Table
    {schema}
    data={episodes}
    events={{ onRowClick: handleRowClick, onCellClick: handleCellClick, onHeaderClick: () => {} }}
    addOns={{ pagination: { pageSize: 15 } }}
    headerSnippets={{ FLAGGED: flagHeader, COMMUNITY_ALERT_COUNT: alertHeader, BRIDGED: bridgeHeader }}
  >
    {#snippet customCell(col, value, row)}
      {#if col.key === 'OASIS_LOCKED'}
        {#if value}
          <LockIcon class="w-4 h-4 text-muted" />
        {:else}
          <svg class="w-4 h-4 text-muted" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" stroke-dasharray="4 3" />
          </svg>
        {/if}

      {:else if col.key === 'FLAGGED'}
        <button
          class="rounded p-0.5 hover:bg-surface-alt transition-colors"
          onclick={(e) => { e.stopPropagation(); handleCellClick(value, 'FLAGGED', row); }}
          aria-label={value ? 'Remove flag' : 'Add flag'}
          title={value ? 'Remove flag' : 'Add flag'}
        >
          <FlagIcon class="w-4 h-4 {value ? 'text-danger' : 'text-border'}" />
        </button>

      {:else if col.key === 'BRIDGED'}
        <button
          class="rounded p-0.5 hover:bg-surface-alt transition-colors"
          onclick={(e) => { e.stopPropagation(); handleCellClick(value, 'BRIDGED', row); }}
          aria-label={value ? 'Remove bridge' : 'Add bridge'}
          title={value ? 'Remove bridge' : 'Add bridge'}
        >
          {#if value}
            <BridgeIcon class="w-4 h-4 text-bridge" />
          {/if}
        </button>

      {:else if col.key === 'BRANCH_CODE' || col.key === 'TEAM' || col.key === 'PAYOR_TYPE'}
        <span class="inline-flex items-center rounded-full bg-surface-alt px-2 py-0.5 text-xs font-medium text-foreground">
          {value}
        </span>

      {:else if col.key === 'STATUS'}
        {@const colorClass = value === 'CURRENT' ? 'text-success' : value === 'DISCHARGED' ? 'text-danger' : 'text-warning'}
        <span class="text-xs font-semibold {colorClass}">{value}</span>

      {:else if col.key === 'AVG_GM'}
        <span>{value}%</span>

      {:else if col.key === 'ALERTS'}
        <div class="flex flex-wrap gap-1">
          {#each (value ?? []) as alert}
            <div class="relative group inline-block">
              <span
                class="inline-flex cursor-default items-center rounded-full px-2 py-0.5 text-xs font-medium"
                style="background-color: {alert.color}; color: {contrastColor(alert.color)};"
              >
                {alert.name}
              </span>
              <div class="pointer-events-none absolute bottom-full left-1/2 z-50 mb-1 hidden -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white shadow group-hover:block">
                {alert.description}
                <div class="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          {/each}
        </div>

      {:else if col.key === 'BRIDGE_PROBABILITY' || col.key === 'HOSPITALIZATION_PROBABILITY'}
        <svg class="w-3 h-3 {probColor(value)}" viewBox="0 0 10 10" fill="currentColor" aria-label={value}>
          <circle cx="5" cy="5" r="5" />
        </svg>
      {/if}
    {/snippet}

    {#snippet actionsSnippet(row)}
      <div class="flex items-center gap-1">
        <button
          class="rounded-md p-1.5 text-muted transition-colors hover:bg-surface-alt hover:text-foreground"
          aria-label="View visit calendar"
          title="Visit calendar"
          onclick={(e) => openCalendar(/** @type {Episode} */ (row), e)}
        >
          <CalendarIcon class="h-4 w-4" />
        </button>
        <button
          class="rounded-md p-1.5 text-muted transition-colors hover:bg-surface-alt hover:text-foreground"
          aria-label="View notes"
          title="Notes"
          onclick={(e) => openNotes(/** @type {Episode} */ (row), e)}
        >
          <NoteIcon class="h-4 w-4" />
        </button>
        <button
          class="rounded-md p-1.5 text-muted transition-colors hover:bg-surface-alt hover:text-foreground"
          aria-label="Link patient to HIE"
          title="Link to HIE"
          onclick={(e) => openAttach(/** @type {Episode} */ (row), e)}
        >
          <PaperclipIcon class="h-4 w-4" />
        </button>
      </div>
    {/snippet}
  </Table>
</div>

<!-- ─── Episode Detail Drawer ────────────────────────────────────────────── -->

<Drawer
  open={detailDrawerOpen}
  onclose={() => (detailDrawerOpen = false)}
  title={selectedEpisode?.PATIENT_NAME ?? 'Episode Details'}
  subtitle="Episode #{selectedEpisode?.EPISODE_ID}"
  width="w-1/3"
>
  {#if selectedEpisode}
    <div class="flex flex-col gap-4">

      <!-- Patient & Status -->
      <Card>
        {#snippet header()}
          <h3 class="text-sm font-semibold text-foreground">Patient & Status</h3>
        {/snippet}
        <dl class="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <dt class="text-muted">Name</dt>
          <dd class="text-foreground font-medium">{selectedEpisode.PATIENT_NAME}</dd>
          <dt class="text-muted">Status</dt>
          <dd>
            <span class="text-xs font-semibold {selectedEpisode.STATUS === 'CURRENT' ? 'text-success' : selectedEpisode.STATUS === 'DISCHARGED' ? 'text-danger' : 'text-warning'}">{selectedEpisode.STATUS}</span>
          </dd>
          <dt class="text-muted">Payor</dt>
          <dd><span class="inline-flex rounded-full bg-surface-alt px-2 py-0.5 text-xs font-medium text-foreground">{selectedEpisode.PAYOR_TYPE}</span></dd>
          <dt class="text-muted">PDGM</dt>
          <dd>{#if selectedEpisode.IS_PDGM}<CheckIcon class="w-4 h-4 text-success" />{:else}<NoSymbolIcon class="w-4 h-4 text-muted" />{/if}</dd>
        </dl>
      </Card>

      <!-- Episode Info -->
      <Card>
        {#snippet header()}
          <h3 class="text-sm font-semibold text-foreground">Episode Info</h3>
        {/snippet}
        <dl class="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <dt class="text-muted">Episode ID</dt>
          <dd class="text-foreground">{selectedEpisode.EPISODE_ID}</dd>
          <dt class="text-muted">SOC</dt>
          <dd class="text-foreground">{formatDate(selectedEpisode.SOC)}</dd>
          <dt class="text-muted">SOE</dt>
          <dd class="text-foreground">{formatDate(selectedEpisode.SOE)}</dd>
          <dt class="text-muted">Avg GM</dt>
          <dd class="text-foreground">{selectedEpisode.AVG_GM}%</dd>
          <dt class="text-muted">Branch</dt>
          <dd><span class="inline-flex rounded-full bg-surface-alt px-2 py-0.5 text-xs font-medium text-foreground">{selectedEpisode.BRANCH_CODE}</span></dd>
          <dt class="text-muted">Team</dt>
          <dd><span class="inline-flex rounded-full bg-surface-alt px-2 py-0.5 text-xs font-medium text-foreground">{selectedEpisode.TEAM}</span></dd>
        </dl>
      </Card>

      <!-- Clinical Indicators -->
      <Card>
        {#snippet header()}
          <h3 class="text-sm font-semibold text-foreground">Clinical Indicators</h3>
        {/snippet}
        <dl class="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <dt class="text-muted">Bridge Prob.</dt>
          <dd class="flex items-center gap-1.5">
            <svg class="w-3 h-3 {probColor(selectedEpisode.BRIDGE_PROBABILITY)}" viewBox="0 0 10 10" fill="currentColor">
              <circle cx="5" cy="5" r="5" />
            </svg>
            <span class="capitalize text-foreground">{selectedEpisode.BRIDGE_PROBABILITY}</span>
          </dd>
          <dt class="text-muted">Hosp. Prob.</dt>
          <dd class="flex items-center gap-1.5">
            <svg class="w-3 h-3 {probColor(selectedEpisode.HOSPITALIZATION_PROBABILITY)}" viewBox="0 0 10 10" fill="currentColor">
              <circle cx="5" cy="5" r="5" />
            </svg>
            <span class="capitalize text-foreground">{selectedEpisode.HOSPITALIZATION_PROBABILITY}</span>
          </dd>
          <dt class="text-muted">Community Alerts</dt>
          <dd class="text-foreground">{selectedEpisode.COMMUNITY_ALERT_COUNT}</dd>
          <dt class="text-muted">Oasis Locked</dt>
          <dd>{#if selectedEpisode.OASIS_LOCKED}<LockIcon class="w-4 h-4 text-muted" />{:else}<span class="text-muted text-xs">—</span>{/if}</dd>
        </dl>
        {#if selectedEpisode.ALERTS.length > 0}
          <div class="mt-3 flex flex-wrap gap-1.5">
            {#each selectedEpisode.ALERTS as alert}
              <span
                class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
                style="background-color: {alert.color}; color: {contrastColor(alert.color)};"
                title={alert.description}
              >
                {alert.name}
              </span>
            {/each}
          </div>
        {/if}
      </Card>

    </div>
  {/if}
</Drawer>

<!-- ─── Notes Drawer ─────────────────────────────────────────────────────── -->

<Drawer
  open={notesDrawerOpen}
  onclose={() => (notesDrawerOpen = false)}
  title={selectedEpisode?.PATIENT_NAME ?? 'Notes'}
  subtitle="Episode #{selectedEpisode?.EPISODE_ID}"
  width="w-1/4"
>
  <div class="flex flex-col gap-4">
    <!-- Notes list -->
    {#if episodeNotes.length === 0}
      <p class="text-sm text-muted">No notes yet.</p>
    {:else}
      <div class="flex flex-col gap-3">
        {#each episodeNotes as note}
          <div class="rounded-md border border-border bg-surface-alt p-3">
            <p class="text-sm text-foreground">{note.text}</p>
            <p class="mt-1 text-xs text-muted">{note.created_by} · {note.created_at}</p>
          </div>
        {/each}
      </div>
    {/if}

    <!-- New note form -->
    <div class="flex flex-col gap-2 border-t border-border pt-4">
      <textarea
        bind:value={newNoteText}
        rows="3"
        placeholder="Add a note…"
        class="w-full resize-none rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder-muted focus:border-foreground focus:outline-none"
      ></textarea>
      <button
        onclick={submitNote}
        disabled={!newNoteText.trim()}
        class="rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40"
      >
        Submit
      </button>
    </div>
  </div>
</Drawer>

<!-- ─── Calendar Modal ───────────────────────────────────────────────────── -->

<Modal
  open={calendarModalOpen}
  onclose={() => (calendarModalOpen = false)}
  title="Visit Calendar — {selectedEpisode?.PATIENT_NAME ?? ''}"
  width="max-w-4xl"
>
  <Calendar events={calendarEvents} />
</Modal>

<!-- ─── HIE Attach Modal ─────────────────────────────────────────────────── -->

<Modal
  open={attachModalOpen}
  onclose={() => (attachModalOpen = false)}
  title="Link Patient to HIE — {selectedEpisode?.PATIENT_NAME ?? ''}"
  width="max-w-lg"
>
  <div class="flex flex-col gap-4">
    <p class="text-sm text-muted">
      Search for <strong class="text-foreground">{selectedEpisode?.PATIENT_NAME}</strong> on the HIE network,
      then select a matching record to link this patient.
    </p>

    <!-- Search field -->
    <div class="flex gap-2">
      <input
        type="text"
        placeholder="Search by name, DOB, or MRN…"
        class="flex-1 rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder-muted focus:border-foreground focus:outline-none"
      />
      <button
        class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
      >
        Search
      </button>
    </div>

    <!-- Results placeholder -->
    <div class="rounded-md border border-border bg-surface-alt px-4 py-8 text-center text-sm text-muted">
      HIE search results will appear here.
    </div>
  </div>
</Modal>
