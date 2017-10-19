// Star Wars Cards! //

// Global vars
const APP = document.querySelector( '#app' );
const CARDS = document.querySelector( '#cards' );
const ROOT_URL = 'http://swapi.co/api/';

// Functions

numberWithCommas = ( val ) => {
  if ( val == 'unknown' ) {
    return 'Unknown';
  } else {
    val = parseInt( val );
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
};

makeRequest = () => {
  for ( let i = 1; i < 8; i++ ) {
    let pageNum = i,
        requestObj = new XMLHttpRequest(),
        planetsUrl = `https://swapi.co/api/planets/?page=${pageNum}`,
        planetSVGHTML = `
        <svg class="card__planet" viewBox="0 0 200 200">
          <defs>
            <circle id="path-1" cx="94.9587489" cy="94.947545" r="94"></circle>
          </defs>
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g class="planet" d="planet">
              <g class="planet__shadow" id="base">
                <mask id="mask-2" fill="white">
                  <use xlink:href="#path-1"></use>
                </mask>
                <use id="Mask" xlink:href="#path-1"></use>
                <ellipse id="Oval" class="planet__base" mask="url(#mask-2)" cx="124.660386" cy="55.9106981" rx="106.472475" ry="114.689619"></ellipse>
              </g>
              <g class="planet__craters" id="craters" transform="translate(38.000000, 27.000000)">
                <g id="Group-2">
                  <ellipse id="Oval" cx="121.112228" cy="65.0389832" rx="21.0103892" ry="25"></ellipse>
                  <circle id="Oval" cx="108.101839" cy="89.2591205" r="10"></circle>
                  <circle id="Oval" cx="10.5984158" cy="10.4823959" r="10"></circle>
                  <circle id="Oval" cx="36.0029827" cy="30.4823959" r="10"></circle>
                  <circle id="Oval" cx="41.0029827" cy="57.9543971" r="5"></circle>
                  <circle id="Oval" cx="10.5984158" cy="109.259121" r="10"></circle>
                </g>
              </g>
            </g>
          </g>
        </svg>
        `;

    requestObj.open( 'get', planetsUrl, true );
    requestObj.addEventListener( 'load', function() {
      let response = JSON.parse( requestObj.responseText );

      for ( let j = 0; j < response.results.length; j++ ) {
        climates = response.results[j].climate,
        climatesArray = climates.split( ', ' ); // split by comma or space

        for ( let k = 0; k < climatesArray.length; k++ ) {
          climateTags = climatesArray[k],
          climate = `${climatesArray[k]}`;

          cardHtml = `
            <li class="card ${climate}">
              ${planetSVGHTML}
              <div class="card__content">
                <span class="card__climate">${climate}</span>
                <span class="card__subtitle">Planet</span>
                <span class="card__name">${response.results[j].name}</span>
                <span class="card__subtitle">Population</span>
                <span class="card__population">${numberWithCommas( response.results[j].population )}</span>
              </div>
            </li>
          `;
        }



        CARDS.insertAdjacentHTML( 'beforeend', cardHtml );
      };
    });

    requestObj.send( null );
  };
};

// Event listeners
document.addEventListener( 'DOMContentLoaded', () => {
  makeRequest();
});
