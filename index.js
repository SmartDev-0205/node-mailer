const https = require('https');
var express = require('express'),
    app = express(),
    port = process.env.PORT || 5000;

app.use(function (re, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    next()
})
app.use(express.json());
app.get('/', function(request, res){
    res.send("Hello world!");
 });
app.post('/sendmail', (req, res) => {
    var postData = JSON.stringify(req.body);
    console.log("This is request data ======================== >",postData);
    var options = {
        hostname: 'appapi.anexacargo.com',
        port: 443,
        path: '/sendmails',
        method: 'POST',
        headers: {
            Authorization:
                "Basic QWV4cHJlc3M6ZTcwNmRkOTEtZmFlYS00ZWJiLWI5N2EtMDYwMjQxMDg1ZWVm",
            'Content-Type': 'application/json',
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
        }
    };

    var req = https.request(options, (res) => {
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);

        res.on('data', (d) => {
            process.stdout.write(d);
        });
    });

    req.on('error', (e) => {
        console.error(e);
    });

    req.write(postData);
    req.end();
});

app.listen(port);