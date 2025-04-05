import './App.css';
import { Outlet, Route, Routes } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';


import Navbar from './components/Navbar';
import UserProfile from './components/UserProfile';

const client = new ApolloClient({
  uri: '/graphql', // This is the endpoint for your GraphQL server
  cache: new InMemoryCache(), // This to cache implementation for Apollo Client
});

function App() {
  return (
    <ApolloProvider client={client}>
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<UserProfile />} />
        <Route path = '*' element = { <Outlet/> } />
      </Routes>
    </>
    </ApolloProvider>
  );
}

export default App;
