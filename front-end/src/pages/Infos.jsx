import '../assets/tests.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'

const Infos = ({ username }) => {

  return (
    <div id="container-1">
      <div id="user-info">
        <FontAwesomeIcon id="image" icon={faUser} />
        <div id="icons">
          <p><strong>{username}</strong></p>
          <p id="status"><strong> -- </strong></p>
        </div>
      </div>
      <div id="data">
        <FontAwesomeIcon id="img" icon={faAngleUp} />
        <p><strong> -- </strong></p>
        <FontAwesomeIcon id="img" icon={faAngleDown} />
        <p><strong> -- </strong></p>
      </div>
      <div id="ip-address">
        <p><strong> -- </strong></p>
      </div>
      <div id="connection-statue">
        <p>sex</p>
      </div>
    </div>
  );
};


export default Infos; 