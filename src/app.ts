import express from 'express';

const app = express();
const port = 3000;

app.get( "/", ( req, res ) => {
    const a = 10;
    const b = a +13;
    res.send( "Hello world!1" );
} );

app.listen(port, () => console.log('Server started at http://localhost:' + port))