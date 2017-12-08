// 常量定义
var __CONSTANT__DATA = {
	"android": {
		"schemeUrl": "spdbccc://",
		"downloadUrl": "http://dwz.cn/app_1",
		"weixinUrl": "http://a.app.qq.com/o/simple.jsp?pkgname=com.spdbccc.app&android_scheme="
	},
	"ios": {
		"schemeUrl": "spdbccc://",
		"downloadUrl": "https://itunes.apple.com/cn/app/pu-fa-yin-xing-xin-yong-ka/id974428942?mt=8",
		"weixinUrl": "https://mbank.spdbccc.com.cn/spdbcccMbank/ios/share.html"
	},
	"iosLismitVersion": 9 // IOS判定的最低版本号
};

// 加载后
$(function () {
	resetItemsSize();

	// 注册事件
	var maskRoot = $(".maskRoot");

	// 20171031 苹果打开app优化
	var weixinFlag = false;
	var iosVersion = $.iosVersion();
	weixinFlag = (iosVersion < __CONSTANT__DATA.iosLismitVersion);

	// 20171030 安卓打开app优化  (__Device != "android")
	if (__Device == "android") weixinFlag = false;

 	var r_open = regeditEvent($(".r_open_d"), "r_open", "r_open_on", maskRoot, openEvent, weixinFlag);
	var r_download = regeditEvent($(".r_download_d"), "r_download", "r_download_on", maskRoot, downloadEvent, false);
	var maskRoot = $(".maskRoot");
	var r_ikonw = $(".r_ikonw");

	// 幕布禁用滚动
	$(".maskRoot").on("touchstart", function (e) {
		e.preventDefault();
	});

	// 我知道了隐藏事件
	var eventName = "touchend";
	if (__Device == "computer") eventName = "click";
	r_ikonw.on(eventName, function (e) {
		maskEvent(maskRoot, e);
	});

	if (iosVersion < __CONSTANT__DATA.iosLismitVersion) { // ios9以下版本及安卓版本
		// 页面加载后事件
		mainEvent(r_open);
	}

	$(".alertButton").on(eventName, function () {
		$(".alertRoot").fadeOut("fast");
	});

	// 幕布禁用滚动
	$(".alertRoot").on("touchstart", function (e) {
		e.preventDefault();
	});
});

// 浏览器改变时改变
$(window).resize(function() {
	resetItemsSize();
});

// 按钮注册事件
function regeditEvent(event_obj, moren, anxia, maskRoot, endFunc, _validate_weixin) {
	var eventObj = {
		"touchstart": "touchstart",
		"touchend": "touchend"
	}
	if (__Device == "computer") {
		eventObj.touchstart = "mouseover";
		eventObj.touchend = "mouseout";
		event_obj.on("click", function (e) {
			if (endFunc) {
				if (_validate_weixin) {
					if ($.isWeiXin()) { // 微信不让点
						maskEvent(maskRoot, e);
						return event_obj;
					}
				}
				endFunc(event_obj, e);
			}
		});
	}
	event_obj.on(eventObj.touchstart, function (e) {
		event_obj.removeClass(moren);
		event_obj.addClass(anxia);
	});
	event_obj.on(eventObj.touchend, function (e) {
		event_obj.removeClass(anxia);
		event_obj.addClass(moren);
		if (__Device != "computer" && endFunc) {
			if (_validate_weixin) {
				if ($.isWeiXin()) { // 微信不让点
					maskEvent(maskRoot, e);
					return event_obj;
				}
			}
			endFunc(event_obj, e);
		}
	});
	return event_obj;
}

