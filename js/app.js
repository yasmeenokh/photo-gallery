'use strict';

// Get the data from the jason file
$.ajax( '../data/page.json' )
  .then( allData =>{
    allData.forEach( val =>{
      let newItem = new Items( val );
      //   console.log( newItem );
      newItem.renderData();
    }
    );} );


// Creating our main Constructor; note that it only takes one parameter.
function Items( objectData ) {
  this.imageUrl = objectData.image_url;
  this.title = objectData.title;
  this.description = objectData.description;
  this.keyword = objectData.keyword;
  this.horns = objectData.horns;
  allItems.push( this );
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

$( '#filter' ).on( 'change', renderSelected );

function renderSelected ( ) {
  let selected = $( '#filter' ).val();
  console.log( selected );
  $( 'section' ).hide();
  $( `.${selected}` ).show();
}






