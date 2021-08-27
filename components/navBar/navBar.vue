<template>
	<view class="box" >
		<view class="iconfont icon-shousuo search"></view>
		<navigator open-type="navigate" class="nav" url='../../pages/city/city' >
			同城
		</navigator>
		<view class="nav">
			推荐
		</view>
	</view>
</template>

<script>
</script>

<style>
	.box {
		width:100%;
		height:45px;
		position: absolute;
		top:30px;
		left:0px;
		color:#fff;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 20;
		
		
	}
	.search {
		position: absolute;
		top:50%;
		left:30px;
		font-size: 30px;
		transform: translateY(-50%);
	}
	.nav {
		padding:0 20px;
	}
</style>
