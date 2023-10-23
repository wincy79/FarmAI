// EXTERNAL DEPS  =============================================================
import Head from "next/head";
import { useRouter } from "next/router";

import React, { ReactElement, useMemo, useState, useEffect } from "react";
import { createPortal } from "react-dom";

import {
    getAuth,
    signInWithPhoneNumber,
    RecaptchaVerifier,
} from "firebase/auth";
import { app } from "../../db/firebase";
const auth = getAuth(app);
// INTERNAL DEPS  =============================================================
import {
    Button,
    Element,
    FormWrapper,
    Heading,
    HRule,
    Portion,
    Row,
    Text,
    InputField,
    PinInputField,
} from "fictoan-react";

// LAYOUTS  ================================================================

// COMPONENTS  ================================================================
import { LoginStyled } from "./Login.styled";

// UTILS  =====================================================================

// HOOKS  =====================================================================

// CONTEXTS  ==================================================================

// ASSETS  ====================================================================
import MobileOTPIcon from "../../assets/icons/MobileOTP.svg";
// DATA  ======================================================================

// TYPES  =====================================================================

import { useToggle } from "@/hooks/useToggle";
import { useForm } from "react-hook-form";
import axios from "axios";
import { shuffleArr } from "@/utils";
import { toast } from "react-toastify";
import Link from "next/link";
import { useAuthStore } from "../../store/store";

