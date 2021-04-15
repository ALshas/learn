/*
 * @Author: liusha
 * @LastModifiedBy: liusha
 * @LastEditTime: 2021-01-13 15:41:01
 * @Date: 2021-01-13 15:33:34
 */

//格式化时间
function formatTime(param) {
    let y = param.getFullYear();
    let m = param.getMonth() + 1;
    let d = param.getDate();
    m = m < 10 ? ("0" + m) : m;
    d = d < 10 ? ("0" + d) : d;
    return y + "-" + m + "-" + d + " ";
}

/**
* 以当前时间为基础，便捷获取时间（最近2天，最近1周，最近2周，最近1月，最近2月，最近半年，最近一年，本周，本月，本年）
* @param { string } code
* @returns { Object }
*/
function getDate(code) {
    const date = new Date();
    let endTime = formatTime(date);
    let date1 = Date.parse(date);
    let start = '';
    let end = '';
    let oneDay = 1000 * 3600 * 24;

    switch (code) {
        //今天
        case 'today':
            start = new Date();
            break;
        //最近2天
        case 'lastTwoDay':
            start = date1 - oneDay * 2;
            break;
        //最近1周
        case 'lastOneWeek':
            start = date1 - oneDay * 7;
            break;
        //最近2周
        case 'lastTwoWeek':
            start = date1 - oneDay * 14;
            break;
        //最近1月
        case 'lastOneMonth':
            start = new Date();
            start.setMonth(start.getMonth() - 1)
            break;
        //最近2月
        case 'lastTwoMonth':
            start = new Date();
            start.setMonth(start.getMonth() - 2)
            break;
        //最近3月
        case 'lastThreeMonth':
            start = new Date();
            start.setMonth(start.getMonth() - 3)
            break;
        //最近半年
        case 'lastHalfYear':
            start = date1 - oneDay * 183;
            break;
        //最近一年
        case 'lastOneYear':
            start = new Date();
            start.setYear(start.getFullYear() - 1)
            break;
        //本周
        case 'thisWeek':
            let a = 6 - date.getDay();
            start = new Date(date1 - oneDay * a).setHours(0, 0, 0, 0);
            end = new Date(date1 + oneDay * (1 + date.getDay())).setHours(24, 0, 0, 0)
            break;
        //本月
        case 'thisMonth':
            start = new Date();
            start.setHours(0, 0, 0, 0)
            start.setMonth(start.getMonth(), 1)
            end = new Date(start)
            end.setHours(0, 0, 0, 0)
            end.setMonth(start.getMonth() + 1, 1)
            break;
        //本年
        case 'thisYear':
            start = new Date();
            start.setHours(0, 0, 0, 0)
            start.setMonth(0, 1)
            start.setYear(start.getFullYear())
            end = new Date(start)
            end.setHours(0, 0, 0, 0)
            end.setMonth(start.getMonth(), 1)
            end.setYear(start.getFullYear() + 1)
            break;
    }

    return {
        startTime: formatTime(new Date(start)),
        endTime: end ? formatTime(new Date(end)) : endTime,
    }
}
console.log(getDate('lastThreeMonth'))