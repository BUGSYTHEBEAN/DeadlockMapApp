import { createSlice } from '@reduxjs/toolkit'

export const editorSlice = createSlice({
  name: 'editor',
  initialState: {
    drawingColor: '#fff',
    drawingSize: 8,
    selectedAgent: '',
    droppedCoordinates: {x: undefined, y: undefined},
    selectedTeam: 'sapphire',
    isMapDetail: true,
    isMapLaneObjectives: true,
    isMapJungle: false,
    isClearAll: false,
    isClearLines: false,
    isClearAgents: false,
    isDownload: false,
    isSaveMap: false,
    agentList: [],
    mapId: '',
    matchId: ''
  },
  reducers: {
    setDrawingColor: (state, action) => {
      state.drawingColor = action.payload
    },
    setDrawingSize: (state, action) => {
      state.drawingSize = action.payload
    },
    setSelectedAgent: (state, action) => {
      state.selectedAgent = action.payload
    },
    setDroppedCoordinates: (state, action) => {
      state.droppedCoordinates = action.payload
    },
    setSelectedTeam: (state, action) => {
      state.selectedTeam = action.payload
    },
    setIsMapDetail: (state, action) => {
      state.isMapDetail = action.payload
    },
    setIsMapLaneObjectives: (state, action) => {
      state.isMapLaneObjectives = action.payload
    },
    setIsMapJungle: (state, action) => {
      state.isMapJungle = action.payload
    },
    setIsClearAll: (state, action) => {
      state.isClearAll = action.payload
    },
    setIsClearLines: (state, action) => {
      state.isClearLines = action.payload
    },
    setIsClearAgents: (state, action) => {
      state.isClearAgents = action.payload
    },
    setIsDownload: (state, action) => {
      state.isDownload = action.payload
    },
    setIsSaveMap: (state, action) => {
      state.isSaveMap = action.payload
    },
    setAgentList: (state, action) => {
      state.agentList = action.payload
    },
    setMapId: (state, action) => {
      state.mapId = action.payload
    },
    setMatchId: (state, action) => {
      state.matchId = action.payload
    },
  },
})

export const { setDrawingColor, setDrawingSize, setSelectedAgent, setDroppedCoordinates, setSelectedTeam, setIsMapDetail, setIsMapLaneObjectives,
  setIsMapJungle, setIsClearAll, setIsClearLines, setIsClearAgents, setIsDownload, setIsSaveMap, setAgentList, setMapId, setMatchId } = editorSlice.actions

export default editorSlice.reducer