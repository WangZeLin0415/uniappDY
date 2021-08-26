
export const request = (url,callback) => {
	uni.request({
		url,
		success(res) {
			if(typeof callback === 'function') {
				callback(res)
			}
		}
	})
}