import { Fragment, useEffect, useState } from 'react'
import {FormGroup,Label,Input,CardHeader,Card,CardBody,CardText} from "reactstrap"
import axios from "axios"

function App() {
  const[countries,setCountries]=useState([])

 useEffect(()=>{
  axios.get(`https://restcountries.com/v3.1/all`).then(data=>{
    let countriesName=data.data 
   countriesName= countriesName.map(e=>{
      return e
    })
    console.log(countriesName)
    setCountries(countriesName)
  })
 },[])

function selectVal(e){
 setCountry(e.target.value);
}
const[country,setCountry]=useState(``)
console.log(country);

  useEffect(()=>{
    const options = {
      method: 'GET',
      url: 'https://covid-193.p.rapidapi.com/statistics/',
      params: {country: `${country.length===0?"USA":country}`},
      headers: {
        'X-RapidAPI-Key': '7ae6ee006emsh02fb32ffdd0f073p180f4fjsn52a7ae44a1e7',
        'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
      }
    };
    axios.request(options).then(function (response) {
      console.log(response.data);
      newData([response.data])
    }).catch(function (error) {
      console.error(error);
    });
  },[country])
const [data,newData]=useState([]);
console.log(data);

  return (
   <Fragment>
    <div className='text-center display-4 fw-bold mt-5 text-danger'>
      Corona Virus Tracking
    </div>
     <FormGroup className='d-flex justify-content-center mt-5'>
    <Label for="exampleSelect" className='fw-bold me-3 mt-2'>
      Select A Country
    </Label>
    <Input style={{width:'200px'}}
      onChange={selectVal}
      id="exampleSelect"
      name="select"
      type="select"
    >
        {countries.map((e,i)=>(
          <option key={i}>
            {e.name.common}
          </option>
        ))}
    </Input>
  </FormGroup>
  {data.map((e,i)=>(
     <div key={i} className="d-flex justify-content-center mt-5">
     <Card
       className="my-2"
       color="warning"
       inverse
       style={{
         width: '20rem'
       }}
     >
     <CardHeader className='display-6 fw-bold'>
         {e.parameters.country}
       </CardHeader>
       <CardBody>
         <CardText>
          {e.response.map((e,i)=>(
            <Fragment key={i}>
              <h5 className='fw-bold'>Continent: {e.continent}</h5>
              <h5 className='fw-bold'>Population: {e.population}</h5>
              <h5 className='fw-bold'>New Cases: {e.cases.critical}</h5>
              <h5 className='fw-bold'>Total Cases: {e.cases[`1M_pop`]}</h5>
              <h5 className='fw-bold'>Total Death: {e.deaths.total}</h5>
              <h5 className='fw-bold'>Total Tests: {e.tests.total}</h5>
              <h5 className='fw-bold'>Day: {e.day}</h5>
            </Fragment>
          ))}
         </CardText>
       </CardBody>
     </Card>
     </div>
  ))}
   </Fragment>
  )
}

export default App
