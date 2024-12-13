const formDOM = document.querySelector('.form');
const usernameInputDOM = document.querySelector('.username-input');
const passwordInputDOM = document.querySelector('.password-input');
const formAlertDOM = document.querySelector('.form-alert');
const resultDOM = document.querySelector('.result');
const btnDOM = document.querySelector('#data');
const tokenDOM = document.querySelector('.token');

formDOM.addEventListener('submit', async e => {
	formAlertDOM.classList.remove('text-success');
	tokenDOM.classList.remove('text-success');

	e.preventDefault();
	const name = usernameInputDOM.value;
	const password = passwordInputDOM.value;

	try {
		const {
			data: { message, token }
		} = await axios.post('/api/v1/logon', { name, password });

		formAlertDOM.style.display = 'block';
		formAlertDOM.textContent = message;

		formAlertDOM.classList.add('text-success');
		usernameInputDOM.value = '';
		passwordInputDOM.value = '';

		localStorage.setItem('token', token);
		resultDOM.innerHTML = '';
		tokenDOM.textContent = 'token present';
		tokenDOM.classList.add('text-success');
	} catch (error) {
		formAlertDOM.style.display = 'block';
		formAlertDOM.textContent = error.response.data.message;
		localStorage.removeItem('token');
		resultDOM.innerHTML = '';
		tokenDOM.textContent = 'no token present';
		tokenDOM.classList.remove('text-success');
	}
	setTimeout(() => {
		formAlertDOM.style.display = 'none';
	}, 2000);
});

btnDOM.addEventListener('click', async () => {
	const token = localStorage.getItem('token');
	try {
		const {
			data: { message, secret }
		} = await axios.get('/api/v1/dashboard', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		const [secretIntro, secretData] = secret.split(':');
		const secretDataParts = secretData.match(/.{1,25}/g);
		resultDOM.innerHTML = `<h5>${message}</h5><p>${secretIntro}:</p>${secretDataParts
			.map(s => `<p>${s}</p>`)
			.join('')}`;
	} catch (error) {
		localStorage.removeItem('token');
		resultDOM.innerHTML = `<p>${error.response.data.message}</p>`;
	}
});

const checkToken = () => {
	tokenDOM.classList.remove('text-success');

	const token = localStorage.getItem('token');
	if (token) {
		tokenDOM.textContent = 'token present';
		tokenDOM.classList.add('text-success');
	}
};
checkToken();
