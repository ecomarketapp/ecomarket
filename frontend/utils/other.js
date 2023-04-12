export function formatLocation(name, state) {
  let reqlocation;
  if (!name || !state) {
    return (reqlocation = 'Not available');
  }
  return (reqlocation = name + ', ' + state);
}

export function getTotal(quantity, amount) {
  let total;
  if (!quantity || !amount) return;

  total = quantity * amount;
  return total;
}

export function currencyFormat(number) {
  return new Intl.NumberFormat().format(number || 0) + ' TRX';
}
