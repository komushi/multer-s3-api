## Create a s3_config.json file like below with your credentials
```
{
    "accessKeyId": "AK678873232",
    "secretAccessKey": "fdsfd32434fdsfs",
    "region": "ap-northeast-1"
}
```

## Install and start local server
```
$ npm install

$ npm start
```

## Upload to S3
curl -v -X PUT -F "file=@<localfile_path>" localhost:8080/<bucket>
```
$ curl -v -X PUT -F "file=@test/mypic.png" localhost:8080/training-sally
```

## Upload multiple files to S3
```
$ curl -v -X PUT -F "file=@test/mypic.png" -F "file=@test/mypic2.png" -F "file=@test/log-loss.pdf" localhost:8080/training-sally
```

## Replace a file on S3
curl -v -X POST -F "file=@<localfile_path>" localhost:8080/<bucket>/<key>
```
$ curl -v -X POST -F "file=@test/mypic.png" localhost:8080/training-sally/mypic.png
```

## Download from S3 as proxy mode
curl -v -o <filename> 'http://localhost:8080/<bucket>/<key>'
```
$ curl -v -o mypic.png 'http://localhost:8080/training-sally/1487141034870_mypic.png'
```
