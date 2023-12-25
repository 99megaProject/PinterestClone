import { configureStore, combineReducers } from '@reduxjs/toolkit'
import uiFeatureSlice from '../slices/uiFeature.slice'

const reducer = combineReducers({   uiFeatureSlice })

export const store = configureStore({ reducer })