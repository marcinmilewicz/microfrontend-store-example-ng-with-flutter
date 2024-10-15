const init = () => {
  const sendEvent = (eventName, payload) => {
    const event = new CustomEvent(eventName, { detail: JSON.parse(payload) });

    window.dispatchEvent(event);
  };

  window._sendEvent = sendEvent;
};
window.onload = () => {
  init();
};
