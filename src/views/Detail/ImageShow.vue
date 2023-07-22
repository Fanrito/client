<template>
    <n-carousel show-arrow autoplay>
      <div v-for="(url,index) in imageUrls" :key="index">
        <img
          class="carousel-img"
          :src="url"
        />      
      </div>


      <template #arrow="{ prev, next }">
        <div class="custom-arrow">
          <button type="button" class="custom-arrow--left" @click="prev">
            <n-icon><ArrowBack /></n-icon>
          </button>
          <button type="button" class="custom-arrow--right" @click="next">
            <n-icon><ArrowForward /></n-icon>
          </button>
        </div>
      </template>
      <template #dots="{ total, currentIndex, to }">
        <ul class="custom-dots">
          <li
            v-for="index of total"
            :key="index"
            :class="{ ['is-active']: currentIndex === index - 1 }"
            @click="to(index - 1)"
          />
        </ul>
      </template>
    </n-carousel>
  </template>
  
  <script>
  import { ArrowBack, ArrowForward } from "@vicons/ionicons5";
  import { defineComponent } from "vue";
  
  export default defineComponent({
    components: {
      ArrowBack,
      ArrowForward
    },
    data(){
      return{

      }
    },
    props:{
      imageUrls:{
        type:Array,
        default:[
                "https://img12.360buyimg.com/n1/jfs/t1/143936/32/30842/64747/6454ce5cF6b1adc51/065b11723a5094fb.jpg",
                "https://th.bing.com/th/id/R.f7ed7e216a92f91882f100a2581b9ac6?rik=7y4ciD%2bJL3VuVg&pid=ImgRaw&r=0",
                "https://th.bing.com/th/id/OIP.caoz0WhiAKT7-PfdN0S4dAHaE8?pid=ImgDet&w=800&h=535&rs=1",
                "https://th.bing.com/th/id/OIP.QwUNM329lhtfEI60_kjnbgHaDF?pid=ImgDet&w=750&h=312&rs=1"
        ],
        required:true
      }
    }

  });
  </script>
  
  <style scoped>
  .carousel-img {
    width: 100%;
    height: 240px;
    object-fit: cover;
  }
  
  .custom-arrow {
    display: flex;
    position: absolute;
    bottom: 25px;
    right: 10px;
  }
  
  .custom-arrow button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    margin-right: 12px;
    color: #fff;
    background-color: rgba(255, 255, 255, 0.1);
    border-width: 0;
    border-radius: 8px;
    transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
  }
  
  .custom-arrow button:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  .custom-arrow button:active {
    transform: scale(0.95);
    transform-origin: center;
  }
  
  .custom-dots {
    display: flex;
    margin: 0;
    padding: 0;
    position: absolute;
    bottom: 20px;
    left: 20px;
  }
  
  .custom-dots li {
    display: inline-block;
    width: 12px;
    height: 4px;
    margin: 0 3px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.4);
    transition: width 0.3s, background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
  }
  
  .custom-dots li.is-active {
    width: 40px;
    background: #fff;
  }
  </style>