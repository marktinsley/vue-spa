import {alert, datepicker, modal} from 'vue-strap'
import ErrorMessage from './ErrorMessage/Component.vue'
import Notification from './Notification/Component.vue'
import NotificationGroup from './NotificationGroup/Component.vue'
import NavBar from './NavBar/Component.vue'
import PageContainer from './PageContainer/Component.vue'
import PageHeader from './PageHeader/Component.vue'
import Panel from './Panel/Component.vue'
import ProgressBar from './ProgressBar/Component.vue'

export default class GlobalComponentsRegistrar {
  /**
   * Register all global components.
   *
   * @param Vue
   */
  static register (Vue) {
    Vue.component('gnb-error-message', ErrorMessage)
    Vue.component('gnb-notification', Notification)
    Vue.component('gnb-notification-group', NotificationGroup)
    Vue.component('gnb-nav-bar', NavBar)
    Vue.component('gnb-page-container', PageContainer)
    Vue.component('gnb-page-header', PageHeader)
    Vue.component('gnb-panel', Panel)
    Vue.component('gnb-progress-bar', ProgressBar)

    GlobalComponentsRegistrar.registerVueStrapComponents(Vue)
  }

  /**
   * Register Vue-Strap components.
   *
   * Others: (https://yuche.github.io/vue-strap)
   *    - carousel
   *    - slider
   *    - accordion
   *    - affix
   *    - aside
   *    - checkboxBtn
   *    - checkboxGroup
   *    - dropdown
   *    - panel
   *    - typeahead
   *
   * @param Vue
   */
  static registerVueStrapComponents (Vue) {
    Vue.component('gnb-alert', alert)
    Vue.component('gnb-date-picker', datepicker)
    // Vue.component('gnb-drop-down', DropDown)
    Vue.component('gnb-modal', modal)
    // Vue.component('gnb-popover', Popover)
    // Vue.component('gnb-radio-group', RadioGroup)
    // Vue.component('gnb-radio-button', RadioButton)
    // Vue.component('gnb-select', Select)
    // Vue.component('gnb-select-option', SelectOption)
    // Vue.component('gnb-tabs', Tabs)
    // Vue.component('gnb-tab', Tab)
    // Vue.component('gnb-tool-tip', ToolTip)
  }
}