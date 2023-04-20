import { useState } from 'react';
import useCounterStore from './store/counter';

import styles from './app.styles.css';

function App() {
  const [count] = useCounterStore();
  const [isActive, setIsActive] = useState<boolean>(false);

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

        {count}
      </div>
    </>
  );
}

export default App;
