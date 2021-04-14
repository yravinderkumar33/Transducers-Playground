const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

const ele = {
  onDismiss() {
    return new Promise((resolve, reject) => {
      myEmitter.on("msg", () => {
        resolve({ name: "ravinder" });
      });
    });
  },
  create() {
    console.log(`element is created`);
    return Promise.resolve();
  },
  dismiss() {
    myEmitter.emit("msg");
  },
};


setTimeout(() => {
    ele.dismiss();
  }, 5000);


ele.create().then(res => ele.onDismiss())
.then((res) => {
  console.log(res);
});
