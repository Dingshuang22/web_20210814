// LineMarker
import LineMarker from '@/components/Charts/LineMarker'
// dialog
import MyDialog from '@/components/Dialog'
import BaseDialog from '@/components/BaseDialog'
import QueryList from "./QueryList";
// table
import FreeTable from '@/components/table/FreeTable'
export default {
  install(Vue, options) {
    Vue.component('FreeTable', FreeTable)
    Vue.component('QueryList', QueryList)
    Vue.component('BaseDialog', BaseDialog)
    Vue.component('QueryList', QueryList)
    Vue.component('MyDialog', MyDialog)
    Vue.component('LineMarker', LineMarker)
  }
}


