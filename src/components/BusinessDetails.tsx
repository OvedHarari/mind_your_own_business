import { FunctionComponent, useEffect, useState } from "react";
import { getCardById } from "../services/cardService";
import Card from "../interfaces/Card";
import { Link } from "react-router-dom";
import BusinessMap from "./BusinessMap";

interface BusinessDetailsProps {
    onHide: Function
    cardId: number;
}

const BusinessDetails: FunctionComponent<BusinessDetailsProps> = ({ onHide, cardId }) => {

    let [card, setCard] = useState<Card>()
    useEffect(() => {
        if (cardId) {
            getCardById(cardId).then((res) => setCard(res.data))
                .catch((err) => console.log(err))
        }
    }, [cardId]);

    return (<>
        {card && (<div className="container">
            <div className="row">
                <div className="col-lg-7">
                    {card.description}
                </div>
                <div className="col-lg-4 text-end">
                    <img src={card.businessImgURL} width={300} height={300} alt={card.businessImgAlt} />
                </div>
            </div>
            <div className="row mt-4">
                <h4 className="text-start">Contact us</h4>

                <div className="col-lg-5 mt-2 me-5">
                    <p>Phone: <Link to="">{card.phone}</Link> </p>
                    <p>Website: <Link to="">{card.webSite}</Link></p>
                    <p>Contact Email: <Link to="">{card.email}</Link></p>
                    <p>Located At: <br /> {card.street} {card.houseNumber}, {card.city}, {card.country}, {card.zipcode} {card.state} </p>
                </div>
                <div className="col-lg-6">
                    <BusinessMap lat={card.lat as number} lng={card.lng as number} />
                </div>
            </div>
            <button className="btn btn-secondary mt-2" onClick={() => onHide()}>Close</button>
        </div>
        )
        }
    </>);
}

export default BusinessDetails;