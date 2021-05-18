<template>
  <div class="sample">
    <div class="render-area">
      <canvas id="sample-canvas-id"/>
    </div>
    <div class="btns">
      <el-button type="warning" @click="startSelect">开始框选</el-button>
      <el-input v-model="coordinate" placeholder="坐标" style="width: 500px;margin-left: 20px"/>
    </div>
  </div>
</template>

<script>
import { CanvasBox } from '@/utils/canvas'
import { isHotkey } from 'is-hotkey'

export default {
  name: 'RenderImg',
  data () {
    return {
      canvasBox: undefined,
      imgWidth: window.innerWidth * 0.8,
      imgHeight: window.innerHeight * 0.8,
      // 当前选框激活状态
      activeDrawRect: false,
      // 自定义选框坐标
      coordinate: undefined
    }
  },
  created () {
    this.renderNormalImg()
  },
  destroyed () {
    this.cancelSelect()
  },
  methods: {
    renderNormalImg () {
      this.$nextTick(() => {
        this.canvasBox = new CanvasBox(
          'sample-canvas-id',
          'https://www.hicooper.cn:8077/ajax/bucket/file/master/IMG/邓紫棋.jpg',
          [[[900, 190], [1350, 1070]], [[400, 80], [850, 1070]]], [],
          {
            width: this.imgWidth,
            height: this.imgHeight
          },
          false,
          this.selectRectDone
        )
      })
    },
    // 开始自定义选框
    startSelect () {
      if (this.canvasBox) {
        this.$message.info({
          duration: 5000,
          message: '按 ESC 退出选框'
        })
        this.canvasBox.registerListener()
        // 键盘按键监听
        window.addEventListener('keyup', this.handleKeyup)
        this.activeDrawRect = true
      }
    },
    // 退出自定义选框
    cancelSelect () {
      if (this.canvasBox) {
        this.canvasBox.unRegisterListener()
        window.removeEventListener('keyup', this.handleKeyup)
      }
      this.activeDrawRect = false
    },
    selectRectDone (selectPosition, zoom) {
      const x1 = (selectPosition.x / zoom)
      const y1 = (selectPosition.y / zoom)
      const x2 = ((selectPosition.x + selectPosition.w) / zoom)
      const y2 = ((selectPosition.y + selectPosition.h) / zoom)
      this.coordinate = String([[[y1, x1], [y2, x2]]])
      console.log(this.coordinate)
    },
    handleKeyup (event) {
      if (isHotkey('esc', event)) {
        this.cancelSelect()
      }
    }
  }
}
</script>

<style scoped lang="scss">

.sample {

  .btns {
    display: flex;
    justify-content: space-between;
  }
}

</style>
