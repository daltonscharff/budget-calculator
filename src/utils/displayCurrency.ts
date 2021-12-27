/**
 * Takes a number and converts it into a USD currency string.
 * E.g., 100000 -> $1,000.00
 * @param price integer representing USD where the last two digits are cents
 * @returns currency string
 */
export default function displayCurrency(price: number): string {
  price /= 100;
  return (
    "$" +
    new Intl.NumberFormat("en-US", {
      style: "decimal",
    }).format(price)
  );
}
