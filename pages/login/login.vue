<template>
	<view>
		
		<!-- <uni-section title="表单校验" type="line"></uni-section> -->
		<view class="example">
			<!-- 基础表单校验 -->
			<view class="title" >uni-app管理系统</view>
			<uni-forms ref="valiForm" :rules="rules" :modelValue="valiFormData">
				<uni-forms-item label="账号" required name="username">
					<uni-easyinput v-model="valiFormData.username" placeholder="请输入账号" />
				</uni-forms-item>
				<uni-forms-item label="密码" required name="password">
					<uni-easyinput type='password' v-model="valiFormData.password" placeholder="请输入密码" />
				</uni-forms-item>
				
			</uni-forms>
			<button type="primary" @click="submit('valiForm')">提交</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				valiFormData:{
					username:'',
					password: '',
					introduction:''
				},
				rules:{
					username: {
						rules: [{
							required: true,
							errorMessage: '账号不能为空'
						}]
					},
					password: {
						rules: [{
							required: true,
							errorMessage: '密码不能为空'
						}, {
							format: 'password',
							errorMessage: '请输入正确格式的密码'
						}]
					}
				}
				
			}
		},
		mounted() {
			const value = uni.getStorageSync('login');
			if(value) {
				const { username, password } = JSON.parse(value);
				this.valiFormData.username = username;
				this.valiFormData.password = password;
				uni.showLoading({
					title:'账号密码校验中...'
				})
				
				setTimeout(()=>{
					uni.hideLoading()
					uni.showToast({
						title:'登录成功'
					})
					uni.switchTab({
						url:'/pages/index/index'
					})
					
				},1000)
			}
			
		},
		methods:{
			submit(ref) {
				
				this.$refs[ref].validate().then(res=>{
					
					const value = uni.getStorageSync('login');
					if(value) {
						const { username, password } = JSON.parse(value);
						uni.showLoading({
							title:'账号密码校验中...'
						})
						
						setTimeout(()=>{
							uni.hideLoading()
							if(res.username === username && res.password === password) {
								uni.showToast({
									title:'登录成功'
								})
								uni.switchTab({
									url:'/pages/index/index'
								})
							}else {
								uni.showToast({
									title:'登录失败'
								})
							}
						},1000)
						
					}else {
						uni.setStorageSync('login',JSON.stringify(res));
						uni.showLoading({
							title:'密码设置登录中...'
						})
						setTimeout(()=>{
							uni.hideLoading()
							uni.showToast({
								title:'设置密码成功'
							})
						},1000)
						
					}
					
				}).catch(err=>{
					uni.showToast({
						title:'登录失败'
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '@/common/uni-nvue.scss';

	.example {
		padding: 15px;
		background-color: #fff;
		margin-top: 200rpx;
	}
	.title {
		text-align: center;
		font-size: 32rpx;
		font-weight: bold;
		line-height: 120rpx;
	}
	.segmented-control {
		margin-bottom: 15px;
	}

	.button-group {
		margin-top: 15px;
		display: flex;
		justify-content: space-around;
	}

	.form-item {
		display: flex;
		align-items: center;
	}

	.button {
		display: flex;
		align-items: center;
		height: 35px;
		margin-left: 10px;
	}
</style>
