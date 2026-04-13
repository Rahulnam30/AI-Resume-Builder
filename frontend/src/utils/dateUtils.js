export const formatMonthYear = (value, options = {}) => {
  if (!value) return "";
  if (value.toLowerCase() === "present") return "Present";

  const { short = false } = options;
  const parts = value.split("-");

  if (parts.length !== 2) return value;

  let year, monthNum;

  // Detect format: MM-YYYY or YYYY-MM
  if (parts[0].length === 4) {
    // YYYY-MM
    year = parts[0];
    monthNum = parseInt(parts[1], 10);
  } else if (parts[1] && parts[1].length === 4) {
    // MM-YYYY
    monthNum = parseInt(parts[0], 10);
    year = parts[1];
  } else {
    return value;
  }

  if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) return value;

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const shortMonths = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const monthName = short ? shortMonths[monthNum - 1] : months[monthNum - 1];
  return `${monthName} ${year}`;
};
