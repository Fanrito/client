<template>
    <n-space vertical align="center" >
      <n-steps :current="current" >
        <n-step
          title="I Me Mine"
          description="填写信息"
        />
        &emsp;
        <n-step current="current"
          title="Let It Be"
          description="发布完成"
        />
      </n-steps>

      <n-space>
        <n-button-group>
            <n-button @click="prev" type="error">pre</n-button>
            <n-button @click="next" type="success">next</n-button>
        </n-button-group>

        <!-- <n-radio-group v-model:value="currentStatus" size="medium" name="basic">
          <n-radio-button value="error">
            Error
          </n-radio-button>
          <n-radio-button value="process">
            Process
          </n-radio-button>
          <n-radio-button value="wait">
            Wait
          </n-radio-button>
          <n-radio-button value="finish">
            Finish
          </n-radio-button>
        </n-radio-group> -->
      </n-space>
    </n-space>
  </template>
  
  <script>
  import { defineComponent, ref } from "vue";
//   import { MdArrowRoundBack, MdArrowRoundForward } from "@vicons/ionicons4";
  
  export default defineComponent({
    components: {
    //   MdArrowRoundBack,
    //   MdArrowRoundForward
    },
    setup() {
      const currentRef = ref(1);
      return {
        currentStatus: ref("process"),
        current: currentRef,
        next() {
          if (currentRef.value === null)
            currentRef.value = 1;
          else if (currentRef.value >= 4)
            currentRef.value = null;
          else
            currentRef.value++;
        },
        prev() {
          if (currentRef.value === 0)
            currentRef.value = null;
          else if (currentRef.value === null)
            currentRef.value = 4;
          else
            currentRef.value--;
        }
      };
    }
  });
  </script>