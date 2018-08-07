function SchoolController($scope, TripService) {

    TripService.getSchoolData().then(function (response) {

        var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

        var lineColor = '#00f';
        var series = [];

        var itemColor = response.color;
        var targets = response.targets;

        for (var i = 0; i < targets.length; i++) {
            var x = targets[i].value[0];
            var y = targets[i].value[1];
            var item = new BMap.MercatorProjection().pointToLngLat(new BMap.Pixel(x, y));
            targets[i].value = [item.lng, item.lat];
        }

        var serie = {
            coordinateSystem: 'bmap',
            type: "effectScatter",
            zlevel: 2,
            symbolSize: 5,

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

        series.push(serie);

        option = {

            bmap: {
                // 百度地图中心经纬度
                center: [120.945685, 32.25196],
                // 百度地图缩放
                zoom: 11,
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