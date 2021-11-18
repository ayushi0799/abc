
import Main from "./Main";
import {isTSAnyKeyword} from '@babel/types'
import { render, screen } from '@testing-library/react';
import * as React from "react";
import * as ReactDOM from "react-dom";

it("renders without crashing",()=>{
    const div=document.createElement("div");
    ReactDOM.render(<Main></Main>,div)
})