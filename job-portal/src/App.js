import logo from './logo.svg';
import Home from './components/Home/Home';
import { Route,Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Registeruser from './components/RegisterUer/Registeruser';
import JobPostingPage from './components/Rucrieters/JobPostingPage';
import Jobs from './components/Jobs/Jobs';
import SingleProduct from './components/singleProductPage/SingleProduct';
import Search from './components/Searchbar/Search';
import { useState } from 'react';


function App() {
  const [getJobs , setGetJobs] = useState([]);

  return (
    <div className="App">
      <Navbar/>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Registeruser/>}/>
      <Route path="/jobposting" element={<JobPostingPage/>}/>
      <Route path="/jobs" element={<Jobs getJobs={getJobs} setGetJobs={setGetJobs}/> }/>
      <Route path="/singleProduct/:id" element={<SingleProduct/>}/>
      <Route path="/searchbar" element={<Search setGetJobs={setGetJobs}/>}/>
      
      </Routes>
   </div>
  );
}

export default App;
