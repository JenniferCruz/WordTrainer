import React from "react";
import {Provider} from "react-redux";
import Enzyme, {mount} from "enzyme/build/index";
import Adapter from "enzyme-adapter-react-16/build/index";

Enzyme.configure({adapter: new Adapter()});

export default function simulateApp(component, store) {
  return mount(
    <Provider store={store}>
      {component}
    </Provider>
  )
}