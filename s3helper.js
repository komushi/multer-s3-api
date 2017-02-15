var multer  = require('multer'),
    multerS3 = require('multer-s3'),
    AWS = require('aws-sdk');


AWS.config.loadFromPath('./s3_config.json');
var s3 = new AWS.S3();

//Retrieves objects from Amazon s3
//check http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getObject-property to configure params properties
//eg var params = {Bucket: 'bucketname', Key:'keyname'}
exports.getObject = function (req, res) {
  var params = { Bucket: req.params.bucket, Key:req.params.key };
  console.log(params);
  var stream = s3.getObject(params).createReadStream();
  
  stream.on('error', function(err){
    console.log(err);
    res.status(404).end();
  }).pipe(res);
}

//cloud image uploader using multer-s3 
//Pass the bucket name to the bucketName param to upload the file to the bucket 
exports.putObject = 
  multer({
    storage: multerS3({
        s3: s3,
        bucket: function (req, file, cb) {
            cb(null, req.params.bucket);
        },
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + '_' + file.originalname);
        }
    })
  });

//cloud image uploader using multer-s3 
//Pass the bucket name to the bucketName param to upload the file to the bucket 
exports.replaceObject = 
  multer({
    storage: multerS3({
        s3: s3,
        bucket: function (req, file, cb) {
            cb(null, req.params.bucket);
        },
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, req.params.key);
        }
    })
  });


/*
//Create bucket. Note: bucket name must be unique.
//Requires only bucketName via post 
//check [http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#createBucket-property](http://) for more info
exports.createBucket = function (req, res) {
  var params = { Bucket: req.params.bucket };
  s3.createBucket(params, function (err, data) {
      if (err) {
          return res.send({ "error": err });
      }
      res.send({ data });
  });
}

//List all buckets owned by the authenticate sender of the request. Note: bucket name must be unique.
//check http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#listBuckets-property for more info
exports.listBuckets = function (req, res) {
  s3.listBuckets({}, function (err, data) {
      if (err) {
          return res.send({ "error": err });
      }
      res.send({ data });
  });
}

//Delete bucket.
//Require bucketName via delete 
//check http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#deleteBucket-property for more info
exports.deleteBucket = function (req, res) {
  var params = { Bucket: req.params.bucket };
  s3.deleteBucket(params, function (err, data) {
      if (err) {
          return res.send({ "error": err });
      }
      res.send({ data });
  });
}

//Delete bucket cors configuration. 
// Requires bucketName via delete
//check http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#deleteBucketCors-property for more info
exports.deleteBucketCors = function (req, res) {
  var params = { Bucket: req.params.bucket };
  s3.deleteBucketCors(params, function (err, data) {
      if (err) {
          return res.send({ "error": err });
      }
      res.send({ data });
  });
}

//Delete qn object
//check http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#deleteObject-property for more info
exports.deleteObject = function (req, res) {
  var params = { Bucket: req.params.bucket, Key:req.params.key };
  s3.deleteObjects(params, function (err, data) {
      if (err) {
          return res.send({ "error": err });
      }
      res.send({ data });
  });
}
*/