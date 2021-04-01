'use strict';

// This array is created to push the options of the drop list.
let optionArray = [];

// Get the data from the jason file
const getData =  ( path ) =>{
  $.ajax( path )
    .then( allData =>{
      allData.forEach( val =>{
        let newItem = new Items( val );
        // console.log( newItem );
        newItem.renderData();
      } );
      // console.log(allData)
      // Here we are preventing the repetition of the options of the drop list.
      let dropList = [...new Set( optionArray )];
      dropList.forEach( option=> renderOption( option ) );
      // Here we are removing the first empty section rendered.
      $( '.page1' ).first().remove();
    } );
};

// To get the data from the required page; and linking it to the click button, we need to empty the filter list as well as the section. 
getData( './data/page.json' );

$( '#pageOne' ).click( function () {
  $( 'section' ).hide();
  $( '#filter' ).empty();
  optionArray = [];

  getData( './data/page.json' );

} );

$( '#pageTwo' ).click( function () {
  $( 'section' ).hide();
  $( '#filter' ).empty();
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

// Sorting function according the title and # of horns
$( '.sort' ).on( 'change', function () { $.ajax( './data/page.json' )
  .then( allData =>{
    let sortedData = $( '.sort' ).val();
    console.log( sortedData );
    allData.sort( ( a,b ) => {
      if ( a[sortedData] < b[sortedData] ){
        return -1;
      }
      else if ( a[sortedData] > b[sortedData] ) return 1;
      else return 0;
    } );
    console.log( allData );
    $( 'section' ).remove();

    allData.forEach( val =>{
      console.log( ' hello' , val );
      let newItem = new Items( val );
      newItem.renderData();
      console.log( allData );


      console.log( newItem );
    } );

    console.log( allData );

  } );
} );
