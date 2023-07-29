import { FunctionComponent, useContext, useEffect, useState } from "react";
import { addToFavorites, getFavorites, removeFromFavorites } from "../services/favoritesService";
import { SiteTheme } from "../App";
import Card from "../interfaces/Card";
import { Link } from "react-router-dom";
import NewCardModal from "./NewCardModal";
import DeleteCardModal from "./DeleteCardModal";
import UpdateCardModal from "./UpdateCardModal";
import { successMsg } from "../services/feedbacksService";
import { getCards } from "../services/cardService";

interface FavoritesProps {
  setUserInfo: Function;
  userInfo: any;
}
const Favorites: FunctionComponent<FavoritesProps> = ({ setUserInfo, userInfo }) => {
  let theme = useContext(SiteTheme);
  let [cards, setCards] = useState<Card[]>([]);
  let [openNewCardModal, setOpenNewCardModal] = useState<boolean>(false);
  let [openDeleteCardModal, setOpenDeleteCardModal] = useState<boolean>(false);
  let [openUpdateCardModal, setOpenUpdateCardModal] = useState<boolean>(false);
  let [cardId, setCardId] = useState<number>(0);
  let [cardTitle, setCardTitle] = useState<string>("");
  let [dataUpdated, setDataUpdated] = useState<boolean>(false);
  let [favorites, setFavorites] = useState<number[]>([])
  let render = () => setDataUpdated(!dataUpdated);
  let handleAddToFavorites = (card: Card) => {
    if (favorites.includes(card.id as number)) {
      removeFromFavorites(userInfo.userId, card.id as number)
        .then((res) => {
          setFavorites(favorites.filter((id) => id !== card.id));
          successMsg(`${card.title} business card was removed from favorites!`);
          render() })
        .catch((err) => { console.log(err); });
    } else {
      addToFavorites(userInfo.userId, card)
        .then((res) => {
          setFavorites([...favorites, card.id as number]);
          successMsg(`${card.title} business card was added to favorites!`); })
        .catch((err) => { console.log(err); });    }
  };
  useEffect(() => {
    getFavorites(userInfo.userId).then((res) => {
      let userFavorites = res.data.find((fav: any) => fav.userId === userInfo.userId);
      let defaultCardIds: number[] = userFavorites?.cards.map((card: any) => card.id) || [];
      setFavorites(defaultCardIds)
    }).catch((err) => console.log(err))
  }, [dataUpdated, userInfo.userId]);

  useEffect(() => {
    getCards().then((res) => {
      setCards(res.data.filter((card: Card) => favorites.includes(card.id as number)));
    }).catch((err) => console.log(err));
  }, [favorites]);

return (
    <div className={`container mt-3 bCard ${theme}`}>
      <h1 className="display-1  fw-bold">
        <img
          src="/mindYourOwnBusiness_LOGO.png"
          alt="Mind Your Own Business logo"
          width="55"
          height="49"
        ></img>
        Mind Your Favorite Businesses
      </h1>
      <h5 className="display-6">Your Favorite Business Selection</h5>
      <div className="text-end mb-2">
        {(userInfo.role === "business" || userInfo.role === "admin") && (
          <Link to=""
            className="btn btn-secondary rounded-circle position-fixed bottom-0 end-0 mb-5 mx-5"
            onClick={() => setOpenNewCardModal(true)}          >
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
                className="card col-md-4 mx-3 mt-4 shadow"
                style={{ width: "18rem" }} >
                <img
                  src={card.businessImgURL}
                  className="card-img-top mt-2"
                  alt={card.businessImgAlt}
                  style={{ width: "16.5rem", height: "16.5rem" }} />
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">
                    {card.title}
                  </h6>
                  <h5 className="card-title">{card.subtitle}</h5>
                  <p className="card-text mb-4">{card.description}</p>
                  <div className="cardIcons">
                    <div className=" row">
                      {(userInfo.email === card.owner ||
                        userInfo.role === "admin") && (
                          <div className="col left-icons text-start">
                            <Link to=""
                              className="btn col"
                              onClick={() => {
                                setCardId(card.id as number);
                                setCardTitle(card.title);
                                setOpenDeleteCardModal(true);
                              }} >
                              <i className="fa-solid fa-trash"></i>
                            </Link>
                            <Link to=""
                              className="btn col"
                              onClick={() => {
                                setCardId(card.id as number);
                                setCardTitle(card.title);
                                setOpenUpdateCardModal(true); }} >
                              <i className="fa-solid fa-pen-to-square"></i>
                            </Link>
                          </div>
                        )}
                      <div className="col right-icons text-end">
                        <Link
                          to={`tel:${card.phone}`}
                          className="btn col" >
                          <i className="fa-solid fa-phone"></i>
                        </Link>
                        {userInfo.email && (favorites.includes(card.id as number) ? (
                          <Link to="" className="btn col text-danger" onClick={() => {
                            handleAddToFavorites(card);
                          }} >
                            <i className="fa-solid fa-heart"></i>
                          </Link>
                        ) : (
                          <Link to="" className="btn col" onClick={() => { handleAddToFavorites(card); }}    >
                            <i className="fa-solid fa-heart"></i>
                          </Link>)
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-5"><p className="fs-4">You havn't selected any favorites yet.</p></div>
)}
      <NewCardModal
        show={openNewCardModal}
        onHide={() => setOpenNewCardModal(false)}
        render={render}
        userInfo={userInfo}
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
        userInfo={userInfo}
      />
    </div>
  );
};

export default Favorites;