// 重置弹出层位置和大小
function resetItemsSize() {
	// 对象
	var rootCase = $(".rootCase");
	var r_open = $(".r_open_d");
	var r_download = $(".r_download_d");
	var maskRoot = $(".maskRoot");
	var r_first = $(".r_first");
	var r_second = $(".r_second");
	var r_ikonw = $(".r_ikonw");
	var alertRoot = $(".alertRoot");

	// 获取屏幕宽度
	var screen_width = $(window).width();
	window.__ScreenWidth = screen_width;
	// 缩放比例
	var zoom = screen_width / 750;
	window.__Zoom = zoom;
	// 计算容器的高度
	var container_height = 1243*zoom;

	// 重置容器的高度
	rootCase.css("height", container_height + "px");

	//=== 打开按钮
	r_open.css({
		"width": 120*zoom + "px",
		"height": 40*zoom + "px",
		"top": 80*zoom + "px",
		"right": 30*zoom + "px"
	});

	//=== 下载按钮
	r_download.css({
		"width": 710*zoom + "px",
		"height": 64*zoom + "px",
		"top": 1138*zoom + "px",
		"left": 20*zoom + "px"
	});

	// 计算幕布的高度
	maskRoot.css("height", container_height + "px");
	alertRoot.css({
		"height": container_height + "px"
	});

	// 引导1
	r_first.css({
		"width": 282*zoom + "px",
		"height": 93*zoom + "px",
		"top": "0px",
		"right": 60*zoom + "px"
	});

	// 引导2
	r_second.css({
		"width": 440*zoom + "px",
		"height": 384*zoom + "px",
		"top": 530*zoom + "px",
		"right": "0px"
	});

	// 我知道了
	r_ikonw.css({
		"width": 350*zoom + "px",
		"height": 64*zoom + "px",
		"top": 994*zoom + "px",
		"left": 200*zoom + "px"
	});

	var alertContent = $(".alertContent");
	var alertTitle = $(".alertTitle");
	var alertTip = $(".alertTip");
	var alerttd = $(".alertTip table tr td");
	var alertButton = $(".alertButton");
	
	// alert框
	var alert_width = __ScreenWidth - 100*__Zoom;
	var alert_height = 220*zoom;
	alertContent.css({
		"width": alert_width + "px",
		"margin-left": -alert_width / 2 + "px",
		"height": alert_height + "px",
		"margin-top": - alert_height / 2 - 40*__Zoom + "px",
		"border-radius": 5*__Zoom + "px"
	});

	// 弹窗标题
	alertTitle.css({
		"font-size": 28*__Zoom + "px",
		"height": 49*__Zoom + "px",
		"line-height": 70*__Zoom + "px",
		"text-align": "center"
	});

	// 弹窗内容
	alertTip.css({
		"width": alert_width - 60*zoom + "px",
		"font-size": 24*__Zoom + "px",
		"height": 105*__Zoom + "px"
	});
	alerttd.css({
		"text-align": "center",
		"vertical-align": "middle",
		"width": alert_width - 60*zoom + "px",
		"height": 105*__Zoom + "px"
	});


	// 弹窗按钮
	alertButton.css({
		"font-size": 28*__Zoom + "px",
		"text-align": "center",
		"height": 66*__Zoom + "px",
		"line-height": 66*__Zoom + "px",
		"color": "#0066cc",
		"border-top": "1px solid #cccccc"
	});
}

// 弹窗
function msgAlert(content) {
	//var revise = revise?revise:250;
	var alertTip = $(".alertTip table tr td");
	alertTip.html(content);
	$(".alertRoot").fadeIn("fast");
}

// 弹层事件
function maskEvent(maskRoot, e) {
	var zoom = window.__Zoom;
	// 修改位置
	var scrollTop = $(document).scrollTop();
	var r_first = $(".r_first");
	var r_second = $(".r_second");
	var r_ikonw = $(".r_ikonw");

	// 引导1
	r_first.css({"top": scrollTop + "px"});

	// 引导2
	r_second.css({"top": scrollTop + 530*zoom + "px"});

	// 我知道了
	r_ikonw.css({"top": scrollTop + 994*zoom + "px"});

	maskRoot.fadeToggle("fast");
	if (!!e) {
		// 禁用长按弹窗
		e.preventDefault();
	}
}

// 扩展jQuery
$.extend({
	isWeiXin: function () { // 是不是微信中
		var ua = navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == "micromessenger") {
			return true;
		} else {
			return false;
		}
	},
	whoDevice: function () { // 什么平台
		if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) { // 是IOS
			return "ios";
		} else if (navigator.userAgent.match(/android/i)) { // Android
			return "android";
		} else {
			return "computer";
		}
	},
	iosVersion: function () { // 获取IOS版本号
		var useragent = navigator.userAgent;
		if (useragent.match(/(iPhone|iPod|iPad);?/i)) { // 是IOS
			var arr = useragent.match(/os (\d+)_/i);
			if (arr.length == 2) {
				return arr[1]*1;
			}
		}
		return 0;
	}
});

window.__Device = $.whoDevice();