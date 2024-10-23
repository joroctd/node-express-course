const http = require('node:http');

const buildHtml = (title, text) => {
	return `
	<body>
        <h1>${title}</h1>
        <p>${text}</p>
        <nav>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/fake">Missing</a>
        </nav>
	</body>
    `;
};

const siteMap = {
	'/': buildHtml('Home', 'Welcome home.'),
	'/about': buildHtml('About', 'How <i>about</i> this?')
};

const server = http.createServer((req, res) => {
	res.setHeader('Content-Type', 'text/html');
	if (req.url in siteMap) {
		res.writeHead(200);
		res.end(siteMap[req.url]);
	} else {
		res.writeHead(404);
		res.end(
			buildHtml('Page not found', `The page you are looking for doesn't exist.`)
		);
	}
});

const port = 3000;
server.listen(port, () => {
	console.log(`Web server running on http://localhost:${port}`);
});
