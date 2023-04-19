import './main.styles.css';

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="container">
    <h2>App 1</h2>
    <button id="send-message">Send message</button>
    <button id="change-bg">Change background</button>
  </div>
`;

const senderBtn = document.querySelector<HTMLButtonElement>('#send-message');

senderBtn?.addEventListener('click', () => {
  window.postMessage({ 
    message: 'Send message from remote app1'
  });

  const showAlertEvent = new CustomEvent('showAlert', {
    detail: {
      message: "My custom alert from app1"
    }
  });

  window?.parent.document.dispatchEvent(showAlertEvent);
});

const changeBgBtn = document.querySelector<HTMLButtonElement>('#change-bg');

changeBgBtn?.addEventListener('click', () => {
  document.documentElement.style.setProperty('--container-bg', 'yellow');
})

window.addEventListener('message', (event: MessageEvent<{ message: string }>) => {
  if(!event.origin.includes('localhost')) return;
  console.log('foi chamado de app1');
  console.log(event.data.message);
});