

// ========================================================================
// call this function when an item is successfully dropped

function handleDroppedItem( event, ui ){ 

    var $clone = $(ui.helper).clone();  //  clone the helper object.  ui.helper has position attributes 
    
    // if the dropped item is a "buildable" item being dropped for the first time, 
    //  reconfigure it as a "placedItem" 
    
    if ($clone.hasClass( "buildable" )){

        $clone.removeClass( "buildable" );  // turn off the buildable class
        $clone.addClass( "placedItem" );    // make the object one this IS placed item instead of one that CAN be placed
        
        $clone.attr( "id", guid32() );      // give the cloned item a new GUID
        
        $clone.draggable({
            handle: ".componentTitle",
            helper: "original",   // drag the original around and not a clone since this is a placed object.
            grid: [ 20, 20 ],     // snap to a 20x20px grid
            opacity: 0.7,         // set opacity of cloned helper while it is being dragged
            revert: "invalid"     // return to original position of not successfully dropped
        });

        $clone.resizable({
            grid: [ 20, 20 ]     // snap to a 20x20px grid
        });

        $(this).append( $clone );
        // $clone.appendTo( event.target );     // append a clone of the dragged element to the target droppable container
        itemAdded( $clone.attr( "id" ));        // log the new item

    } // end if buildable

    
    if ( $clone.hasClass( "placedItem" )){


    } // end if placedItem

} // end handleDropppedItem()


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