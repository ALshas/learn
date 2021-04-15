function beautify_time(timestamp) {
	var mistiming = Math.round(new Date() / 1000) - timestamp;
	var postfix = mistiming > 0 ? '前' : '后'
	mistiming = Math.abs(mistiming)
	var arrr = ['年', '个月', '星期', '天', '小时', '分钟', '秒'];
	var arrn = [31536000, 2592000, 604800, 86400, 3600, 60, 1];

	for (var i = 0; i < 7; i++) {
		var inm = Math.floor(mistiming / arrn[i])
		if (inm != 0) {
			return inm + arrr[i] + postfix
		}
	}
}
var timestamp3 = new Date('2018-10-30 20:08:23') / 1000;
console.log(timestamp3, beautify_time(timestamp3))

let curData = new Date();
console.log('curData', curData.setSeconds(curData.getSeconds()));
curData.setSeconds(curData.getSeconds() + ret.data.expires_in * 1);
console.log('curData', curData);

var curTime = new Date();
var addMinute = new Date(curTime.setMinutes(curTime.getMinutes() + 50));
console.log('addMinute: ', addMinute)