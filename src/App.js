import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as GithubClient from './components/log-in';
import Header from './components/header';
import Content from './components/content';

function App() {
	return (
		<GithubClient.Provider>
			<Header />
			<Content />
		</GithubClient.Provider>
	);
}

export default App;
