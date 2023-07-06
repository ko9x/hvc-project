### Notes to add

### Current Focus
* Add functionality to pass the object created in the submit function to the api service
* Figure out how we are going to store the item and retrieve the id so it can be used as the item_id for the ranges and exceptions arrays that subsequently need to be stored.
    * Can we do all that on the server side?
        * Have a toast or something that says if the item was stored successfully or not
            * Decide how much info should be given if the item was not stored successfully
* Add the rest of the configurations to the form 

### Validation Section
* Validation needs to be done on the front end and the backend
* Form cannot be submitted if any section is blank

# Item validation
* Make sure creator is a 9 digit number

# Range validation
* Make sure each value is 11 characters long
* Make sure each section starts with the correct configuration
    * i.e. F9XXXX00001 - F9XXTX00100 is allowed F9XXTX00101 - F2XXTX99999 is not
        * Maybe hard code the prefix for each section F9XXXX00001 - F9XX"only this part is fillable"
* Make sure the entire range of serial numbers is covered
    * i.e. F9XXXX00001 - F9XXTX00100 should be followed by F9XXTX00101 - F9XXTX99999 unless it's an advance form

# Exception validation
* Make sure each value is 11 characters long
* Make sure there are no duplicate exceptions
* Make sure the exception has the correct config
    * Maybe hard code the prefix for each exception i.e. F9XX"only this part is fillable"
* Make sure the exception is outside the range


### What to do later
* Fix styling for mobile
* Continue testing to make sure the correct information is provided
* Cleanup all the unused logic
* If advanced is not selected the "Display" information from F9XXXX00001 should be automatically added to the F2XXXX00001 Display
    * Force the user to fill out F9XXXX0001 ends at First
        * Then F9XXTX99999 Starts at
            * Just make all the other fields greyed out
* * Make the placeholder text in the textareas less busy
* Add an advanced button that will reveal the exceptions buttons and the Add intermediate serial number range buttons
    * Just to make the form a little cleaner


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
