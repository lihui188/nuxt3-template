export default defineNuxtPlugin((nuxtApp) => {
    // 客户端 & 服务端
    nuxtApp.hook("app:created", (vueApp) => {
      console.log("app:created");
    });
    // 服务端
    nuxtApp.hook("app:beforeMount", (vueApp) => {
      console.log("app:beforeMount");
    });
    // 客户端 & 服务端
    nuxtApp.hook("vue:setup", () => {
      console.log("vue:setup");
    });
    // 服务端
    nuxtApp.hook("app:rendered", (renderContext) => {
      console.log("app:rendered");
    });
    // 客户端
    nuxtApp.hook("app:mounted", (vueApp) => {
      console.log("app:mounted");
    });
  });
  