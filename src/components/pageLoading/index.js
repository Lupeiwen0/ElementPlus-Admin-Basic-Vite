import { ElLoading } from "element-plus";


// 在考虑是否需要单例模式，看具体使用情况在修改
// 返回loadingService服务状态的实例  Loading.service()方式调用

class Service {
  constructor() {
    this.div = undefined
    this.loadingMask = undefined
  }
  service (options = {}) {
    const node = document.getElementsByClassName("ldx-axios-loading");
    if (node.length > 0) return this;
    const { title, background } = options;
    this.div = document.createElement("div");
    this.div.setAttribute("class", "ldx-axios-loading");
    this.div.style.position = "fixed";
    this.div.style.width = "100vw";
    this.div.style.height = "100vh";
    this.div.style.left = 0;
    this.div.style.right = 0;
    this.div.style.top = 0;
    this.div.style.bottom = 0;
    this.div.style.display = "flex";
    this.div.style.alignItems = "center";
    this.div.style.justifyContent = "center";
    this.div.style.zIndex = "999999";
    if (background) this.div.style.background = background;
    document.body.appendChild(this.div);

    this.loadingMask = ElLoading.service({
      target: this.div,
      text: title || "",
      background: "rgba(230,247,255,0.4)",
    });

    return this;
  }
  close () {
    const node = document.getElementsByClassName("ldx-axios-loading");
    if (node.length > 0) {
      this.loadingMask?.close();
      this.div?.remove();
    }
  }
}

export const Loading = new Service();
