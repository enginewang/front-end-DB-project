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
import warehouseMarker from '../../assets/marker/warehouse.png'

import { TreeSelect } from 'ant-design-vue'
const SHOW_PARENT = TreeSelect.SHOW_PARENT

const treeData = [{
  title: 'Node1',
  value: '0-0',
  key: '0-0',
  children: [{
    title: 'Child Node1',
    value: '0-0-0',
    key: '0-0-0'
  }]
}, {
  title: 'Node2',
  value: '0-1',
  key: '0-1',
  children: [{
    title: 'Child Node3',
    value: '0-1-0',
    key: '0-1-0',
    disabled: true
  }, {
    title: 'Child Node4',
    value: '0-1-1',
    key: '0-1-1'
  }, {
    title: 'Child Node5',
    value: '0-1-2',
    key: '0-1-2'
  }]
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
  window.map.centerAndZoom(startPoint, 15)
  map.enableScrollWheelZoom(true)
  // 覆盖区域图层测试
  map.addTileLayer(new BMap.PanoramaCoverageLayer())

  var stCtrl = new BMap.PanoramaControl() // 构造全景控件
  stCtrl.setOffset(new BMap.Size(20, 20))
  map.addControl(stCtrl)// 添加全景控件
  var loadCount = 1
  map.addEventListener('tilesloaded', function () {
    if (loadCount === 1) {
      map.setCenter(startPoint)
    }
    loadCount = loadCount + 1
  })
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

window.initialize = initialize

export default {
  name: 'Map',
  data () {
    return {
      value: ['0-0-0'],
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
    }
  },
  mounted () {
    // this.loadScript()
    refreshMapContainer()
    window.onresize = () => {
      refreshMapContainer()
    }
    initialize()
    addTestWarehouseMarker()
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