const Login = () => {
    const { userPhone, setUserPhone } = useAuthStore();
    const router = useRouter();
    const currentYear = new Date().getFullYear();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [result, setResult] = useState("");
    const [loginError, setLoginError] = useState("");
    const [otp, setOtp] = useState();

    const onSubmit = async () => {
        setError("");
        if (userPhone === "" || userPhone === undefined)
            return setError("Please enter a valid phone number!");
        try {
            const userContact = userPhone.includes("+91")
                ? userPhone
                : `+91${userPhone}`;
            const response = await setUpRecaptha(userContact);
            setResult(response);
            setIsOTPModalVisible(true);
            setFlag(true);
        } catch (err) {
            setError(err.message);
        }
    };

    const verifyOtp = async (e) => {
        e.preventDefault();
        setError("");
        if (otp === "" || otp === null) return;
        try {
            const userContact = userPhone.includes("+91")
                ? userPhone
                : `+91${userPhone}`;
            await result.confirm(otp);
            await axios.post("http://localhost:4000/login", {
                number: userContact,
            });
            router.push("/prediction");
        } catch (err) {
            setError(err.message);
        }
    };

    function setUpRecaptha(number) {
        const recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            {},
            auth
        );
        recaptchaVerifier.render();
        const userContact = userPhone.includes("+91")
            ? userPhone
            : `+91${userPhone}`;
        return signInWithPhoneNumber(auth, userContact, recaptchaVerifier);
    }

    const [isOTPModalVisible, setIsOTPModalVisible] = useState(false);

    const onLoginSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };

    const updateUserName = async () => {
        try {
            const userRef = app.collection("users").doc("+919004392920");
            const doc = await cityRef.get();
            console.log(doc, "div");
        } catch (error) {
            console.log(error, "eriir");
        }
    };

    useEffect(() => {
        updateUserName();
    }, []);

    return (
        <LoginStyled
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 0.32 }}
        >
            <Head>
                <title>Sign in to FarmAI - FarmAI</title>
            </Head>
            {/* /////////////////////////////////////////////////////////////////////////////////////////////////// */}
            {/* LHS CONTENT */}
            {/* /////////////////////////////////////////////////////////////////////////////////////////////////// */}

            <Element
                as="section"
                id="left-side-content"
                bgColour="slate-20"
                showOnlyOnDesktop
                showOnlyOnTabletPortrait
                showOnlyOnTabletLandscape
            >
                <Row
                    gutters="medium"
                    isFullHeight
                    isFullWidth
                    className="row-heading"
                >
                    <Portion className="img-container-text">
                        <Element as="div">
                            <Heading
                                as="h1"
                                textColour="white"
                                align="centre"
                                marginBottom="tiny"
                            >
                                FarmAI
                            </Heading>
                            <Heading
                                as="h2"
                                textColour="teal-10"
                                align="centre"
                                marginBottom="micro"
                                paddingRight="small"
                                paddingLeft="small"
                            >
                                <Element as="span" textColour="green">
                                    {" "}
                                    Empowering farmers{" "}
                                </Element>
                                with smart crop recommendations and precision
                                farming techniques.
                            </Heading>
                        </Element>
                    </Portion>
                </Row>
            </Element>

            {/* /////////////////////////////////////////////////////////////////////////////////////////////////// */}
            {/* RHS FORM */}
            {/* /////////////////////////////////////////////////////////////////////////////////////////////////// */}

            {isOTPModalVisible ? (
                <Row sidePadding="micro" paddingTop="small">
                    <Portion>
                        <Element
                            as="div"
                            className="grid-page"
                            marginTop="small"
                        >
                            <Heading as="h2" marginBottom="micro">
                                OTP Verification
                            </Heading>

                            <MobileOTPIcon />
                            <Text marginTop="micro">
                                Enter the OTP sent to :
                            </Text>
                            <InputField
                                className="search-field"
                                name="search"
                                marginTop="nano"
                                placeholder="Phone"
                                autoComplete="on"
                                type="text"
                                marginBottom="tiny"
                                autoFocus
                                required
                                disabled
                                value={userPhone}
                                tabIndex={0}
                            />

                            <Element as="div">
                                <PinInputField
                                    numberOfFields={6}
                                    type="number"
                                    otp
                                    onChange={(e) => setOtp(e)}
                                />
                            </Element>
                            <Button
                                marginTop="micro"
                                kind="primary"
                                onClick={(e) => verifyOtp(e)}
                            >
                                Verify & Sign in -&gt;
                            </Button>
                            <Element as="div" marginTop="nano">
                                <Link href="/somehwere">
                                    Didn't receive OTP? Request Again
                                </Link>
                            </Element>
                        </Element>
                        <Element as="div" marginTop="micro">
                            <a onClick={() => setIsOTPModalVisible(false)}>
                                Edit number?
                            </a>
                        </Element>
                    </Portion>
                </Row>
            ) : (
                <Element as="section" id="right-side-content">
                    <Row sidePadding="micro" marginTop="small">
                        <Portion>
                            <Heading
                                as="h2"
                                marginBottom="tiny"
                                data-testid="heading"
                                style={{ fontWeight: "700" }}
                            >
                                Sign in to your account
                            </Heading>

                            <FormWrapper
                                spacing="none"
                                onSubmit={(e) => onLoginSubmit(e)}
                            >
                                <InputField
                                    className="search-field"
                                    name="search"
                                    placeholder="Phone"
                                    autoComplete="on"
                                    type="text"
                                    autoFocus
                                    required
                                    marginBottom="tiny"
                                    onChange={(e) =>
                                        setUserPhone(e.target.value)
                                    }
                                    value={userPhone}
                                    tabIndex={0}
                                />
                                {loginError && (
                                    <Text
                                        marginBottom="micro"
                                        textColour="red"
                                        data-testid="login-error-text"
                                    >
                                        {loginError}
                                    </Text>
                                )}

                                {/* <Element as="div" verticallyCenterItems className="push-to-ends" marginBottom="nano">
									<Text>{""}</Text>
									<Link href="/somehwere">Forgot your password?</Link>
								</Element>

							 */}

                                <Element
                                    as="div"
                                    marginTop="nano"
                                    className="button-group"
                                >
                                    <div id="recaptcha-container"></div>
                                    <Button
                                        kind="primary"
                                        marginBottom="nano"
                                        type="submit"
                                        shadow="hard"
                                        marginRight="micro"
                                        isLoading={isLoading}
                                        data-testid="login-button"
                                    >
                                        Get OTP -&gt;
                                    </Button>

                                    <Element
                                        as="div"
                                        marginTop="nano"
                                        marginLeft="nano"
                                        verticallyCenterItems
                                    >
                                        <Text marginRight="nano">
                                            Don't have an account?
                                        </Text>
                                        <Link href="/sign-up">Sign up</Link>
                                    </Element>
                                </Element>
                            </FormWrapper>
                        </Portion>
                    </Row>

                    <Row sidePadding="medium">
                        <Portion>
                            <Element as="footer">
                                <HRule
                                    kind="secondary"
                                    marginTop="micro"
                                    marginBottom="micro"
                                />

                                <Text isSubtext>
                                    &copy; {currentYear} FarmAI Technologies
                                </Text>
                            </Element>
                        </Portion>
                    </Row>
                </Element>
            )}
        </LoginStyled>
    );
};

export default Login;
