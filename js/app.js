'use strict';
// if ($('#pageOne').attr('id') === "pageOne"){

// This array is created to push the options of the drop list.
let optionArray = [];
// let newItem;
// Get the data from the jason file

const getData =  ( path ) =>{
  $.ajax( path )
    .then( allData =>{
      allData.forEach( val =>{
        let newItem = new Items( val );
        // console.log( newItem );
        newItem.renderData();
      } );
      // Here we are preventing the repetition of the options of the drop list.
      let dropList = [...new Set( optionArray )];
      dropList.forEach( option=> renderOption( option ) );
      // Here we are removing the first empty section rendered.
      $( '.page1' ).first().remove();
    } );
};
getData( './data/page.json' );

$( '#pageOne' ).click( function () {
  $( 'section' ).hide();
  $( 'select' ).empty();
  optionArray = [];

  getData( './data/page.json' );

} );

$( '#pageTwo' ).click( function () {
  $( 'section' ).hide();
  $( 'select' ).empty();
  optionArray = [];

  getData( './data/page2.json' );
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
  let template = $( '#dataSet' ).html();
  let data = Mustache.render( template, this );
  $( 'main' ).append( data );
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

function sorting() {
  allItems.sort( ( a,b )=>{
    if( a.horns < b.horns ){
      return 1;
    } else if ( a.horns > b.horns ){
      return -1;
    } else{
      return 0;
    }}
  );}

$( '.sort' ).on( 'change', function ( event ) {
  if ( event.value === 'number' ){
    sorting();}
  else{
    sortByTitle();}
  $( '.section' ).hide();
  allItems.forEach( val =>{
    val.renderData();
  } );

} );
function sortByTitle() {
  allItems.sort( ( a,b ) =>{
    if ( a.keyword.toUpperCase() < b.keyword.toUpperCase() ){
      return 1;
    }
    else if ( a.keyword.toUpperCase() > b.keyword.toUpperCase() ){
      return -1 ;
    } else {
      return 0;
    }
  }

  ); }





