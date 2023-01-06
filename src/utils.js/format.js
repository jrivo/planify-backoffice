const getFormattedDate = (date, format) => {
  const d = new Date(date);
  if (format === "short") {
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }

  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getFormattedTime = (date) => {
  const d = new Date(date);
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });
};

const formatPhone = (phone) => {
  if (phone.length === 10) {
    return phone.replace(
      /(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
      "$1 $2 $3 $4 $5"
    );
  } else if (phone.length === 11) {
    return phone.replace(
      /(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
      "+$1 $2 $3 $4 $5"
    );
  } else if (phone.length === 12) {
    return phone.replace(
      // + is already included
      /(\d{2})(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/,
      "$1 $2 $3 $4 $5 $6"
    );
  }
};

const capitalize = (str) => {
  if (typeof str === "string")
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  return "";
};

// when the text is too long, it will be cut off and add "..." at the end
const shortenText = (text, length) => {
  if (text.length > length) {
    return text.substring(0, length) + "...";
  }
  return text;
};

export {
  getFormattedDate,
  getFormattedTime,
  formatPhone,
  shortenText,
  capitalize,
};
