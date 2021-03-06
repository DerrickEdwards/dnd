

const   GRID_SPACING = 80;
const   GRID_ROW_HEIGHT = 80;



// ============================================================================
// ============================================================================
function initComponentsInMenu(){
    console.log( "initComponentsInMenu() called");

    $( "[class*='palette-item-']" ).draggable({
        connectToSortable: "#workspace",
        containment: "#workspace #menu",
        cursor: "auto",
        helper: "clone",        
        // helper: function(){ return $( "<div class='customHelper'></div>") },
        grid: [ GRID_SPACING, GRID_SPACING ],     // move snap to a grid
        // opacity: 0.7,         // set opacity of cloned helper while it is being dragged
        revert: "invalid"     // return to original position if not successfully dropped
        });

    $( "#workspace" ).sortable({
        forcePlaceholderSize:   true,
        placeholder:            "row-drop-placeholder"
    });

    $( "#workspace" ).droppable( {
        accept: ".palette-item-row, .palette-item-column",  // only accept droppable items with these classes, other selectors can be added
        drop:   handleDroppedItem
        } ) // end .droppable

} // end initCompoentsInMenu()


// ============================================================================
// ============================================================================

function customHelper(){

    

} // end customHelper()


// ============================================================================
// ============================================================================

function removeItem( item ){
    console.log( "removeItem() called: " + item.id );
    $( item ).remove();  // remove the DOM element with the given id
} // end removeItem()


// ============================================================================
// Create a new row object to be placed when the row component is dropped
// In this example we are only building just a single, two column/cell row
//
// @TODO: add parameter to allow the number of cells to be passed in
// @TODO: refactor the draggable code from the handleDroppedItem into here
// ============================================================================

 function createRow(){

     var i = 0;
     var cellCount = 2;

     var $row = $( "<div></div>" );     // create the layout row
     $row.addClass( "layout-row" );     
     
     for (i=0; i<cellCount; i++){
        var $cell = $( "<div ></div>" );
        $cell.addClass( "cell-col-6" );     // 6 column wide cell
        $cell.append( "cell col 6" );       // put a string in the cell so we can see the name for debugging
        $row.append( $cell );
     } // end if

     return $row;

 } // end createRow()
    
    
// ============================================================================
// call this function when an item is successfully dropped
// ============================================================================

function handleDroppedItem( event, ui ){ 

    // var $clone = $(ui.helper).clone();  //  clone the helper object.  ui.helper has position attributes 
    
    var $clone = createRow();  // get a display object for the row
    
    $clone.attr( "id", guid32() );      // give the cloned item a new GUID
    
    $clone.draggable({                  // make it draggable
        handle: ".componentTitle",
        helper: "original",   // drag the original around and not a clone since this is a placed object.
        grid: [ GRID_SPACING, GRID_SPACING ],     // snap to a 20x20px grid
        opacity: 0.7,         // set opacity of cloned helper while it is being dragged
        revert: "invalid"     // return to original position of not successfully dropped
    });

   // $clone.find( ".icon-remove" ).click( function(){ removeItem( $clone ) });  // add event handler to the "remove item" icon

    // $clone.resizable({      // make it resizable
    //     grid: [ GRID_SPACING, GRID_SPACING ]    // snap to a 20x20px grid
    // });

    $(this).append( $clone );
    // $clone.appendTo( event.target );     // append a clone of the dragged element to the target droppable container
    itemAdded( $clone.attr( "id" ));        // log the new item

} // end handleDroppedItem()


// ============================================================================
// Test harness for the guid32() function
// ============================================================================

function testGuid( iterations ){
    for (i=0; i <= iterations; i++){
        console.log( guid32() );
    }
} // end testGuid()

// ========================================================================
// returns a 32 character hex value
// ============================================================================

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
// ============================================================================

function itemAdded( itemId ){

// this function will add the new item to the configuration data model
//  and call the functions necessary to resize the items displayed
// for now just log the item guid to the console.

console.log( `Item added, guid ID: ${ itemId }` );

} // end itemAdded

// ========================================================================
// called AFTER an item has been removed from the DOM
// ============================================================================

function itemRemoved( itemId ){

// this function will remove an item from the configuration data model
//  and call the functions necessary to resize the items displayed
// for now just log the item guid to the console.

console.log( `Item removed, guid ID: ${ itemId }` );

} // end itemAdded