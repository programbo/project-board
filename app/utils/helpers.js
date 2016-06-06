export const easeInOutQuad = (t, b, c, d) => {
  let z = t;
  z /= d / 2;
  if (z < 1) return c / 2 * z * z + b;
  z --;
  return -(c / 2) * (z * (z - 2) - 1) + b;
};

export const reverseString = (str) => str.split('').reverse().join('');

export const scrollTo = (element, to, duration) => {
  const el = element;
  const start = el.scrollTop;
  const change = to - start;
  const increment = 20;
  let currentTime = 0;
  const self = this;

  function animateScroll() {
    currentTime += increment;
    const val = self.easeInOutQuad(currentTime, start, change, duration);
    el.scrollTop = val;
    if (currentTime < duration) {
      setTimeout(animateScroll, increment);
    }
  }
  animateScroll();
};

// Test if a variable is available on the global space
export const windowHas = (variable) => (
  typeof window === 'object' && (typeof variable === 'undefined' || typeof window[variable] !== 'undefined')
);

// Update the page's metadata
export const updateMetadata = (data, fields = ['description', 'keywords']) => {
  if (typeof document !== 'undefined') {
    data.title && (document.title = data.title);
    fields.forEach((type) => {
      if (data[type] && document.querySelector(`meta[name="${type}"]`)) {
        document.querySelector(`meta[name="${type}"]`).content = data[type];
      }
    });
  }
};

export const simpleSlug = (str, separator = '-') => {
  if (typeof str === 'string') {
    return str.toLowerCase().replace(/[^a-z0-9]/gi, separator);
  }
  return str;
};

export const compareBy = (fields) => (a, b) => {
  let result = 0;
  fields.forEach((field) => {
    if (a[field] > b[field]) {
      result = 1;
    }
    else if (a[field] < b[field]) {
      result = -1;
    }
  });
  return result;
};
