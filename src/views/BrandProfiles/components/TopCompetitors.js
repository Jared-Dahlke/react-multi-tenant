import React from 'react'
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import CustomInput from "../../../components/CustomInput/CustomInput.js";
import CustomTree from '../../../components/Tree/CustomTree'
import InputAdornment from '@material-ui/core/InputAdornment'
import * as v from '../../../validations'
import { whiteColor, grayColor, dangerColor } from '../../../assets/jss/material-dashboard-react.js';
import {Field, Formik} from 'formik'
import FormikInput from '../../../components/CustomInput/FormikInput'
import Grid from "@material-ui/core/Grid"
import Button from "../../../components/CustomButtons/Button.js";
import Card from "../../../components/Card/Card.js";
import CardBody from "../../../components/Card/CardBody.js";
import {Table, TableCell, TableBody, TableRow, TableHead} from '@material-ui/core'
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import {fetchBrandProfiles} from '../../../redux/actions/brandProfiles.js'
import {connect} from 'react-redux'
import styles from "../../../assets/jss/material-dashboard-react/components/tasksStyle.js";
import tableStyles from "../../../assets/jss/material-dashboard-react/components/tableStyle.js";
//import { useHistory } from "react-router-dom";
import { Facebook } from 'react-content-loader'
import CustomAlert from '../../../components/CustomAlert.js'
import Snackbar from '../../../components/Snackbar/Snackbar'
import Success from "@material-ui/icons/Check";
import Error from '@material-ui/icons/Error'
import {Link} from 'react-router-dom'
import {Debug} from '../../Debug'
import Save from '@material-ui/icons/Save'
import {default as UUID} from "node-uuid";
import FormHelperText from '@material-ui/core/FormHelperText'


const MyFacebookLoader = () => <Facebook />

const useTableStyles = makeStyles(tableStyles);

const useStyles = makeStyles(styles);

var dummyTopCompetitors = [
 /* {competitorId: 1, competitorName: 'My COmpetitor', competitorTwitterProfile: 'www.twitter.com/competitor',competitorYouTubeChannel: 'youtube.com/competitorchannel', competitorWebsite: 'www.mycompetitor.com'},
  {competitorId: 2, competitorName: 'Test competitor', competitorTwitterProfile: 'www.twitter.com/someHandle',competitorYouTubeChannel: 'youtube.com/someChannel', competitorWebsite: 'www.someWebsite.com'},
  {competitorId: 3, competitorName: 'Some Company', competitorTwitterProfile: 'www.twitter.com/handleTest',competitorYouTubeChannel: 'youtube.com/channelTest', competitorWebsite: 'www.myTestWebsite.com'}, */
]



const competitorHeaders = ['Name', 'Twitter Profile','YouTube Channel','Website','']

