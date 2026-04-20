## Overview
[
    A couple sentences describing the context of the feature..
    - Feature detail 1
    - Feature detail 2
]

### Steps in order:
[
    - Step 1: plan additional component updates first
    - Step 2: Create new icons as components
    - Step 3: Execute new component updates plan
    - Step 4: etc...
]

### Data table schema
```
[
    {
        EPISODE_ID: int,
        OASIS_LOCKED: boolean,
        FLAGGED: boolean,
        PATIENT_NAME: string,
        COMMUNITY_ALERT_COUNT: int,
        BRIDGED: boolean,
        BRANCH_CODE: string,
        TEAM: string,
        STATUS: string,
        AVG_GM: int,
        ALERTS: array,
        BRIDGE_PROBABILITY: string,
        HOSPITALIZATION_PROBABILITY: string,
        SOC: date,
        SOE: date,
        IS_PDGM: boolean,
        PAYOR_TYPE: string
    }
]
```
**Schema notes**
- OASIS_LOCKED:
    - Column header label: 'Oasis'
    - Cell Functionality: show a lock icon if true else an empty circled (border is a dotted line).
- FLAGGED: 
    - Column header label: Flag icon instead of text
    - Cell Functionality: If true show flag icon else empty. This cell should be clickable.
        - If FLAGGED false when clicked - trigger post event to /api/v1/add_flag else - trigger post event to /api/v1/remove_flag
- COMMUNITY_ALERT_COUNT: 
    - Column header label: Alert icon (an orange triangle with a white "!" in the middle)
- BRIDGED:
    - Column header label: a blue heart icon with a dot floating above the heart (Bridge icon)
    - Cell Functionality: If true show Bridge icon else empty. This cell should be clickable.
        - If BRIDGED false when clicked - trigger post event to /api/v1/remove_bridge else - trigger post event to /api/v1/add_bridge
- BRANCH_CODE:
    - Column header label: 'Branch'
    - Cell Functionality: display this in a Tag
- TEAM: 
    - Column header: 'Team'
    - Cell Functionality: display this in a Tag
- STATUS
    - Column header: 'Status'
    - Cell Functionality: Expected results: 'CURRENT', 'DISCHARGED', 'TRANSFER'. Color text the following: CURRENT = green, DISCHARGED = red, TRANSFER = Yellow
- AVG_GM
    - Column header: 'Avg GM'
    - Cell Functionality: this data will return a number. This is intended to be displayed as a percentage. Concat '%' to the end of each value.
- ALERTS
    - Column header: 'Alerts'
    - Cell Functionality: This data will be an array of alert objects. Display these alerts as tags. Example alert: { name: 'L P2', description: 'Lupa Period 2', color: '#ff8181' }. When the user hovers over the tag, show a tooltip showing the alert.description. 
- BRIDGE_PROBABILITY
    - Column header: 'BP'
    - Cell Functionality: This data will come back as either high, medium, low. In this cell if: 
        - high: solid red dot icon
        - medium: solid yellow dot icon
        - high: solid green dot icon
- HOSPITALIZATION_PROBABILITY
    - Column header: 'HP'
    - Cell Functionality: This data will come back as either high, medium, low. In this cell if: 
        - high: solid red dot icon
        - medium: solid yellow dot icon
        - high: solid green dot icon
- SOC
    - Column header: 'SOC'
    - Cell Functionality: format date
- SOE
    - Column header: 'SOE'
    - Cell Functionality: format date
- IS_PDGM
    - Column header: 'PDGM'
    - Cell Functionality: if true CheckIcon else NoSymbolIcon
- PAYOR_TYPE
    - Column header: 'Payor Type'
    - Cell Functionality: Display this value in a tag 

### Additional Instructions
[
    additional specs not outlined above. Fine tune the deatils...
    e.g.:
    - For any new colors, make a token in the theme first and use token instead of writing # colors in the code.
    - There is mention of some new icons. Be sure to create icon components in the components/icons lib folder if one doesnt exist already for whats being asked.
]