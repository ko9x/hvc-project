### Current Focus
* Continue working on the form for adding new items (and the associated ranges) to the database
* Figure out how we want to interact with the backend
    * Make an api service
    * Continue writing functions to setup and test the APIService 
* Create an async function to make an item post request (make sure to return the item id from the backend)
    * Create an async function to make a range post request 
        * If the item post request is successful, Use the item id in the range post request
* Create a function to retrieve the breakepoint data for a specific serial number
    * Pass the config name (i.e. F9XX) as part of the url or object
        * Once we have the breakpoint data we will still do the login here in the frontend
            * The object will just have the item name and creator as well as the breakpoints for the config we passed
* Update findBreakPoint function to work with exceptions.
    * Need to add some exceptions to the itemObject.
* Continue brainstorming about how the information should be contained in the database
    * Specifically the exceptions
* Manually add another item to the items array
    * Decide how to display all the items (eventually there could be lots of them)
        * Dynamically add sections to the results section based on how many items are returned from the search
* Continue testing to make sure the correct information is provided
* Cleanup all the unused logic

### What to do later
* Create a form that allows new items to be added to the database

### Styling
* Light and dark mode would be cool
    * Either way, we need compassion purple

### Done
* Get a working version on the server
* Nicer searchbar
* Nicer button
* Style the errorSection
* card around result section
    * cards around the canfiguration and parts sections
* Add an animation to the result section
* Get styles working for mobile
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