export default function TopCompetitors (props) {

 

  const [competitors, setCompetitors] = React.useState(dummyTopCompetitors)

  const [addingNew, setAddingNew] = React.useState(false)

  const [newName, setNewName] = React.useState('')
  const [newTwitterProfile, setNewTwitterProfile] = React.useState('')
  const [newYoutTubeChannel, setNewYouTubeChannel] = React.useState('')
  const [newWebsite, setNewWebsite] = React.useState('')



  const classes = useStyles();
  const tableClasses = useTableStyles();

  const tableCellClasses = classnames(classes.tableCell, {
    [classes.tableCellRTL]: false
  });

  const handleSaveNew=(values)=>{
    console.log(values)
    setAddingNew(false)
    let newCompetitor = {
      competitorId: UUID.v4(), 
      competitorName: values.newName, 
      competitorTwitterProfile: values.newTwitterProfile,
      competitorYouTubeChannel: values.newYouTubeChannel, 
      competitorWebsite: values.newWebsite
    }
    let oldCompetitors = JSON.parse(JSON.stringify(competitors))
    oldCompetitors.push(newCompetitor)
    setCompetitors(oldCompetitors)
    props.setFieldValue('topCompetitors', oldCompetitors)
  }

  const handleDeleteCompetitor=(competitorId)=> {
    let comps = JSON.parse(JSON.stringify(competitors))
    let newComps = []
    for (const competitor of comps) {
      if(competitor.competitorId !== competitorId) newComps.push(competitor)
    }
    setCompetitors(newComps)
    props.setFieldValue('topCompetitors', newComps)
  }


  return (
    
    <GridContainer spacing={2}>

      <Grid container justify="flex-end">

        <GridItem >      
            <Button disabled={addingNew} onClick={()=>setAddingNew(true)} color="primary">Add New Competitor</Button>    
        </GridItem>

      </Grid>
              
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          
          <CardBody>  

            {props.errors.topCompetitors ? (        
                    <FormHelperText 
                      id="component-helper-text" 
                      style={{
                        color: dangerColor[0],  
                        fontSize: '16px'                   
                      }}
                    >
                      {props.errors.topCompetitors}
                    </FormHelperText>

                      
                    ) : null
                  }         

          
            
            
              <Table className={classes.table}>

          
                <TableHead className={tableClasses["primaryTableHeader"]}>
                  <TableRow className={tableClasses.tableHeadRow}>
                    {competitorHeaders.map((prop, key) => {
                      return (
                        <TableCell
                          className={tableClasses.tableCell + " " + tableClasses.tableHeadCell}
                          key={key}
                        >
                          {prop}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
              

                <TableBody>

                {addingNew ?
                  <Formik
                    validateOnMount={true}
                    initialValues={{
                      
                        newName: '',
                        newTwitterProfile: '',
                        newYouTubeChannel: '',
                        newWebsite: ''
                              
                    }}
                    validate={(values,props)=>{      
                      console.log(values)
                      console.log(props)          
                      const errors = {}
                      if (errors.length > 0) {
                           // setNewValid(false)                
                      } else {
                       // setNewValid(true)
                      }
                      return errors
                    }}                 
                  > 
                {newCompetitorFormik => (

                    <TableRow key={'newlyAdded'} className={classes.tableRow} style={{height: '160px'}}>
                                        
                      <TableCell className={tableCellClasses}>
                        <FormikInput
                          name='newName'
                          labelProps={{shrink: true}}
                          labelText="Competitor Name"            
                          validate={v.isBrandProfileNameError}
                          formControlProps={{
                            fullWidth: true
                            
                          }}
                        />
                        
                      </TableCell>
                      <TableCell className={tableCellClasses}>
                        <FormikInput
                          name='newTwitterProfile'
                          labelProps={{shrink: true}}
                          inputProps={{
                            startAdornment: <InputAdornment position="start"><div style={{color: grayColor[3]}}>https://twitter.com/</div></InputAdornment>,  
                          }}
                          labelText="Competitor Twitter"        
                              
                          validate={v.isTwitterProfileError}
                          formControlProps={{
                            fullWidth: true                        
                          }}
                        />
                      </TableCell>
                      <TableCell className={tableCellClasses}>
                        <FormikInput
                          labelProps={{shrink: true}}
                          name='newYouTubeChannel'
                          inputProps={{
                            startAdornment: <InputAdornment position="start"><div style={{color: grayColor[3]}}>https://youtube.com/</div></InputAdornment>,  
                          }}
                          labelText="Competitor YouTube"                               
                          validate={v.isTwitterProfileError}
                          formControlProps={{
                            fullWidth: true                        
                          }}
                        />
                      </TableCell>
                      <TableCell className={tableCellClasses}>
                        <FormikInput
                          labelProps={{shrink: true}}
                          name='newWebsite'
                          
                          labelText="Competitor Website"                               
                          validate={v.isWebsiteUrlError}
                          formControlProps={{
                            fullWidth: true                        
                          }}
                        />
                      </TableCell>

                      <TableCell className={tableCellClasses}>
                        
                        <Tooltip
                          id="tooltip-top-start"
                          title="Remove"
                          placement="top"
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <IconButton
                            aria-label="Close"
                            className={classes.tableActionButton}
                            onClick={()=>{setAddingNew(false)}}
                          >
                            <Close
                              className={
                                classes.tableActionButtonIcon + " " + classes.close
                              }
                            />
                          </IconButton>
                        </Tooltip>
                        {
                          Object.keys(newCompetitorFormik.errors).length === 0 && newCompetitorFormik.errors.constructor === Object ?
                          
                            <IconButton
                              aria-label="Save"
                              className={classes.tableActionButton}
                              onClick={()=>{handleSaveNew(newCompetitorFormik.values)}}
                            >
                              <Save
                                className={
                                  classes.tableActionButtonIcon + " " + classes.save
                                }
                              />
                            </IconButton>

                            :

                            null


                        }
                      </TableCell>


                    </TableRow>

                    
                    )}


    
                  </Formik>
                  
                :
                null
                }

                  {competitors && competitors.length > 0 && competitors.map(competitor => (
                    <TableRow key={competitor.competitorId} className={classes.tableRow}>
                    
                      <TableCell className={tableCellClasses}>{competitor.competitorName}</TableCell>
                      <TableCell className={tableCellClasses}>{competitor.competitorTwitterProfile}</TableCell>
                      <TableCell className={tableCellClasses}>{competitor.competitorYouTubeChannel}</TableCell>
                      <TableCell className={tableCellClasses}>{competitor.competitorWebsite}</TableCell>
                     
                      <TableCell className={classes.tableActions}>
                        
                        <Tooltip
                          id="tooltip-top-start"
                          title="Remove"
                          placement="top"
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <IconButton
                            aria-label="Close"
                            className={classes.tableActionButton}
                            onClick={()=>{handleDeleteCompetitor(competitor.competitorId)}}
                          >
                            <Close
                              className={
                                classes.tableActionButtonIcon + " " + classes.close
                              }
                            />
                          </IconButton>
                        </Tooltip>
                      </TableCell>

                    </TableRow>
                  ))}

                  
                </TableBody>

                  

              </Table>

          </CardBody>
        </Card>

         
      </GridItem>

    </GridContainer>
    
    
  )
}