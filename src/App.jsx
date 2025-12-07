import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar.jsx';
import Footer from './components/Footer/Footer.jsx';

import Home from './pages/Home/Home.jsx';
import Campaigns from './pages/Campaigns/Campaigns.jsx';
import Characters from './pages/Characters/Characters.jsx';
import Sessions from './pages/Sessions/Sessions.jsx';
import About from './pages/About/About.jsx';

function App() {
  return (
    <div className="app-container">
      <NavBar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/campanhas" element={<Campaigns />} />
          <Route path="/personagens" element={<Characters />} />
          <Route path="/sessoes" element={<Sessions />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
