import React from "react";
import { Container, Grid } from "@material-ui/core";
import useStyles from "./styles";
import { CryptoTable, ConverterBlock } from "./components";

const App: React.FC = (): React.ReactElement => {
  const classes = useStyles();

  return (
    <Container className={classes.root} maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <CryptoTable classes={classes} />
        </Grid>
        <Grid item xs={4}>
          <ConverterBlock />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
