import Api from '../api';

export function getUserData() {
	try {
		const expenseData = localStorage.getItem('expense-obj');
		return JSON.parse(expenseData);
	} catch (error) {
		return undefined;
	}
}
export function getToken() {
	try {
		const expenseData = localStorage.getItem('expense-obj');
		return JSON.parse(expenseData).jwtToken;
	} catch (error) {
		return undefined;
	}
}

export async function login(email, senha) {
	let result = undefined;
	try {
		console.log('realizando login')
		const response = await Api.post('/auth/login', {
			email: email,
			password: senha,
		});
		if (response.status === 200) {
			console.log('login com sucesso', response.data)
			result = response.data;
			Api.defaults.headers.Authorization = `Bearer ${result.jwtToken}`;
			localStorage.setItem('expense-obj', JSON.stringify(result));
		} else {
			const json = response.data;
			console.log('error ', json.message)
			Api.defaults.headers.Authorization = undefined;
		}
	} catch (error) {
		console.log('login deu erro', error.message)
		Api.defaults.headers.Authorization = undefined;
		result = undefined;
	}
	return result;
}

export async function checkToken() {
	let result = undefined;
	let expenseData = localStorage.getItem('expense-obj');
	if (expenseData) {
		try {
			expenseData = JSON.parse(expenseData);
			result = expenseData;
			Api.defaults.headers.Authorization = `Bearer ${expenseData.jwtToken}`;
			const response = await Api.post('auth/token', expenseData);
			if (response.status === 200) {
				result = response.data;
				console.log(response.data, expenseData)
				localStorage.setItem('expense-obj', JSON.stringify(result));
			} else {
				const json = response.data;
				console.log('error auth', json);
			}
		} catch (error) {
			if(error.message === 'Network Error'){
				throw Error(error.message);
			}
			console.log('check token', error, 'jjjjj', error.response)
			Api.defaults.headers.Authorization = undefined;
		}
	} else {
		Api.defaults.headers.Authorization = undefined;
	}
	return result;
}