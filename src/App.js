import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as GithubClient from './components/log-in';
import Header from './components/header';
import Navigation from './components/navigation';

function App() {
	return (
		<GithubClient.Provider>
			<Header />
			<Navigation />
		</GithubClient.Provider>
	);
}

export default App;
