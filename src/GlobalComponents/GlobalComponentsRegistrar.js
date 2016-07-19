import {alert, datepicker, modal} from 'vue-strap'
import ErrorMessage from './ErrorMessage/Component.vue'
import NavBar from './NavBar/Component.vue'
import PageContainer from './PageContainer/Component.vue'
import PageHeader from './PageHeader/Component.vue'
import Panel from './Panel/Component.vue'
import Pager from './Pager/Component.vue'
import ProgressBar from './ProgressBar/Component.vue'
import Spinner from './Spinner/Component.vue'

export class GlobalComponentsRegistrar {
  /**
   * Register all global components.
   *
   * @param Vue
   */
  static register (Vue) {
    Vue.component('gnb-error-message', ErrorMessage)
    Vue.component('gnb-nav-bar', NavBar)
    Vue.component('gnb-page-container', PageContainer)
    Vue.component('gnb-page-header', PageHeader)
    Vue.component('gnb-panel', Panel)
    Vue.component('gnb-pager', Pager)
    Vue.component('gnb-progress-bar', ProgressBar)
    Vue.component('gnb-spinner', Spinner)

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
