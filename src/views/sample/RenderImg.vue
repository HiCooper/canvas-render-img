<template>
  <div class="sample">
    <div class="main">
      <div class="render-area">
        <canvas id="sample-canvas-id"/>
        <div class="btns">
          <el-button type="warning" @click="startSelect">开始框选</el-button>
          <span>{{ coordinate }}</span>
        </div>
      </div>
      <div class="cut-img">
        <canvas id="cut-img-canvas-id"/>
      </div>
    </div>
  </div>
</template>

<script>
import { CanvasBox, drawCutImg } from '@/utils/canvas'
import { isHotkey } from 'is-hotkey'

const sampleImgUrl = 'https://www.hicooper.cn:8077/ajax/bucket/file/master/IMG/邓紫棋.jpg'
export default {
  name: 'RenderImg',
  data () {
    return {
      canvasBox: undefined,
      imgWidth: window.innerWidth * 0.5,
      imgHeight: window.innerHeight * 0.5,
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
          sampleImgUrl,
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
    renderCutImg () {
      drawCutImg('cut-img-canvas-id', sampleImgUrl, this.coordinate, 600)
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
      }
    },
    // 退出自定义选框
    cancelSelect () {
      if (this.canvasBox) {
        this.canvasBox.unRegisterListener()
        window.removeEventListener('keyup', this.handleKeyup)
      }
    },
    selectRectDone (selectPosition, zoom) {
      const x1 = (selectPosition.x / zoom)
      const y1 = (selectPosition.y / zoom)
      const x2 = ((selectPosition.x + selectPosition.w) / zoom)
      const y2 = ((selectPosition.y + selectPosition.h) / zoom)
      this.coordinate = [[y1, x1], [y2, x2]]
      this.renderCutImg()
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

  .main {
    display: flex;

    .cut-img {
      flex: 1 auto;
    }
  }

  .btns {
    display: flex;
    justify-content: space-between;
  }
}

</style>
