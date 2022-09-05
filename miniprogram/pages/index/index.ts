// index.ts
// 获取应用实例
const app = getApp<IAppOption>()
const fs = wx.getFileSystemManager()

//[{fileType: "image", size: 334169, tempFilePath: "wxfile://tmp_93c8e0d517b2adb28186e10ddf8d6b20.jpg"}]

Page({
  data: {
    tempFiles: [],
    existTempFiles: [],
    tempFile: "wxfile://tmp_093242a4467423627e5dd33b0432c37f.jpg",
  },
  onClick() {
    var that = this
    wx.chooseMedia({
      count: 9,
      mediaType: ['mix'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
        console.log(res.tempFiles)
        that.setData({
          tempFiles: res.tempFiles
        })
        wx.setStorageSync("tempFiles", res.tempFiles)
      },
      fail(err) {
        console.log(err)
      }
    })
  },
  onGetTempFiles() {
      this.setData({
        existTempFiles: wx.getStorageSync("tempFiles")
      })
  },
  onPreviewImage(e: any) {
    try {
      fs.accessSync(e.currentTarget.dataset.item.tempFilePath)
      wx.showToast({
        title: "文件存在",
        icon: 'success'
      })
    } catch(e) {
      console.error(e)
      wx.showToast({
        title: "文件不存在",
        icon: 'error'
      })
    }
    console.log(e.currentTarget.dataset.item)
  },
})
