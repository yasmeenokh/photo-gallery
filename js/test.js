'use strict';

// Get the data from the jason file
$.ajax( '../data/page.json' )
  .then( allData =>{
    allData.forEach( val =>{
      let newItem = new Items( val );
      //   console.log( newItem );
      newItem.renderData();
    }
    );
    // $( '#filter' ).on( 'change', renderSelected );

  }
  );


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
//   itemsClone.addClass( this.keyword );

  $( 'main' ).append( itemsClone );

};

$( '#filter' ).on( 'change', renderSelected );

function renderSelected ( ) {
  let selected = $( '#filter' ).val();
  console.log( selected );
  $( 'section' ).hide();
  allItems.forEach( element=> {
    if( element.keyword === selected ){
      element.renderData();

    }
    // console.log( element.title );
  }
  );


}




$( '.sort' ).on( 'change', function () {
  $( 'section' ).empty();

  let sortedData = $( '.sort' ).val();
  console.log( sortedData );
  console.log( allItems );
  allItems.sort( ( a,b ) => {
    if ( a[sortedData] < b[sortedData] ){
      return -1;
    }
    else if ( a[sortedData] > b[sortedData] ) return 1;
    else return 0;
  } );
  console.log( allItems );
  $( 'section' ).remove();
  allItems.forEach( val =>{
    console.log( ' hello' , val );
    val.renderData();
    console.log( allItems );
  } );

  console.log( allItems );
} );