import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import PlantIcon from "../assets/icons/Plant.svg";
import { IndexStyled } from "../styles/Index.styled";

import {
    Button,
    Element,
    FormWrapper,
    Heading,
    HRule,
    Card,
    Portion,
    Row,
    Text,
    InputField,
    PinInputField,
} from "fictoan-react";
import Login from "@/components/Login/Login";

export default function Home() {
    return (
        <IndexStyled>
            <Head>
                <title>Create Next App</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Login />
            </main>
        </IndexStyled>
    );
}