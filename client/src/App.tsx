import React from 'react';
import './App.css';
import Calendar from "./modules/calendar";
import Header from "./modules/header";

function App() {
  return (
    <div className="App">
        <Header/>
        <main>
            <section className="Calendar">
                <Calendar/>
            </section>
        </main>
    </div>
  );
}

export default App;
