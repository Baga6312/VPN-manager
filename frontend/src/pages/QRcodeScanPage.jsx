import {Html5QrcodeScanner} from 'html5-qrcode'
import '../assets/QRcodeScan.css'
import {useEffect, useState} from 'react'

const QRCodeScanPage = () => {
  const [scanResult , setScanResult] = useState(null)
  useEffect(()=> { 
  const scanner = new Html5QrcodeScanner('reader' , { 
    qrbox : { 
      width : 100 , 
      height : 100  
    }, 
    fps : 3 , 
    })
    scanner.render((result )=>{ 
      scanner.clear() 
      setScanResult(result )
    } ,(error)=> {
      console.log(error )
    }); 
    },[])
  
  return (
    <div>
      <div className='mt-5'>
      <h1> QR code Scanner in react </h1>
      <img id ="scan-img" src="https://static.thenounproject.com/png/1497644-200.png"></img>
      <div id="reader"> </div>
      { scanResult 
      ? <div> {scanResult}</div>
      : <div id="reader"></div>}
    </div>
    </div>
  );
};

export default QRCodeScanPage ;
