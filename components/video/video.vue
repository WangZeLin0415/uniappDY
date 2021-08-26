<template>
	<view class="video-box" >
		<video
		:src="src" 
		:controls="false" 
		:loop="true" 
		class="video" 
		@error="handleError" 
		id="myPlayer"
		>
		</video>
	</view>
</template>

<script>
	import { profix } from '../../utils.js'
	export default {
		props:{
			src:{
				type:String,
				default:'',
			}
		},
		data() {
			return {
				
			}
		},
		onReady() {
			 this.videoContext = uni.createVideoContext("myPlayer", this);
			 console.log('ss',this.src)
		},
		methods:{
			handleError(err) {
				console.log()
			},
			player() {
				
				this.videoContext.play()
			},
			pause() {
				
				this.videoContext.pause()
			},
			stop() {
				this.videoContext.stop()
			},
			seek() {
				this.videoContext.seek(0)
			}
			
		}
	}
</script>

<style>
	.video-box,.video {
		width:100%;
		height:100%;
	}
</style>
