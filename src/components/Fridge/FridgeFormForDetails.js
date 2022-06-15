import React, { useState, useEffect } from 'react';
import ButtonSave from '../Reusable/ButtonSave';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const FridgeFormForDetails = (props) => {
  const { translations } = props || {},
    { Placeholders } = translations || {};
  let signal = false;
  let temperatureUrl = `http://172.20.222.249:5000/temperatura`;
  let humidityUrl = `http://172.20.222.249:5000/vlaznost`;
  let distanceUrl = `http://172.20.222.249:5000/distanca`;
  let distance2Url = `http://172.20.222.249:5000/distanca2`;

  const [humidity, setHumidity] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [distance, setDistance] = useState(null);
  const [distance2, setDistance2] = useState(null);

  const fetchAllData = () => {
    axios.get(temperatureUrl).then((response) => {
      {
        setTimeout(() => {
          setTemperature(response.data);
        }, 10);
      }
    });
    axios.get(humidityUrl).then((response) => {
      {
        setTimeout(() => {
          setHumidity(response.data);
        }, 10);
      }
    });
    axios.get(distanceUrl).then((response) => {
      {
        setTimeout(() => {
          setDistance(response.data);
        }, 10);
      }
    });
    axios.get(distance2Url).then((response) => {
      {
        setTimeout(() => {
          setDistance2(response.data);
        }, 10);
      }
    });
  };

  useEffect(() => {
    if (!signal) {
      fetchAllData();
      signal = true;
    }
  }, []);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    fetchAllData();
  };

  const yesIcon = (
    <div style={{ marginLeft: '-20%' }}>
      <Link to="#">
        <i className="fas fa-check" />
      </Link>
    </div>
  );

  const noIcon = (
    <div style={{ marginLeft: '-20%' }}>
      <Link to="#">
        <i className="fas fa-exclamation" />
      </Link>
    </div>
  );

  return (
    <form noValidate={true} onSubmit={onSubmitHandler}>
      <div>
        <Row md={12} style={{ margin: 'auto', marginLeft: '-13%' }}>
          <div className="text-center" style={{ marginLeft: '6%' }}>
            <b>
              {Placeholders.temperaturе} {temperature?.temp}
            </b>
            <br></br>
            <b>
              {Placeholders.humidity} {humidity?.humd}
            </b>
            <br></br>
            <b>
              {Placeholders.milk}
              {distance?.dist && distance?.dist?.toFixed(2)}
            </b>
            <br></br>
            <b>
              {Placeholders.cheese}{' '}
              {distance2?.dist && distance2?.dist?.toFixed(2)}
            </b>
            <br></br>
          </div>
          <div className="text-center">
            <br></br>
            {distance?.dist < 10 ? yesIcon : noIcon}
            <div style={{ marginLeft: '15%', marginTop: '-3%' }}>
              {distance?.dist < 10 ? Placeholders.milkYes : Placeholders.milkNo}
            </div>
            <br></br>
            {distance2?.dist < 10 ? yesIcon : noIcon}
            <div style={{ marginLeft: '15%', marginTop: '-3%' }}>
              {distance2?.dist < 10
                ? Placeholders.cheeseYes
                : Placeholders.cheeseNo}
            </div>
          </div>
        </Row>
        <Row className="mt-4">
          <ButtonSave signalForPreview />
        </Row>
      </div>
    </form>
  );
};

export default FridgeFormForDetails;
