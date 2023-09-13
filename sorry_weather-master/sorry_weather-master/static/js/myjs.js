$(function () {
    function getDate(){
        var myDate = new Date;
        var year = myDate.getFullYear(); //获取当前年
        var mon = myDate.getMonth() + 1; //获取当前月
        var date = myDate.getDate(); //获取当前日
        // var h = myDate.getHours();//获取当前小时数(0-23)
        // var m = myDate.getMinutes();//获取当前分钟数(0-59)
        // var s = myDate.getSeconds();//获取当前秒
        var week = myDate.getDay();
        var weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        var date=year + "年" + mon + "月" + date + "日    " + weeks[week];
        return date
    }
    $("#date").html(getDate());
    for (var i = 0; i < 50; i++) {
        $('.air-relative').find('.gray').append('<span></span>');
        $('.air-absolutely').find('.gray').append('<span></span>')
    }
    var pressureValRel = 0;//初始气压(相对)
    var pressureValNowRel = 1;//当前气压（相对）
    function airPreRel(now, old, par) {
        if (now > old) {
            par.find('.light').append('<span></span>');
            pressureValRel++;
        } else if (now < old) {
            par.find('.light').children('span:last-child').remove();
            pressureValRel--;
        } else {
            clearInterval(pressureRunRel);
            return
        }
        $('.hpa-rel').text(pressureValRel * 2);
    }

    var pressureRunRel = setInterval(function () {
        airPreRel(pressureValNowRel, pressureValRel, $('.air-relative'));
    }, 50);

    // var pressureValAbs = 0;//初始气压(绝对)
    // var pressureValNowAbs = 1;//当前气压（绝对）
    // function airPreAbs(now, old, par) {
    //     if (now > old) {
    //         par.find('.light').append('<span></span>');
    //         pressureValAbs++;
    //     } else if (now < old) {
    //         par.find('.light').children('span:last-child').remove();
    //         pressureValAbs--;
    //     } else {
    //         clearInterval(pressureRunAbs);
    //         return
    //     }
    //     $('.hpa-abs').text(pressureValAbs * 2);
    // }

    // var pressureRunAbs = setInterval(function () {
    //     airPreAbs(pressureValNowAbs, pressureValAbs, $('.air-absolutely'));
    // }, 50);

    //温度和湿度
    var temChart = echarts.init(document.getElementById('temChart'));
    var humChart = echarts.init(document.getElementById('humChart'));
    var temOption = {
        tooltip: {
            formatter: '{a}<br/>当前：{c}℃'
        },
        series: [
            //内圈
            {
                type: 'gauge',
                center: ['50%', '60%'],    // 默认全局居中
                radius: '30%',
                min: 0,
                max: 10,
                startAngle: 270,
                endAngle: -89.99999,
                splitNumber: 10,
                axisLine: {            // 仪表盘轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: [[1, '#ff4500']],
                        width: 0,
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                axisLabel: {            // 刻度标签
                    show: false
                },
                axisTick: {            // 刻度
                    length: 4,        // 属性length控制线长
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: 'rgba(176,204,53,.5)'
                    }
                },
                splitLine: {           // 分隔线
                    show: false
                },
                pointer: {
                    width: 0,
                    shadowColor: '#fff', //默认透明
                    shadowBlur: 5
                },
                detail: {
                    show: false
                }
            },
            //中圈
            {
                name: '转速',
                type: 'gauge',
                center: ['50%', '60%'],    // 默认全局居中
                radius: '60%',
                min: 0,
                max: 10,
                splitNumber: 10,
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: [[1, '#6E6560']],
                        width: 8,
                        shadowBlur: 10
                    }
                },
                axisLabel: {            // 刻度
                    textStyle: {       // 属性lineStyle控制线条样式
                        fontWeight: '',
                        color: 'rgba(30,144,255,0)',
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                axisTick: {            // 坐标轴小标记
                    length: 2,        // 属性length控制线长
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: 'auto'
                        /*shadowColor : '#fff', //默认透明
                         shadowBlur: 10*/
                    }
                },
                splitLine: {           // 分隔线
                    length: 0,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        width: 0,
                        color: '#fff',
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                pointer: {
                    width: 0,
                    shadowColor: '#fff', //默认透明
                    shadowBlur: 5
                },
                detail: {
                    show: false
                }
            },
            //外圈室内
            {
                type: 'gauge',
                center: ['50%', '60%'],    // 默认全局居中
                radius: '100%',
                min: 0,
                max: 100,
                name: '室内',
                axisLine: {            // 坐标轴线
                    lineStyle: {
                        color: [[1, '#C7C5C3']],// 属性lineStyle控制线条样式
                        width: 1
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#FF0000'
                    }
                },
                axisTick: {
                    length: 3
                },
                axisLabel: {            // 坐标轴小标记
                    textStyle: {       // 属性lineStyle控制线条样式
                        fontWeight: 'bolder',
                        fontSize: 10,
                        fontFamily: 'numfont'
                    }
                },
                splitLine: {           // 分隔线
                    length: 5,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        width: 1
                    }
                },
                pointer: {
                    width: 3,
                    length: '90%'
                },
                detail: {
                    show: false
                },
                data: [{value: 40}]
            },
            //外圈室外
            {
                type: 'gauge',
                center: ['50%', '60%'],    // 默认全局居中
                radius: '100%',
                min: 0,
                max: 100,
                name: '室外',
                axisTick: {
                    length: 3
                },
                axisLine: {            // 坐标轴线
                    lineStyle: {
                        color: [[1, '#C7C5C3']],// 属性lineStyle控制线条样式
                        width: 1
                    }
                },
                pointer: {
                    width: 3,
                    length: '90%'
                },
                itemStyle: {
                    normal: {
                        color: '#B0CC35'
                    }

                },
                axisLabel: {
                    textStyle: {
                        fontWeight: 'bolder',
                        fontSize: 16,
                        color: 'rgba(30,144,255,0)'
                    }
                },
                splitLine: {           // 分隔线
                    length: 5,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        width: 1
                    }
                },
                detail: {
                    show: false
                },
                data: [{value: 58}],
                title: {
                    show: false
                }
            }
        ]
    };
    var humOption = {
        tooltip: {
            formatter: '{a}<br/>当前：{c}%'
        },
        series: [
            //内圈
            {
                type: 'gauge',
                center: ['50%', '60%'],    // 默认全局居中
                radius: '30%',
                min: 0,
                max: 10,
                startAngle: 270,
                endAngle: -89.99999,
                splitNumber: 10,
                axisLine: {            // 仪表盘轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: [[1, '#ff4500']],
                        width: 0,
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                axisLabel: {            // 刻度标签
                    show: false
                },
                axisTick: {            // 刻度
                    length: 4,        // 属性length控制线长
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: 'rgba(176,204,53,.5)'
                    }
                },
                splitLine: {           // 分隔线
                    show: false
                },
                pointer: {
                    width: 0,
                    shadowColor: '#fff', //默认透明
                    shadowBlur: 5
                },
                detail: {
                    show: false
                }
            },
            //中圈
            {
                name: '转速',
                type: 'gauge',
                center: ['50%', '60%'],    // 默认全局居中
                radius: '60%',
                min: 0,
                max: 10,
                splitNumber: 10,
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: [[1, '#6E6560']],
                        width: 8,

                        shadowBlur: 10
                    }
                },
                axisLabel: {            // 刻度
                    textStyle: {       // 属性lineStyle控制线条样式
                        fontWeight: '',
                        color: 'rgba(30,144,255,0)',
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                axisTick: {            // 坐标轴小标记
                    length: 2,        // 属性length控制线长
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: 'auto'
                        /*shadowColor : '#fff', //默认透明
                         shadowBlur: 10*/
                    }
                },
                splitLine: {           // 分隔线
                    length: 0,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        width: 0,
                        color: '#fff',
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                pointer: {
                    width: 0,
                    shadowColor: '#fff', //默认透明
                    shadowBlur: 5
                },
                detail: {
                    show: false
                }
            },
            //外圈室内
            {
                type: 'gauge',
                center: ['50%', '60%'],    // 默认全局居中
                radius: '100%',
                min: 0,
                max: 100,
                name: '室内',
                axisLine: {            // 坐标轴线
                    lineStyle: {
                        color: [[1, '#C7C5C3']],// 属性lineStyle控制线条样式
                        width: 1
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#FF0000'
                    }
                },
                axisTick: {
                    length: 3
                },
                axisLabel: {            // 坐标轴小标记
                    textStyle: {       // 属性lineStyle控制线条样式
                        fontWeight: 'bolder',
                        fontSize: 10,
                        fontFamily: 'numfont'
                    }
                },
                splitLine: {           // 分隔线
                    length: 5,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        width: 1
                    }
                },
                pointer: {
                    width: 3,
                    length: '90%'
                },
                detail: {
                    show: false
                },
                data: [{value: 40}]
            },
            //外圈室外
            {
                type: 'gauge',
                center: ['50%', '60%'],    // 默认全局居中
                radius: '100%',
                min: 0,
                max: 100,
                name: '室外',
                axisTick: {
                    length: 3
                },
                axisLine: {            // 坐标轴线
                    lineStyle: {
                        color: [[1, '#C7C5C3']],// 属性lineStyle控制线条样式
                        width: 1
                    }
                },
                pointer: {
                    width: 3,
                    length: '90%'
                },
                itemStyle: {
                    normal: {
                        color: '#B0CC35'
                    }

                },
                axisLabel: {
                    textStyle: {
                        fontWeight: 'bolder',
                        fontSize: 16,
                        color: 'rgba(30,144,255,0)'
                    }
                },
                splitLine: {           // 分隔线
                    length: 5,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        width: 1
                    }
                },
                detail: {
                    show: false
                },
                data: [{value: 58}],
                title: {
                    show: false
                }
            }

        ]
    };
    temChart.setOption(temOption);
    humChart.setOption(humOption);
    var temVal = [25, 36];
    var humVal = [21, 30];

    function temHum(tem, hum) {
        temOption.series[2].data[0].value = tem[0];
        temOption.series[3].data[0].value = tem[1];
        temChart.setOption(temOption);
        $('.tem-val').find('.indoor').text(tem[0] + '℃');
        $('.tem-val').find('.outdoor').text(tem[1] + '℃');
        humOption.series[2].data[0].value = hum[0];
        humOption.series[3].data[0].value = hum[1];
        humChart.setOption(humOption);
        $('.hum-val').find('.indoor').text(hum[0] + "%");
        $('.hum-val').find('.outdoor').text(hum[1] + "%");
    }

    var tempInterval = setInterval(function () {
        temVal[0] = Math.round(Math.random() * 100);
        temVal[1] = Math.round(Math.random() * 100);
        humVal[0] = Math.round(Math.random() * 100);
        humVal[1] = Math.round(Math.random() * 100);
        temHum(temVal, humVal);
    }, 1000);



    //地图
    var mapChart = echarts.init(document.getElementById('map'));
    var series = [];

    //获取数据
    var geoData = [
        {name: '成都', value: [103.9526, 30.7617]},
        {name: '金华', value: [120.0037, 29.1028]},
        {name: '上海', value: [121.4648, 31.2891]},
        {name: '梁平', value: [107.8109, 30.6810]},
        {name: '简阳', value: [104.5525, 30.4179]}
    ];
    //配置气泡点
    geoData.forEach(function (item, i) {
        series.push(
            {
                //name: ' Top10',
                type: 'effectScatter',//带有涟漪特效动画的散点（气泡）图
                coordinateSystem: 'geo',//系列使用的坐标系,geo为地理坐标系
                zlevel: 2,
                rippleEffect: {//涟漪特效相关配置
                    brushType: 'stroke'//波纹的绘制方式，可选 'stroke' 和 'fill'。
                },
                /* label: {//标签相关配置
                     normal: {
                         show: true,
                         position: 'right',
                         formatter: '{b}'//{a}、{b}、{c}，分别表示系列名，数据名，数据值
                     }
                 },*/
                symbolSize: 10,
                itemStyle: {
                    normal: {
                        color: '#B0CC35'
                    }
                },
                data: [item],
                tooltip: {
                    formatter: '{b}观测点'
                }
            }
        );
    });


    var option = {

        tooltip: {
            trigger: 'item',
            formatter: '{b}'
        },
        geo: {
            map: 'china',
            itemStyle: {
                normal: {
                    areaColor: 'rgba(0,0,0,1)',
                    borderColor: 'rgb(176,203,37)'
                },
                emphasis: {
                    areaColor: 'rgba(176,203,37,.8)'
                }
            },
            selectedMode: 'single',
            roam: true,
            silent: false,
            label: {
                emphasis: {
                    show: true,
                    textStyle: {
                        color: '#B0CC35'
                    }
                }

            }
        },
        series: series
    };

    mapChart.setOption(option);


    //var mychartdata= echarts.getMap();

    var btn = $('#btn');
    var areaData = [
        {name: '北京', selected: false, jsonname: 'beijing'},
        {name: '天津', selected: false, jsonname: 'tianjin'},
        {name: '上海', selected: false, jsonname: 'shanghai'},
        {name: '重庆', selected: false, jsonname: 'chongqing'},
        {name: '河北', selected: false, jsonname: 'hebei'},
        {name: '河南', selected: false, jsonname: 'henan'},
        {name: '云南', selected: false, jsonname: 'yunnan'},
        {name: '辽宁', selected: false, jsonname: 'liaoning'},
        {name: '黑龙江', selected: false, jsonname: 'heilongjiang'},
        {name: '湖南', selected: false, jsonname: 'hunan'},
        {name: '安徽', selected: false, jsonname: 'anhui'},
        {name: '山东', selected: false, jsonname: 'shandong'},
        {name: '新疆', selected: false, jsonname: 'xinjiang'},
        {name: '江苏', selected: false, jsonname: 'jiangsu'},
        {name: '浙江', selected: false, jsonname: 'zhejiang'},
        {name: '江西', selected: false, jsonname: 'jiangxi'},
        {name: '湖北', selected: false, jsonname: 'hubei'},
        {name: '广西', selected: false, jsonname: 'guangxi'},
        {name: '甘肃', selected: false, jsonname: 'gansu'},
        {name: '山西', selected: false, jsonname: 'shanxi'},
        {name: '内蒙古', selected: false, jsonname: 'neimenggu'},
        {name: '陕西', selected: false, jsonname: 'shanxi'},
        {name: '吉林', selected: false, jsonname: 'jilin'},
        {name: '福建', selected: false, jsonname: 'fujian'},
        {name: '贵州', selected: false, jsonname: 'guizhou'},
        {name: '广东', selected: false, jsonname: 'guangdong'},
        {name: '青海', selected: false, jsonname: 'qinghai'},
        {name: '西藏', selected: false, jsonname: 'xizang'},
        {name: '四川', selected: false, jsonname: 'sichuan'},
        {name: '宁夏', selected: false, jsonname: 'ningxia'},
        {name: '海南', selected: false, jsonname: 'hainan'},
        {name: '台湾', selected: false, jsonname: 'taiwan'},
        {name: '香港', selected: false, jsonname: 'xianggang'},
        {name: '澳门', selected: false, jsonname: 'aomen'},
        {name: '成都市', selected: false, jsonname: 'chengdu'}
    ];

    mapChart.on('geoselectchanged', function (param) {
        var areaName = param.batch[0].name;
        for (var i = 0; i < areaData.length; i++) {
            if (areaName == areaData[i].name) {
                btn.show();
                var jsonName = areaData[i].jsonname;
                $.getJSON('static/geojson/' + jsonName + '.json', function (data) {
                    mapChart.clear();
                    mapChart.setOption(option);
                    echarts.registerMap(jsonName, data);
                    option.geo.map = jsonName;
                    mapChart.setOption(option);
                });
            }
        }
    });
    document.getElementById('btn').onclick = function () {
        btn.hide();
        mapChart.clear();
        mapChart.setOption(option);
        option.geo.map = 'china';
        mapChart.setOption(option);
    };

    //风向图
    function get_windDirection() {
        var x = 11;
        var y = 0;
        var value=[];
        for (i=0;i<16;i++){
            value.push((Math.random() * (x - y + 1) + y).toFixed(1))
    }
        return value
    }
    var windOption = {
        tooltip: {},
        radar: {
            indicator: [
                {name: 'N', max: 12},
                {name: 'NNW', max: 12},
                {name: 'NW', max: 12},
                {name: 'WNW', max: 12},
                {name: 'W', max: 12},
                {name: 'WSW', max: 12},
                {name: 'SW', max: 12},
                {name: 'SSW', max: 12},
                {name: 'S', max: 12},
                {name: 'SSE', max: 12},
                {name: 'SE', max: 12},
                {name: 'ESE', max: 12},
                {name: 'E', max: 12},
                {name: 'ENE', max: 12},
                {name: 'NE', max: 12},
                {name: 'NNE', max: 12}
            ],
            name: {
                textStyle: {
                    color: 'rgba(176,204,53,1)'
                }
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.4)'
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.4)'
                }
            },
            splitArea: {
                areaStyle: {
                    color: 'rgba(255,255,255,0)'
                }
            }
        },
        series: [{
            type: 'radar',
            data: [
                {
                    value: get_windDirection(),
                    name: 'Wind'
                }
            ],
            areaStyle: {
                normal: {
                    color: 'rgba(176,204,53,.5)'
                }
            },
            lineStyle: {
                normal: {
                    color: 'rgba(176,204,53,.7)'

                }
            },
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: {
                normal: {
                    color: '#A9C33B'
                }
            }
        }]
    };
    ///init windOption
        var windOption1 = {
        tooltip: {},
        radar: {
            indicator: [
                {name: 'N', max: 12},
                {name: 'NNW', max: 12},
                {name: 'NW', max: 12},
                {name: 'WNW', max: 12},
                {name: 'W', max: 12},
                {name: 'WSW', max: 12},
                {name: 'SW', max: 12},
                {name: 'SSW', max: 12},
                {name: 'S', max: 12},
                {name: 'SSE', max: 12},
                {name: 'SE', max: 12},
                {name: 'ESE', max: 12},
                {name: 'E', max: 12},
                {name: 'ENE', max: 12},
                {name: 'NE', max: 12},
                {name: 'NNE', max: 12}
            ],
            name: {
                textStyle: {
                    color: 'rgba(176,204,53,1)'
                }
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.4)'
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.4)'
                }
            },
            splitArea: {
                areaStyle: {
                    color: 'rgba(255,255,255,0)'
                }
            }
        },
        series: [{
            type: 'radar',
            data: [
                {
                    value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    name: 'Wind'
                }
            ],
            areaStyle: {
                normal: {
                    color: 'rgba(176,204,53,.5)'
                }
            },
            lineStyle: {
                normal: {
                    color: 'rgba(176,204,53,.7)'

                }
            },
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: {
                normal: {
                    color: '#A9C33B'
                }
            }
        }]
    };
    var windChart = echarts.init(document.getElementById('windChart'));
    windChart.setOption(windOption);

    //风速与阵风数据
    var speed = {
        wind: [0, 0],
        gust: [0, 0]
    };

    function getData() {
        $('#nowWind').text(speed.wind[0]);
        $('#highWind').text(speed.wind[1]);
        var windSpeed = (50 - speed.wind[0]) * 10;
        $('.windSpeed .windFan').css('animation-duration', 1000-parseInt(windSpeed) + 'ms');
        $('#nowGust').text(speed.gust[0]);
        $('#highGust').text(speed.gust[1]);
        var gustSpeed = (50 - speed.gust[0]) * 10;
        $('.gust .windFan').css('animation-duration', 1000-parseInt(gustSpeed) + 'ms');
    }
    getData();

    //降雨量
    function creatBall(ele, data) {
        new WaterPolo(ele, {
            cW: 55,
            cH: 55,
            baseY: data
        })
    }
    creatBall('rainfallOne', 90);
    creatBall('rainfallTwo', 60);
    creatBall('rainfallThree', 30);

    function random(x,y){
        var rand=parseInt(Math.random()*(x-y+1+y));
        return rand;
    }
    function getLvWind(speed){
        if(speed>=56.1){return 17}if(speed>=51.0){return 16}if(speed>=46.2){return 15}if(speed>=41.5){return 14}
        if(speed>=37.0){return 13}if(speed>=32.7){return 12}if(speed>=28.5){return 11}if(speed>=24.5){return 10}
        if(speed>=20.8){return 9}if(speed>=17.2){return 8}if(speed>=13.9){return 7}if(speed>=10.8){return 6}
        if(speed>=8.0){return 5}if(speed>=5.5){return 4}if(speed>=3.4){return 3}if(speed>=1.6){return 2}
        if(speed>=0.3){return 1}return 0
    }
    function init(){
        $("#currentPre").html(0);
        $("#currentmaxPre").html(0);
        $("#currentPre").html(0);
        $("#currentmaxPre").html(0);
        creatBall('rainfallOne', 0);
        $("#todaypre").html(0);
        $("#todaymaxpre").html(0);
        creatBall('rainfallThree', 0);
        $("#nowWeek").html(0);
        $("#highWeek").html(0);
        creatBall('rainfallTwo', 0);
        var tem=[0,0];
        var Hum=[0,0];
        temHum(tem,Hum);
        $('.windSpeed .windFan').css('animation-duration', 5000 + 'ms');
        // windChart = echarts.init(document.getElementById('windChart'));
        windChart.setOption(windOption1);
    }
    mapChart.on('click', function (params) {
    init();
    //温度k线值
    //温度数据：最低温度，最高温度
    var data = [];
    var da=[];
    var data0;
    let jsl=[];
    let xswd=[];
    let xsqy=[];
    let xssd=[];
    let xstime=[];
        if (!params.region.selected) {
            $.post('/get_weather', {'city': params.region.name}, function (json) {
                var currentTemp=json['data']['week_weather'][0]['details'][0]['temperature'].split('℃')[0];
                var currentHum=json['data']['week_weather'][0]['details'][0]['humidity'].split('%')[0];
                $(".area").html(json['data']['province'] + ' - ' + json['data']['city']);
                $("span.date").html('2021/'+json['data']['week_weather'][0]['date']);
                $(".days").html(json['data']['week_weather'][0]['weather']);
                $("span.temperatureN").html(json['data']['week_weather'][0]['maxTemp']);
                $("span.dewpoint").html(json['data']['week_weather'][0]['minTemp']);
                $(".temperatureC a").html(json['data']['current']['weather']['temperature']);
                //空气质量
                var air_q=json['data']['air']['text'];
                if (air_q ==='-')
                    air_q='优';
                $('.air_q').html(air_q);
                //风向图
                windChart.setOption(windOption);
                //气压
                var pre = parseInt(parseInt(json['data']['week_weather'][0]['details'][0]['airPressure'].split('h')[0]) / 20)
                pressureValRel = 0;
                pressureValNowRel = pre;
                $('.air-relative').find('.light').html("");
                pressureRunRel = setInterval(function () {
                    airPreRel(pressureValNowRel, pressureValRel, $('.air-relative'));
                }, parseInt(pre / 2));
                //温度仪表盘
                clearInterval(tempInterval);
                var tem=[(currentTemp- random(5,3)).toFixed(1),currentTemp];
                var Hum=[(currentHum-random(15,1)).toFixed(1),currentHum];
                temHum(tem,Hum);
                //风
                var currentWind=json['data']['week_weather'][0]['details'][0]['windSpeed'].split('m/s')[0];
                var weekWindData=json['data']['week_weather'][0]['details'];
                var weekwind=0.0;
                for (i=0;i<weekWindData.length;i++){
                    weekwind=weekwind+parseFloat(weekWindData[i]['windSpeed'].split('m/s')[0])
                }
                var weekspeed=(weekwind/weekWindData.length).toFixed(1);
                speed = {
                    wind: [currentWind, getLvWind(currentWind)],
                    gust: [weekspeed, getLvWind(weekspeed)]
                };
                getData();
                ////降雨量
                var todaydetails=json['data']['week_weather'][0]['details'];
                var currentpre=todaydetails[0]['precipitation'].split('mm')[0];
                //当前降雨量
                if (currentpre===' - '){
                    currentpre=0;
                }
                $("#currentPre").html(currentpre);
                $("#currentmaxPre").html(currentpre);
                creatBall('rainfallOne', parseInt(currentpre)*2);
                //当日降雨量
                var todaypre=0;
                var todaymaxpre=0;
                for (i=0;i<todaydetails.length;i++){
                    pre=parseFloat(todaydetails[i]['precipitation'].split('mm')[0]);
                    if (!pre)pre=0;
                    todaypre=todaypre+pre;
                    if(pre>todaymaxpre)todaymaxpre=pre;
                }
                var todayavgpre=(todaypre/todaydetails.length).toFixed(1);
                $("#todaypre").html(todayavgpre);
                $("#todaymaxpre").html(todaymaxpre);
                creatBall('rainfallThree', parseInt(todaymaxpre)*2);
                //最近一周
                var daycount=0;
                var week=json['data']['week_weather'];
                var weekpresum=0;
                var weekpremax=0;
                for (i=0;i<week.length;i++){
                    var daydetails = week[i]['details'];
                    for (j=0;j<daydetails.length;j++){
                        var pre1=parseFloat(daydetails[j]['precipitation'].split('mm')[0]);
                        if(!pre1)pre1=0;
                        daycount=daycount+1;

                        weekpresum=weekpresum+pre1;
                        if (pre1>weekpremax)weekpremax=pre1;
                    }
                }
                var weekavgpre=(weekpresum/daycount).toFixed(1);
                $("#nowWeek").html(weekavgpre);
                $("#highWeek").html(weekpremax);
                creatBall('rainfallTwo', parseInt(weekpremax)*2);
                //温度柱形图
                json.data.twoWeek_weather;
                $.each(json.data.twoWeek_weather,(i,n)=>{
                    // console.log(n.time)
                     da.push([n.time,n.min_temp,n.max_temp,n.min_temp,n.max_temp]);
                    data.push(da[i]);
                });

                console.log(json.data.current.warn.issuecontent!=="9999");
                if(json.data.current.warn.issuecontent!=="9999"){
                    $(".zm").text(json.data.current.warn.issuecontent);
                }else{
                    $(".zm").text("");
                }


                $.each(json.data.week_weather[0].details,(i,n)=>{
                   jsl.push(parseFloat(n.precipitation) );
                   xswd.push(parseFloat(n.temperature));
                   xsqy.push(parseFloat(n.airPressure));
                   xssd.push(parseFloat(n.humidity));
                   xstime.push(n.time);
                });
                console.log(jsl,xswd,xsqy,xssd,xstime);
                console.log(json.data.week_weather[0])
              //数据序列化
                function splitData(rawData) {
                    var categoryData = [];
                    var values = [];
                    for (var i = 0; i < rawData.length; i++) {
                        categoryData.push(rawData[i].splice(0, 1)[0]);
                        values.push(rawData[i])
                    }
                    return {
                        categoryData: categoryData,
                        values: values
                    };
                }
                data0 = splitData(data);
                function calculateMA(dayCount, data) {
                    var result = [];
                    for (var i = 0, len = data.length; i < len; i++) {
                        if (i < dayCount) {
                            result.push('-');
                            continue;
                        }
                        var sum = 0;
                        for (var j = 0; j < dayCount; j++) {
                            sum += data[i - j][1];
                        }
                        result.push((sum / dayCount).toFixed(2));
                    }
                    return result;
                }
                    var temKOption = {
                        tooltip: {//提示框组件
                            trigger: 'axis',//坐标轴触发
                            axisPointer: {
                                type: 'cross'
                            },
                            width: 2
                        },
                        legend: {
                            data: ['每日温度'],
                            // data: ['每日温度', '每日湿度',],
                            top: 0,
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        xAxis: {
                            type: 'category',
                            data: data0.categoryData,
                            boundaryGap: false,
                            axisLine: {lineStyle: {color: '#777'}}
                        },
                        yAxis: {
                            scale: true,
                            splitNumber: 4,//坐标轴的分割段数
                            axisLine: {lineStyle: {color: '#777'}},
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: '#777'
                                }
                            },//坐标轴在 ((grid)) 区域中的分隔线。
                            axisTick: {
                                show: false
                            },//刻度
                            axisLabel: {//标签
                                formatter: '{value}℃'
                            }
                        },
                        dataZoom: [
                            {
                                type: 'inside',
                                start: 50,
                                end: 100
                            }
                        ],
                        grid: [{//直角坐标系内绘图网格
                            height: '60%',
                            top: 25
                        }],
                        series: [
                            {
                                type: 'candlestick',
                                name: '每日温度',
                                data: data0.values,
                                barWidth: '15%',
                                //barMinWidth:'10%',
                                itemStyle: {
                                    normal: {
                                        color: 'red',
                                        color0: '#B0CC35',
                                        borderColor: 'red',
                                        borderColor0: '#B0CC35'
                                    }
                                }
                            },
                            // {
                            //     type: 'candlestick',
                            //     name: '每日湿度',
                            //     data: data0.values,
                            //     barWidth: '15%',
                            //     //barMinWidth:'10%',
                            //     itemStyle: {
                            //         normal: {
                            //             color: 'green',
                            //             color0: '#26cc10',
                            //             borderColor: 'green',
                            //             borderColor0: '#26cc10'
                            //         }
                            //     }
                            // }

                        ]
                    };
                var tempKChart = echarts.init(document.getElementById('tempKChart'));
                // var tempk=echarts.init($("#tempKChart"));
                tempKChart.setOption(temKOption);

                var chartDom = document.getElementById('dityKChart');
var myChartkk = echarts.init(chartDom);
var optionkk;
function maxV(arr) {
            let num = 0;
            arr.forEach(item => {
                if(item > num) {
                    num = item
                }
            });
            return num
        }
optionkk = {
        grid:{

            left:'2%',//距离左边距
            right:'2%',//距离右边距
            containLabel:true
        },

    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#FFFFFF'
            }
        }
    },
    // toolbox: {
    //     feature: {
    //         dataView: {show: true, readOnly: false},
    //         magicType: {show: true, type: ['line', 'bar']},
    //         restore: {show: true},
    //         saveAsImage: {show: true}
    //     }
    // },

    legend: {
        data: ['降水量', '温度','相对湿度','气压'],
        textStyle:{
            color: '#ffffff'//字体颜色
        },

    },
    xAxis: [
        {
            type: 'category',
            data: xstime,
            axisPointer: {
                type: 'shadow'
            },
             axisLabel: {
                textStyle: {
                color: '#ffffff'
            }
            },
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '降水量',
            nameTextStyle:{
                         color:"#FFFFFF",
                         fontSize:12,
                     },

            min: 0,
            max: parseInt(maxV(jsl)+1),
            interval: parseInt(maxV(jsl)+1)/5,
            axisLabel: {
                formatter: '{value} mm',
                textStyle: {
                color: '#ffffff'
            }
            }
        },
        {
            type: 'value',
            name: '温度',
            nameTextStyle:{
                         color:"#FFFFFF",
                         fontSize:12,
                     },
            min: 0,
            max: parseInt(maxV(xswd)+1),
            interval: parseInt(maxV(xswd)+1)/5,
            axisLabel: {
                formatter: '{value} °C',
                textStyle: {
                color: '#ffffff'
            }
            },

        },
          {
            type: 'value',
            name: '湿度',
              nameTextStyle:{
                         color:"#FFFFFF",
                         fontSize:12,
                     },
            min: 0,
            max: parseInt(maxV(xssd)+1),
            interval: parseInt(maxV(xssd)+1)/5,
              offset:50,
              position:'left',
            axisLabel: {
                formatter: '{value} %',
                textStyle: {
                color: '#ffffff'
            }
            }
        },
          {
            type: 'value',
            name: '气压',
              nameTextStyle:{
                         color:"#FFFFFF",
                         fontSize:12,
                     },
            min: 0,
            max:parseInt(maxV(xsqy)+100),
            interval:  parseInt(maxV(xsqy)+100)/5,
              offset:50,
              position:'right',
            axisLabel: {
                formatter: '{value} hPa',
                textStyle: {
                color: '#ffffff'
            }
            }
        },

    ],
    series: [

        {
            name: '降水量',
            type: 'bar',
            data: jsl,
            label:{
                color:"#FFFFFF",
            },

        },
        {
            name: '温度',
            type: 'line',
            yAxisIndex: 1,
            data: xswd,
             label:{
                color:"#FFFFFF",
            },


        },
          {
            name: '相对湿度',
            type: 'line',
            yAxisIndex: 2,
            data: xssd,
               label:{
                color:"#FFFFFF",
            },
              lineStyle:{
                 color:'#E32C42'
         }
        },
          {
            name: '气压',
            type: 'line',
            yAxisIndex: 3,
            data: xsqy,
               label:{
                color:"#FFFFFF",
            },
              lineStyle:{
                 color:'#E32C42'
         }
        }
    ]
};

optionkk && myChartkk.setOption(optionkk);

            })
        }
    });
});

