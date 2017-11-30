/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict'
// constants
const appConstants = require('../../../js/constants/appConstants')
const appConfig = require('../../../js/constants/appConfig')


// data things
const tabState = require('../../common/state/tabState') /* for front tab */
const pageDataState = require('../../common/state/pageDataState')
const windowActions = require('../../../js/actions/windowActions') /* not sure this is needed */
const windowConstants = require('../../../js/constants/windowConstants')

//const BrowserWindow = require('electron')

// self & utils
const userModel = require('../api/userModel.js')
const userModelState = require('../../common/state/userModelState')


// webContents.getFocusedWebContents()
// all of these are todo
const userModelReducer = (state, action, immutableAction) => {
    if (!appConfig.adInsertion.enabled) {
        return state
    }
    switch (action.actionType) {
    case appConstants.APP_SET_STATE:
        state = userModel.initUM(state)
        break
    case appConstants.APP_TAB_UPDATED: 
        state = userModel.tabUpdate(state, action)
        break
    case appConstants.APP_REMOVE_HISTORY_SITE:
        state = userModel.removeHistorySite(state, action)
        break
    case appConstants.APP_ON_CLEAR_BROWSING_DATA:
        state = userModel.removeAllHistory(state) 
        break
    case windowConstants.SET_TAB_HOVER_STATE:   // consider removing
        state = userModel.userAction(state)
        break
    case windowConstants.SET_TAB_MOVE:         // ditto; probably no good
        state = userModel.userAction(state)
        break
    case appConstants.APP_WINDOW_READY: //RESOURCE_READY
        state = userModel.loadText(state, action)
        break
    case appConstants.APP_TEXT_SCRAPER_DATA_AVAILABLE:
        state = userModel.loadText(state, action)
        console.log('data in',action)
    case appConstants.APP_TAB_UPDATED:
        state=userModel.loadText(state)
        break
    case appConstants.APP_SHUTTING_DOWN:
        state =  userModel.saveCachedInfo()
        break
    case (appConstants.APP_ADD_AUTOFILL_ADDRESS||appConstants.APP_ADD_AUTOFILL_CREDIT_CARD):
        state = userModel.flagBuyingSomething(url) // where to get URL
        break
    case appConstants.APP_CHANGE_SETTING: // all other settings go here
        {
            switch(action.get('key')) {
            case settings.USERMODEL_ENABELED:
                {
                    state = userModel.initialize(state,action.get('value'))
                    break
                }
            case settings.ADJUST_FREQ:
                {
                    state = userModel.changeAdFreq(state,action.get('value'))
                }
            }
        }

    } // end switch
    return state
}

module.exports = userModelReducer

// TODO need something for search keys
