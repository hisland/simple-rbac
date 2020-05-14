<template>
  <div class="wrap">
    <!-- <RadioGroup v-model="type" type="button" @on-change="SetType">
      <Radio label="text"></Radio>
      <Radio label="img"></Radio>
    </RadioGroup>-->
    <div v-if="type === 'text'">
      <Form :label-width="120">
        <FormItem label="图片识别">
          <Upload
            action="/api/take-parse-img"
            :paste="true"
            :before-upload="BeforeUpload"
            :on-success="DoneUpload"
            :show-upload-list="false"
          >
            <textarea class="pasteWrap" @click.stop.prevent v-model="imgText"></textarea>
          </Upload>
          <img
            v-if="imgUrlTemp"
            :src="imgUrlTemp"
            style="height:100px;border: 1px solid #000;display:block;"
          />
        </FormItem>
        <FormItem label="刷卡卡片">
          <Select v-model="postItem.cardId">
            <Option
              v-for="(vv0, index0) in cardList"
              :key="index0"
              :value="vv0._id"
            >{{ vv0.cardNickName }}({{ vv0.userId.realName }})</Option>
          </Select>
        </FormItem>
        <FormItem label="刷卡金额">
          <Input type="text" v-model="postItem.money" />
        </FormItem>
        <FormItem label="刷卡时间">
          <DatePicker v-model="postItem.time" type="datetime" style="width: 100%"></DatePicker>
        </FormItem>
        <FormItem>
          <Button @click="SaveText()">保存</Button>
        </FormItem>
      </Form>
    </div>
    <div v-if="type === 'img'">
      <div>
        <input type="file" ref="file" />
      </div>
      <div v-if="imgObj">
        <div>{{ imgObj.cardNo }}</div>
        <div>{{ imgObj.amount }}</div>
        <div>{{ imgObj.time }}</div>
      </div>
      <div>
        <Button @click="UpImg()">上传</Button>
        <Button @click="SaveImg()" v-if="imgObj">保存</Button>
      </div>
    </div>
  </div>
</template>
<script>
import apiAxios from '@/apiAxios.js'

export default {
  components: {},
  data() {
    return {
      isVisible: false,
      type: 'text',
      cardList: [],
      postItem: {
        cardId: null,
        money: '',
        time: new Date(),
      },
      imgObj: null,
      imgText: '截图后点击这里粘贴',
      imgUrlTemp: '',
    }
  },
  watch: {},
  props: {
    id: null,
    buttonText: { type: String, default: '添加' },
  },
  computed: {},
  methods: {
    BeforeUpload(file) {
      this.imgUrlTemp = URL.createObjectURL(file)
      this.imgText = '上传中...'
    },
    DoneUpload(response, file, fileList) {
      const { text } = response.result
      const text2 = text.trim().replace(/\n\n+/g, '\n')
      this.imgText = text2
      const money = text2.match(/\d+.\d\d/)
      const time = text2.match(/\d{4}[-.]\d{2}[-.]\d{2} \d{2}:\d{2}:\d{2}/)
      const no = text2.match(/\d{4}$/)

      // console.log(money, time, no)

      if (money) {
        this.postItem.money = money[0]
      }
      if (time) {
        const t1 = time[0].replace(/\./g, '-')
        // console.log(t1)
        this.postItem.time = new Date(t1)
      }
      if (no) {
        const cardMatch = this.cardList.filter(vv =>
          vv.cardNickName.endsWith(no[0])
        )
        if (cardMatch.length === 1) {
          this.postItem.cardId = cardMatch[0]._id
        }
      }
    },
    async SetType(type) {
      this.type = type
      if (type === 'text') {
        await this.LoadCardList()
      } else {
      }
    },
    async LoadCardList() {
      const { data } = await apiAxios.get('/card-list-all?cardType=cc')
      this.cardList = data.result
    },
    async SaveText() {
      const { data } = await apiAxios.post('/take-save-text', this.postItem)
      this.$emit('DoneSave', data.result)
      this.$parent.$parent.DoHide()
    },
    async UpImg() {
      const form = new FormData()
      form.append('file', this.$refs.file.files[0])
      const { data } = await apiAxios.post('/take-up-img', form)
      this.imgObj = data.result
    },
    async SaveImg() {
      const { data } = await apiAxios.post('/take-save-img', this.imgObj)
      this.$emit('DoneSave', data.result)
      this.$parent.$parent.DoHide()
    },
  },
  async mounted() {
    await this.LoadCardList()
  },
}
</script>
<style lang="scss" scoped>
.pasteWrap {
  width: 300px;
  height: 100px;
  background: pink;
  resize: none;
  line-height: 1;
}
</style>
