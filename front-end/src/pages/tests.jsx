import '../assets/tests.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {   faR , faPlus , faUser,  faAngleUp , faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { faWindows } from '@fortawesome/free-brands-svg-icons'

const Tests=() => {

  return (
    <div>
      {/* initial component */}
      <h1>welcome Feh</h1>
      {/* first component */}
        <div id="container-1">
          <div id="user-info">
            <FontAwesomeIcon id="image" icon={faUser} />
            <div id="icons">
              <p><strong>Feh</strong></p>
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
        </div> <br/>
      {/* second component */}
      <div id="container-2">
        <div id="slider">
          <p>If you wish to conenct to the VPN , Downlaod the <a href='#blanc'>.batch file</a> and run it on the cmd by executing <br/><br/><code id="command">connect-to-vpn.bat</code></p>
          <p>Or follow the steps below : </p>
          <div id="tuto">
            <p>open cmd : <FontAwesomeIcon id="windows-icon" icon={faWindows} /> <FontAwesomeIcon id="plus" icon={faPlus} /><FontAwesomeIcon id="R" icon={faR} /> and type cmd and press Enter</p>
            <p>Type<code id="command"> winget install Wireguad.Wireguard</code></p>
            <p> Generate the public and private keys : </p>
            <div id="command">
              <code> wg genkey {'>'} private_key.txt</code><br/>
              <code> wg genkey {'<'} private_key.txt {'>'} public_key.txt </code>
            </div>
            <p> Create a new named <code id="command"> wg0.conf</code> and save  the text below into the file </p>
            <div id="command">
              <code>
                <code>[Interface]</code><br/>
                <code>PrivateKey = your_private_key</code><br/>
                <code>Address = your_client_IP/24</code><br/>
                <code>DNS = 8.8.8.8, 8.8.4.4</code><br/>
                <code>[Peer]</code><br/>
                <code>PublicKey = server_public_key</code><br/>
                <code>Endpoint = your_server_IP:your_server_port</code><br/>
                <code>AllowedIPs = 0.0.0.0/0</code><br/>
              </code>
            </div>
              <div>
                <p>finally, run the next command to connect to the VPN</p>
                  <code id="command">wireguard.exe /installtunnelservice {'<path_to_file>'}</code>
                <p>for testing test connectivity</p>
                  <code id="command">wireguard.exe /showtunnelservice {'<path_to_file>'}</code>
                <p>for disconnecting</p>
                  <code  id="command">wireguard.exe /removetunnelservice {'<path_to_file>'}</code>
              </div>
          </div> 
        </div>
      </div>
    </div>
  );
};


export default Tests ; 