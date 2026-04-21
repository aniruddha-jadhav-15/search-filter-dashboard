// Delay function execution until user stops typing
export function debounce(fn, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer); // Cancel previous call

    timer = setTimeout(() => {
      fn(...args); // Execute after delay
    }, delay);
  };
}
