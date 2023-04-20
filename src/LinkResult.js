import { useEffect, useState } from "react";
import CopyToClipboard from 'react-copy-to-clipboard';
import Axios from 'axios';

const LinkResult = ({inputValue}) => {
  
  const [shortenLink, setShortenLink] = useState("Hola");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  const fetchData = async( ) => {
    try {
        setLoading(true);
        const response = await Axios(`https://api.shrtco.de/v2/shorten?url=${inputValue}`);
        console.log(response.data);
        setShortenLink(response.data.result.full_short_link);
    }catch(err){
        setError(err);
    } finally {
        setLoading(false);
    }
  }

  useEffect(() => {
    if(inputValue.length){
        fetchData();

    }
  },[inputValue])

  /* metodo para que se restablesca el boton copy */
  useEffect(() => {
    const timer = setTimeout(() => {
        setCopied(false);
    }, 1000);
     return () => clearTimeout(timer);
  }, [copied]);

  if(loading){
    return <p className="noData">Loading...</p>
  }

  if(error){
    return <p className="noData">Error</p>
  }

  return (
    <div className="result">
        <p>{shortenLink}</p>

        <CopyToClipboard text={shortenLink} onCopy={()=> setCopied(true)}>
            <button className={copied ? "copied" : ""}>Copy</button>
        </CopyToClipboard>
    </div>
  )
}

export default LinkResult