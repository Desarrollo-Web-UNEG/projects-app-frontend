import "../styles/letterhead.css";
import logo_blanco from '../../../assets/LOGO_UNEG_BLANCO.png';

const Letterhead = () => {
  return(
    <div className="letterhead-container">
      
      <div>
        <img src={ logo_blanco } alt="logo uneg" className="white-logo-uneg" />
      </div>

      <div className="letterhead-text"> 
        <h2>PORTAL UNIVERSITARIO</h2>
      </div>
    </div>
  )
}

export default Letterhead;