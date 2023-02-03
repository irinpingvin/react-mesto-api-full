import headerLogoPath from "../images/logo.svg";
import {Link} from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img src={headerLogoPath} alt="Логотип сайта - слово Mesto" className="header__logo"/>
      <div className="header__info">
        <p className="header__email">{props.userEmail}</p>
        <Link className="header__link" to={props.linkUrl} onClick={props.onSignOut}>{props.linkTitle}</Link>
      </div>
    </header>
  );
}

export default Header;