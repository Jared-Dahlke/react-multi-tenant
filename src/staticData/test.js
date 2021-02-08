//current complicated method

postBulkActions/:versionId

paramaters: {
  taxonomyTree: ['the whole tree'],
  filters: {
    'same object as in main filter'
  },
  manuallyChangedChannels: [
    {channelId: 2343242, actionId: 2},
    {channelId: erth, actionId: 1},
    {channelId: 234dgfdfghdfgh3242, actionId: 2},
    {channelId: 234dfghdghd3242, actionId: 3},
  ]
}



//simple 2 step orignal method

postBulkActions/:versionId

parameters: {
  filters: { 'same object as in main filter'},
  actionId: 1,
}


processTree =()=>{

  for (const tier1 of tree) {
    if(tier1.actionId) {
      fetchAndInsert(tier1.taxonomyId, tier1.actionId)
    }
  }

  for (const tier1 of tree) {  
      for (const tier2 of tier1.children) {
        if(tier2.actionId) {
            fetchAndInsert(tier2.taxonomyId, tier2.actionId)
        }       
    }
  }

  for (const tier1 of tree) {   
      for (const tier2 of tier1.children) {
       for (const tier3 of tier2.children) {
         if(tier3.actionId)  {
           fetchAndInsert(tier3.taxonomyId, tier3.actionId)
         }
       }  
    }
  }

}
