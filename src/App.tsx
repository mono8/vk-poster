import React from "react";
import { Token } from "./components/Token";
import Container from "@material-ui/core/Container";
import { Groups } from "./components/Groups";
import { SendingForm } from "./components/SendingForm";
import { Account } from "./components/Account";

const App: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <Account />
      <Groups />
      <SendingForm />
    </Container>
  );
};

export default App;
