import './main.styles.css';

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="container">
    <h2>App 1</h2>
    <button id="send-message">Send message</button>
  </div>
`;

const sender = document.querySelector<HTMLButtonElement>('#send-message');

sender?.addEventListener('click', () => {
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

window.addEventListener('message', (event: MessageEvent<{ message: string }>) => {
  if(!event.origin.includes('localhost')) return;
  console.log('foi chamado de app1');
  console.log(event.data.message);
});