

export const getTours=(type)=>{
  let hadTour = localStorage.getItem('toured')
  console.log('hadtour')
  console.log(hadTour)
  if(hadTour) {
    return []
  } else {
    //localStorage.setItem('toured', 'tourCompleted')
    if(type==='takeToDiscover'){
      return discoverSteps
    } else {
      return TOUR_STEPS
    }
    
  } 

}



const TOUR_STEPS = [   
  {     
    target: ".brandProfileLink",     
    content: "Welcome! Let's start off by creating a brand profile.",   
    disableBeacon: true
  }
 
]; 


const discoverSteps = [   
  {     
    target: ".discoverLink",     
    content: "Great, now head over to Discover to build your custom channel and video list",   
    disableBeacon: true
  }
 
]; 


