import Header from './Header';
import Footer from './Footer';
import Body from './Body';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaPhone } from 'react-icons/fa'; 
function App() {
  return (
    <div>
      <div class="col-12 text-center py-2 custom-background" >
        <span class="d-none d-lg-inline-block">Besoin d'aide pour une urgence ? </span>
        <FaPhone size={13} /><span class="fa fa-phone"><a class="text-dark">+1 234 567 890</a></span>
      </div>
      <Header />
      <Body />
      <Footer />
    </div>

    
    
   
  );
}

export default App;
