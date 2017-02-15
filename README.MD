## install and start local server
```
$ npm install

$ npm start
```

## upload
curl -v -F "file=@<localfile_path>" localhost:8080/<bucket>
```
$ curl -v -F "file=@test/mypic.png" localhost:8080/training-sally
```

## upload multiple files
```
$ curl -v -F "file=@test/mypic.png" -F "file=@test/mypic2.png" -F "file=@test/log-loss.pdf" localhost:8080/training-sally
```

## download
curl -v -o <filename> 'http://localhost:8080/<bucket>/<key>'
```
$ curl -v -o mypic2.png 'http://localhost:8080/training-sally/1487060975501_mypic2.png'
```
