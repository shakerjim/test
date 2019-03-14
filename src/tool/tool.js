class Util {
  constructor(arg) {

  }

  checkDownload(src) {
    let reg = /\.(jpg|png|pdf|txt|html|log|mp3)$/g
    reg.exec(src)
    if (reg) {
      this.downloadImg(src);
    } else {
      this.download(src);
    }
    return this;
  }

  downloadImg(src) {
    let downloadTag = document.createElement('a');
    downloadTag.setAttribute('href', src);
    downloadTag.setAttribute('download', '');
    let myEvent = document.createEvent('MouseEvents');
    myEvent.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, true, false, 0);
    downloadTag.dispatchEvent(myEvent);
    return this;
  }

  download(src) {
    window.open(src);
    return this;
  }

  allDownload(list) {
    if (this.checkArr(list)) {
      list.forEach(el => {
        this.checkDownload(el);
      })
    };
    return this
  }

  checkArr(list) {
    return Array.isArray(list);
  }
  datefilter(date, sep) {
    var sep = sep ? sep : "/"
    return new Date(date).getFullYear() +
      sep +
      (new Date(date).getMonth() + 1) +
      sep +
      new Date(date).getDate();
  }
}
export default Util
