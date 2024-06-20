const { fromEvent, pipe, map, filter, debounceTime, switchMap } = rxjs;
const criptomonedas = ["bitcoin", "ethereum", "ripple"];
const API = "https://api.coingecko.com/api/v3/coins";

const inputCripto = document.querySelector("#txtCripto");

fromEvent(inputCripto, "keyup")
  .pipe(
    map((event) => event.target.value),
    debounceTime(300),
    filter((searchTerm) => criptomonedas.includes(searchTerm)),
    switchMap((cripto) => getCripto(cripto))
  )
  .subscribe((data) => {
    if (data.error) {
      console.error("Error: " + data.error);
    } else {
      console.info(
        `El precio de ${data.name} en dolares es ${data.market_data.current_price.usd}$`
      );
    }
    inputCripto.value = "";
  });

function getCripto(criptomoneda) {
  return fetch(`${API}/${criptomoneda}`).then((response) => response.json());
}
