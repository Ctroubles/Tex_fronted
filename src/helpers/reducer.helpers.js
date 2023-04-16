

function fusionarProductos(arr) {
    const resultado = {};
  
    for (const producto of arr) {
      if (producto._id in resultado) {
        resultado[producto._id].quantity += producto.quantity;
      } else {
        resultado[producto._id] = { ...producto };
      }
    }
  
    return Object.values(resultado);
  }


export {
    fusionarProductos,
}


