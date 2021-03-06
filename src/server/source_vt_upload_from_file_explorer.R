

observeEvent(input$btnUploadSources,{

  language <- reactData$language 

  #
  # json editor output
  #
  uiOut = tagList(
     fileInput('fileGeojson', 
       'Choose geojson File',
       accept=c('application/vnd.geo+json','.json','.geojson')
       ),
     jedOutput(id="sourceNewUpload")
    )

  #
  # List of button for the modal window
  #
  btnList <- list(
    actionButton(
      inputId="btnImportNewSource",
      label=d("btn_save",language)
      )
    )

  #
  # Generate the modal panel
  #
  mxModal(
    id="modalSourceCreate",
    content=uiOut,
    buttons=btnList,
    addBackground=TRUE,
    textCloseButton=d("btn_close",language)
    )


})


#
# Check if uploadGeojson event
#
observeEvent(input$uploadGeojson,{

  language <- reactData$language 

  #
  # json editor output
  #
  uiOut = tagList(
     jedOutput(id="sourceNewUpload")
    )

  #
  # List of button for the modal window
  #
  btnList <- list(
    actionButton(
      inputId="btnImportNewSource",
      label=d("btn_save",language)
      )
    )

  #
  # Generate the modal panel
  #
  mxModal(
    id="modalSourceCreate",
    content=uiOut,
    buttons=btnList,
    addBackground=TRUE,
    textCloseButton=d("btn_close",language)
    )

})



#
# Init schema editor
#
observeEvent(input$sourceNewUpload_init,{

  language <- .get(reactData,c("language"))
  country <- .get(reactData,c("country"))
  rolesTarget <- .get(getUserRole(),c("publish"))
  type <- "vector"

  #
  # Source id = layer id = table name
  #
  idSource <- randomString(
    prefix=sprintf("mx_%1$s_%2$s_",tolower(country),type),
    splitIn=3,
    addLETTERS=F,
    addLetters=T,
    splitSep="_",
    sep = "_"
    )

  reactData$idNewSource <- idSource


  #
  # Create schema with default
  #
  jedSchema(
    id="sourceNewUpload",
    schema = mxSchemaSourceMeta(
      rolesTarget = rolesTarget,
      language = language,
      title = idSource,
      abstract = idSource,
      attributesNames = list()
      ),
    startVal = NULL
    )

})


observeEvent(input$fileGeojson,{
  reactData$geojsonPath <- input$fileGeojson$datapath
})

observeEvent(input$uploadGeojson,{
  reactData$geojsonPath <- input$uploadGeojson
})


#
# Btn save toggle
#
observe({
 
  msg <- input$sourceNewUpload_issues$msg
  file <- reactData$geojsonPath
  noFile <- noDataCheck(file) || isTRUE(!file.exists(file))
  hasIssues <- !noDataCheck(msg) || length(msg) > 0
  disableUpload <- noFile || hasIssues 


  mxToggleButton(
    id="btnImportNewSource",
    disable = disableUpload
    )

})


#
# Validate and lock reactive values.
#
observeEvent(input$btnImportNewSource,{
  mxCatch(
    title="Upload new source",
    onError = function(){
      mxProgress(id=idSource, percent=100, enable=F)
      mxModal(id="modalSourceCreate",close=T)
      mxDbGetQuery(sprintf("delete from mx_sources where id='%s'",idSource)) ;
      mxDbGetQuery(sprintf("drop table if exists %s",idSource)) ;
    },{

      mxToggleButton(
        id="btnImportNewSource",
        disable = TRUE
        )

      #filePath <- input$fileGeojson$datapath
      filePath <- reactData$geojsonPath 
      meta <- input$sourceNewUpload_values$msg
      country <- reactData$country
      language <- reactData$language
      user <- reactUser$data$id
      type <- "vector"
      userRoles <- getUserRole()
      #
      # Control roles
      #
      metaRoles <- .get(meta,c("access","rolesRead"))
      hasValidRoles <- !noDataCheck(metaRoles) && all( metaRoles %in% userRoles$publish)
      
      if(!hasValidRoles){
        meta <- .set(meta,c("access","rolesRead"),list("self"))
      }

      #
      # Source id = layer id = table name
      #
      idSource <- reactData$idNewSource

      if(noDataCheck(idSource)) stop("empty id source, stop process")
      #
      # Start progress
      #
      mxProgress(id=idSource, text= "Reading file, this could take a while", percent=1)

      #
      # Create new row
      #
      sourceRow = list(
        id = idSource,
        country = country,
        editor = user,
        target = .get(meta,c("access","rolesRead"),flattenList=T),
        date_modified = Sys.time(),
        data = list(
          meta = meta,
          md5 = mxMd5(filePath)
          ),
        type = "vector"
        )
      
      #
      # Add view to the DB
      #
      mxDbAddGeoJSON(
        geojsonPath = filePath,
        tableName = idSource
        )

      reactData$geojsonProgressData <- list(
        nFeatures = mxDbGeojsonCountFeatures(filePath),
        sourceRow = sourceRow,
        idSource = idSource,
        idProgress = idSource
        )

    })
})





