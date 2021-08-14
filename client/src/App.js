import React,{useEffect,createContext,useReducer,useContext} from 'react';
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Taslak from "./components/Taslak";
import CreateAir from "./components/CreateAir";
import AirDetail from "./components/AirDetail";
import UpdateAir from "./components/UpdateAir"
import Footer from "./components/Footer"
import Navbar from "./Navbar";
// import Personel from "./components/Personel";
import CreatePersonel from "./components/CreatePersonel";
// import StickyHeadTable from "./components/StickyHeadTable";
// import BasicToolbarFilteringGrid from "./components/BasicToolbarFilteringGrid";
// import BasicTable from "./components/BasicTable"
// import SortingTable from "./components/SortingTable"
// import PaginationTable from "./components/PaginationTable"
import FilteringTable from "./components/FilteringTable"
import Gelismeler from "./components/Gelismeler"
import CreateGelismeler from "./components/CreateGelismeler"

import {BrowserRouter,Route, Switch,useHistory} from 'react-router-dom'
import {reducer, initialState} from './reducers/userReducer'

//contexti user stateini tutmak için kullanıyoruz, giriş yapıldıysa state var yapılmadıysa yok
export const UserContext= createContext()

const Routing = () =>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)

  useEffect(()=>{
    //en başta kullanıcıyı kontrol ediyor, varsa anasayfa yoksa logine gönder
    const user = JSON.parse(localStorage.getItem("user"))
   if(user) {
    dispatch({type:"USER",payload:user}) //logout yapmadan kapatırsa
   }
   else {
    history.push('/login')
   }
  },[])

  return (
    <div>
    <Switch>
        <Route exact path="/">
          <Home />
        </Route>    
        <Route path="/signup">
          <Signup />
        </Route>  
        <Route path="/login">
         <Login />
        </Route>
        <Route path="/personel">
          <FilteringTable />
        </Route> 
        <Route path="/createpersonel">
          <CreatePersonel />
        </Route> 
        <Route path="/taslak">
          <Taslak />
        </Route>  
        <Route path="/createair">
          <CreateAir />
        </Route> 
        <Route path="/airs/:airCode">
          <AirDetail />
        </Route> 
        <Route path='/update/:airCode'>
          <UpdateAir />
        </Route> 
        <Route path='/gelismeler'>
          <Gelismeler
           />
        </Route>
        <Route path='/creategelisme'>
          <CreateGelismeler />
        </Route>
    </Switch>
        <Footer />
        </div>
  )
}

function App() {
const [state,dispatch] = useReducer(reducer,initialState)

  return (
    <UserContext.Provider value = {{state,dispatch}}>

      <BrowserRouter>
    
      <Navbar />
      <Routing />
      
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
