import '../assets/tests2.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus , faDiagramProject } from '@fortawesome/free-solid-svg-icons';

const Networking=() => {

  return (
    <div>
        <div id="layer">
            <div id="layer-1">
                <FontAwesomeIcon id="icon-layer" icon={faDiagramProject} size="5x" /><br/>
                <input id="button-change" type="button" value="Join Network"/>
            </div>
            <div id="layer-2">
                <FontAwesomeIcon id="plus-layer" icon={faPlus} size="2x"/>
                <FontAwesomeIcon id="icon-layer" icon={faDiagramProject} size="5x" /><br/>
                <input id="button-change" type="button" value="Create Network"/>
            </div>
        </div>
    </div>
  );
};


export default Networking; 