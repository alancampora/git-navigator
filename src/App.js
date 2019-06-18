import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as GithubClient from './components/log-in';
import Navigation from './components/navigation';

function App() {
	return (
		<GithubClient.Provider>
			<Navigation />
		</GithubClient.Provider>
	);
}

export default App;
