# TODO API

### What does a TODO consist of?

* ID
* Owner / Associated Account
* Deadline
* Creation Date
* Title
* Description

### What can the API do?

* Fetch TODO's
* Create TODO's
* Modify TODO's
* Delete TODO's
* Register USER
* Login USER

### What is the REST-Spec?

* GET all your TODO's 
    * URL-Params: none
    * Request-Payload: Owner
    * Response-Payload: all your TODO's
* POST a new TODO
    * URL-Params: none
    * Request-Payload: Owner, Deadline, Title, Description, Owner
    * Response-Payload: Operation-Statuscode and TODO if successfull
* PATCH an existing TODO
    * URL-Params: ID
    * Request-Payload: To-be-modified Property, Owner
    * Response-Payload: Operation-Statuscode and TODO if successfull
* DELETE an existing TODO
    * URL-Params: ID
    * Request-Payload: Owner
    * Response-Payload: Operation-Statuscode and TODO if successfull
