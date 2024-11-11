const http = require('http');
var StringDecoder = require('string_decoder').StringDecoder;

const getBody = (req, callback) => {
	const decode = new StringDecoder('utf-8');
	let body = '';
	req.on('data', function (data) {
		body += decode.write(data);
	});
	req.on('end', function () {
		body += decode.end();
		const body1 = decodeURI(body);
		const bodyArray = body1.split('&');
		const resultHash = {};
		bodyArray.forEach(part => {
			const partArray = part.split('=');
			resultHash[partArray[0]] = partArray[1];
		});
		callback(resultHash);
	});
};

const Type = {
	text: 'text',
	select: 'select'
};

const itemMap = {
	item: {
		value: 'Enter something below.',
		type: Type.text
	},
	backgroundColor: {
		value: 'white',
		type: 'select',
		validValues: ['white', 'limegreen']
	}
};

const generateItemHtml = item => {
	switch (itemMap[item].type) {
		case Type.text:
			return `
      <div>
        <p>${itemMap[item].value}</p>
        <form method="POST">
          <input name="${item}"></input>
          <button type="submit">Submit</button>
        </form>
      </div>
      `;
		case Type.select:
			return `
      <div>
        <form method="POST">
          <label for="${item}">Select ${item}:</label>
          <select name="${item}" id="${item}">
            ${itemMap[item].validValues.map(val => {
							return `<option value="${val}">${val}</option>`;
						})}
          </select>
          <button type="submit">Submit</button>
        </form>
      </div>
      `;
		default:
			return `
        <p>Missing type.</p>
      `;
	}
};

const form = () => {
	return `
  <body style="background-color:${itemMap.backgroundColor.value}">
    ${Object.entries(itemMap)
			.map(([k]) => {
				return generateItemHtml(k);
			})
			.join('')}
  </body>
  `;
};

const server = http.createServer((req, res) => {
	console.log('req.method is ', req.method);
	console.log('req.url is ', req.url);
	if (req.method === 'POST') {
		getBody(req, body => {
			console.log('The body of the post is ', body);

			// logic for updating values
			Object.entries(itemMap).forEach(([k]) => {
				if (body[k]) {
					let isValid = true;
					if (Object.hasOwn(itemMap[k], 'validValues')) {
						isValid = itemMap[k].validValues.includes(body[k]);
					}
					if (isValid) itemMap[k].value = body[k];
				}
			});

			res.writeHead(303, {
				Location: '/'
			});
			res.end();
		});
	} else {
		res.end(form());
	}
});

server.on('request', req => {
	console.log(`Event received: ${req.method} ${req.url}\n`);
});

const port = 3000;
server.listen(port);
console.log(`The server is listening on port ${port}.`);
