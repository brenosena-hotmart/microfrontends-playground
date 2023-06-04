import { useEffect, useState } from 'react';
import styles from '../app.styles.css';

function ChallengeMessage() {
  const [challengeMessage, setChallengeMessage] = useState('');

  const handleChallengeStatus = (event: Event) => {
    setChallengeMessage((event as CustomEvent).detail);
  };

  useEffect(() => {
    window.document.addEventListener('challenge-status', handleChallengeStatus);

    return () => {
      window.document.removeEventListener('challenge-status', handleChallengeStatus);
    };
  }, []);

  return (
    <section>
      <style>{styles}</style>

      <h3>Sharing state from App1 (iframe)</h3>

      <strong>{`App1 said: ${challengeMessage}`}</strong>
    </section>
  );
}

export default ChallengeMessage;
