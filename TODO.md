### Notes to add

### Current Focus
* Fix styling for mobile
* Get the logic working with exceptions!
    * Then clean up the current focus section!
* Figure out how we are going to store the item and retrieve the id so it can be used as the item_id for the ranges and exceptions arrays that subsequently need to be stored.
* Steps needed to test the functionality of the app
    * Get another item into the database
        * the F9XX and F2XX breakpoints should be enough to test I think
    * (done) Write code to get items from the database in the correct shape to be used by the main.js functions
    * (we still need to get this working for multiple items!) Rewrite the main.js functions to display the information correctly
        * findConfiguration function needs to be rewritten because the database is sending us an array that is the correct config
            * We can't completely eliminate the findConfiguration function because we do some validation there 
                * We also get the correct config id which may or may not still be necessary
            * Once we validate the serial is valid we need to have another function that calls the APIService
                * The APIService will get the information from the database and parse it to be used in the findBreakPoint function
        * findBreakPoint function may or may not need to be rewritten
        * displayResults will need to be rewritten because the name and item info arguments will now be arrays
            * We will also need to dynamically add html for each item that will be displayed
* Continue working on the form
    * Add functionality to pass the object created in the submit function to the api service
    * Create a top section where the user enters their sso and the name of the item
        * Add that information to the object we pass to the api service
    * Include the exceptions in the object that is sent to the api service
        * Make sure there are no duplicate exceptions
        * Make sure the exception has the correct config
        * Make sure the exception is outside the range
            * Just to make sure the user isn't getting confused about what exceptions are
    * Give the add serial number range information button a better name and add a title hover description
        * Maybe don't show the buttons unless you click on advanced or something like that
            * It would make the form less busy
* Update findBreakPoint function to work with exceptions.
    * Need to add some exceptions to the itemObject.
* Continue brainstorming about how the information should be contained in the database
    * Specifically the exceptions
* Make the placeholder text in the textareas less busy
* Form validation
* Show a view with all the items in the database and an option to remove an item from the database
    * This will obviously need to remove all cut-ins and exceptions associated with the item
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
* Manually add another item to the items array
    * Decide how to display all the items (eventually there could be lots of them)
        * Dynamically add sections to the results section based on how many items are returned from the search
* Continue testing to make sure the correct information is provided
* Cleanup all the unused logic

### What to do later
* Make a basic form for when the creator just has a clear cut-in serial number
    * All we would need is the cut-in serial number, the "before" description and the "after" description
    * Make it clear the cut-in serial number is the first system that includes the new part or feature
    * Each config could have the option to go advanced or not
        * So if just F9XX has an exception and the rest are single serial cut-ins you wouldn't have to do the extra work on all the other configurations

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
