const fs = require( 'fs' );
const xml = require( "sax-parser" );

const elements = {
    project: {},
    card: {},
    video: {},
    sound: {},
};

elements.project.start = () => console.log( '----------------Project start' );
elements.project.end = () => console.log( '----------------Project end' );

const indent = () => ' '.repeat( stack.length * 2 );

const stack = [];

const parser = new xml.SaxParser( ( cb ) => {
    cb.onStartDocument( () => { } );
    cb.onEndDocument( () => { } );
    cb.onStartElementNS( ( elem, attrs, prefix, uri, namespaces ) => {
        console.log( `${ indent() }>>> ${ elem } %j`, attrs );
        stack.push( {
            type: elem,
            attrs,
        } );
        if ( elem in elements && elements[ elem ].start ) {
            elements[ elem ].start();
        }
    } );

    cb.onEndElementNS( ( elem, prefix, uri ) => {
        const done = stack.pop();
        console.log( `${ indent() }<<< ${ elem }, done %j`, done );
        if ( elem in elements && elements[ elem ].end ) {
            elements[ elem ].end();
        }
    } );

    cb.onCharacters( ( chars ) => {
        if ( chars.trim() ) {
            console.log( `${ indent() }  --${ chars }` );
            stack[ stack.length - 1 ].text = ( stack[ stack.length - 1 ].text || '' ) + chars;
        }
    } );
    cb.onCdata( function ( cdata ) {
        // console.log( `${ indent() }  --${ cdata }` );
    } );
    cb.onComment( ( msg ) => {
        // console.log( `${ indent() }  --${ msg }` );
    } );
    cb.onWarning( ( msg ) => {
        console.warn( `${ indent() }  --${ msg }` );
    } );
    cb.onError( ( msg ) => {
        console.warn( `${ indent() }  --${ msg }` );
    } );
} );

const xmltext = fs.readFileSync( 'video.xml', { encoding: 'utf-8' } )
parser.parseString( xmltext );

