<template>
	<view class="content">
		<nav-bar ></nav-bar>
		<view class="action" >
			<swiper class="swiper-box" :vertical="true" @change="handleSwiper" >
				<swiper-item v-for="item in list" :key="item.id" >
					<view class="swiper-item" @click="handlePlayPause" >
						<my-video :src="item.url" ref='video' ></my-video>
						<tool :status="status"></tool>
					</view>
				</swiper-item>
				
			</swiper>
		</view>
		
		<tab-Bar class='tabBar' ></tab-bar>
	</view>
</template>

<script>
	import tabBar from '../../components/tarBar/tarBar.vue';
	import navBar from '../../components/navBar/navBar.vue';
	import myVideo from '../../components/video/video.vue';
	import tool from '../../components/tool/tool.vue';
	import {request } from '../../utils/request.js';
	export default {
		components:{
			tabBar,
			navBar,
			myVideo,
			tool,
		},
		data() {
			return {
				list: [],
				current:0,
				status:true,
			}
		},
		onLoad(){
			uni.hideTabBar({
				
			})
		},
		mounted() {
			// this.$refs.video.player()
			request('http://localhost:3000/data.json',(res)=>{
				const { data } = res;
				this.list = data;
				const inter = setTimeout(()=>{
					this.$refs.video[0].player()
				},200)
			})
		},
		methods:{
			handleSwiper(e) {
				this.status = true;
				if(this.current !== -1) {
					this.$refs.video[this.current].pause()
					this.$refs.video[this.current].seek()
				}
				this.$refs.video[e.detail.current].player()
				console.log(this.$refs.video[e.detail.current])
				this.current = e.detail.current
			},
			handlePlayPause() {
				if(this.status) {
					this.$refs.video[this.current].pause()
				}else {
					this.$refs.video[this.current].player()
				}
				this.status = !this.status;
			}
		}
	
		
	}
</script>

<style lang="scss" >
	.content {
		width:100%;
		height:100vh;
	}
	.action {
			width:100%;
			height:100%;
			
		}
	.tabBar {
		width:100%;
		height:50px;
		position: fixed;
		bottom: 0px;
		left:0px;
		z-index: 20;
	}
	.swiper-box {
		width:100%;
		height:100%;
	}
	.swiper-item {
		width:100%;
		height:100%;
		
	}
	
</style>
