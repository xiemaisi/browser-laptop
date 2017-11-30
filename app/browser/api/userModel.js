/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict'

// load utilities
const Immutable = require('immutable')
const path = require('path')
const os = require('os')
const levelUp = require('level')
const historyUtil = require('../../common/lib/historyUtil.js')

// Actions
const appActions = require('../../../js/actions/appActions')

//State
const userModelState = require('../../common/state/userModelState')

// Definitions
const miliseconds = {
  year: 365 * 24 * 60 * 60 * 1000,
  week: 7 * 24 * 60 * 60 * 1000,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000
}



// do things
const tabUpdate = (state,action) => {
 // nothing but update the ums for now
    state=userModelState.setUserActivity()
    return state
}


const removeHistorySite = (state, action) => {
// check to see how ledger removes history
}

const removeAllHistory = (state) => {
// reset wherever you put the history
}


const userAction = (state) => {
    state=userModelState.setUserActivity()
    return state
}

const loadText = (state) => {
    // this gets the text from wherever textScaper puts it
}

const saveCachedInfo = () => {
// writes stuff to leveldb
}

const shoppingData= (url) => {
    historyUtil.getHistory(url)
    const url = "http://www.lugos.name"// really want acive yab
    const score = 1.0 // will use some function of last time
    userModelState.flagSearchState(state,url,score)
}

const flagBuyingSomething = (url) => {
    
}

const classifyPage = () => {
// run NB on the code
}

const getMethods = () => {
  const publicMethods = {
      //always public
  },

    let privatemethods = {}
    
    if (process.env.NODE_ENV === 'test') {
        privateMethods = {
            // private if testing
        }
  }
}

module.exports = getMethods()


