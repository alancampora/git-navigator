import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as GithubClient from './components/log-in';
import Navigation from './components/navigation';
import Header from './components/header';

function App() {
	return (
		<GithubClient.Provider>
			<Header />
			<Navigation />
		</GithubClient.Provider>
	);
}

export default App;
