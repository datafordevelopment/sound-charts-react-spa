import Chartist from 'chartist';
/**
 * Chartist.js plugin to display a data label on top of the points in a line chart.
 *
 */
(function(window, document, Chartist) {
    var defaultOptions = {
        currency: undefined,
        // showTooltips: true,
        // tooltipEvents: ['mousemove', 'touchstart', 'touchmove'],
        labelClass: 'ct-label'
    };

    Chartist.plugins = Chartist.plugins || {};
    Chartist.plugins.tooltip = function(options) {

        options = Chartist.extend({}, defaultOptions, options);

        return function tooltip(chart) {
            var tooltipSelector = '.ct-point';
            if (chart instanceof Chartist.Bar) {
                tooltipSelector = '.ct-bar';
            } else if (chart instanceof Chartist.Pie) {
                tooltipSelector = '.ct-slice';
            }

            var $chart = $(chart.container);
            var $toolTip = $chart
                .append('<div class="chartist-tooltip"><div class="tooltip-arrow"></div><div class="tooltip-content"></div></div>')
                .find('.chartist-tooltip')
                .hide();
            var $toolTipArrow = $toolTip.find('.tooltip-arrow');

            $chart.on('mouseenter', tooltipSelector, function() {
                var $point = $(this);
                var tooltipText = '';

                if ($point.attr('ct:meta')) {
                    tooltipText += $point.attr('ct:meta') + '<br>';
                } else {
                    // For Pie Charts also take the labels into account
                    // Could add support for more charts here as well!
                    if (chart instanceof Chartist.Pie) {
                        var label = $point.next('.ct-label');
                        if (label.length > 0) {
                            tooltipText += label.text() + '<br>';
                        }
                    }
                }

                //var value = $point.attr('ct:value');
                //if (options.currency !== undefined && options.currency) {
                //    value = options.currency + value.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
                //}
                //tooltipText += value;

                $toolTip.find('.tooltip-content').html(tooltipText);
                $toolTip.show();
                $toolTipArrow.css({
                    top: $toolTip.innerHeight(),
                    left: $toolTip.innerWidth() / 2 - parseInt($toolTipArrow.css('border-left-width')),
                    position: 'absolute'
                });
            });

            $chart.on('mouseleave', tooltipSelector, function() {
                $toolTip.hide();
            });

            $chart.on('mousemove', function(event) {
                $toolTip.css({
                    left: (event.offsetX || event.originalEvent.layerX) - $toolTip.width() / 2 - 10,
                    top: (event.offsetY || event.originalEvent.layerY) - $toolTip.height()
                });
            });
        };
    };

}(window, document, Chartist));