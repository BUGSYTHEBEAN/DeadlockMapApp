import { createSlice } from '@reduxjs/toolkit'

export const editorSlice = createSlice({
  name: 'editor',
  initialState: {
    drawingColor: '#fff',
    selectedAgent: '',
    selectedTeam: 'sapphire',
    isMapDetail: true,
    isMapLaneObjectives: true,
    isClearAll: false,
    isClearLines: false,
    isClearAgents: false,
    isDownload: false,
  },
  reducers: {
    setDrawingColor: (state, action) => {
      state.drawingColor = action.payload
    },
    setSelectedAgent: (state, action) => {
      state.selectedAgent = action.payload
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
  },
})

export const { setDrawingColor, setSelectedAgent, setSelectedTeam, setIsMapDetail, setIsMapLaneObjectives,
  setIsClearAll, setIsClearLines, setIsClearAgents, setIsDownload } = editorSlice.actions

export default editorSlice.reducer