import useCounterStore from './store/counter';

import './app.styles.css';

function App() {
  const [count] = useCounterStore();

  const handleSendEvent = () => {
    const showAlertEvent = new CustomEvent('showAlert', {
      detail: {
        message: 'My custom alert from app2',
      },
    });

    window.document.dispatchEvent(showAlertEvent);
  };

  const handleChangeBackground = () => {
    document.documentElement.style.setProperty('--container-bg', 'pink');
  };

  return (
    <div className="container">
      <h2>App2</h2>
      <button onClick={handleSendEvent} type="button">
        Send event
      </button>

      <button onClick={handleChangeBackground} type="button">
        Change background
      </button>

      {count}
    </div>
  );
}

export default App;
