import { useChallenge } from 'RemoteApp2/useChallenge';

import styles from '../app.styles.css';

function ChallengeLevel() {
  const { challengeLevel, setChallengeLevel } = useChallenge();

  const onLevelUp = () => {
    setChallengeLevel(challengeLevel + 1);
  };

  const onLevelDown = () => {
    if (challengeLevel > 1) {
      setChallengeLevel(challengeLevel - 1);
    }
  };

  return (
    <section>
      <style>{styles}</style>

      <h3>Sharing state from App2 (React)</h3>

      <span>
        <strong>Set challenge level:</strong>
        <button type="button" onClick={onLevelDown}>
          Down
        </button>
        <button type="button" onClick={onLevelUp}>
          Up
        </button>
      </span>

      <p>
        Current level:
        {challengeLevel}
      </p>
    </section>
  );
}

export default ChallengeLevel;
