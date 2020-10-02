import React from 'react'


import {Debug} from '../../Debug'
import CustomRadio from '../../../components/CustomRadio/CustomRadio'



export default function TopCompetitors (props) {

 

  return (
    


     <div>
      
     {
       props.values.scenarios.map((scenario, index)=>{
         return (
          <CustomRadio key={index} labelText={scenario} setFieldValue={props.setFieldValue} errors={props.errors} index={index} name={`scenarios.${index}`}/>
         )

       })
     }
        
    
     
     </div> 

           
    
    
  )
}