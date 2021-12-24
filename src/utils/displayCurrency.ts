export default function displayCurrency(price: number): string {
  price /= 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}
