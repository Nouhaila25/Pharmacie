import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import markerIcon from './marker-icon.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import L from 'leaflet';
import { Modal, Button } from 'react-bootstrap';
import pharmacyImage from './pharmacy.jpeg';

function Body() {
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [zones, setZones] = useState([]);
    const [selectedZone, setSelectedZone] = useState(null);
    const [isGardeSelected, setIsGardeSelected] = useState(false);
    const [selectedGarde, setSelectedGarde] = useState(null);
    const [pharmacies, setPharmacies] = useState([]);
    const [pharmacyCoords, setPharmacyCoords] = useState([]);
    const [pharmacyLocations, setPharmacyLocations] = useState([]);
    const [selectedPharmacy, setSelectedPharmacy] = useState(null);
    const [map, setMap] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchCities = async () => {
            const res = await fetch('https://pharmacy-liard.vercel.app/api/cities');
            const data = await res.json();
            setCities(data);
        };
        fetchCities();
    }, []);

    const gardeOptions = [
        { value: 'jour', label: 'Garde de jour' },
        { value: 'nuit', label: 'Garde de nuit' },
    ];

    const handleGardeChange = (selectedOption) => {
        setSelectedGarde(selectedOption);
    };

    const handleCityChange = (selectedOption) => {
        setSelectedCity(selectedOption);
        setSelectedZone(null);
        setIsGardeSelected(false);
    };

    useEffect(() => {
        if (selectedCity) {
            const fetchZones = async () => {
                const res = await fetch(`https://pharmacy-liard.vercel.app/api/zones/city/${selectedCity.value}`);
                const data = await res.json();
                setZones(data);
            };
            fetchZones();
        } else {
            setZones([]);
        }
    }, [selectedCity]);

    const handleZoneChange = (selectedOption) => {
        setSelectedZone(selectedOption);
        setIsGardeSelected(false);
    };

    const handleGardeSelect = () => {
        setIsGardeSelected(!isGardeSelected);
    };

    const handleSearch = async () => {
        if (selectedCity && selectedZone && selectedGarde) {
            try {
                const res = await fetch(
                    `https://pharmacy-liard.vercel.app/api/pharmacies/${selectedGarde.value}/${selectedZone.value}/${selectedCity.value}`
                );
                const data = await res.json();
                setPharmacies(data);
                const locations = data.map((pharmacy) => ({
                    lat: pharmacy.latitude,
                    lon: pharmacy.longitude,
                    name: pharmacy.name,
                    address: pharmacy.address,
                }));
                setPharmacyLocations(locations);

                const bounds = locations.reduce((acc, location) => acc.extend([location.lat, location.lon]), L.latLngBounds());

                map.fitBounds(bounds);
            } catch (err) {
                console.error(err.message);
            }
        }
    };

    const customIcon = new Icon({
        iconUrl: markerIcon,
        iconSize: [30, 30],
    });

    const handleMapReady = (map) => {
        setMap(map);
    };

    const handleTableRowClick = (pharmacy) => {
        setSelectedPharmacy(pharmacy);
    };

    const openModal = (pharmacy) => {
        setSelectedPharmacy(pharmacy);
        setShowModal(true);
    };

    return (
        <div className="App">
            <div className="container">
                <div className="menu-container">
                    <div className="menu-item">
                        <label>Ville :</label>
                        <Select
                            className="select"
                            options={cities.map((city) => ({
                                value: city._id,
                                label: city.name,
                            }))}
                            value={selectedCity}
                            onChange={handleCityChange}
                            placeholder="Sélectionnez une ville"
                        />
                    </div>
                    <div className="menu-item">
                        <label>Zone :</label>
                        {selectedCity ? (
                            <Select
                                className="select"
                                options={zones.map((zone) => ({
                                    value: zone._id,
                                    label: zone.name,
                                }))}
                                value={selectedZone}
                                onChange={handleZoneChange}
                                placeholder="Sélectionnez une zone"
                            />
                        ) : (
                            <Select
                                className="select"
                                options={[]}
                                isDisabled={true}
                                placeholder="Sélectionnez une ville d'abord"
                            />
                        )}
                    </div>
                    <div className="menu-item">
                        <label>Type de garde :</label>
                        {selectedCity && selectedZone ? (
                            <Select
                                className="select"
                                options={gardeOptions}
                                value={selectedGarde}
                                onChange={handleGardeChange}
                                placeholder="Sélectionnez un type de garde"
                            />
                        ) : (
                            <Select
                                className="select"
                                options={[]}
                                isDisabled={true}
                                placeholder="Sélectionnez une ville et une zone d'abord"
                            />
                        )}
                    </div>
                    <br />
                </div>
                <div className="search-container">
                    <button className="btn btn-success" onClick={handleSearch}>
                        Rechercher
                    </button>
                </div>
                <br />
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ flex: 1 }}>
                    <div style={{ flex: 1 }}>
  <Table striped bordered hover>
    <thead>
      <tr>
        <th></th>
        <th>Nom de la pharmacie</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {pharmacies.map((pharmacy, index) => (
        <tr key={pharmacy.id}>
          <td style={{ fontWeight: 'bold' }}>{index + 1}</td>
          <td>{pharmacy.name}</td>
          <td>
            <button className="btn btn-success" onClick={() => openModal(pharmacy)}>Voir détails</button>
          </td>
        </tr>
      ))}
      {pharmacies.length === 0 && (
        <tr>
          <td colSpan="3" style={{ textAlign: 'center' }}>Aucune pharmacie disponible</td>
        </tr>
      )}
    </tbody>
  </Table>
</div>





                    </div>
                    <div className="map-container" style={{ flex: 1 }}>
                        <MapContainer
                            center={[31.91309983552669, -5.7457327976780705]}
                            zoom={6}
                            style={{ height: '500px', width: '100%' }}
                            whenReady={(map) => handleMapReady(map)}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                            />

                            {pharmacyLocations.length > 0 && (
                                <MarkerClusterGroup>
                                    {pharmacyLocations.map((location, index) => (
                                        <Marker
                                            key={index}
                                            position={[location.lat, location.lon]}
                                            icon={customIcon}
                                            onClick={() => handleTableRowClick(pharmacies[index])}
                                        >
                                            <Popup>
                                                <div>
                                                    <strong>{location.name}</strong>
                                                    <br />
                                                    {location.address}
                                                </div>
                                            </Popup>
                                        </Marker>
                                    ))}
                                </MarkerClusterGroup>
                            )}
                        </MapContainer>
                    </div>
                </div>
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Informations sur la pharmacie</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <img src={pharmacyImage} alt="Pharmacy" style={{ width: '100%', marginBottom: '10px' }} />
                            <strong>Nom :</strong> {selectedPharmacy ? selectedPharmacy.name : ''}
                            <br />
                            <strong>Adresse :</strong> {selectedPharmacy ? selectedPharmacy.address : ''}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Fermer
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}

export default Body;