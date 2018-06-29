<script>
    import avController from  "../part/av-controller.vue";



    export default {
        props: ['activeSectionObj'],
        components: {
            'av-controller': avController,
        },
        data(){
            return {
                lrcVisible:true,
                time:0,
            }
        },

        mounted () {
        },
        beforeDestroy(){
        },
        methods: {

            setCurrentTime(time){
                this.time = time;
            },
        },
        computed: {
            lrc(){return this.activeSectionObj.lrc},
        }
    }
</script>
<style>
    /*覆盖*/
    .video-js{height:100%;}
</style>
<template>
    <div class="w h hide-overflow pos-rel bg-black">
        <av-controller class="video-player vjs-custom-skin h"
                    :activeSectionObj="activeSectionObj"
                      ref="videoPlayer"
                      @timeupdate="setCurrentTime($event)"
        >
        </av-controller>

    </div>
</template>