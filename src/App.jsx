import './App.css'
import Sidebar from './User/components/Sidenav/Sidebar'
import About from './User/pages/About/About'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Project from './User/pages/Project/Project'
import Photography from './User/pages/Photography/Photography'
import Portrait from './User/pages/Photography/Portrait/Portrait'
import Landscape from './User/pages/Photography/Landscape/Landscape'
import Contact from './User/pages/Contact/Contact'
import Error from './User/pages/Error/Error'
import Street from './User/pages/Photography/Street/Street'
import { Footer } from './User/pages/Footer/Footer';

function App() {
  return (
    <>
    <div className="App">
      <div className='header'></div>
      <div className='app-container'>
        <Router>
          <Sidebar />
          <Routes >
            <Route path="/" exact element={<About />} />
            <Route path="/about" exact element={<About />} />
            <Route path="/project" element={< Project />} />
            <Route path="/portrait" element={<Portrait />} />
            <Route path="/street" element={<Street />} />
            <Route path="/landscape" element={<Landscape />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Error />} />
          </Routes>
          <Footer />
        </Router>
      </div>
      
       {/* <div className="footer">
        <Footer />
      </div> */}
    </div>
      </>
  );
}
export default App
