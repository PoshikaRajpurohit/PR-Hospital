export const getStorage=()=>{
   return JSON.parse(localStorage.getItem('patients'))||[]
}
export const setStorage = (data) => {
  return localStorage.setItem('patients', JSON.stringify(data));
}

