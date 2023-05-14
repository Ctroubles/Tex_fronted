function cleanPathname(string){
    const result = string[string.length-1] === "/" ? string.slice(0,-1) : string;
    return result
};

function capitalize(str) {
  if (typeof(str)==="string") {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }else return str
}


const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};

const getCurrentComponent = {
  "/construye/paso1": "cpu",
  "/construye/paso2": "motherBoard",
  "/construye/paso3": "cooler",
  "/construye/paso4": "ram",
  "/construye/paso5": "gpu",
  "/construye/paso6": "storaged",
  "/construye/paso7": "psu",
  "/construye/paso8": "case",
  "/construye/paso9": "screen",
  "/construye/paso10": "peripherals1",
  "/construye/paso11": "peripherals2",
  "/construye/paso12": "peripherals3",
};


export{
    getCurrentComponent,
    cleanPathname,
    capitalize,
    isEmptyObject,
}



