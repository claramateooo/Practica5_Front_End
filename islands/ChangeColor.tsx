import { useEffect, useState} from "preact/hooks";
import { FunctionComponent } from "preact/src/index.d.ts";

const colores = ["#fbbf24", "#f472b6", "#60a5fa", "#34d399"];
const ChangeColor:FunctionComponent=()=>{
  const [color, setColor] = useState(colores[0]);
  useEffect(() => {
    let i = 0;
    const intervalo = setInterval(() => {
      i = (i + 1) % colores.length;
      setColor(colores[i]);
      document.body.style.background = colores[i];
    }, 1000);
    return () => clearInterval(intervalo);
  }, []);
  return null;
};

export default ChangeColor;
