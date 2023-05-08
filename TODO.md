### Current Focus
* Continue testing to make sure the correct information is provided
* Manually add another item to the items array
    * Decide how to display all the items (eventually there could be lots of them)
        * Dynamically add sections to the results section based on how many items are returned from the search
* Make sure everything works and this is the way to go
    * Merge back into master and sean branches and abandon dataObj branch
* Cleanup all the unused logic

### What to do later
* Figure out how to create a database we can connect to
    * MySQL and Docker
        * Might need Blakes help but maybe we can figure it out
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
