export const nameCategory = (categories, id) => {
    const resultado = categories.find( item => item.id.toString() === id.toString() );
    return resultado.name;
  };
  