import { FunctionComponent, useContext, useEffect, useState } from "react";
import { SiteTheme } from "../App";
import { Link } from "react-router-dom";
import Card from "../interfaces/Card";
import { getCards } from "../services/cardService";
import NewCardModal from "./NewCardModal";
import DeleteCardModal from "./DeleteCardModal";
import UpdateCardModal from "./UpdateCardModal";
import { addToFavorites, getFavorites, removeFromFavorites } from "../services/favoritsService";
import { successMsg } from "../services/feedbacksService";
// import Favorite from "../interfaces/Favorite";

interface BcardsProps {
  setUserInfo: Function;
  userInfo: any;
}

const Bcards: FunctionComponent<BcardsProps> = ({ setUserInfo, userInfo }) => {
  let theme = useContext(SiteTheme);
  let [cards, SetCards] = useState<Card[]>([]);
  let [openNewCardModal, setOpenNewCardModal] = useState<boolean>(false);
  let [openDeleteCardModal, setOpenDeleteCardModal] = useState<boolean>(false);
  let [openUpdateCardModal, setOpenUpdateCardModal] = useState<boolean>(false);
  let [cardId, setCardId] = useState<number>(0);
  let [cardTitle, setCardTitle] = useState<string>("");
  let [dataUpdated, setDataUpdated] = useState<boolean>(false);
  let [favorites,setFavorites] = useState<number[]>([])
  let render = () => setDataUpdated(!dataUpdated);
  let handleAddToFavorites = (card: Card) => {
    if (favorites.includes(card.id as number)) {
      // Card is already in favorites, so remove it
      removeFromFavorites(userInfo.userId, card.id as number)
        .then((res) => {
          setFavorites(favorites.filter((id) => id !== card.id));
          successMsg('Card removed from favorites!');})
        .catch((err) => {console.log(err);});
    } else {
      addToFavorites(userInfo.userId, card)
        .then((res) => {
          setFavorites([...favorites, card.id as number]);            
          successMsg('Card added to favorites!');})
        .catch((err) => {console.log(err);});   
}};

  useEffect(() => {
    getFavorites(userInfo.userId).then((res)=>{ 
      setFavorites(res.data)
    
    }).catch((err)=>console.log(err))
    getCards().then((res) => SetCards(res.data)).catch((err) => console.log(err));
  }, [dataUpdated,userInfo.userId]);



  return (
    <div className={`container mt-3 bCard ${theme}`}>
      <h1 className="display-4">
        <img
          src="/mindYourOwnBusiness_LOGO.png"
          alt="Mind Your Own Business logo"
          width="55"
          height="49"
        ></img>
        Mind Your Own Business
      </h1>
      <h5 className="">Few words</h5>
      
        <div className="text-end m-4 mb-2">
          {(userInfo.role === "business" || userInfo.role === "admin") && (
            <Link
              to=""
              className="btn btn-secondary rounded-circle position-absolute bottom-0 end-0 mb-5 mx-5"
              onClick={() => setOpenNewCardModal(true)}
            >
              <i className="fa-solid fa-plus fs-1 fw-normal"></i>
            </Link>
          )}
        </div>
        {cards.length ? (
          <div className="container">
            <div className="row">
              {cards.map((card: Card) => (
                <div
                  key={card.id}
                  className="card col-md-4 mx-2 mt-3 shadow"
                  style={{ width: "18rem" }}
                >
                  <img
                    src={card.businessImgURL}
                    className="card-img-top mt-2"
                    alt={card.businessImgAlt}
                    style={{ width: "16.5rem", height: "16.5rem" }}
                  />
                  <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-muted">
                      {card.title}
                    </h6>
                    <h5 className="card-title">{card.subtitle}</h5>
                    <p className="card-text">{card.description}</p>
                    
                  {/* <div className="position-absolute bottom-0"> */}
                    <div className="row">
                      {(userInfo.email === card.owner ||
                        userInfo.role === "admin") && (
                        <div className="col-6 ">
                          <Link
                            to=""
                            className="btn col-3"
                            onClick={() => {
                              setCardId(card.id as number);
                              setCardTitle(card.title);
                              setOpenDeleteCardModal(true);
                            }}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </Link>
                          <Link
                            to=""
                            className="btn mx-2 col-3"
                            onClick={() => {
                              setCardId(card.id as number);
                              setCardTitle(card.title);
                              setOpenUpdateCardModal(true);
                            }}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </Link>
                        </div>
                      )}
                    <div className="col-6 ">
                        <Link
                          to={`tel:${card.phone}`}
                          className="btn mx-2 col-3"                          
                        >
                          <i className="fa-solid fa-phone"></i>
                        </Link>
                        {userInfo.email && ( favorites.includes(card.id as number) ? (
                      <Link to="" className="btn mx-2 col-3 text-danger" onClick={() => {
                     handleAddToFavorites(card);}}    >
                    <i className="fa-solid fa-heart"></i>
                    </Link>
                      ) : (
                            <Link to="" className="btn mx-2 col-3" onClick={() => {        handleAddToFavorites(card);}}    >
                              <i className="fa-solid fa-heart"></i>
                              </Link>  )
                              )}
                         </div>
                    </div>
                    {/* </div> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>No cards</p>
        )}
        
        <NewCardModal
          show={openNewCardModal}
          onHide={() => setOpenNewCardModal(false)}
          render={render}
          userInfo= {userInfo}
          />
        <DeleteCardModal
          show={openDeleteCardModal}
          onHide={() => setOpenDeleteCardModal(false)}
          render={render}
          cardId={cardId}
          cardTitle={cardTitle}
        />
        <UpdateCardModal
          show={openUpdateCardModal}
          onHide={() => setOpenUpdateCardModal(false)}
          render={render}
          cardId={cardId}
          cardTitle={cardTitle}
           userInfo= {userInfo}

        />
      
    </div>
  );
};

export default Bcards;
