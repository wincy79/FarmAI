import { allIndiaStates } from "@/data/data";
import { getStatesList, getCities } from "@/utils";
import {
    Portion,
    Row,
    Element,
    Heading,
    FormWrapper,
    InputField,
    FormItemGroup,
    Select,
    Button,
    Text,
} from "fictoan-react";
import React, { ReactElement, useMemo, useState } from "react";
import axios from "axios";
import { WEATHER_API_URL } from "../config/config";
import { SomeStyled } from "../styles/some.styled";
import { useAuthStore } from "@/store/store";
import { getFirestore, doc } from "firebase/firestore";
import {
    collection,
    query,
    where,
    getDocs,
    updateDoc,
} from "firebase/firestore";
import { app } from "../db/firebase";
const db = getFirestore(app);
import { useRouter } from "next/router";
function Some() {
    const router = useRouter();
    const totalStatesList = getStatesList(allIndiaStates);
    const [selectedCities, setSelectedCites] = useState([]);
    const [userSoilData, setUserSoilData] = useState({});
    const { userPhone } = useAuthStore();
    const [predictedResult, setPredictedResult] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    function toCelsius(fahrenheit) {
        return ((fahrenheit - 32) * 5) / 9;
    }
    const getPredictions = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            const { data } = await axios.post(
                "http://localhost:4000/predictions",
                {
                    ...userSoilData,
                    number: userPhone,
                }
            );
            console.log(data, "data");
            setPredictedResult(data);
            setIsLoading(false);
        } catch (error) {
            setPredictedResult(null);
            setIsLoading(false);
            console.log(error);
        }
    };

    async function saveToFireStore() {
        const userContact = userPhone.includes("+91")
            ? userPhone
            : `+91${userPhone}`;
        const q = query(
            collection(db, "users"),
            where("number", "==", userContact)
        );
        const querySnapshot = await getDocs(q);
        let docField;
        let docPredictions;
        querySnapshot.forEach((doc) => {
            docField = doc.id;
            docPredictions = doc.data().predictions;
        });
        const docRef = doc(db, "users", docField);
        console.log(userSoilData, predictedResult, "asd");
        updateDoc(docRef, {
            predictions: [
                ...docPredictions,
                { ...userSoilData, ...predictedResult },
            ],
        })
            .then((response) => {
                router.push("/dashboard");
            })
            .catch((error) => {
                console.log(error.message);
            });
    }

    return (
        <SomeStyled>
            <Row sidePadding="huge" marginTop="small" isFullWidth>
                <Portion>
                    <Heading as="h2" className="justify-center">
                        Get Crop Prediction analysis based on your soil
                    </Heading>

                    <Portion marginTop="small">
                        <FormWrapper onSubmit={(e) => getPredictions(e)}>
                            <FormItemGroup isFullWidth>
                                <InputField
                                    name="search"
                                    marginTop="nano"
                                    placeholder="Nitrogen"
                                    autoComplete="on"
                                    type="number"
                                    label="Nitrogen"
                                    marginBottom="none"
                                    autoFocus
                                    required
                                    onChange={(e) =>
                                        setUserSoilData((prev) => ({
                                            ...prev,
                                            N:
                                                parseInt(e.target.value) ||
                                                e.target.value,
                                        }))
                                    }
                                />

                                <InputField
                                    name="search"
                                    marginTop="nano"
                                    placeholder="Pottasium"
                                    autoComplete="on"
                                    label="Pottasium"
                                    type="number"
                                    marginBottom="none"
                                    autoFocus
                                    onChange={(e) =>
                                        setUserSoilData((prev) => ({
                                            ...prev,
                                            K:
                                                parseInt(e.target.value) ||
                                                e.target.value,
                                        }))
                                    }
                                    required
                                />
                            </FormItemGroup>

                            <FormItemGroup isFullWidth>
                                <InputField
                                    name="search"
                                    marginTop="nano"
                                    label="Phosphorus"
                                    placeholder="Phosphorus"
                                    autoComplete="on"
                                    type="number"
                                    marginBottom="none"
                                    autoFocus
                                    onChange={(e) =>
                                        setUserSoilData((prev) => ({
                                            ...prev,
                                            P:
                                                parseInt(e.target.value) ||
                                                e.target.value,
                                        }))
                                    }
                                    required
                                />

                                <InputField
                                    name="search"
                                    marginTop="nano"
                                    label="Rainfall"
                                    placeholder="Rainfall (mm)"
                                    autoComplete="on"
                                    type="float"
                                    onChange={(e) =>
                                        setUserSoilData((prev) => ({
                                            ...prev,
                                            rainfall:
                                                parseInt(e.target.value) ||
                                                e.target.value,
                                        }))
                                    }
                                    marginBottom="none"
                                    autoFocus
                                    required
                                />
                            </FormItemGroup>

                            <FormItemGroup isFullWidth>
                                <InputField
                                    name="search"
                                    marginTop="nano"
                                    label="Temperature"
                                    placeholder="Temperature"
                                    autoComplete="on"
                                    type="number"
                                    marginBottom="none"
                                    autoFocus
                                    value={userSoilData?.temperature || ""}
                                    disabled
                                    required
                                />
                                <InputField
                                    name="search"
                                    marginTop="nano"
                                    label="PH"
                                    placeholder="PH value"
                                    autoComplete="on"
                                    type="float"
                                    onChange={(e) =>
                                        setUserSoilData((prev) => ({
                                            ...prev,
                                            ph:
                                                parseInt(e.target.value) ||
                                                e.target.value,
                                        }))
                                    }
                                    marginBottom="none"
                                    autoFocus
                                    required
                                />
                            </FormItemGroup>

                            <FormItemGroup isFullWidth>
                                <Select
                                    className="select-field"
                                    onChange={(e) => {
                                        const cities = getCities(
                                            e.target.value,
                                            allIndiaStates
                                        );
                                        setSelectedCites(cities);
                                    }}
                                    options={[
                                        {
                                            name: "Select State",
                                            value: "select-an-option",
                                            disabled: true,
                                            selected: true,
                                        },
                                        ...totalStatesList,
                                    ]}
                                />

                                <Select
                                    className="select-field"
                                    options={[
                                        {
                                            name: "Select State",
                                            value: "select-an-option",
                                            disabled: true,
                                            selected: true,
                                        },
                                        ...selectedCities,
                                    ]}
                                    onChange={async (e) => {
                                        const city = e.target.value;
                                        try {
                                            const { data } = await axios.get(
                                                `${WEATHER_API_URL}${city}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
                                            );
                                            setUserSoilData((prev) => ({
                                                ...prev,
                                                temperature: toCelsius(
                                                    data?.main.temp
                                                ),
                                                humidity: data?.main.humidity,
                                            }));
                                        } catch (error) {
                                            console.log(error, "eroror");
                                        }
                                    }}
                                />
                            </FormItemGroup>

                            <Button kind="primary" isLoading={isLoading}>
                                Get Recommendation
                            </Button>
                        </FormWrapper>
                    </Portion>

                    {predictedResult ? (
                        <Element as="div" marginTop="micro">
                            <Element
                                as="div"
                                verticallyCenterItems
                                marginBottom="micro"
                            >
                                <Text size="large" marginRight="nano">
                                    The predicted crop based on your soil is :
                                </Text>
                                <Text size="large" text-color="green">
                                    {predictedResult?.prediction}
                                </Text>
                            </Element>

                            <Text size="large" marginBottom="nano">
                                Fertilizers:
                            </Text>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: predictedResult?.fertilizer,
                                }}
                            ></div>
                            <Button
                                kind="primary"
                                marginTop="nano"
                                isLoading={isLoading}
                                onClick={saveToFireStore}
                            >
                                Save your Data
                            </Button>
                        </Element>
                    ) : null}
                </Portion>
            </Row>
        </SomeStyled>
    );
}

export default Some;
