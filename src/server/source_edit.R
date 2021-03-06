


#
# react source edit layer
#

reactSourcesListEdit <- reactive({

  userRole <- getUserRole()
  userId <- .get(reactUser,c("data","id"))
  country <- reactData$country
  language <- reactData$language
  updateSourceLayer <- reactData$updateSourceLayerList

  targetEdit <- .get(userRole,c("edit"))

  layers <-  mxDbGetLayerTable(
    project = country,
    userId = userId,
    target = targetEdit,
    language = language
    )

  if(noDataCheck(layers)){
    layers <- list("noLayer")
  }else{
    layers <- mxGetLayerNamedList( layers, language )
  }

  return(layers)

})



observeEvent(input$btnEditSources,{
  language <- reactData$language 
  dict <- .get(config,c("dictionaries","schemaMetadata")) 

  #
  # json editor output
  #
  uiOut = tagList(
    selectizeInput(
      inputId = "selectSourceLayerEdit",
      label = d("source_select_layer",language),
      choices = reactSourcesListEdit(),
      options=list(
        dropdownParent="body"
        )
      ),
    tags$label("Table of views depending on selected source"),
    tableOutput("tblViewsUsingSource"),
    tags$label("Metadata"),
    jedOutput(id="sourceEdit")
    )

  #
  # List of button for the modal window
  #
  btnList <- list(
    actionButton(
      inputId="btnUpdateSource",
      label=d("btn_update",language)
      ),
    actionButton(
      inputId="btnDeleteSource",
      label=d("btn_delete",language)
      )
    )

  #
  # Generate the modal panel
  #
  mxModal(
    id="uiEditSource",
    title="Edit sources",
    content=uiOut,
    buttons=btnList,
    textCloseButton=d("btn_close",language)
    )

})

#
# Reactive table of views depending on selected source
#
reactTableViewsUsingSource <- reactive({
  #
  # Trigger
  #
  idSource <- input$selectSourceLayerEdit 
  language <- reactData$language
  idViewSource <-input$selectSourceLayerMain
  idViewSourceMask <- input$selectSourceLayerMask
  #
  # Get views table
  #
  mxDbGetViewsIdBySourceId(idSource,language)
})


#
# Render a table of viers depending on selected source
#
output$tblViewsUsingSource <- renderTable({
  idSource <- input$selectSourceLayerEdit 
  data <- reactTableViewsUsingSource()
  language <- reactData$language
  hasRow <- nrow(data) > 0


  if(!hasRow){
    data <- data.frame("title"="<emtpy>","email"="<empty>")
  }

  data <- data[,c("title","email")]

  names(data) <- c(
    d("view_title",w=F,lang=language),
    d("login_email",w=F,lang=language)
    )

  #
  # Change the delete source button state
  #
  mxToggleButton(
    id="btnDeleteSource",
    disable = hasRow
    )
  mxToggleButton(
    id="btnDeleteSourceConfirm",
    disable = !noDataCheck(data)
    )

  return(data);
})


observeEvent(input$btnDeleteSource,{

  language <- reactData$language
  dict <- .get(config,c("dictionaries","schemaMetadata")) 

  #
  # Button to confirm the source removal
  #
  btnList <- list(
    actionButton(
      inputId="btnDeleteSourceConfirm",
      label=d("btn_confirm",language)
      )
    )
  #
  # Generate the modal panel
  #
  mxModal(
    id="uiConfirmSourceRemove",
    title="Confirm source remove",
    content=tags$span(d("confirm_source_remove",lang=language,dict=dict)),
    buttons=btnList,
    textCloseButton=d("btn_close",language),
    addBackground=T
    )
})


observeEvent(input$btnDeleteSourceConfirm,{

  mxModal(
    id="uiConfirmSourceRemove",
    close=TRUE
    )
  mxModal(
    id="uiEditSource",
    close=TRUE
    )

  selectedSource <- input$selectSourceLayerEdit 
  language <- reactData$language

  mxDbDropLayer(selectedSource)

  dict <- .get(config,c("dictionaries","schemaMetadata")) 

  reactData$updateSourceLayerList <- runif(1)  

  mxModal(
    id="uiConfirmSourceRemoveDone",
    title="Success delete source",
    content=tags$span(d("msg_success_delete",lang=language,dict=dict)),
    textCloseButton=d("btn_close",language)
    )

})




