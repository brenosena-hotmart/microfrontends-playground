import './app.styles.css';

function App() {
  const handleSendEvent = () => {
    const showAlertEvent = new CustomEvent('showAlert', {
      detail: {
        message: 'My custom alert from app2',
      },
    });

    window.document.dispatchEvent(showAlertEvent);
  };

  return (
    <div className="container">
      <h2>App2</h2>
      <button onClick={handleSendEvent} type="button">
        Send event
      </button>
    </div>
  );
}

export default App;
