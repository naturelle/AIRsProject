
import Quill from 'quill'
 
export default {
  name: "QuillEditor",
  mounted () {
    this.initQuill()
  },
  beforeDestroy () {
    this.quill = null
    delete this.quill
  },
  methods: {
    initQuill () {
      const quill = new Quill('#editor', {
        theme: 'snow',
        modules: {
          toolbar: '#toolbar'
        }
      })
      this.quill = quill
      this.quill.getModule("toolbar").addHandler("image", this.uploadImageHandler)
    },
    uploadImageHandler () {
      const input = document.querySelector('#uploadImg')
      input.value = ''
      input.click()
    },
    async uploadImage (event) {
      const form = new FormData()
      form.append('upload_file', event.target.files[0])
      const url = await $.ajax(...)
      const addImageRange = this.quill.getSelection()
      const newRange = 0 + (addImageRange !== null ? addImageRange.index : 0)
      this.quill.insertEmbed(newRange, 'image', url)
      this.quill.setSelection(1 + newRange)
    }
  }
}


