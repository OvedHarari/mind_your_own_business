import { FunctionComponent, useEffect, useState } from "react";
import { getCardById } from "../services/cardService";
import Card from "../interfaces/Card";
import { Link } from "react-router-dom";

interface BusinessDetailsProps {
    onHide: Function;
    render: Function;
    userInfo: any;
    cardId: number;
}

// google API key
// AIzaSyAiv - KjHLXG1I7W0 - hGFUJNaWjjOmCfaRc

const BusinessDetails: FunctionComponent<BusinessDetailsProps> = ({ onHide, render, userInfo,
    cardId
}) => {
    let [card, setCard] = useState<Card>()
    useEffect(() => {
        if (cardId) {
            getCardById(cardId).then((res) => setCard(res.data))
                .catch((err) => console.log(err))
        }
    }, [cardId]);

    return (<>
        {card && (<>
            <div className="row">
                <div className="col-md-7">
                    {card.description}
                </div>
                <div className="col-md-4 text-end">
                    <img src={card.businessImgURL} width={300} alt={card.businessImgAlt} />
                </div>
            </div>
            <div className="row mt-4">
                <h4 className="text-start">Contact us</h4>

                <div className="col-md-5 mt-2">
                    <p>Phone: <Link to="">{card.phone}</Link> </p>
                    <p>Website: <Link to="">{card.webSite}</Link></p>
                    <p>Contact Email: <Link to="">{card.email}</Link></p>
                    <p>Located At: <br /> {card.street} {card.houseNumber}, {card.city}, {card.country}, {card.zipcode} {card.state} </p>
                </div>
                <div className="col-md-7">
                    {/* <BusinessMap /> */}
                    {/* <iframe
                        width="600"
                        height="450"
                        style={{ border: "0" }}
                        loading="lazy"
                        allowfullscreen?: true
                    referrerpolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDpAJ0bXQXZAA_43355PXchAjrzEwCAhyk&q=${capitalCity}">
                </iframe> */}
                </div>
            </div>
        </>
        )
        }
    </>);
}

export default BusinessDetails;