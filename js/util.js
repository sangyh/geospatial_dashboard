function debounce(fn, delay) {
    var timeout;

    return function () {
        var context = this,
            args = arguments;

        clearTimeout(timeout);
        timeout = setTimeout(function () {
            fn.apply(context, args);
        }, delay || 250);
    };
}
