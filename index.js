let fs = require('fs')
let http = require('http')
let path = require('path')
let request = require('request')

// Set a the default value for --host to 127.0.0.1
let argv = require('yargs')
	.default('host', '127.0.0.1')
	.argv

let scheme = 'http://'

// Get port value. If none, default to the echo server, or 80 if --host exists
let port = argv.port || (argv.host == '127.0.0.1' ? 8000 : 80)
// Build the destination url
let destinationUrl = argv.url || scheme + argv.host + ':' + port
// Log path
let logPath = argv.log && path.join(__dirname, argv.log)
let getLogStream = ()=> logPath ? fs.createWriteStream(logPath) : process.stdout

// Echo Server
http.createServer((req, res) => {

	getLogStream().write(`\nEcho request received at: ${req.url}:\n` + JSON.stringify(req.headers))

	for (let header in req.headers) {
		res.setHeader(header, req.headers[header])
	}

	req.pipe(getLogStream(), {end: false})

	req.pipe(res, {end: false})
	
}).listen(8000)

getLogStream().write('Listening at http://127.0.0.1:8000')

// Proxy Server
http.createServer((req, res) => {
	if (req.headers['x-destination-url']) {
		destinationUrl = req.headers['x-destination-url']
		delete req.headers['x-destinationUrl-url']
	}

	let options = {
		headers: req.headers,
		url: `${destinationUrl}${req.url}`
	}

	options.method = req.method

	// Log the proxy request headers and content in the **server callback**
	getLogStream().write(`\nRequest proxied to: ${destinationUrl + req.url}: \n` + JSON.stringify(req.headers))

	
	let downstreamResponse = req.pipe(request(options), {end: false})

	downstreamResponse.pipe(getLogStream(), {end: false})

	getLogStream().write(JSON.stringify(downstreamResponse.headers))

	/* Response */
	downstreamResponse.pipe(res, {end: false})


	downstreamResponse.pipe(getLogStream(), {end: false})

}).listen(8001)
