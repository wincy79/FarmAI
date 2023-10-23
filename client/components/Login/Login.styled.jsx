import styled from "styled-components";
import { motion } from "framer-motion";
import HeroBG from "../../assets/images/heroBG.webp";

export const LoginStyled = styled(motion.article)`
	display: grid;
	height: 100vh;
	padding-bottom: 0;
	grid-template-columns: 60% 40%;
	/* grid-template-areas: "content form"; */
	@media screen and (max-width: 1000px) {
		grid-template-columns: unset;
		grid-template-rows: 30% 70%;
	}
	#left-side-content {
		display: flex;
		flex-direction: column;
		-webkit-box-pack: justify;
		justify-content: space-between;
		padding: 0px 8vw 0px;
		z-index: 1000;
		background: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${HeroBG.src}) 0px 0px no-repeat;
	}
	#right-side-content {
		padding-top: 10rem;
		@media screen and (max-width: 600px) {
			padding-top: 10rem;
		}
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.img-container-text {
		display: flex;
		flex-direction: column;
		justify-content: center;

		@media screen and (min-width: 1000px) {
			margin-bottom: 5rem;
		}
	}
	.primary-heading {
		font-size: 4rem;
		color: white;
		@media only screen and (max-width: 1000px) {
			font-size: 3rem !important;
			margin-bottom: 1rem !important;
		}
		@media only screen and (max-width: 600px) {
			font-size: 2rem !important;
			/* margin-bottom: 1rem !important; */
		}
	}

	.search-field {
		/* border: none; */
		/* padding: 16px; */
		/* margin: 1rem 0;/ */
		background-color: ${(props) => props.theme.card.bg};
	}
	.row-heading {
		display: grid;
		grid-template-columns: repeat(24, 1fr);
	}

	.grid-page {
		align-items: center;
		justify-content: center;
		display: flex;
		flex-direction: column;
	}

	.button-group {
		display: flex;
		flex-direction: column;
		button {
			max-width: max-content;
		}
	}

	.wallet {
		position: fixed;
		width: 100%;
		height: fit-content;
		z-index: 10000000000000;
		top: 0;
		left: 0;
	}
`;
