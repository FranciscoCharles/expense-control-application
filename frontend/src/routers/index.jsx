import React from "react";
import {
	BrowserRouter, Route, Routes,
	Navigate, useLocation, Link,
	useNavigate
} from "react-router-dom";
import { AuthProvider, useAuthContext } from "../context/auth";
import * as Page from '../pages';


export function PrivateRoute({ children }) {
	let auth = useAuthContext();
	let location = useLocation();
	if (auth.loading) return (<Page.Loading />)
	if (auth.isAutenticated) return (children);
	return (<Navigate to={{ pathname: "/login" }} state={{ from: location.pathname }} />);
}

export default function RoutePages() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<div>
					<AuthButton />
					<ul>
						<li>
							<Link to="/public">Public Page</Link>
						</li>
						<li>
							<Link to="/private">Protected Page</Link>
						</li>
						<li>
							<Link to="/list-expenses">List Page</Link>
						</li>
					</ul>
					<Routes>
						<Route path="/" element={<Navigate to="/public" />} />
						<Route path="/public" element={<PublicPage />} />
						<Route path="/login" element={<Page.Login />} />
						<Route
							path="/private"
							element={
								<PrivateRoute>
									<ProtectedPage />
								</PrivateRoute>
							} />
						<Route
							path="/list-expenses"
							element={
								<PrivateRoute>
									<Page.ListExpenses />
								</PrivateRoute>
							} />
						<Route path="/network-error" element={<Page.NetworkError />} />
						<Route path="*" element={<Page.NotFound />} />
					</Routes>
				</div>
			</BrowserRouter>
		</AuthProvider>
	);
}

function AuthButton() {
	let history = useNavigate();
	let auth = useAuthContext();

	return auth.user ? (
		<p>
			Welcome!{" "}
			<button
				onClick={() => {
					auth.handlerLogout(() => history("/"));
				}}
			>
				Sign out
			</button>
		</p>
	) : (
		<p>You are not logged in.</p>
	);
}

function PublicPage() {
	return <h3>Public</h3>;
}

function ProtectedPage() {
	return <h3>Protected</h3>;
}
