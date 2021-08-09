import CurrenciesStore from "./currenciesStore";
import ConverterStore from "./converterStore";
const store = {
  converterStore: new ConverterStore(),
  currenciesStore: new CurrenciesStore(),
};
export default store;
