import tooltipSuccessPicPath from "../images/tooltip__success.svg";
import tooltipFailurePicPath from "../images/tooltip__failure.svg";

function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_type_tooltip">
        <button className="popup__close-button" type="button" onClick={props.onClose}/>
        <img src={props.isSuccess ? tooltipSuccessPicPath : tooltipFailurePicPath}
             alt={props.isSuccess ? "Иконка успешной регистрации" : "Иконка неуспешной попытки входа"}
             className="tooltip__picture" />
          <p className="tooltip__title">{props.isSuccess ? props.successAuthTitle : props.failureAuthTitle}</p>
      </div>
    </div>
);
}

export default InfoTooltip;