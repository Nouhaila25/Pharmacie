import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>Contactez Nous</Card.Title>
        <Card.Text>
          <strong>Adresse: </strong>1234 Rue des pharmaciens, Casablanca, Maroc <br />
          <strong>Téléphone: </strong> +1 234 567 890 <br />
          <strong>Email: </strong> info@pharmalocations.com
        </Card.Text>
        <div className="d-flex justify-content-center">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="me-3">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="me-3">
            <FaTwitter size={24} />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={24} />
          </a>
        </div>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">© 2023 PharmaLOCATIONS. Tous droits réservés.</small>
        <div className="mt-2">
          <a href="/politique-de-confidentialite">Politique de confidentialité</a>
          <span className="mx-2">|</span>
          <a href="/conditions-utilisation">Conditions d'utilisation</a>
          <span className="mx-2">|</span>
          <a href="/partenaires">Partenaires</a>
        </div>
      </Card.Footer>
    </Card>
  );
}

export default Footer;
