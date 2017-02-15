/**************************/
/* config */

var express = require("express");
var app = express();
var s3helper = require('./s3helper');

//Set the port of the app
app.set('port', process.env.PORT || 8080);


/* config */
/**************************/

app.get('/:bucket/:key', s3helper.getObjects, function(req, res) {
});



app.post('/:bucket', s3helper.upload.array('file'), function(req, res) {
  res.send('Successfully uploaded ' + req.files.length + ' files!')
});


//Launch the express server
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});