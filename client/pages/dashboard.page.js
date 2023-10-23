import { Row, Portion, Element, Button, Text, Table, Heading } from "fictoan-react";
import React, { useState, useEffect } from "react";
import { app } from "../db/firebase";
import Link from "next/link";
import { useAuthStore } from "@/store/store";
import { getFirestore, doc } from "firebase/firestore";
import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";

const db = getFirestore(app);

const abs = {
	name: "shekhar",
	predictions: [
		{
			prediction: "watermelon",
			temperature: 17.07222222222222,
			humidity: 85,
			N: 778,
			fertilizer:
				"The K value of your soil is high</b>.\n        <br/> Please consider the following suggestions:\n\n        <br/><br/>1. <i>Loosen the soil</i> deeply with a shovel, and water thoroughly to dissolve water-soluble potassium. Allow the soil to fully dry, and repeat digging and watering the soil two or three more times.\n\n        <br/>2. <i>Sift through the soil</i>, and remove as many rocks as possible, using a soil sifter. Minerals occurring in rocks such as mica and feldspar slowly release potassium into the soil slowly through weathering.\n\n        <br/>3. Stop applying potassium-rich commercial fertilizer. Apply only commercial fertilizer that has a '0' in the final number field. Commercial fertilizers use a three number system for measuring levels of nitrogen, phosphorous and potassium. The last number stands for potassium. Another option is to stop using commercial fertilizers all together and to begin using only organic matter to enrich the soil.\n\n        <br/>4. Mix crushed eggshells, crushed seashells, wood ash or soft rock phosphate to the soil to add calcium. Mix in up to 10 percent of organic compost to help amend and balance the soil.\n\n        <br/>5. Use NPK fertilizers with low K levels and organic fertilizers since they have low NPK values.\n\n        <br/>6. Grow a cover crop of legumes that will fix nitrogen in the soil. This practice will meet the soil’s needs for nitrogen without increasing phosphorus or potassium.\n        ",
			K: 787,
			ph: 8,
			rainfall: 77,
			P: 7,
		},
	],
	fertilizers: [],
	number: "+919004392920",
	_id: "8825d1d5-0544-4b01-84b5-b9ddcb7a5754",
};
const NewPage = () => {
	const [preds, setPreds] = useState(null);
	const { userPhone } = useAuthStore();
	useEffect(() => {
		(async () => {
			const userContact = userPhone.includes("+91") ? userPhone : `+91${userPhone}`;
			const q = query(collection(db, "users"), where("number", "==", userContact));
			const querySnapshot = await getDocs(q);
			let docField;
			let docPredictions;
			querySnapshot.forEach((doc) => {
				docField = doc.id;
				setPreds(doc.data());
			});
		})();
	}, []);
	console.log(preds, "asdf");
	return (
		<div>
			<Row sidePadding="medium" gutters="large" marginTop="small">
				<Portion>
					<Element as="div">
						{preds ? (
							<Element as="div">
								<Heading as="h2" marginBottom="micro">
									Total number of predicted soil: {preds?.predictions.length}
								</Heading>

								<Heading as="h2" marginBottom="micro">
									Predicted crop details :
								</Heading>

								<Table bordersFor="both" padding="tiny" isStriped isHoverable alignText="centre">
									<thead>
										<tr>
											<th>K(Pottassium)</th>
											<th>N(Nitrogen)</th>
											<th>P(Phosphorous)</th>
											<th>Humidity</th>
											<th>Rainfall</th>
											<th>Predicted crop</th>
										</tr>
									</thead>
									<tbody className="tableBody">
										{preds?.predictions.map((item) => {
											return (
												<tr className="gridTable">
													<td>{item.K}</td>
													<td>{item.N}</td>
													<td>{item.P}</td>
													<td>{item.humidity}</td>
													<td>{item.rainfall}</td>
													<td>{item.prediction}</td>
												</tr>
											);
										})}
									</tbody>
								</Table>
							</Element>
						) : (
							<Element as="div"  marginBottom="small">
                                    <Heading as="h3">
                                        No crops predicted yet.
                                </Heading>
							</Element>
						)}
					</Element>
					<Element as="div">
						<Link href="/prediction">Predict crop for new soil?</Link>
					</Element>
				</Portion>
			</Row>
		</div>
	);
};

export default NewPage;
