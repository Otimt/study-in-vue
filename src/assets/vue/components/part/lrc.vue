<script>
    import axios from 'axios'
    export default {
        props: ['lrc','time'],
        data(){
            return {
                //根据lrc文件解析出字幕

                txt:"",
                lyricLength:0,//歌词条数
                lyric:[],//歌词列表
                lrcTime:[],//歌词时间点对应数组
                currentLyrics:"歌词加载中...",
            };
        },
        created () {
            this.loadLrc()
        },
        watch:{
            "time":"setCurrentLrc",
            "lrc":"loadLrc",
        },
        methods: {
            loadLrc(){
                axios.get(this.lrc).then((res)=>{
                    console.log(res);
                    this.txt = res.data;
                    this.analysis();
                    this.setCurrentLrc();
                })
            },
            /**
             * 查找标签（包括任何扩展的标签）
             * 此方法能匹配所有格式的标签
             * 因为此方法是在后面写的，所以时间标签并没有使用此方法
             */
            findTags(index,strArray,number){
                number = number || this.txt.length;
                number = (number>this.txt.length) ? this.txt.length:number;
                var i,j,complete=0,value;
                var obj = new Object();
                obj.booble = false;
                obj.value = "[";
                for(i=index;i<number;i++)
                {
                    if(this.txt.substr(i,1)==strArray[complete].s)
                    {
                        complete+=1;
                        if(complete>1)
                        {
                            if(complete<strArray.length)
                            {
                                obj.value += '{value:"'+this.txt.substr(value+1,i-value-1)+'"},';
                            }
                            else
                            {
                                obj.value += '{value:"'+this.txt.substr(value+1,i-value-1)+'"}]';
                            }
                        }
                        if(complete==strArray.length)
                        {
                            obj.txt = this.txt.substr(index,i-index+1);
                            obj.value = eval('('+obj.value+')');
                            obj.index = i+1;
                            obj.booble = true;
                            break
                        }
                        value = i;
                    }
                    else if(this.txt.substr(i,1)=="\n")
                    {
                        obj.booble = false;
                        return obj;
                    }
                    else if(this.txt.substr(i,1)==strArray[0].s && complete>0) // 遇到2次开始标志就退出
                    {
                        obj.booble = false;
                        return obj;
                    }
                }
                return obj;
            },
            /**
             * 查找歌词： 有则返回 歌词、继续查找的位置， 否则只返回继续查找的位置
             */
            findlyric(index){
                var obj = {};
                var str = this.txt;
                var i;
                for(i=index;i<str.length;i++)
                {
                    if(str.charAt(i)=="[")
                    {
                        var _obj = this.findTags(i,[{s:"["},{s:":"},{s:"]"}]);
                        if(_obj.booble)
                        {
                            obj.index = i;//i + _obj.txt.length;
                            obj.lyric = str.substr(index,i-index);
                            return obj;
                        }
                    }
                    else if(str.charAt(i)=="\n")
                    {
                        obj.index = i+1;
                        obj.lyric = str.substr(index,i-index);
                        return obj
                    }
                }
                if(i==str.length) // 专处理最后一句歌词（最后一句歌词比较特殊）
                {
                    obj.index = i+1;
                    obj.lyric = str.substr(index,i-index);
                    return obj;
                }
                obj.index = i;
                return obj;
            },
            /**
             * 查找时间 ： 有则返回 时间、继续查找的位置， 否则只返回继续查找的位置
             * 此功能可以用 findTags 方法实现，更简单、更强大、代码更少
             * findTags方法 是在后面写的，所以这里就不改了，具体可参考 findID方法里的使用实例
             */
            findTime(index){
                var obj = {};
                var thisobj = this;
                var str = this.txt;
                obj.index = index;
                function recursion()
                {
                    var _obj = thisobj.findTime(obj.index);
                    if(_obj.time)
                    {
                        obj.time += _obj.time;
                        obj.index = _obj.index;
                    }
                }
                // --------------- 可以在这里 扩展 其它功能 ---------------
                // lrc歌词只能精确到每句歌词，可以通过扩展lrc 精确 到 每个字
                if(/\[\d{1,2}\:\d{1,2}\.\d{1,2}\]/.test(str.substr(index,10))) // [mm:ss.ff]
                {
                    obj.time = str.substr(index+1,8) + "|";
                    obj.index = index+9+1;
                    recursion();
                }
                else if(/\[\d{1,2}\:\d{1,2}\]/.test(str.substr(index,7))) // [mm:ss]
                {
                    obj.time = str.substr(index+1,5) + ".00" + "|";
                    obj.index = index+6+1;
                    recursion();
                }
                return obj;
            },
            /**
             * 解析歌词
             * @returns {boolean}
             */
            analysis(){
                if(this.txt == "") return false;
                var str = this.txt;
                this.lyricLength = 0;
                for(var i=0;i<str.length;i++){
                    if(str.charAt(i)=="["){
                        var time = this.findTime(i);
                        if(time.time) {// 时间标签
                            var lyric = this.findlyric(time.index);

                            if(lyric.lyric!="\n" && lyric.lyric!="") {// 去掉无意义歌词
                                var timeArray = time.time.split("|");

                                for(var j = 0;j < timeArray.length;j++){
                                    if(timeArray[j] && ((lyric.lyric).trim() != "")){
                                        this.lrcTime[this.lyricLength] = timeArray[j];
                                        this.lyric[this.lyricLength] = lyric.lyric;
                                        this.lyricLength+=1;
                                    }
                                }
                            }
                            i = time.index;
                        }
                    }
                }
                console.log(this.lrcTime)
                console.log(this.lyric)
            },
            /**
             * 同步显示歌词
             */
            setCurrentLrc(){
                var idx = null,
                    time = this.time;
                for(var i=0;i<this.lyricLength;i++){
                    if(time >= timeType(this.lrcTime[i])){
                        idx = i;
                    }
                }
                this.currentLyrics = this.lyric[idx]

                //时分秒 转 秒
                function timeType(position){
                    var timeArr = position.split(':');
                    return parseInt(timeArr[0], 10) * 60 + parseFloat(timeArr[1])
                }
            }
        },
    }

</script>
<style>
    .lrc{
        text-shadow:0 0 2px #000;
        width:100%;
        height:35px;
        z-index:4;
        color:#fff;
    }
    .b-radius-8{border-radius:8px;}
</style>
<template>
    <div class="lrc pos-abs ac f18">
        <span class="bg-black opacity50 pt5 pb5 pl10 pr10 b-radius-8" v-show="currentLyrics">{{currentLyrics}}</span>
    </div>
</template>