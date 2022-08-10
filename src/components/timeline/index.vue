<template>
    <ul class="timeline-wrapper">
        <li class="timeline-item" v-for="(t, index) in timelineList" :key="t.id">
            <div class="timeline-time">
                <div class="timeline-year">{{ t.date.slice(0, 4) }}</div>
                <div class="timeline-mon">{{ t.date.slice(5) }}</div>
            </div>
            <div class="timeline-box">
                <div class="out-circle">
                    <div class="in-circle"></div>
                </div>
                <div :class="shortLine(index) ? 'shortline' : 'longline'"></div>
            </div>
            <div class="timeline-content">
                <div class="timeline-img-content">
                    <img class="timeline-img" :src="t.img" alt="新闻图片">
                </div>
                <div class="timeline-right">
                    <div class="timeline-title"><a :href=t.link class="a">{{ t.title }}</a></div>
                    <div class="timeline-desc">{{ t.content }}</div>
                </div>
            </div>
        </li>
    </ul>

</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
    timelineList: {
        type: Array,
        default: () => {
            return []
        }
    }
})
const shortLine = index => index === props.timelineList.length - 1 ? true : false

</script>

<style scoped lang="scss">
ul.timeline-wrapper {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

/* 时间线 */
.timeline-item {
    position: relative;

    .timeline-time {
        position: absolute;
        display: block;
        height: 63px;
        width: 77px;
        left: -80px;
        top: 5px;

        .timeline-year {
            font-size: 36px;
            color: #099ea5;
        }

        .timeline-mon {
            font-size: 28px;
            color: rgb(181, 178, 178)
        }
    }

    .timeline-box {
        position: absolute;

        .out-circle {
            position: absolute;

            width: 16px;
            height: 16px;
            background: rgba(14, 116, 218, 0.1);
            box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.1);
            border-radius: 50%;
            top: 48px;

            .in-circle {
                width: 16px;
                height: 16px;
                margin: 0 auto;
                background: rgba(14, 116, 218, 1);
                border-radius: 50%;
                box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.1);
            }
        }

        .longline {
            position: absolute;
            top: 20px;
            width: 5px;
            height: 350px;
            background: rgba(14, 116, 218, 1);
            box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.1);
            opacity: 0.8;
            margin-left: 6px;
            margin-top: -7px;

        }

        .shortline {
            position: absolute;
            top: 20px;
            width: 5px;
            height: 310px;
            background: rgba(14, 116, 218, 1);
            box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.1);
            opacity: 0.8;
            margin-left: 6px;
            margin-top: -7px;

        }
    }

    .timeline-content {
        display: flex;
        width: 1143px;
        height: 300px;
        margin: 20px 0 30px 30px;
        background-color: #ccc;

        .timeline-img-content {
            width: 435px;
            height: 280px;
            margin: 10px;
            overflow: hidden;

            .timeline-img {
                width: auto;
                height: 285px;
                margin-left: -25%;

                &:hover {
                    transform: scale(1.1);
                    transition: all .5s ease .1s;
                }
            }
        }

        .timeline-right {
            display: flex;
            flex: 75%;
            flex-direction: column;
            margin-top: 30px;
            font-family: 'Noto Sans CJK';

            .timeline-title {
                line-height: 50px;
                font-size: 22px;
                text-decoration: none;

                .a {
                    text-decoration: none;
                    color: #099ea5;
                }
            }

            .timeline-desc {
                margin-top: 5px;
                line-height: 28px;
                font-size: 16px;
                color: #3b3a3a;
                overflow: hidden;
            }
        }
    }

}


.timeline-item:last-of-type .timeline-content {
    margin-bottom: 0;
}
</style>
