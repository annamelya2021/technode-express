
const saveToken =(token)=>{
    localStorage.setItem("token",token);
}

const getToken = ()=>{
    return localStorage.getItem("token");
}

const removeToken = ()=>{
    localStorage.removeItem("token");
}

const addToFavorites = (productId) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(productId)) {
      favorites.push(productId);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  };
  
  const removeFromFavorites = (productId) => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(id => id !== productId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };
  


export{
    saveToken,
    getToken,
    removeToken,
    addToFavorites,
    removeFromFavorites

}