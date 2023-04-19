import { useRef, useEffect, useCallback, lazy, Suspense } from 'react';

import useCounterStore from 'RemoteApp2/CounterStore';
import ShadowDom from './shadowDom';

import styles from './app.styles.css?inline';

const RemoteApp2 = lazy(() => import('RemoteApp2/App'));

const { log: Logger } = console;

function App() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [, setCount] = useCounterStore();

  const handlePostMessage = () => {
    iframeRef?.current?.contentWindow?.postMessage(
      {
        message: 'Send message from root app',
      },
      '*',
    );
  };

  const sendPostMessage = useCallback((event: MessageEvent<{ message: string }>) => {
    if (!event.origin.includes('localhost')) return;
    Logger(event.data.message);
  }, []);

  const showAlert = useCallback(
    ((event: CustomEvent<{ message: string }>) => {
      alert(event.detail.message);
    }) as EventListener,
    [],
  );

  const handleChangeBackground = () => {
    document.documentElement.style.setProperty('--container-bg', 'gray');
  };

  useEffect(() => {
    window.addEventListener('message', sendPostMessage);
    window.document.addEventListener('showAlert', showAlert);

    return () => {
      window.removeEventListener('message', sendPostMessage);
      window.document.removeEventListener('showAlert', showAlert);
    };
  }, []);

  return (
    <>
      <ShadowDom>
        <style>{styles}</style>
        <div className="container">
          <h1>Root App</h1>

          <button type="button" onClick={handlePostMessage}>
            Send message
          </button>

          <button type="button" onClick={handleChangeBackground}>
            Change background
          </button>

          <button onClick={() => setCount((prev: number) => prev + 1)} type="button">
            increase
          </button>
        </div>
      </ShadowDom>

      <iframe
        ref={iframeRef}
        src="http://localhost:3001"
        title="Remote App 1"
        style={{
          width: '100%',
          border: 0,
          maxHeight: 90,
        }}
      />

      <Suspense fallback="Loading...">
        <RemoteApp2 />
      </Suspense>
    </>
  );
}

export default App;
