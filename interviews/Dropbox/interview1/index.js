

$(document).ready(function() {
    var $img = $('.main-image');
    var $high_res = $('.high_res');
    var $high_res_img = $('.high_res img')
    var show_helper = function(e) {
        // Get position of mouse relative to image
        var percent_x = e.offsetX / $img.width();
        var percent_y = e.offsetY / $img.height();

        // Get position for high res image
        var high_res_x = percent_x * 1263;
        var high_res_y = percent_y * 503;

        var position_string =  (-high_res_x + 50) + "px " + (-high_res_y + 50) + "px";

        // Set CSS properties
        $high_res.css("background-position", position_string)
        $high_res.css("top", e.pageY - 50);
        $high_res.css("left", e.pageX - 50);
        $high_res.show()
    }

    var hide_helper = function(e)
    {
        $high_res.hide();
    }
    $img.bind('mouseenter', show_helper)
    $img.bind('mouseout', hide_helper)
    $img.bind('mousemove', show_helper)
});