observeEvent({
  input$sourceEdit_init
  input$selectSourceLayerEdit
},{
  init <- input$sourceEdit_init
  language <- reactData$language
  layer <- input$selectSourceLayerEdit 
  
  userRoles <- getUserRole()

  hasNoData <- noDataCheck(layer) || noDataCheck(init)

  mxToggleButton(
    id="btnUpdateSource",
    disable = hasNoData
    )

  mxToggleButton(
    id="btnDeleteSource",
    disable = hasNoData
    )

  mxUiHide(
    id="sourceEdit",
    hide = hasNoData,
    )

  if(hasNoData){
    return()
  }

  meta <- mxDbGetLayerMeta(layer)
  rolesTarget <- .get(userRoles,c("publish"))
  
  attributesNames <- mxDbGetLayerColumnsNames(layer,notIn=c("gid","geom","mx_t0","mx_t1"))
  
  # Clean meta : 
  # - remove old attributes names 

  attributesOld <- names(.get(meta,c("text","attributes")))
  attributesRemoved <- attributesOld[ ! attributesOld %in% attributesNames]

  for(a in attributesRemoved){
    meta = .set(meta,c("text","attributes",a),NULL)
  }

  # - remove old schema values NOTE : once stable, remove those lines
  meta = .set(meta,c("origin","sources"),NULL)
  meta = .set(meta,c("text","keywords","words"),NULL)
  meta = .set(meta,c("text","language","languages"),NULL)

  oldRoles  = .get(meta,c("access","roles","names"))

  if(!noDataCheck( oldRoles )){
    meta  = .set(meta,c("access","roles","names"),NULL)
    roles = unlist(oldRoles) 
    names(roles)=NULL
    meta = .set(meta,c("access","rolesRead"),roles) 
  }

  meta <- .set(meta,c("access","roles"),NULL)
  
  schema = mxSchemaSourceMeta(
      language = language,
      rolesTarget = rolesTarget,
      attributesNames =  attributesNames
      )

  jedSchema(
    id="sourceEdit",
    schema = schema,
    startVal = meta,
    options = list("no_additional_properties" = FALSE)
    )

})

observeEvent(input$sourceEdit_issues,{

  errs = input$sourceEdit_issues$msg

  #
  # Simple validation using editor's issues
  # NOTE: This should be completed using direct validation on the actual data server side
  #
  hasIssues = length(errs) != 0

  mxToggleButton(
    id="btnUpdateSource",
    disable = hasIssues
    )

  reactData$viewSourceEditHasIssues = hasIssues

})

observeEvent(input$btnUpdateSource,{

  layer <- input$selectSourceLayerEdit 
  meta <- input$sourceEdit_values$msg
  country <- reactData$country
  language <- reactData$language
  user <- reactUser$data$id
  userRoles <- getUserRole()
  dict <- .get(config,c("dictionaries","schemaMetadata")) 

  #
  # Control roles
  #
  metaRoles <- .get(meta,c("access","rolesRead"))
  hasValidRoles <- !noDataCheck(metaRoles) && all( metaRoles %in% userRoles$publish )
  
  if(!hasValidRoles){
    metaRoles <- list("self")
    meta <- .set(meta,c("access","rolesRead"),metaRoles)
  }

  if(reactData$viewSourceEditHasIssues) return()

  mxDbUpdate(
    table = .get(config,c("pg","tables","sources")),
    idCol = "id",
    id = layer,
    column = "data",
    path = c("meta"),
    value = meta
    )

  mxDbUpdate(
    table = .get(config,c("pg","tables","sources")),
    idCol = "id",
    id = layer,
    column = "target",
    value = metaRoles
    )

  mxDbUpdate(
    table = .get(config,c("pg","tables","sources")),
    idCol = "id",
    id = layer,
    column = "editor",
    value = user
    )
  #
  # Generate the modal panel
  #

  mxModal(
    id="uiConfirmSourceInit",
    title="Success update",
    content=tags$p(d("msg_success_update",dict=dict,lang=language)),
    textCloseButton=d("btn_close",language)
    )

  #
  # Invalidate source list
  #

  reactData$updateSourceLayerList <- runif(1)  
})



##
## Send the json data when the ui is generated
##
#observeEvent(input$sourceEdit_init,{

#language <- reactData$language 

#view <- reactData$viewSourceGeojson 
#duplicateOf <- .get(view,c("data","source","duplicateOf")) 
#isDuplicated <- length(duplicateOf) > 0

#startVal <- NULL
##
## If there is no doubt
##
#if(isDuplicated){
#startVal <- mxDbGetQuery(sprintf("SELECT data#>'{\"meta\"}' from %1$s WHERE id='%2$s'",
#.get(config,c("pg","tables","sources")),
#duplicateOf[[1]]
#))$data
#}

#})

##
## Validate and lock reactive values.
##


##
## Save the source in db
##

