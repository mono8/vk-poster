import React, { useState, useEffect } from "react";
import "./App.module.sass";
import { Token } from "./components/Token";
import Container from "@material-ui/core/Container";
import { Groups } from "./components/Groups";
import { VERSION } from "./consts";
import jsonp from "jsonp";

const App: React.FC = () => {
  const [groups, setGroups] = useState<Array<{ [key: string]: any }>>([]);
  const [token, changeToken] = useState<string | null>(null);

  const getToken = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const url = new URL(e.target.value.replace("#", "?"));
      changeToken(url.searchParams.get("access_token"));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    !!token &&
      jsonp(
        `https://api.vk.com/method/groups.get?fields=can_post&count&extended=1&access_token=${token}&v=${VERSION}`,
        undefined,
        (err, data) => {
          if (err) {
            console.log(err);
          } else {
            setGroups(data.response.items);
          }
        },
      );
  }, [token]);

  return (
    <Container maxWidth="md">
      <Token getToken={getToken} />
      <Groups groups={groups} />
    </Container>
  );
};

export default App;
