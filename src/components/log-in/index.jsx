import React, { useState } from 'react';
import netlify from 'netlify-auth-providers';

const TOKEN_KEY = 'github-token';

function authenticate() {
	return new Promise(function(resolve, reject) {
		const authenticator = new netlify({
			site_id: '44adb0c5-3f01-497d-bac4-50f9b60100f9',
		});
		authenticator.authenticate({ provider: 'github' }, function(err, data) {
			if (err) {
				reject(err);
			}
			resolve(data);
		});
	});
}

function useLocalStorage(key, initialValue) {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.log(error);
			return initialValue;
		}
	});

	const setValue = value => {
		try {
			setStoredValue(value);
			window.localStorage.setItem(key, JSON.stringify(value));
		} catch (error) {
			console.log(error);
		}
	};

	return [storedValue, setValue];
}

const GithubClientContext = React.createContext();
const { Provider, Consumer } = GithubClientContext;

function GithubClientProvider({ children }) {
	const [currentToken, setToken] = useLocalStorage(TOKEN_KEY, null);

	const handleLoginClick = async () => {
		try {
			const data = await authenticate();
			setToken(data.token);
		} catch (error) {
			setToken(null);
		}
	};

	return currentToken ? (
		<Provider value={currentToken}>{children}</Provider>
	) : (
		<div>
			You have no client!
			<button onClick={handleLoginClick}>Sign In Here!</button>
		</div>
	);
}

export {
	GithubClientProvider as Provider,
	Consumer,
	GithubClientContext as Context,
};
