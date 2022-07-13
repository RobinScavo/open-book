import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import DeckContainer from './pages/deckContainer/DeckContainer';
import CardContainer from './pages/cardContainer/CardContainer';
import CreateDeck from './components/createDeck/CreateDeck';
import NotFound from './components/notFound/NotFound';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import EditDeck from './components/editDeck/EditDeck';

import './app.scss';

function App() {

  return (
    <>
    <Router>
      <div className="App">

        <Routes>
          <Route exact path='/' element={<Navigate to='/decks' />} />

          {/* Public Decks */}
          <Route exact path='/decks' element = {
            <>
            <Header
              showCreateButton = {true}
              showYourDecksButton = {true}
            />

            <DeckContainer />
            </>
          } />

          <Route path={`/decks/:id`} element = {
            <>
            <Header
              showHomeButton = {true}
              showCreateButton = {true}
              showYourDecksButton = {true}
              showUploadButton={true}
            />

            <CardContainer />
            </>
          } />

          {/* Private Decks */}
          <Route exact path='/decks/privateDecks' element = {
            <>
            <Header
              showHomeButton = {true}
              showCreateButton = {true}
            />

            <DeckContainer />
            </>
          } />

          <Route path={`/decks/privateDecks/:id`} element = {
            <>
            <Header
              showHomeButton = {true}
              showCreateButton = {true}
              showEditButton = {true}
              showYourDecksButton = {true}
              showDeleteButton = {true}
              showPublishButton = {true}
            />

            <CardContainer />
            </>
          } />

          <Route path='/createDeck' element = {
            <>
            <Header
              showHomeButton = {true}
              showYourDecksButton = {true}
            />
            <CreateDeck />
            </>
          } />

          <Route path='/editDeck/:id' element = {
            <>
            <Header
              showHomeButton = {true}
              showYourDecksButton = {true}
            />

            <EditDeck />
            </>
          } />

          <Route path='/signup' element={
            <>
            <Header showHomeButton = {true} />

            <Register />
            </>

          } />

          <Route path='/login' element={
            <>
            <Header showHomeButton = {true} />

            <Login />
            </>
          } />

          <Route path='*' element = {
            <>
            <Header showHomeButton = {true} />

            <NotFound />
            </>
          }/>
        </Routes>

        <Footer />
      </div>

    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
