import React from "react";
export default function Navbar() {
	return (
		<nav className="navbar">
			<div className="navbar__container">
				<a href="../index.html" className="page-link">Home</a>
				<a href="/#" className="page-link">Listar</a>
				<a href="/#" className="page-link">Sobre</a>
			</div>
		</nav>
	);
}