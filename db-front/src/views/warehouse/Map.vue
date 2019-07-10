/* eslint-disable */

<template>
  <div id="pleaseresize">
    <a-layout id="map-components" style="height:100%;">
      <a-layout-content>
        <div class="map" id="map" style="height:100%"></div>
      </a-layout-content>
      <a-layout-sider theme="light">
        <a-tree-select
          :treeData="treeData"
          :value="value"
          @change="onChange"
          treeCheckable
          :showCheckedStrategy="SHOW_PARENT"
          searchPlaceholder="Please select"
          style="width:100%;"
        />
      </a-layout-sider>
    </a-layout>
  </div>
</template>

<script>

import BMap from 'BMap'
import router from '../../router'
import warehouseMarker from '../../assets/marker/warehouse.png'
import {getAllWarehouse, getWarehousePreview} from '@/api/warehouse'
import {getEquipmentStoredList, getEquipmentUsingList} from '@/api/equipment'
import {getAccesoryInWarehouse, getAccessoryInWarehouse} from '@/api/accessory'


import { TreeSelect } from 'ant-design-vue'
var overlays = []
const SHOW_PARENT = TreeSelect.SHOW_PARENT
const functionBox = {
  '0-0': ["仓库", getWarehousePreview],
  '0-1': ['在用器材',getEquipmentUsingList],
}

const treeData = [{
  title: '仓库',
  value: '0-0',
  key: '0-0',
}, 
{
  title: '在用器材',
  value: '0-1',
  key: '0-1',
}]

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
  map.addControl(stCtrl)// 添加全景控件
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
  var marker2 = new BMap.Marker(pt, { icon: myIcon })// 创建标注
  window.map.addOverlay(marker2)// 将标注添加到地图中
  console.log('Test Marker added!')
}

export function jumpWarehouse(id){
  router.push('/warehouse/detail/'+id)
}
window.initialize = initialize

export default {
  name: 'Map',
  data () {
    return {
      value: ['0-0', '0-1'],
      treeData,
      SHOW_PARENT
    }
  },
  methods: {
    jumpWarehouse(id){
      router.push('/warehouse/detail/'+id)
    },
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
    translateAddress(address, id, name){
      var myGeo = new BMap.Geocoder();
      myGeo.getPoint(address, function(point){
        if (point) {
          var myIcon = new BMap.Icon(warehouseMarker, new BMap.Size(70, 70))
          var marker = new BMap.Marker(point, { icon: myIcon })
          var sContent =
          `<h4 style='margin:0 0 5px 0;padding:0.2em 0'>${name}</route-link></h4>` + 
          "<img style='float:right;margin:4px' id='imgDemo' src='../img/tianAnMen.jpg' width='139' height='104' title='天安门'/>" + 
          "<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>天安门坐落在中国北京市中心,故宫的南侧,与天安门广场隔长安街相望,是清朝皇城的大门...</p>" + 
          "</div>";
          var infoWindow = new BMap.InfoWindow(sContent);
          marker.addEventListener("mouseover", function(){
            this.openInfoWindow(infoWindow)
            document.getElementById('imgDemo').onload = function (){
              infoWindow.redraw();   //防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
            }
          })
          marker.addEventListener("mouseout", function(){
            this.closeInfoWindow(infoWindow)
          })
          marker.addEventListener("onclick", function(){
            router.push("/warehouse/detail/" + id)
          })
          overlays.push(marker)
          window.map.addOverlay(marker)
        }else{
          alert("您选择地址没有解析到结果!")
        }
      }, "上海市");
    },
    refreshMap(){
      for(var overlay of overlays){
        window.map.removeOverlay(overlay)
      }
      for(var v of this.value){
        var typeFunctionPair = functionBox[v]
        var type = typeFunctionPair[0]
        var func = typeFunctionPair[1]
        if(type == "仓库"){
          func().then( response => {
              console.log(response.data)
              var warehouseData = [...response.data]
              for(var warehouse of warehouseData){
                var address = warehouse.address
                var id = warehouse.id
                var name = warehouse.name
                console.log(address, id)
                this.translateAddress(address, id, name)
              }
          })
        }
        else{
          func().then( response => {
            console.log(response)
          })
        }
      }
      var shanghai = new BMap.Point(121.48, 31.22)
      window.map.centerAndZoom(shanghai, 11)
    }
  },
  mounted () {
    // this.loadScript()
    refreshMapContainer()
    window.onresize = () => {
      refreshMapContainer()
    }
    initialize()
    this.refreshMap()
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
