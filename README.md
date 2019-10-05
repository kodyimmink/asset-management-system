# Asset Management System
## A full stack web app that helps keep track of facility equipment.

###  Features
* Keep Record of:
    * Common name
    * Type of equipment
    * Model number
    * Serial number
    * Description of physical location
    * GPS Location
    * Equipment issues
        * notes on a specific issue with date/time stamp
        * FUTURE: username on note

### Future Features
* Image and File Upload to Equipment Page
* Better mobile layout
* QR Code
    * Use mobile device to link to equipment record
* Site Location photo for site Jumbotron
* Niagara Integration
    * link to BMS equipment page

### TO-DO/Open Issues
- [X] Improve Authentication
- [X] Add user auth on backend
- [X] Add user profiles to database
- [X] Modify all change handlers to use new syntax
- [X] Edit Equipment component improvements: style similar to new equipment component
- [X] Edit option on Equipment details page
- [X] Edit button that links to Edit Equipment page on Equipment Details page
- [X] Get JWT from localStorage on first load
- [X] Don't allow empty note to be submitted
- [X] "Issue Resolved" checkbox work when submitting a new note
- [X] Don't allow empty issue to be submitted
- [ ] Ability to upload files
- [ ] Improve search
- [ ] Add more states to state list on new site component
- [ ] Add userIds to issues and notes
- [ ] Add more "Equipment Issues" to the select options list
- [ ] Remove all associated issues when deleting a piece of equipment *** use with caution
- [ ] When adding site make new site show up in list without reload
- [ ] When adding issue make new issue show up in list without reload
- [ ] Remove autofil option for text input boxes
