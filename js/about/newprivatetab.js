/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

const React = require('react')
const {StyleSheet, css} = require('aphrodite')
const privateTabIcon = require('../../app/extensions/brave/img/newtab/private_tab_pagearea_icon.svg')
const ddgIcon = require('../../app/extensions/brave/img/newtab/private_tab_pagearea_ddgicon.svg')
const globalStyles = require('../../app/renderer/components/styles/global')
const { theme } = require('../../app/renderer/components/styles/theme')
const {SettingCheckbox} = require('../../app/renderer/components/common/settings')
const settings = require('../constants/settings')
const Stats = require('./newTabComponents/stats')
const Clock = require('./newTabComponents/clock')
const aboutActions = require('./aboutActions')

// TODO: remove it once we use Aphrodite on stats and clock components
require('../../less/about/newtab.less')

const useAlternativePrivateSearchEngineDataKeys = ['newTabDetail', 'useAlternativePrivateSearchEngine']

class NewPrivateTab extends React.Component {
  onChangePrivateSearch (e) {
    aboutActions.changeSetting(settings.USE_ALTERNATIVE_PRIVATE_SEARCH_ENGINE, e.target.value)
  }

  onClickPrivateSearchTitle () {
    const newSettingValue = !this.props.newTabData.getIn(useAlternativePrivateSearchEngineDataKeys)
    aboutActions.changeSetting(settings.USE_ALTERNATIVE_PRIVATE_SEARCH_ENGINE, newSettingValue)
  }

  render () {
    if (!this.props.newTabData) {
      return null
    }
    return <div data-test-id='privateTabContent' className={css(styles.newPrivateTab, styles.newPrivateTabVars)}>
      <div className='statsBar'>
        <Stats newTabData={this.props.newTabData} />
        <Clock />
      </div>
      <div className={css(styles.section_privateTab, styles.wrapper)}>
        <div className={css(styles.iconGutter, styles.lionImage)} />
        <div className={css(styles.textWrapper)}>
          <h1 className={css(styles.title)} data-l10n-id='privateTabTitle' />
          <p className={css(styles.text)} data-l10n-id='privateTabText1' />
          <p className={css(styles.text, styles.text_thirdPartyNote)} data-l10n-id='privateTabText3' />
          {
            this.props.newTabData.hasIn(useAlternativePrivateSearchEngineDataKeys) &&
            <div className={css(styles.privateSearch)}>
              <div className={css(styles.privateSearch__setting)}>
                <SettingCheckbox
                  large
                  switchClassName={css(styles.privateSearch__switch)}
                  rightLabelClassName={css(styles.sectionTitle)}
                  checked={Boolean(this.props.newTabData.getIn(useAlternativePrivateSearchEngineDataKeys))}
                  onChange={this.onChangePrivateSearch.bind(this)}
                />
                <h2 onClick={this.onClickPrivateSearchTitle.bind(this)} className={css(styles.privateSearch__title)}>
                  <span className={css(styles.text_sectionTitle)} data-l10n-id='privateTabSearchSectionTitle' />
                  <strong className={css(styles.text_sectionTitle, styles.text_sectionTitleHighlight)}>DuckDuckGo</strong>
                </h2>
                <img className={css(styles.privateSearch__ddgImage)} src={ddgIcon} alt='DuckDuckGo logo' />
              </div>
              <p className={css(styles.text, styles.text_privateSearch)} data-l10n-id='privateTabSearchText1' />
            </div>
          }
        </div>
      </div>
    </div>
  }
}

// point at which icon gutter should collapse
const atBreakpointIconGutter = `@media screen and (max-width: 800px)`
// point at which Private Search trio (switch, title, logo) should squeeze to fit
const atBreakpointPrivateSearchTitle = '@media screen and (max-width: 590px)'
const styles = StyleSheet.create({
  newPrivateTabVars: {
    '--private-tab-section-title-font-size': '24px',
    '--private-tab-section-title-letter-spacing': globalStyles.typography.display.spacingMedium,
    '--private-tab-section-title-logo-height': 'calc((var(--private-tab-section-title-font-size) / 2) * 3)',

    [atBreakpointPrivateSearchTitle]: {
      '--private-tab-section-title-font-size': '18px',
      '--private-tab-section-title-letter-spacing': globalStyles.typography.display.spacingRegular
    }
  },

  newPrivateTab: {
    background: `linear-gradient(
      ${theme.frame.privateTabBackground},
      ${theme.frame.privateTabBackground2}
    )`,
    backgroundAttachment: 'fixed',
    // fade in from the new tab background color
    animationName: {
      '0%': {
        opacity: '0'
      },
      '100%': {
        opacity: '1'
      }
    },
    animationDuration: `0.35s`,
    animationTiming: 'ease-out',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    minHeight: '100%',
    height: 'initial',
    padding: '40px 60px' // same as newtab
  },

  section_privateTab: {
    margin: '20px 0 0 0'
  },

  wrapper: {
    fontFamily: globalStyles.typography.body.family,
    display: 'flex',
    alignSelf: 'center',
    maxWidth: '780px',

    [atBreakpointIconGutter]: {
      flexDirection: 'column'
    }
  },

  textWrapper: {
    fontFamily: 'inherit',
    marginLeft: '25px',
    marginBottom: 0,
    [atBreakpointIconGutter]: {
      padding: '14px 0',
      alignSelf: 'center',
      display: 'flex',
      flexDirection: 'column'
    }
  },

  iconGutter: {
    minWidth: '80px',
    minHeight: '100px',
    display: 'flex',
    // position contents at the top right
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    flexDirection: 'row',

    [atBreakpointIconGutter]: {
      alignSelf: 'center',
      // position contents in the middle
      justifyContent: 'center'
    }
  },

  lionImage: {
    backgroundImage: `url(${privateTabIcon})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center top',
    backgroundSize: 'contain'
  },

  title: {
    marginTop: '14px',
    marginBottom: '22px',
    fontFamily: globalStyles.typography.display.family,
    letterSpacing: globalStyles.typography.display.spacingLarge,
    fontSize: '30px',
    color: globalStyles.color.white100
  },

  text: {
    lineHeight: '1.4',
    fontSize: '18px',
    color: globalStyles.color.alphaWhite,
    maxWidth: '544px',
    fontFamily: 'inherit',
    ':not(:last-of-type)': {
      paddingBottom: '20px'
    }
  },

  text_privateSearch: {
    fontSize: '17px',
    lineHeight: '1.5'
  },

  text_thirdPartyNote: {
    fontStyle: 'italic',
    fontSize: '15px'
  },

  text_sectionTitle: {
    fontFamily: globalStyles.typography.display.family,
    fontSize: 'var(--private-tab-section-title-font-size)',
    fontWeight: '400',
    color: globalStyles.color.white100,
    letterSpacing: 'var(--private-tab-section-title-letter-spacing)'
  },

  text_sectionTitleHighlight: {
    fontWeight: '600',
    marginLeft: '7px'
  },

  privateSearch: {
    marginTop: '40px'
  },

  privateSearch__setting: {
    marginBottom: '25px',
    display: 'flex',
    alignItems: 'center'
  },

  privateSearch__ddgImage: {
    width: 'auto',
    height: 'var(--private-tab-section-title-logo-height)'
  },

  privateSearch__switch: {
    marginRight: '14px',
    padding: 0,
    cursor: 'pointer'
  },

  privateSearch__title: {
    whiteSpace: 'nowrap',
    marginRight: '18px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  }
})

module.exports = NewPrivateTab
