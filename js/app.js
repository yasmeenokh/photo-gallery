'use strict';

// This array is created to push the options of the drop list.
let optionArray = [];

// Get the data from the jason file
$.ajax( '/data/page.json' )
  .then( allData =>{
    allData.forEach( val =>{
      let newItem = new Items( val );
      console.log( newItem );
      newItem.renderData();
    } );
    // Here we are preventing the repetition of the options of the drop list.
    let dropList = [...new Set( optionArray )];
    dropList.forEach( option=> renderOption( option ) );
    // Here we are removing the first empty section rendered.
    $( '#photo-template' ).first().remove();
  } );


// Creating our main Constructor; note that it only takes one parameter.
function Items( objectData ) {
  this.imageUrl = objectData.image_url;
  this.title = objectData.title;
  this.description = objectData.description;
  this.keyword = objectData.keyword;
  this.horns = objectData.horns;
  allItems.push( this );
  optionArray.push( this.keyword );
}

let allItems = [];

console.log( allItems );
// To render the data in the HTML
Items.prototype.renderData = function(){
  let itemsClone = $( '#photo-template' ).first().clone();
  itemsClone.find( 'h2' ).text( this.title );
  itemsClone.find( 'img' ).attr( 'src' , this.imageUrl );
  itemsClone.find( 'p' ).text( this.description );
  console.log( this.title );
  itemsClone.addClass( this.keyword );
  $( 'main' ).append( itemsClone );

};

// Function to render the drop down list
const renderOption = option =>{
  $( '#filter' ).append( `<option class="option"> ${option}</option>` );
};

// To render the selected items only on click.
$( '#filter' ).on( 'change', renderSelected );

// Function to render the selected items
function renderSelected ( ) {
  let selected = $( '#filter' ).val();
  console.log( selected );
  $( 'section' ).hide();
  $( `.${selected}` ).show();
}







