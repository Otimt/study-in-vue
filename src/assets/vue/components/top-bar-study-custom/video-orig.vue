<script>
    import avController from  "../part/av-controller-videojs.vue";



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
    .video-orig .video-js{width:100%;height:100%;}
</style>
<template>
    <div class="w h hide-overflow pos-rel bg-black">
        <av-controller class="video-orig h"
                    :activeSectionObj="activeSectionObj"
                      ref="videoPlayer"
                      @timeupdate="setCurrentTime($event)"
        >
        </av-controller>

    </div>
</template>