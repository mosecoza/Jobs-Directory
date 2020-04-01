import React, { useEffect, useState } from 'react';
import './App.css';
import { Container, Row, Col } from "shards-react";
import ListCard from "./components/ListCard/ListCard";
function App() {
  const [state, setState] = useState([]);
  const [error, setError] = useState('');
  // const [state, dispatch] = useReducer(reducer, initialState, init)
  useEffect( ()=>{
    getJobs();
  },[]);
  
  async function getJobs(){
    let response;
    const fetchResponse = await fetch( "https://us-central1-mlab-challenge.cloudfunctions.net/jobs");

    fetchResponse.json().then(jobs=>{
      // console.log(jobs)
        if(state.length ===0){
          setState(jobs)
        }
    }).catch(rejected=>{
      setError(rejected.message);
    })
    
  }

  return (
    <div className='container-fluid'   style={{flex:1, minHeight: window.outerHeight, display:'flex', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#e6ee9c', flexWrap: 'wrap'}}>
      {/* <Row> */}
      {state? state.map((jobEntry, index)=>{
        return <ListCard key={jobEntry.id} {...jobEntry}/>
      }):null}
      {/* </Row> */}
      
      {/* <pre>{state? JSON.stringify(state, null, '\t'):null}</pre> */}
      {error? error:null}
    </div>
  );
}

export default App;
