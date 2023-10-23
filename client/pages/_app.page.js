// EXTERNAL DEPS  =============================================================
import React, { useState } from "react";
import "../styles/setuFonts.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

// INTERFACE  =================================================================
import { ThemeProvider, ContentWrapper } from "fictoan-react";

// LAYOUTS  ===================================================================
import { CrucibleLightTheme } from "../styles/Crucible.light.theme";
import { CrucibleDarkTheme } from "../styles/Crucible.dark.theme";
import { GlobalStyle } from "../styles/Global.styled";

// COMPONENTS ===============================================================
// import { SiteHeader } from "@components/SiteHeader/SiteHeader";
// import { Sidebar } from "@components/Sidebar/Sidebar";
// import { Footer } from "@components/Footer/Footer";
// import Head from "next/head";
// import "../styles/SetuFonts.css";

// HOOKS  =====================================================================

// CONTEXTS  ==================================================================

// ASSETS  ====================================================================

// DATA  ======================================================================

// TYPES  =====================================================================

function MyApp({ Component, pageProps }) {
	let [currentTheme, setCurrentTheme] = useState("light");

	const toggleTheme = () => {
		if (currentTheme === "light") {
			setDocsTheme("dark");
		} else {
			setDocsTheme("light");
		}
	};

	const setDocsTheme = (theme) => {
		setCurrentTheme(theme);
		localStorage.setItem("theme", theme);
	};

	const getLayout = Component.getLayout || ((page) => page);

	const modifiedPageProps = { ...pageProps, toggleTheme };

	return (
		<ThemeProvider theme={currentTheme === "light" ? CrucibleLightTheme : CrucibleDarkTheme}>
			<GlobalStyle />
			{/* <SiteHeader /> */}

			<Component {...modifiedPageProps}></Component>
			{/* <Footer /> */}
			<ToastContainer theme="light" position="top-right" autoClose={800} draggable />
		</ThemeProvider>
	);
}

export default MyApp;
