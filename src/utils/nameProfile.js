export const nameProfile = (user, id) => {
    const resultado = user.find( item => item.profile.id.toString() === id.toString() );
    return resultado;
  };