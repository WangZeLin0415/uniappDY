<template>
	<view class="box" >
		<scroll-view :scroll-y="true" class="scroll" >
			<view class="changeCity">
				<view class="position" >
					<view class="iconfont icon-dingwei "></view>
					<view>自动定位：金牛</view>
				</view>
				<view class="">
					切换 &gt;
				</view>
			</view>
			<view class="list">
				<view class="item" v-for="(item,index) in list" :key="item.id" >
					<view class="active" >
						<image class="img" :src="item.url" mode=""></image>
						<view class="spo" >
							<text class="iconfont icon-dingwei "></text>
							<text>{{item.s}}</text>
						</view>
					</view>
					
					<view class="disp">{{item.content}}</view>
					
				</view>
			</view>
		</scroll-view>
		
		<tar-bar class="tarBar" ></tar-bar>
	</view>
</template>

<script>
	import tarBar from '../../components/tarBar/tarBar.vue';
	import {request} from '../../utils/request.js'
	export default {
		components:{
			tarBar
		},
		data() {
			return {
				list:[]
			}
		},
		created() {
			request("http://localhost:3000/commonCity.json",res=>{
				const { data } = res;
				this.list = data;
			})
		},
		methods: {
			
		}
	}
</script>

<style>
	.position {
		display: flex;
		align-items: center;
	}
	.iconfont {
		margin-right: 5px;
	}
	.changeCity {
		width:100%;
		height:40px;
		display: flex;
		padding: 0 10px;
		justify-content: space-between;
		align-items: center;
		color:#fff;
		background:#232323;
		border-top:1px solid #565656;
		box-sizing: border-box;
		font-size: 12px;
		color:#7d7d7d;
	}
	.tarBar {
		width: 100%;
		position: fixed;
		bottom: 0px;
		left:0px;
		background: #000000;
	}
	.box {
		width:100%;
		height:100%;
		
	}
	.scroll {
		width:100%;
		height:calc(100% - 50px);
		background:#232323;
	}
	.list {
		width:100%;
		display: flex;
		flex-wrap: wrap;
	}
	.item {
		width:47%;
		margin-left:2%;
		height:auto;
		margin-bottom: 16px;
		
	}
	.active {
		position: relative;
	}
	.spo {
		position: absolute;
		bottom: 10px;
		left:10px;
		color:#fff;
		font-size: 12px;
	}
	.img {
		width:100%;
	}
	.disp {
		color:#fff;
		font-size: 14px;
	}
</style>
