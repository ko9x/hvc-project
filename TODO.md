### Notes to add

### Current Focus
* Add all the validation to the form and test it before we use it to add a complete item
* (done) Add the rest of the configurations to the form
* (done) Add functionality to pass the object created in the submit function to the api service
* (done) Create the async function that will send the object as JSON to the database to be stored
    * (done but I haven't test the success alert yet) Add an alert that says if the item was stored successfully or not
        * Clear the form if the item was stored successfully
        * Decide how much info should be given if the item was not stored successfully
* Style the form
    * (done) We need to make sure intermediate ranges look good and make sense to the user
    * (done) Add the ability to collapse each section
    * Add a button to validate each section individually
        * Adds a green border or something

### Validation Section
* Validation needs to be done on the front end and the backend
* MAKE SURE ALL INPUTS HAVE THE REQUIRED ATTRIBUTE

# Item validation
* (done) Make sure creator is a 9 digit number

# Range validation
* (done for F9XX) Make sure each value is 11 characters long
* (done for F9XX) Make sure each section starts with the correct configuration
    * i.e. F9XXXX00001 - F9XXTX00100 is allowed F9XXTX00101 - F2XXTX99999 is not
        * Maybe hard code the prefix for each section F9XXXX00001 - F9XX"only this part is fillable"
* (done) Make sure the entire range of serial numbers is covered
    * We need to compare each ends_at with the next starts_at
        * We would split the serial in 2 pieces, config and sequence
            * Make sure the config is exaclty the same and that the sequence is one digit higher
                * We need to account for a cut-in that may happen at the introduction of tablets
                    * So we would need to allow a config not to match if it is TX and the sequence is 00001

# Exception validation
* Make sure each value is 11 characters long
* Make sure there are no duplicate exceptions
* Make sure the exception has the correct config
    * Maybe hard code the prefix for each exception i.e. F9XX"only this part is fillable"
* Make sure the exception is outside the range
* Make sure if the exception input is showing it is required
    * We don't want a blank exception being passed to the database


### What to do later
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
