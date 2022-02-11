import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import AppStack from "./appStack";

export default function Navigator() {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}
