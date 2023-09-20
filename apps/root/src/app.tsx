import { useRef, useEffect, useCallback, lazy, Suspense, useState } from 'react';

import root from 'react-shadow';

import { PubSub } from 'utils';

import { ChallengeProvider } from 'RemoteApp2/useChallenge';

import styles from './app.styles.css';
import ChallengeLevel from './components/ChallengeLevel';

const RemoteApp2 = lazy(() => import('RemoteApp2/App'));

const { log: Logger } = console;

function App() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);

  const handlePostMessage = () => {
    iframeRef?.current?.contentWindow?.postMessage(
      {
        message: 'Send message from root app',
      },
      '*',
    );
  };

  const receivePostMessage = useCallback((event: MessageEvent<{ message: string }>) => {
    if (!event.origin.includes('localhost')) return;
    Logger(event.data.message);
  }, []);

  const showAlert = useCallback(
    ((event: CustomEvent<{ message: string }>) => {
      alert(event.detail.message);
    }) as EventListener,
    [],
  );

  const handleToggleBackground = () => {
    setIsActive((prev) => !prev);
  };

  useEffect(() => {
    window.addEventListener('message', receivePostMessage);
    window.document.addEventListener('showAlert', showAlert);

    return () => {
      window.removeEventListener('message', receivePostMessage);
      window.document.removeEventListener('showAlert', showAlert);
    };
  }, []);

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
      <root.div id="root">
        <style>{styles}</style>

        <div className={`container ${isActive ? 'active' : ''}`}>
          <h1>Root App</h1>

          <button type="button" onClick={handlePostMessage}>
            Send message
          </button>

          <button type="button" onClick={handleToggleBackground}>
            Change background
          </button>

          <button type="button" onClick={increment}>
            Increment Counter
          </button>

          <strong>{counter}</strong>

          <ChallengeProvider>
            <ChallengeLevel />
          </ChallengeProvider>
        </div>
      </root.div>

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
        <root.div id="remote" mode="closed">
          <RemoteApp2 />
        </root.div>
      </Suspense>
    </>
  );
}

export default App;
