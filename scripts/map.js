/*<!--
Copyright (c) 2026 by Elliott Greenman (https://codepen.io/Egreenman/pen/vYXBbvb)
Permission is hereby granted, free of charge, to use, copy, modify, and distribute this software under the terms of the MIT License.
*/

var ScreenWidth = $(window).width();
$(document).ready(function () {

  // Replace IMG with inline SVG
  $('#Map').each(function () {
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    jQuery.get(imgURL, function (data) {
        var $svg = jQuery(data).find('svg');

        if (typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
        }

        if (typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass + ' replaced-svg');
        }

        $svg = $svg.removeAttr('xmlns:a');
        $img.replaceWith($svg);

    }, 'xml');
  });

  // Tooltip follows mouse
  $('.map-area').mousemove(function (e) {
      var x = e.pageX - $('.map-area').offset().left;
      var y = e.pageY - $('.map-area').offset().top;

      $('#info-box').css('top', y - $('#info-box').height() - 30);
      $('#info-box').css('left', x - ($('#info-box').width()) / 2);
  }).mouseover();

  // Desktop behaviour
  if (ScreenWidth > 1024) {

    // Hover shows tooltip
    $(document).on('mouseenter', 'path', function () {
        var title = this.id;
        $('#info-box').css('display', 'block');
        $('#info-box').html(title);
    });

    // Hide tooltip on leave
    $(document).on('mouseleave', 'path', function () {
        $('#info-box').css('display', 'none');
    });

    // Click opens link
    $(document).on('click', 'path', function () {
        var title = this.id;
        var href = this.getAttribute('data-attribute');

        if (title !== 'Northern Ireland') {
            window.open(href, '');
        }
    });

  } else {

    // Mobile: tap shows tooltip
    $(document).on('click', 'path', function () {
        var title = this.id;
        $('#info-box').css('display', 'block');
        $('#info-box').html(title);
    });

    // Mobile: double tap opens link
    $(document).on('dblclick', 'path', function () {
      var title = this.id;
      var href = this.getAttribute('data-attribute');

      if (title !== 'Northern Ireland') {
          window.open(href, '');
      }
    });
  }
});