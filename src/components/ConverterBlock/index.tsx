import { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
import {
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import useStyles from "../../styles";
import CurrenciesStore from "../../store/currenciesStore";

interface IConverterBlockProps {
  currenciesStore?: CurrenciesStore;
}
interface IValue {
  value: number;
  coin: any;
}

const ConverterBlock: React.FC<IConverterBlockProps> = inject(
  "currenciesStore"
)(
  observer(({ currenciesStore }: IConverterBlockProps): React.ReactElement => {
    const coins: string[] = currenciesStore!.getItems.map((coin) => coin.name);
    const [selectedInputCoin, setSelectedInputCoin] = useState<IValue>({
      value: 0,
      coin: coins[0] || "BTC",
    });
    const [selectedOutCoin, setSelectedOutCoin] = useState<IValue>({
      value: 0,
      coin: "USD",
    });

    const classes = useStyles();
    useEffect(() => {
      const coin1 = currenciesStore!.findItem(selectedInputCoin.coin);
      if (coin1) {
        if (selectedOutCoin.coin === "USD") {
          setSelectedOutCoin((prev) => {
            return {
              ...prev,
              value: Number(selectedInputCoin.value) * coin1.price,
            };
          });
        } else {
          const coin2 = currenciesStore!.findItem(selectedOutCoin.coin);
          setSelectedOutCoin((prev) => {
            return {
              ...prev,
              value:
                (Number(selectedInputCoin.value) * coin1.price) / coin2!.price,
            };
          });
        }
      }
    }, [selectedInputCoin, currenciesStore, selectedOutCoin.coin]);
    return (
      <Paper className={classes.paper}>
        <div className={classes.cryptoInputBox}>
          <FormControl className={classes.currencyInput}>
            <TextField
              type="number"
              value={
                selectedInputCoin.value === 0 ? "" : selectedInputCoin.value
              }
              onChange={(e) =>
                setSelectedInputCoin((prev: IValue) => {
                  return {
                    ...prev,
                    value: Number(e.target.value),
                  };
                })
              }
              label="Сумма"
            />
          </FormControl>

          <FormControl className={classes.currencyType}>
            <InputLabel>Валюта</InputLabel>
            <Select
              onChange={(e) =>
                setSelectedInputCoin((prev) => {
                  return {
                    ...prev,
                    coin: e.target.value,
                  };
                })
              }
              value={selectedInputCoin.coin || coins[0]}
            >
              {coins?.map((name) => {
                return <MenuItem value={name}>{name}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </div>

        <div className={classes.cryptoInputBox}>
          <FormControl className={classes.currencyInput}>
            <TextField disabled value={selectedOutCoin.value} label="Сумма" />
          </FormControl>
          <FormControl className={classes.currencyType}>
            <InputLabel>Валюта</InputLabel>
            <Select
              onChange={(e) =>
                setSelectedOutCoin((prev) => {
                  return {
                    ...prev,
                    coin: e.target.value,
                  };
                })
              }
              value={selectedOutCoin.coin}
            >
              <MenuItem value="USD">USD</MenuItem>
              {coins.map((name) => (
                <MenuItem value={name}>{name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </Paper>
    );
  })
);

export default ConverterBlock;
