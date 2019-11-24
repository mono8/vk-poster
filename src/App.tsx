import React, { useState } from "react";
import "./App.module.sass";
import { Token } from "./components/Token";
import Container from "@material-ui/core/Container";
import { Groups } from "./components/Groups";

const App: React.FC = () => {
  const [groups, setGroups] = useState<{ [key: string]: any } | null>(null);
  const [token, changeToken] = useState<string | null>(null);

  const getToken = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = new URL(e.target.value.replace("#", "?"));
    changeToken(url.searchParams.get("access_token"));
  };

  return (
    <Container maxWidth="md">
      <Token getToken={getToken} />
      <Groups groups={groups} />
    </Container>
  );
};

export default App;
