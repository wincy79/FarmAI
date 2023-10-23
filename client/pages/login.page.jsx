import { Portion, Row, Element } from "fictoan-react";
import React from "react";
import Login from "@/components/Login/Login";
import { WEATHER_API_URL } from "../config/config";
import { SomeStyled } from "../styles/some.styled";

function Some() {
	return (
		<SomeStyled>
            <Login />
		</SomeStyled>
	);
}

export default Some;
