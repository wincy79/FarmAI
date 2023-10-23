// EXTERNAL DEPS  =============================================================
import Head from "next/head";
import Link from "next/link";
import React, { ReactElement, useMemo, useState, useEffect } from "react";
import {
    getAuth,
    signInWithPhoneNumber,
    RecaptchaVerifier,
} from "firebase/auth";
import { app } from "../../db/firebase";
const auth = getAuth(app);
import axios from "axios";
import MobileOTPIcon from "../../assets/icons/MobileOTP.svg";

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
import { SignUpStyled } from "./SignUp.styled";

// UTILS  =====================================================================

// HOOKS  =====================================================================

// CONTEXTS  ==================================================================

// ASSETS  ====================================================================

// DATA  ======================================================================

// TYPES  =====================================================================

import { useToggle } from "@/hooks/useToggle";
import { useForm } from "react-hook-form";
import { shuffleArr } from "@/utils";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store/store";
import { useRouter } from "next/router";
const SignUp = () => {
    const currentYear = new Date().getFullYear();
    const { userPhone, setUserPhone, setUserName, userName } = useAuthStore();
    const [otp, setOtp] = useState("");
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const [signUpError, setSignUpError] = useState("");
    const [error, setError] = useState("");
    const [result, setResult] = useState("");

    const fetchData = () => {};

    // FETCH IMAGES
    useEffect(() => {
        fetchData();
    }, []);

    const onSubmit = async () => {
        setError("");
        if (userPhone === "" || userPhone === undefined)
            return setError("Please enter a valid phone number!");
        try {
            const userContact = userPhone.includes("+91")
                ? userPhone
                : `+91${userPhone}`;
            const response = await setUpRecaptha(userContact);
            setIsOTPModalVisible(true);
            setResult(response);
            setFlag(true);
        } catch (err) {
            setError(err.message);
        }
    };

    const verifyOtp = async (e) => {
        console.log("HELLO");
        e.preventDefault();
        setError("");
        if (otp === "" || otp === null) return;
        try {
            const userContact = userPhone.includes("+91")
                ? userPhone
                : `+91${userPhone}`;
            await result.confirm(otp);
            await axios.post("http://localhost:4000/signup", {
                username: userName,
                number: userContact,
            });
            router.push("/prediction");
        } catch (err) {
            setError(err.message);
        }
    };

    const [isOTPModalVisible, setIsOTPModalVisible] = useState(false);

    const onLoginSubmit = (e) => {
        e.preventDefault();
        onSubmit();
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

    return (
        <SignUpStyled
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 0.32 }}
        >
            <Head>
                <title>Sign in to Setu — Setu</title>
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
                        <Heading
                            as="h1"
                            textColor="white"
                            className="primary-heading"
                        >
                            Taking Authentication to the next level
                        </Heading>
                        {/* <SetuLogo width={130} height={45} /> */}
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
                                Verify & Sign up -&gt;
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
                                SignUp
                            </Heading>

                            <FormWrapper
                                spacing="none"
                                onSubmit={(e) => onLoginSubmit(e)}
                            >
                                <InputField
                                    className="search-field"
                                    name="search"
                                    placeholder="Username"
                                    autoComplete="off"
                                    autoFocus
                                    label="Username"
                                    required
                                    onChange={(e) =>
                                        setUserName(e.target.value)
                                    }
                                    value={userName}
                                    tabIndex={0}
                                />

                                <InputField
                                    className="search-field"
                                    name="search"
                                    placeholder="Phone"
                                    autoComplete="off"
                                    autoFocus
                                    label="Phone"
                                    type="number"
                                    required
                                    onChange={(e) =>
                                        setUserPhone(e.target.value)
                                    }
                                    value={userPhone}
                                />

                                {signUpError && (
                                    <Text
                                        marginBottom="micro"
                                        textColour="red"
                                        data-testid="signUp-error-text"
                                    >
                                        {signUpError}
                                    </Text>
                                )}
                                <div id="recaptcha-container"></div>
                                <Element
                                    as="div"
                                    className="button-group"
                                    marginTop="micro"
                                >
                                    <Button
                                        marginBottom="nano"
                                        kind="primary"
                                        shadow="hard"
                                        marginRight="micro"
                                        data-testid="signUp-button"
                                        isLoading={isLoading}
                                        type="submit"
                                    >
                                        Create Account
                                    </Button>

                                    <Element
                                        as="div"
                                        marginTop="nano"
                                        marginLeft="nano"
                                    >
                                        <Link href="/login">Login -&gt;</Link>
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
        </SignUpStyled>
    );
};

export default SignUp;
