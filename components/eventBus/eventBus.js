export const events = {
  highlightHuman: 'highlight-human',
  highlightAi: 'highlight-ai',
}

/**
 * Dispatches an event with the given type and data
 * @param {string} type
 * @param {any} data
 */
export const dispatchEvent = (type, data) => {
  window.dispatchEvent(
    new CustomEvent(type, {
      detail: data,
    }),
  )
}

/**
 * Subscribes to an event and calls the callback function when the event is triggered
 * @param {string} eventType
 * @param {function} callback
 * @returns {void}
 */
export const subscribeToEvent = (eventType, callback) => {
  window.addEventListener(eventType, callback)
}
