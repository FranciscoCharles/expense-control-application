(async function () {
	/*const trashArrayBtn = document.querySelectorAll(
		'.expense-trash [name="trash"]'
	);
	const editArrayBtn = document.querySelectorAll(
		'.expense-edit [name="create"]'
	);
	trashArrayBtn.forEach((trashBtn) => {
		trashBtn.addEventListener("click", async () => {
			console.log("asasasasas");
			const response = await fetch("/expense/remove", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({
					id: trashBtn.dataset.id,
				}),
			});
			const json = await response.json();
			if (json.ok) {
				console.log("Success:", json);
				trashBtn.parentNode.parentNode.remove();
			} else {
				console.error("Error:", json);
			}
		});
	});
	editArrayBtn.forEach((editBtn) => {
		editBtn.addEventListener("click", () => {
			location.href = "/expense/edit-expense-list/" + editBtn.dataset.id;
		});
	});*/
	const tBody = document.getElementById('tbody');
	function createExpenseElement(expense) {
		const trElement = document.createElement('tr');
		const tdTitleElement = document.createElement('td');
		const tdDateElement = document.createElement('td');
		const tdTrashElement = document.createElement('td');
		const tdEditElement = document.createElement('td');

		tdTitleElement.innerHTML = `<div class="title">${expense.title}</div>
		<span class="icon">
		<ion-icon name="caret-up-outline"></ion-icon>
		</span>
		<span class="icon">
		<ion-icon name="caret-down-outline"></ion-icon>
		</span>`;
		tdDateElement.textContent = expense.date;
		tdTrashElement.innerHTML = `<ion-icon name="trash" data-id="${expense.id}"></ion-icon>`;
		tdEditElement.innerHTML = `<ion-icon name="create" data-id="${expense.id}"></ion-icon>`;

		tdTitleElement.setAttribute('class', 'expense-title');
		tdDateElement.setAttribute('class', 'expense-date');
		tdTrashElement.setAttribute('class', 'expense-trash');
		tdEditElement.setAttribute('class', 'expense-edit');

		trElement.appendChild(tdTitleElement);
		trElement.appendChild(tdDateElement);
		trElement.appendChild(tdTrashElement);
		trElement.appendChild(tdEditElement);

		tBody.appendChild(trElement);
	}
	async function fetchRefreshToken() {
		let expenseData = localStorage.getItem('expense-obj');
		if (expenseData) {
			expenseData = JSON.parse(expenseData);
			const response = await fetch('http://localhost:3000/auth/token', {
				method: "POST",
				headers: {
					"Accept": 'application/json',
					"Content-Type": "application/json; charset=UTF-8",
				},
				body: JSON.stringify({
					user_data: expenseData
				}),
			});

			if (response.status === 200) {
				const json = await response.json();
				localStorage.setItem('expense-obj', JSON.stringify(json));
				await fetchExpenseList()
			} else {
				window.location.href = './login.html';
			}
		}
	}
	async function fetchExpenseList() {
		
		let expenseData = localStorage.getItem('expense-obj');
		if (expenseData) {
			expenseData = JSON.parse(expenseData);
			const response = await fetch('http://localhost:3000/expense/list', {
				method: "GET",
				headers: {
					'Authorization': 'Bearer ' + expenseData.jwtToken
				}
			});

			if (response.status === 200) {
				const { expenses } = await response.json();
				console.log("expenses", expenses);
				expenses.forEach(expense => {
					createExpenseElement(expense);
				});
			} else {
				const json = await response.json();
				if (json.message == 'jwt expired') {
					console.log('fazendo fetch')
					await fetchRefreshToken();
				} else {
					console.log('ocorreu um error')
					console.log("message", json.message)
				}
			}
		}else{
			window.location.href = './login.html';
		}
	};
	fetchExpenseList();
})();