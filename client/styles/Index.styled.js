import styled from "styled-components";
import { lighten, darken, transparentize } from "polished";
import HeroBG from "../assets/images/heroBG.webp";
import { defaultColours } from "fictoan-react";
import { setuColours } from "./SetuColors";

export const IndexStyled = styled.article`
	html,
	body {
        scroll-behavior: smooth;
	}
	/* #hero { */
    /* height: max(80vh, 780px); */
    /* max-height: 100vh; */
    /* background-image: url(${HeroBG.src}); */
    /* position: relative;
		background-size: cover;
		background-position: center;

		@media screen and (max-width: 800px) {
			background-size: 1400px;
			height: 720px;
			background-position: -360px 0;
		}

		#hero-content {
            height:100vh;
			z-index: 5000;
			position: relative;
		}

		h1 {
			font-size: 96px;
			line-height: 1;

			@media screen and (max-width: 800px) {
				font-size: 64px;
				margin-bottom: 16px;
			}
		}

		#scroll-to-products {
			border-radius: 50%;
			width: 40px;
			border: solid #3a6346;

			height: 40px;
			cursor: pointer;
			background-color: #3a6346;

			&:active {
				transform: scale(0.8);
			}

			&:after {
				position: absolute;
				content: "";
				width: 8px;
				height: 8px;
				transform: rotate(45deg);
				border: solid ${defaultColours.white};
				border-width: 0 4px 4px 0;
				border-radius: 10%;
				padding: 6px;
				top: calc(50% - 8px);
				left: 28%;
			}
		}

		#bg-overlay {
			background-color: hsla(262, 100%, 50%, 0.56);
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 4000;
		}
	} */

	.use-case-card {
		width: fit-content;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 240px;
		width: 275px;
		background-color: ${lighten(0.28, setuColours.thunderCloud)};
		border: none !important;
	}

	.use-case-icon {
		z-index: 1000;
		display: flex;
		background-color: white;
		width: 88px;
		height: 88px;
		padding: 20px;
		border-radius: 50%;
		box-shadow: 0 2px 16px 1px hsla(0, 0%, 40%, 0.16);
		margin-bottom: 8px;

		@media all and (max-width: 600px) {
			position: relative;
			transform: translateX(-100%);
		}

		img {
			position: relative;
			top: 50%;
			transform: translate(0%, -50%);
		}
	}
`;
