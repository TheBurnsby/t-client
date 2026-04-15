## Overview
A dashboard showing episode insights for a home health agency. Each row is an episode with an episode_id and a patient_id. Some patients have more than one episode but never at one time. This home health insight route will show episode details in the row and when you click the row the Drawer component will pop out and show more details about the episode. At the end of each row there should be a calendar icon, a pencil and note icon, and a paper clip icon. 
- The calendar icon will open a modal (use Modal component) when clicked. Inside the modal should be the calendar (use Calendar component). Each event in the calendar will be fed in from a query that queries all visits for the selected episode_id. This means the calendar icon in the table will need to trigger a query to get visits (api/v1/list-episode-visits). Its ok if this is a simple draft for now. We can dial this in more detail later. 
- The note icon will open the drawer (use Drawer component) when clicked. Inside the drawer make the dawer header title be the patient name found in the selected row. The body of the drawer will show notes users have created. Feed in notes from the notes query that gets triggered on click (api/v1/list-episode-notes) At the bottom of the drawer have a textarea with a button below it to submit new notes.
- The paper clip icon will open a modal (use Modal component). This modal will contain a form where the user should be able to, search the selected patient on an HIE network, and then link the patient with an HIE result. Its ok if this is a simple draf t for now. We can dial this in more detail later.

### Insight table schema
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
- For any new colors, make a token in the theme first and use token instead of writing # colors in the code.
- There is mention of some new icons. Be sure to create icon components in the components/icons lib folder if one doesnt exist already for whats being asked.
- Table component may need some additional features or changes to account for all these request. Make a plan with me before making assumptions or changes to the table component.
- Will need a larger modal to fit calendar correctly. Modals will need to vary in width based on use. Remove modal width class setting from the component and make that something that gets passed in when component is used similar to how we define width on drawers.
- For the drawer body I mention '...more details about the episode'. For now just put exmple data found in the row that was clicked and seperate sections of the body using the Card component.
- Generate an array with 30 example objects following schema defined above and use this to feed into the table until we have a query to get episodes. Define this example arrays as 'episodes'. This will be the main data source for the table.
- Ask for clarity before making assumptions.
