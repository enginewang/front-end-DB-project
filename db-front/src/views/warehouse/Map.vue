/* eslint-disable */

<template>
  <div id="pleaseresize">
    <a-layout id="map-components"
              style="height:100%;">
      <a-layout-content>
        <div class="map"
             id="map"
             style="height:100%"></div>
      </a-layout-content>
      <a-layout-sider theme="light">
        <a-tree-select :treeData="treeData"
                       :value="value"
                       @change="onChange"
                       treeCheckable
                       :showCheckedStrategy="SHOW_PARENT"
                       searchPlaceholder="Please select"
                       style="width:100%;" />
      </a-layout-sider>
    </a-layout>
  </div>
</template>

<script>
import BMap from 'BMap'
import router from '../../router'
import warehouseMarker from '../../assets/marker/warehouse.png'
import usingEquipMarker from '../../assets/marker/usingEquipment.png'
import { getAllWarehouse, getWarehousePreview, getAll } from '@/api/warehouse'
import { getEquipmentStoredList, getEquipmentUsingList } from '@/api/equipment'
import { getAccesoryInWarehouse, getAccessoryInWarehouse } from '@/api/accessory'


import { TreeSelect } from 'ant-design-vue'
var overlays = []
const SHOW_PARENT = TreeSelect.SHOW_PARENT
const functionBox = {
  '0-0': ["仓库", getWarehousePreview],
  // '0-1': ['在用器材', getEquipmentUsingList],
}

const treeData = [
  //   {
  //   title: '仓库',
  //   value: '0-0',
  //   key: '0-0',
  // },
]
// {
//   title: '在用器材',
//   value: '0-1',
//   key: '0-1',
// }]

function refreshMapContainer () {
  var mapContainer = document.getElementById('pleaseresize')
  var h = document.getElementsByClassName('ant-layout-content')[0].offsetHeight
  mapContainer.setAttribute('style', 'height:' + h + 'px;')
}

const startPoint = new BMap.Point(116.404, 39.915)

function initialize () {
  const map = new BMap.Map('map')
  window.map = map
  // window.map.centerAndZoom(startPoint, 15)
  map.enableScrollWheelZoom(true)
  // 覆盖区域图层测试
  map.addTileLayer(new BMap.PanoramaCoverageLayer())

  var stCtrl = new BMap.PanoramaControl() // 构造全景控件
  stCtrl.setOffset(new BMap.Size(20, 20))
  map.addControl(stCtrl) // 添加全景控件
  var loadCount = 1
  // map.addEventListener('tilesloaded', function () {
  //   if (loadCount === 1) {
  //     map.setCenter(startPoint)
  //   }
  //   loadCount = loadCount + 1
  // })

}

function addTestWarehouseMarker () {
  var pt = new BMap.Point(116.417, 39.909)
  var myIcon = new BMap.Icon(warehouseMarker, new BMap.Size(70, 70))
  var marker = new BMap.Marker(startPoint, { icon: myIcon })
  window.map.addOverlay(marker)
  var marker2 = new BMap.Marker(pt, { icon: myIcon }) // 创建标注
  window.map.addOverlay(marker2) // 将标注添加到地图中
  console.log('Test Marker added!')
}

export function jumpWarehouse (id) {
  router.push('/warehouse/detail/' + id)
}
window.initialize = initialize

