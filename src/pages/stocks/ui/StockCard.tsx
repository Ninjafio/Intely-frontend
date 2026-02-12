import type { IStock } from "../api/mock"
import "../css/StockCard.css"

const StockCard = ({ subtitle, title, description, imageURL}: IStock) => {
  return (
    <div className='StockCard' style={{backgroundImage: `${imageURL ? `url(${imageURL})` : ""}`}}>
        <span className="StockCard_subtitle">{subtitle}</span>
        <span className="StockCard_title">{title}</span>
        <span className="StockCard_description">{description}</span>
    </div>
  )
}

export default StockCard