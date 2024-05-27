
import styled from "styled-components";
import { useState,useEffect } from "react";
import SearchResult from "./components/SearchResult";
 export const Base_Url="http://localhost:9000";


const App = () => {
  const [data,setData]=useState(null);
  const [filteredData,setfilteredData]=useState(null);
  const [loading,setloading]=useState(false);
  const [error,setError]=useState(null);
  const [selectedbtn,setselectedbtn]=useState("all");
  

  useEffect(()=>{
    const fetchFoodData=async()=>{
      setloading(true);
  
      try{
        const response=await fetch(Base_Url);
        const json= await response.json();
      
       setloading(false);
        setData(json);
        setfilteredData(json);
   
      }
      catch(err){
        setError("Unable to fetch Data");
  
      }
   
    }
   
     fetchFoodData();

  },[])
  const filteredFood=(type)=>{
    if(type==="all")
      {
       
        setfilteredData(data);
        setselectedbtn("all");
        return;
      }
      const filter=data?.filter((food)=>food.type.toLowerCase().includes(type.toLowerCase()));
    setfilteredData(filter);
    setselectedbtn(type);

  }
  const searchFood=(e)=>{
    const searchValue=e.target.value;
    console.log(searchValue);
    if(searchValue==="")
      {setfilteredData(data);}
    const filter=data?.filter((food)=>food.name.toLowerCase().includes(searchValue.toLowerCase()));
    setfilteredData(filter);
    
  }
  const filterBtns = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];
  if(error) return <div>{error}</div>
  if(loading) return <div>Loading....</div>


  return(
<Container>
  <TopContainer>
    <div className="logo">
      <img src="/logo.svg" alt="logo" />
    </div>
    <div className="search">
      <input type="text"  onChange={searchFood} placeholder="Search Food..."/>
    </div>
  </TopContainer>
  <FilterContainer>
    {
      filterBtns.map((value)=>(
        <Button isSelected={selectedbtn===value.type} onClick={()=>filteredFood(value.type)}>{value.name}</Button>
      ))
    }
   
  </FilterContainer>
<SearchResult data={filteredData}/>

</Container>


  )

};

export default App;
const Container=styled.div`
width:100%;
margin:0 auto;`

const TopContainer=styled.section`
width:80%;
margin:0 auto;
display:flex;
padding-top:1.5rem;
justify-content:space-between;
.search {
  input{
    all:unset;
    border:1px solid #FF0909;
    border-radius:5px;
    padding:0.5rem 1rem;
    color:white;
    &::placeholder{
      color:white;
    }
}
 
 
}
@media (0 < width < 600px){
  flex-direction:column;
  gap:1rem;
  align-items:center;
}
`;
const FilterContainer=styled.section`
display:flex;
justify-content:center;
gap:0.5rem;
padding:1.8rem;
`
  const Button=styled.button`
all:unset;
background-color:${({isSelected})=>(isSelected ? "#f22f2f" : "#ff4343")};
outline:1px solid ${({isSelected})=>(isSelected ? "white" : "#ff4343")};
border-radius:5px;
padding:0.4rem 0.8rem;
cursor:pointer;
&:hover{
  background-color:#f22f2f;
}
`

