import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import csc from 'country-state-city';
import axios from 'axios';
import { motion } from 'framer-motion';

const ThirdStep = props => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  let count = 0;

  useEffect(() => {
    const getCountries = async () => {
      try {
        setIsLoading(true);
        const result = await csc.getAllCountries();
        let allCountries = [];
        allCountries = result?.map(({ isoCode, name }) => ({
          isoCode,
          name
        }));
        const [{ isoCode: firstCountry } = {}] = allCountries;
        setCountries(allCountries);
        setSelectedCountry(firstCountry);
        setIsLoading(false);
      } catch (error) {
        setCountries([]);
        setIsLoading(false);
      }
    };

    getCountries();
  }, []);

  useEffect(() => {
    const getStates = async () => {
      try {
        const result = await csc.getStatesOfCountry(selectedCountry);
        let allStates = [];
        allStates = result?.map(({ isoCode, name }) => ({
          isoCode,
          name
        }));

        const [{ isoCode: firstState = '' } = {}] = allStates;
        setCities([]);
        setSelectedCity('');
        setStates(allStates);
        setSelelectedState(firstState);
      } catch (error) {}
    };

    getStates();
  }, [selectedCountry]);

  useEffect(() => {
    const getAllCities = async () => {
      try {
        const result = await csc.getCitiesOfState(
          selectedCountry,
          selectedState
        );
        let allCities = [];
        allCities = result?.map(({ name }) => ({
          name
        }));

        const [{ name: firstCity = '' }] = allCities;
        setCities(allCities);
        setSelectedCity(firstCity);
      } catch (error) {}
    };
    getAllCities();
  }, [selectedState]);

  const handleSubmit = async event => {
    event.preventDefault();
  };

  return (
    <Form className="input-form" onSubmit={handleSubmit}>
      <motion.div
      initial={{ x: '-100vw' }}
      animate={{ x: 0 }}
        className="col-md-6 offset-md-3"
      >
        <Form.Group controlId="country">
          {isLoading && (
            <p className="loading">Loading countries. Please wait...</p>
          )}
          <Form.Label>Country </Form.Label>
          <Form.Control
            as="select"
            name="country"
            value={selectedCountry}
            onChange={event => setSelectedCountry(event.target.value)}
          >
            {countries.map(({ isoCode, name }) => (
              <option value={isoCode} key={isoCode}>
                {name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="state">
          <Form.Label>States</Form.Label>
          <Form.Control
            as="select"
            name="state"
            value={selectedState}
            onChange={event => setSelelectedState(event.target.value)}
          >
            {states.length > 0 ? (
              states.map(({ name }) => (
                <option value={name} key={name}>
                  {name}
                </option>
              ))
            ) : (
              <option key={count + 1} value="">
                No state Found
              </option>
            )}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="cities">
          <Form.Label>Cities</Form.Label>
          <Form.Control
            as="select"
            name="city"
            value={selectedCity}
            onChange={event => setSelectedCity(event.target.value)}
          >
            {cities.length > 0 ? (
              cities.map(({ isoCode, name }) => (
                <option value={isoCode} key={isoCode}>
                  {name}
                </option>
              ))
            ) : (
              <option key={count + 1} value="">
                No city Found
              </option>
            )}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </motion.div>
    </Form>
  );
};

export default ThirdStep;
