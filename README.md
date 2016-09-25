# NodeJs-Bootcamp-Proxy-Server
Code for Project 0: Proxy Server

Author : Nguyen Viet Pham

Time spent: [4 hours]

Completed:

    [done] Required: Requests to port 8000 are echoed back with the same HTTP headers and body
    [done] Required: Requests/reponses are proxied to/from the destination server
    [done] Required: The destination server is configurable via the --host, --port or --url arguments
    [done] Required: The destination server is configurable via the x-destination-url header
    [done] Required: Client requests and respones are printed to stdout
    [done] Required: The --logfile argument outputs all logs to the file specified instead of stdout
    [TO DO] Optional: The --exec argument proxies stdin/stdout to/from the destination program
    [TO DO] Optional: The --loglevel argument sets the logging chattiness
    [TO DO] Optional: Supports HTTPS
    [TO DO] Optional: -h argument prints CLI API

Walkthrough Gif:
	![alt text](https://github.com/vietnguyen1989/-NodeJs-Bootcamp-Proxy-Server/blob/master/walkthrough.gif "walkthrough.gif")
	
Javascripting Workshop:
	 ![alt text](https://github.com/vietnguyen1989/-NodeJs-Bootcamp-Proxy-Server/blob/master/javascripting_workshop.png "javascripting workshop is completed")

Learnyounode Workshop:
	![alt text](https://github.com/vietnguyen1989/-NodeJs-Bootcamp-Proxy-Server/blob/master/learnyounode_workshop.png "Learnyounode workshop is completed")

Starting the Server:
	npm start

Features:

Echo Server:

	curl -v -X POST http://127.0.0.1:8000 -d "hello self" -H "x-asdf: yodawg
	Note: Unnecessary use of -X or --request, POST is already inferred.
	* Rebuilt URL to: http://127.0.0.1:8000/
	*   Trying 127.0.0.1...
	* Connected to 127.0.0.1 (127.0.0.1) port 8000 (#0)
	> POST / HTTP/1.1
	> Host: 127.0.0.1:8000
	> User-Agent: curl/7.47.0
	> Accept: */*
	> x-asdf: yodawg
	> Content-Length: 10
	> Content-Type: application/x-www-form-urlencoded
	> 
	* upload completely sent off: 10 out of 10 bytes
	< HTTP/1.1 200 OK
	< host: 127.0.0.1:8000
	< user-agent: curl/7.47.0
	< accept: */*
	< x-asdf: yodawg
	< content-length: 10
	< content-type: application/x-www-form-urlencoded
	< Date: Sun, 25 Sep 2016 16:36:03 GMT
	< Connection: keep-alive
	< 
	* Connection #0 to host 127.0.0.1 left intact
	hello self
	

Proxy Server:

Port 8001 will proxy to the echo server on port 8000.

	curl -v -X POST http://127.0.0.1:8001 -d "hello self" -H "x-asdf: yodawg"
	*   Trying 127.0.0.1...
	* Connected to 127.0.0.1 (127.0.0.1) port 8001 (#0)
	> POST /asdf HTTP/1.1
	> Host: 127.0.0.1:8001
	> User-Agent: curl/7.47.0
	> Accept: */*
	> Content-Length: 11
	> Content-Type: application/x-www-form-urlencoded
	> 
	* upload completely sent off: 11 out of 11 bytes
	< HTTP/1.1 200 OK
	< host: 127.0.0.1:8001
	< user-agent: curl/7.47.0
	< accept: */*
	< content-length: 11
	< content-type: application/x-www-form-urlencoded
	< connection: close
	< date: Sun, 25 Sep 2016 16:37:30 GMT
	< 
	* Closing connection 0
	hello proxy

Configuration:
CLI Arguments:

The following CLI arguments are supported:
--host

The host of the destination server. Defaults to 127.0.0.1.
--port

The port of the destination server. Defaults to 80 or 8000 when a host is not specified.
--url

A single url that overrides the above. E.g., http://www.google.com
--logfile

Specify a file path to redirect logging to.
Headers

The follow http header(s) are supported:
x-destination-url

Specify the destination url on a per request basis. Overrides and follows the same format as the --url argument.
