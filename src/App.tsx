import React from 'react';
import styled from 'styled-components';

import './App.css';

export const Bar = styled.div<{ width: number }>`
  height: 40px;
  max-width: 100%;
  width: ${({ width }: { width: number }) => `${width}%`};
  background: ${({ width }: { width: number }) => (width > 100 ? '#e3705a' : '#fdcc08')};

  transition: all 0.3s ease-in-out;
`;

export const ProgressValue = styled.div`
  font-size: 20px;
  width: 100%;
  position: absolute;
  margin: 0px;
  font-weight: 600;
`;

export const Select = styled.select`
  border: 1px solid #fdcc08;
  padding: 6px;
  font-size: 16px;
  cursor: pointer;
  color: #00828e;

  &: focus-visible {
    outline: #fdcc08;
  }
`;

export const Button = styled.button`
  border: none;
  padding: 6px;
  font-size: 16px;
  background: #fdcc08;
  cursor: pointer;
  color: #00828e;
  font-weight: 600;
  &: hover {
    background: #ffe200;
  }
  &: active {
    transform: translateY(2px);
  }
`;

function App() {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [bar, setBar] = React.useState<number>(1);
  const [barWidth1, setBarWidth1] = React.useState<number>(25);
  const [barWidth2, setBarWidth2] = React.useState<number>(50);
  const [barWidth3, setBarWidth3] = React.useState<number>(75);

  setTimeout(function () {
    setLoading(false);
  }, 2000);

  const handleChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBar(Number(event.target.value));
  };

  const handleWidth = (event: React.MouseEvent<HTMLButtonElement>, value: number) => {
    event.preventDefault();
    switch (bar) {
      case 1:
        setBarWidth1(Math.max(barWidth1 + value, 0));
        return;
      case 2:
        setBarWidth2(Math.max(barWidth2 + value, 0));
        return;
      case 3:
        setBarWidth3(Math.max(barWidth3 + value, 0));
        return;
      default:
        return;
    }
  };

  return (
    <div className='App'>
      <div className='App-Container'>
        <h1>Progress Bars Demo</h1>
        {loading ? (
          <img src='/loading.gif' alt='loading...' />
        ) : (
          <>
            <div className='Progress-Container'>
              <ProgressValue>{barWidth1}%</ProgressValue>
              <Bar width={barWidth1} />
            </div>
            <div className='Progress-Container'>
              <ProgressValue>{barWidth2}%</ProgressValue>
              <Bar width={barWidth2} />
            </div>
            <div className='Progress-Container'>
              <ProgressValue>{barWidth3}%</ProgressValue>
              <Bar width={barWidth3} />
            </div>
          </>
        )}
        <div className='Control-Row'>
          <Select data-testid='select' value={bar} onChange={handleChangeType}>
            <option data-testid='select-option' value={1}>
              Progress Bar #1
            </option>
            <option data-testid='select-option' value={2}>
              Progress Bar #2
            </option>
            <option data-testid='select-option' value={3}>
              Progress Bar #3
            </option>
          </Select>
          <Button data-testid='btn' onClick={(e) => handleWidth(e, 10)}>
            +10
          </Button>
          <Button onClick={(e) => handleWidth(e, -10)}>-10</Button>
          <Button onClick={(e) => handleWidth(e, 25)}>+25</Button>
          <Button onClick={(e) => handleWidth(e, -25)}>-25</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
