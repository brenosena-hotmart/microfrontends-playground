import { useEffect, useState } from 'react';

import { PubSub } from 'utils';
import styles from './app.styles.css';

function App() {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);

  const handleSendEvent = () => {
    const showAlertEvent = new CustomEvent('showAlert', {
      detail: {
        message: 'My custom alert from app2',
      },
    });

    window.document.dispatchEvent(showAlertEvent);
  };

  const handleToggleBackground = () => {
    setIsActive((prev) => !prev);
  };

  useEffect(() => {
    PubSub.subscribe('counter', (count: number) => {
      setCounter(count);
    });
  }, []);

  const increment = () => {
    PubSub.publish('counter', counter + 1);
  };

  return (
    <>
      <style>{styles}</style>

      <div className={`container ${isActive ? 'active' : ''}`}>
        <h2>App2</h2>

        <button onClick={handleSendEvent} type="button">
          Send event
        </button>

        <button onClick={handleToggleBackground} type="button">
          Change background
        </button>

        <button type="button" onClick={increment}>
          Increment Counter
        </button>

        <strong>{counter}</strong>
      </div>
    </>
  );
}

export default App;
