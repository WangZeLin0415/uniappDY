<template>
	<view class="box" >
		<view class="search">
			<view class=" incon iconfont icon-shousuo"></view>
			<input v-model="value" @focus="focus" :focus="focusstatus"  class="input" placeholder="输入城市或区县名称收索" />
			<view v-show="value" @click="clearValue" class=" close iconfont icon-guanbi"></view>
			<view v-show="focusstatus" @click="handleCancelFouus" class="cancel" >取消</view>
		</view>
		<scroll-view :scroll-y="true" class="scrollView"  :scroll-into-view="key" v-show="!value"  >
			<view>
				<view class="auto">
					自动定位
				</view>
				<view class="autoPosition">
					金牛
				</view>
				<view class="auto">
					历史访问
				</view>
				<view class="history">
					<view class="historyItem" v-for="(item,index) in historyList" :key="index" @click="handlePushCity(item)" >
						{{item}}
					</view>
				</view>
				<view class="auto">
					抖音热门城市
				</view>
				<view class="history">
					<view @click="handlePushCity(item)" class="historyItem" v-for="(item,index) in hotCity" :key="index" >
						{{item}}
					</view>
				</view>
				
				<view class="cityList">
					<view class="cities" v-for="cities in citylist" :key="cities.initial" >
						<view class="auto" :id="cities.initial" >
							{{cities.initial}}
						</view>
						<view class="auto" @click="handlePushCity(item.name)" v-for="(item,index) in cities.list" :key="item.label" >
							{{item.name}}
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- 搜索列表 -->
		<scroll-view scroll-y="true" class="scrollView" v-show="value" >
			<view v-for="(item,index) in searchList" :key="item.code" class="auto" >
				{{item.name}}
			</view>
		</scroll-view>
		<!-- 城市首字母导航 -->
		<city-nav :citylist="citylist" @handleChange="handleChange" v-show="!value" ></city-nav>
	</view>
</template>

<script>
	import { request } from '../../utils/request.js';
	import cityNav from './cityNav.vue';
	const cityMap = new Map()
	export default {
		components:{
			cityNav,
		},
		data() {
			return {
				focusstatus:false,
				value:'',
				historyList:[],
				hotCity:["深圳",'北京','上海','成都','广州','重庆','西安','苏州','武汉','杭州','郑州','南京','合肥','长沙','福州'],
				citylist:[],
				key:'',
				
			}
		},
		
		computed:{
			searchList() {
				const searchList = [];
				const reg = /^[A-z]+$/;
				if(reg.test(this.value)) {
					cityMap.forEach((value,key)=>{
						const index = value.toLowerCase().indexOf(this.value.toLowerCase());
						if(index === 0) {
							searchList.push({name:key,code:value})
						}
					})
				}else {
					cityMap.forEach((value,key)=>{
						const index = key.indexOf(this.value);
						if(index !== -1) {
							if(index === 0) {
								searchList.unshift({name:key,code:value})
							}else {
								searchList.push({name:key,code:value})
							}
							
						}
					})
				}
				
				return searchList;
			}
		},
		
		created() {
			request('http://localhost:3000/city.json',res=>{
				const { data:{city} } = res;
				console.log(city)
				
				city.forEach(item=>{
					item.list.forEach(ele=>{
						cityMap.set(ele.name,ele.pinyin)
					})
				})
				
				this.citylist = city;
			})
			
			const historyCitys = uni.getStorageSync('historyCitys');
			console.log('historyList',historyCitys)
			if(historyCitys) {
				this.historyList = JSON.parse(historyCitys);
				
			}
		},
		methods: {
			focus() {
				this.focusstatus = true;
			},
			handleCancelFouus() {
				this.focusstatus = false;
				this.value = ''
			},
			clearValue() {
				this.value = ''
			},
			handleChange(key) {
				this.key = key;
			},
			handlePushCity(cityName) {
				let historyCitys = uni.getStorageSync('historyCitys') || '[]';
				historyCitys = JSON.parse(historyCitys);
				if(!historyCitys.includes(cityName)) {
					historyCitys.push(cityName)
					uni.setStorageSync('historyCitys',JSON.stringify(historyCitys))
				}
				
				uni.redirectTo({
				    url: `/pages/city/city?id=${cityName}`
				});
				
				
			}
		}
	}
</script>

<style>
	.box {
		width:100%;
		height:100%;
		background: #161A22;
		padding: 0 10px;
		box-sizing: border-box;
	}
	.search {
		width:100%;
		height:36px;
		background:#3A3944;
		display: flex;
		color:#ccc;
		align-items: center;
		
	}
	.incon {
		font-size: 20px;
		padding:0 5px;
	}
	.input {
		flex-grow: 1;
	}
	.input::-webkit-input-placeholder{
	       color:red;
	 }
	.cancel {
		width:50px;
		color:red;
		height:40px;
		text-align: center;
		line-height: 40px;
		background:#161A22;
	}
	.close {
		font-size: 8px;
		color:#222222;
		background:#83838D;
		width:16px;
		height:16px;
		border-radius: 50%;
		text-align: center;
		line-height: 16px;
		margin-right:5px;
		font-weight: bold;
	}
	.auto {
		font-size: 14px;
		font-weight: bold;
		color:#fff;
		line-height: 60px;
	}
	.autoPosition {
		font-size: 14px;
		color:#fff;
		/* line-height: 30px; */
	}
	.history {
		display: flex;
		color:#fff;
		font-size: 12px;
		flex-wrap: wrap;
		padding-right:10px;
		box-sizing: border-box;
	}
	.historyItem {
		width:calc(100% / 3 - 6px);
		height:40px;
		background: #242831;
		border-radius: 2px;
		text-align: center;
		line-height: 40px;
		margin: 3px;
		box-sizing: border-box;
		
	}
	.scrollView {
		width:100%;
		height:calc(100% - 36px);
	}
</style>