export default {
  name: 'Map',
  data () {
    return {
      // value: ['0-0', '0-1'],
      value: [],

      treeData,
      SHOW_PARENT
    }
  },
  methods: {
    loadScript () {
      var script = document.createElement('script')
      script.src = 'http://api.map.baidu.com/api?v=2.0&ak=CvqBqDrjbtb6R31TBqy5zCFz1fUtuNZQ&callback=initialize'
      document.body.appendChild(script)
      console.log('script appended')
    },
    onChange (value) {
      console.log('onChange ', value)
      this.value = value
      this.refreshMap()
    },
    appendWarehouse (address, id, name, lat, lon) {
      var point = new BMap.Point(lon, lat)
      var myIcon = new BMap.Icon(warehouseMarker, new BMap.Size(70, 70))
      var marker = new BMap.Marker(point, { icon: myIcon })
      var sContent =
        `<h4 style='margin:0 0 5px 0;padding:0.2em 0'>${name}</h4>` +
        `<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>${address}</p>` +
        "</div>";
      var infoWindow = new BMap.InfoWindow(sContent);
      marker.addEventListener("mouseover", function () {
        this.openInfoWindow(infoWindow)
      })
      marker.addEventListener("mouseout", function () {
        this.closeInfoWindow(infoWindow)
      })
      marker.addEventListener("onclick", function () {
        router.push("/warehouse/detail/" + id)
      })
      overlays.push(marker)
      window.map.addOverlay(marker)
    },
    appendEquipment (address, lat, lon, model, pic, qrCode, type, id) {
      var point = new BMap.Point(lon, lat)
      var myIcon = new BMap.Icon(usingEquipMarker, new BMap.Size(70, 70))
      var marker = new BMap.Marker(point, { icon: myIcon })
      var sContent =
        `<h4 style='margin:0 0 5px 0;padding:0.2em 0'>${type} : ${model}</h4>` +
        `<img style='float:right;margin:4px' id='imgDemo' src='${pic}' width='70' height='70' title='${type} : ${model}'/>` +
        `<img style='float:right;margin:4px' id='imgDemo' src='${qrCode}' width='70' height='70' title='${type} : ${model}'/>` +
        `<p style='margin:0;line-height:1.5;font-size:13px;'>${address}</p>` +
        "</div>";
      var infoWindow = new BMap.InfoWindow(sContent);
      marker.addEventListener("mouseover", function () {
        this.openInfoWindow(infoWindow)
        document.getElementById('imgDemo').onload = function () {
          infoWindow.redraw();
        }
      })
      marker.addEventListener("mouseout", function () {
        this.closeInfoWindow(infoWindow)
      })
      marker.addEventListener("onclick", function () {
        router.push("/equipment/detail/" + id)
      })
      overlays.push(marker)
      window.map.addOverlay(marker)
    },
    getTree () {
      getAll().then(response => {
        var warehouses = response.data.warehouse
        this.value = []
        for (var warehouse of warehouses) {
          var id = warehouse.id
          var lat = warehouse.lat
          var lon = warehouse.lon

          var name = warehouse.name
          this.value.push(name)
          this.treeData.push({
            title: name,
            key: name,
            value: name
          })
        }
      })
    },
    refreshMap () {
      for (var overlay of overlays) {
        window.map.removeOverlay(overlay)
      }

      getAll().then(response => {
        var warehouses = response.data.warehouse
        var equips = response.data.usingEquipment


        // for (var v of this.value) {
        // var type = functionBox[v][0]
        // if (v == "仓库") {

        var finallat = 121.222
        var finallon = 31.291
        for (var warehouse of warehouses) {

          var id = warehouse.id
          var lat = warehouse.lat
          var lon = warehouse.lon
          var name = warehouse.name
          console.log('data.value', this.value)
          var detailedAddress = warehouse.detailedAddress
          if (this.value.indexOf(name) != -1) {
            console.log("inininin")
            finallat = lat
            finallon = lon
            this.appendWarehouse(detailedAddress, id, name, lat, lon)

          }
          // }
          // }
          // else {
          //   console.log("在用器材")
          //   for (var equip of equips) {
          //     var detailedAddress = equip.detailedAddress
          //     var lat = equip.lat
          //     var lon = equip.lon
          //     var model = equip.model
          //     var pic = equip.pic
          //     var qrCode = equip.qrCode
          //     var type = equip.type
          //     var id = equip.id
          //     this.appendEquipment(detailedAddress, lat, lon, model, pic, qrCode, type, id)
          //   }
          // }
        }

        console.log(response)
        console.log('point', finallat, finallon)

        var TJJD = new BMap.Point(finallon, finallat)
        window.map.centerAndZoom(TJJD, 16)
      })



      // for(var v of this.value){
      //   var typeFunctionPair = functionBox[v]
      //   var type = typeFunctionPair[0]
      //   var func = typeFunctionPair[1]
      //   if(type == "仓库"){
      //     func().then( response => {
      //         console.log(response.data)
      //         var warehouseData = [...response.data]
      //         for(var warehouse of warehouseData){
      //           var address = warehouse.address
      //           var id = warehouse.id
      //           var name = warehouse.name
      //           console.log(address, id)
      //           this.translateAddress(address, id, name)
      //         }
      //     })
      //   }
      //   else{
      //     func().then( response => {
      //       console.log(response)
      //     })
      //   }
      // }

    }
  },
  created () {
    this.getTree()

  },
  mounted () {
    // this.loadScript()
    refreshMapContainer()
    // window.onresize = () => {
    //   refreshMapContainer()
    // }
    initialize()
    this.refreshMap()
    console.log("refreshmap")

    // addTestWarehouseMarker()
  }
}
</script>

<style>
/* #map-components {
    width:50%;
    height: 100%;
  }
  #map {
    height: 100%;
  }
  #container {
    height: 100%;
  } */

.checkbox-vertical {
  display: block;
  margin-right: 0;
}

/* #map-layout{
    height: 100%;
  } */

/* .ant-layout-content{
    height: 100%;
  } */
/* html,body{
    width: 100%;
    height: 100%;
  } */
</style>
