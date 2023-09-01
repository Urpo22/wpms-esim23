const doFetch = async (url, options = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const message = json.error
      ? `${json.error}: ${json.message}`
      : json.message;
    throw new Error(message || response.statusText);
  }
  const json = await response.json();
  return json;
};

const formatDate = (date) => {
  date = new Date(date);
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
};

export { doFetch, formatDate };
