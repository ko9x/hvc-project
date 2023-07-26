### Notes to add

### Current Focus
* Continue working on predicting the next number the user is going to enter for the config range
    * Add functionality to predict F2XXTX00001 if the user enters F2XXXX99999
        * and vice versa
* Add functionality to remove an item 
    * This should also remove all the ranges and exceptions associated with the item
    * Create a view that displays all the items in the database
        * Have a delete button next to each item
            * Show an alert saying this action cannot be undone
* Decide how much info should be given if the item was not stored successfully
* Set the search view to be the default view
* Show an error screen if the form view is accessed on mobile
* (done) Add all the validation to the F9XX section of the form and test it
* (done) Add the rest of the configurations to the form
* (done) Add functionality to pass the object created in the submit function to the api service
* (done) Create the async function that will send the object as JSON to the database to be stored
* (done) Style the form
    * (done) We need to make sure intermediate ranges look good and make sense to the user
    * (done) Add the ability to collapse each section

### Validation Section
* Validation needs to be done on the front end and the backend
* (done) MAKE SURE ALL INPUTS HAVE THE "REQUIRED" ATTRIBUTE

# Item validation
* (done) Make sure creator is a 9 digit number

# Range validation
* (done for F9XX) Make sure each value is 11 characters long
* (done for F9XX) Make sure each section starts with the correct configurationis fillable"
* (done) Make sure the entire range of serial numbers is covered
    * We need to compare each ends_at with the next starts_at
        * We would split the serial in 2 pieces, config and sequence
            * Make sure the config is exaclty the same and that the sequence is one digit higher
                

# Exception validation
* (done) Make sure each value is 11 characters long
* (done) Make sure there are no duplicate exceptions
* (done) Make sure the exception has the correct config
* (done) Make sure if the exception input is showing it is required

### What to do later
* Add a button to validate each section individually
        * Adds a green border or something
* Make sure if an exception is added, it is ouside of the range specified for that description
* Add validation to the backend
* Add functionality for designating a config as N/A
    * For example, if the cut-in is in regard to Flat Panels, you would N/A all the I.I. configs
* Continue testing to make sure the correct information is provided
* Fix the styling of the form so there are 2 range containers per row on desktop
    * Leave it at 1 per row for mobile
        * Maybe just don't allow the form to be accessed on mobile?
* Cleanup all the unused logic
* Force the user to fill out F9XXXX0001 ends_at First
    * Then F9XXTX99999 Starts_at etc...
        * Just make all the other fields greyed out
* If advanced is not selected the "Display" information from F9XXXX00001 should be automatically added to the F2XXXX00001 Display
* Add an advanced button that will reveal the exceptions buttons and the Add intermediate serial number range buttons
    * Just to make the form a little cleaner
* Fix styling for mobile


### What to do much later
* Make a basic form for when the creator just has a clear cut-in serial number
    * All we would need is the cut-in serial number, the "before" description and the "after" description
    * Make it clear the cut-in serial number is the first system that includes the new part or feature
    * Each config could have the option to go advanced or not
        * So if just F9XX has an exception and the rest are single serial cut-ins you wouldn't have to do the extra work on all the other configurations
* Show a view with all the items in the database and an option to remove an item from the database
    * This will obviously need to remove all cut-ins and exceptions associated with the item

### Styling
* Light and dark mode would be cool
    * Either way, we need compassion purple

### Done
* Nicer searchbar
* Nicer button
* Style the errorSection
* card around result section
    * cards around the configuration and parts sections
* Continue creating the dataObj to mimic a database for storing the dataObjects
    * Determine feasibility of using the current items array structure for all other items
    * Create a function that can use the current items array to spit out the correct High Voltage Cable 
        * Use the configs object to tell the function which config id to check the breakPoints for
            * Maybe pass the config id as an argument to the function
* Add error handling if user enters an invalid serial
* Merge dataObj branch back into master and sean branches
    * Then abandon the dataObj branch
        * Also create a preDataObj branch incase we want to go back to the hardcoded hvc only version of the project
* Figure out how to create a database we can connect to
    * MySQL and Docker
* Dynamically add sections to the results section based on how many items are returned from the search
* Account for a cut-in that happens at the introduction of tablets
    * So we would need to allow a config not to match if it is TX and the sequence is 00001
* Just get overlap working for entering the HV Cable ranges. 
    * There really shouldn't be overlap in a cut-in. The HV Cable is not really a cut-in
        * We could also get rid of the intermediate serial range button I think
            * We might need to check the other cut-ins and see if it would be needed
* Add all the config sections to the form and test it
    * We need to edit all the patterns for each different config
* Clear the form if the item was stored successfully
    * Test the success alert
* Get the search section working on mobile
    * Needed to use the MacBook IP instead of localhost in the API address
