function WelcomeController($scope, TripService) {

    TripService.getWelcomeData().then(function (response) {

        var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

        var lineColor = '#00f';
        var series = [];

        //targets
        for (var i = 0; i < response.targetGroups.length; i++) {

            var itemColor = response.targetGroups[i].color;
            var targets = response.targetGroups[i].targets;

            var serie = {
                coordinateSystem: 'bmap',
                //type: 'scatter',
                zlevel: 2,

                label: {
                    normal: {
                        //show: true,
                        position: 'right',
                        formatter: '{b}'
                    },
                    emphasis: {
                        show: true
                    }
                },

                itemStyle: {
                    normal: {
                        color: itemColor
                    }
                },
                data: targets
            }

            switch (response.targetGroups[i].category) {
                case "want":
                    serie.type = "scatter";
                    symbolSize = 1;
                    serie.rippleEffect = {
                        brushType: 'stroke'
                    };
                    break;
                case "already":
                    serie.type = "effectScatter";
                    symbolSize = 5;
                    break;
                default:

            }

            series.push(serie);
        }

        // trips
        series.push({
            coordinateSystem: 'bmap',
            type: 'lines',
            zlevel: 1,
            effect: {
                show: true,
                period: 6,
                trailLength: 0.7,
                color: '#fff',
                symbolSize: 3
            },
            lineStyle: {
                normal: {
                    color: lineColor,
                    width: 0,
                    curveness: 0.2
                }
            },
            data: response.trips
        });
        series.push({
            coordinateSystem: 'bmap',
            type: 'lines',
            zlevel: 2,
            symbol: ['none', 'arrow'],
            symbolSize: 10,
            effect: {
                show: true,
                period: 6,
                trailLength: 0,
                symbol: planePath,
                symbolSize: 15
            },
            lineStyle: {
                normal: {
                    color: lineColor,
                    width: 1,
                    opacity: 0.6,
                    curveness: 0.2
                }
            },
            data: response.trips
        });

        option = {

            bmap: {
                // 百度地图中心经纬度
                center: [116.4551, 40.2539],
                // 百度地图缩放
                zoom: 5,
                // 是否开启拖拽缩放，可以只设置 'scale' 或者 'move'
                roam: true
            },

            //backgroundColor: '#404a59',
            //tooltip: {
            //    trigger: 'item'
            //},
            series: series
        };

        var chart = echarts.init(document.getElementById('main'));

        chart.setOption(option);

        // 获取百度地图实例，使用百度地图自带的控件
        var bmap = chart.getModel().getComponent('bmap').getBMap();
        bmap.addControl(new BMap.MapTypeControl());

    });
}