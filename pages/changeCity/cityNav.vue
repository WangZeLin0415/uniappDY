<template>
	<view class="cityNav">
		<view
			@click="handleClick(item.initial)"
			class="item" hover-class="scale"
			v-for="(item,index) in citylist"
			:key="index"
			@touchstart="start"
			@touchmove="move"
			@touchend="end"
		>
			{{item.initial}}
		</view>
	</view>
</template>

<script>
	let inter= null;
	export default {
		props:['citylist'],
		data(){
			return {
				flag:false
			}
		},
		methods:{
			handleClick(key) {
				this.$emit('handleChange',key)
			},
			start(e) {
				this.flag = true;
			},
			move(e) {
				clearTimeout(inter);
				inter = setTimeout(()=>{
					const movex = e.touches[0].pageY - 100;
					const index = Math.floor(movex / 20);
					if(index >= 0 && index < this.citylist.length) {
						const chart = this.citylist[index].initial;
						this.$emit('handleChange',chart)
					}
				},30)
				
			},
			end() {
				this.flag = false;
			}
		}
	}
</script>

<style>
	.cityNav {
		position: absolute;
		top:100px;
		right:0px;
		color:#ccc;
	}
	.item {
		font-size: 12px;
		padding-right: 5px;
		line-height: 20px;
	}
	.scale {
		font-size: 16px;
		color:#fff;
	}
</style>
