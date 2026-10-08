export type Line = { amount: number };

function currencyDigits(currency: string): number {
  return new Intl.NumberFormat('en', { style: 'currency', currency }).resolvedOptions()
    .maximumFractionDigits as number;
}

// Exponent-notation shift avoids binary drift such as 1.005 * 100 = 100.49999...
function toMinorUnits(amount: number, digits: number): number {
  return Math.round(Number(`${amount}e${digits}`));
}

export function formatTotal(lines: Line[], currency: string): string {
  const digits = currencyDigits(currency);
  const minor = lines.reduce((total, line) => total + toMinorUnits(line.amount, digits), 0);
  return (minor / 10 ** digits).toFixed(digits);
}
