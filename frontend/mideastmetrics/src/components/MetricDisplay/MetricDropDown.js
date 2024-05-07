import React from 'react';
import Metric from "./Metric";
import Dropdown from 'react-bootstrap/Dropdown';

export default function MetricDropDown({ validMetric, setSelectedMetric }) {
  return (
    <Dropdown>
    <Dropdown.Toggle variant="success" id="dropdown-basic">
        Metrics
    </Dropdown.Toggle>
    <Dropdown.Menu>
        {validMetric.map((metric) => <Dropdown.Item href={`#/action-1/`} onClick={e => {setSelectedMetric(metric)}}>{metric}</Dropdown.Item>)}
    </Dropdown.Menu>
  </Dropdown>
  )
}
