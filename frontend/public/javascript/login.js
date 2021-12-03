(async function(){

	const formLogin = document.getElementById("form-login");
	let expenseData = localStorage.getItem('expense-obj');
	console.log("local",expenseData);
	if(expenseData){
		expenseData = JSON.parse(expenseData);
		const response = await fetch('http://localhost:3000/auth/token', {
			method: "POST",
			headers: {
				'Authorization': 'Bearer ' + expenseData.jwtToken,
				"Accept": 'application/json',
				"Content-Type": "application/json; charset=UTF-8",
			},
			body: JSON.stringify({
				user_data: expenseData
			}),
		});

		if(response.status===200){
			const json = await response.json();
			localStorage.setItem('expense-obj', JSON.stringify(json));
			window.location.href = './list.html';
		}else{
			const json = await response.json();
			console.log("message",json.message)
		}
	}
	
	formLogin.addEventListener("submit", async (e) => {
		e.preventDefault();
		const response = await fetch(formLogin.action, {
			method: "POST",
			headers: {
				"Accept": 'application/json',
				"Content-Type": "application/json; charset=UTF-8",
			},
			body: JSON.stringify({
				email: formLogin.email.value,
				password: formLogin.password.value,
			}),
		});
		const json = await response.json();
		console.log(json)
		localStorage.setItem('expense-obj', JSON.stringify(json));
	
	});
})();