<template>
	<view class="tool">
		<view class="author">
			<image class="img" src="../../static/mine1.png" ></image>
			<view class="add" >+</view>
		</view>
		<view class="iconf iconfont icon-aixin1" >
			<view class="number" >100</view>
		</view>
		<view class="iconf iconfont icon-xinxi3_1 info">
			<view class="number">100</view>
		</view>
		<view class="iconf iconfont icon-fenxiang1">
			<view class="number">100</view>
		</view>
		<view class="rote">
			<image :class="[{img:true},{route:true},{routeStatus:status}]" src="../../static/logo.png" mode=""></image>
		</view>
	</view>
</template>
status
<script>
	export default {
		props:{
			status:{
				type:Boolean,
				default:true,
			}
		}
	}
</script>

<style>
	.tool {
		position: absolute;
		right:10px;
		bottom: 70px;
		z-index: 20;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.author {
		position: relative;
	}
	.add {
		width:20px;
		height:20px;
		border-radius: 50%;
		background:#FF3333;
		position: absolute;
		bottom:-8px;
		left:50%;
		transform: translateX(-50%);
		font-size: 14px;
		text-align: center;
		line-height: 20px;
		color:#fff;
		font-weight: 900;
	}
	.iconf {
		font-size: 30px;
		color:#fff;
		margin-top:20px;
	}
	.img {
		width:40px;
		height:40px;
		border-radius: 50%;
		margin-top:40px;
		background:#fff;
		border:2px solid #fff;
	}
	.info {
		font-size: 40px;
	}
	.number {
		font-size: 12px;
		text-align: center;
	}
	.route {
		width:25px;
		height:25px;
		border: 10px solid #000000;
		
	}
	.routeStatus {
		animation: keyRoute 1.5s linear infinite;
	}
	@keyframes keyRoute{
		0%{
			transform: rotate(0deg);
		}
		100%{
			transform: rotate(360deg);
		}
	}
</style>
