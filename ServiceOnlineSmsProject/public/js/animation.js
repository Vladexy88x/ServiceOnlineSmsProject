function AnimationLayer() {
  $(function () {
    $('[data-toggle="popover"]').popover({
      delay: {
        "show": 90,
        "hide": 90
      }
    })
  })
}
window.addEventListener("load",  AnimationLayer, false);
