

// ========================================================================
// call this function when an item is successfully dropped
function cloneDroppedItem( event, ui ){     
        var clone = $(ui.draggable).clone();
        clone.appendTo( event.target );     // append a clone of the dragged element to the target droppable container
        $( clone ).attr( "id", guid32() );  // give the cloned item a new GUID
        itemAdded( $( clone ).attr( "id" ));           // log the new item
} // end cloneDroppedItem()


// ========================================================================
// Test harness for the guid32() function
function testGuid( iterations ){
    for (i=0; i <= iterations; i++){
        console.log( guid32() );
    }
} // end testGuid()

// ========================================================================
// returns a 32 character hex value
function guid32(){
    var   guidLength = 32;
    var   CHARACTERS = "0123456789abcdef"; // 16 characters, with index values of [0] to [15]
    var   guid = "";
    var   randomPosition = 0;
    while ( guid.length < guidLength ){
        randomIndexValue = Math.floor( Math.random() * CHARACTERS.length  ); // generate value of 0 to 15 ( CHARACTERS.length - 1 ) 
        guid = guid + CHARACTERS[ randomIndexValue ];
    } // end while

    return guid; 

} // end guid()


// ========================================================================
// called AFTER an item has been added to the DOM
function itemAdded( itemId ){

// this function will add the new item to the configuration data model
//  and call the functions necessary to resize the items displayed
// for now just log the item guid to the console.

console.log( `Item added, guid ID: ${ itemId }` );

} // end itemAdded

// ========================================================================
// called AFTER an item has been removed from the DOM
function itemRemoved( itemId ){

// this function will remove an item from the configuration data model
//  and call the functions necessary to resize the items displayed
// for now just log the item guid to the console.

console.log( `Item removed, guid ID: ${ itemId }` );

} // end itemAdded