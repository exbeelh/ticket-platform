'use strict';
let DSHUtils = {

  /* Utilize jquery Block UI */
  blockUi: function(target, message, duration, callback) {
    $(target).block({
      message: '<div class="spinner-border text-primary spinner-border-sm me-2" role="status"></div><h5>' + message + '</h5>',
      css: {
        border: '0'
      }
    });
    setTimeout(function() {
      $(target).unblock();
      if (typeof callback === 'function' && callback()) {
        callback();
      }
    }, duration);
  },

  /* Select All / Deselect all logic */
  selectOptions: function(select, val) {
    select.closest('.form-group').find('option').each(function() {
      if ($(this).attr("value") != "") {
        $(this).prop("selected", val).trigger("change");
      }
    });
  },

  /* Preview an image before it is uploaded */
  previewImageUpload: function(input) {
    let fileReference = input.files && input.files[0];
    if (fileReference) {
      let reader = new FileReader();

      reader.onload = function(event) {
        $(input).closest('.dsh-btn-file-upload-wrapper').find('.dsh-img-preview').attr('src', event.target.result);
      }

      reader.readAsDataURL(fileReference);

    }
  },

  /*  Remove all active classes from target */
  removeAllActiveItems: function(target, classToRemove) {
    classToRemove = this.isEmpty(classToRemove) ? 'active' : classToRemove;
    target.find('.' + classToRemove).removeClass(classToRemove);
  },

  /*  Checks if a value is empty */
  isEmpty: function(e) {
    return (e === '' || e === undefined || e === null);
  },

  // Checks if screen size < 767
  isMobile: function isMobile() {
    return window && window.matchMedia("(max-width: 1024px)").matches;
  },

  /*  Formats tooltips using custom data-attributes */
  formatTooltip: function(e) {
    let tooltipState = e.data("state") ? "tooltip-" + e.data("state") : "",
      tooltipWidth = "auto" == e.data("width") ? "tooltop-auto-width" : "",
      tooltipTrigger = e.data("trigger") ? e.data("trigger") : "hover",
      tooltipPlacement = e.data("bs-placement") ? e.data("bs-placement") : "top";
    new bootstrap.Tooltip(e, {
      trigger: tooltipTrigger,
      placement: tooltipPlacement,
      template: '<div class="tooltip ' + tooltipState + " " + tooltipWidth + '" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
    })
  },

  /*  Formats popovers using custom data-attributes */
  formatPopover: function(e) {
    let popoverState = e.data("state") ? "popover-" + e.data("state") : "",
      popoverTrigger = e.data("trigger") ? e.data("trigger") : "hover";
    new bootstrap.Popover(e, {
      trigger: popoverTrigger,
      template: '<div class="popover ' + popoverState + '" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
    })
  },

  // Convert form data to a proper json object
  formSerializeArrayToJson: function(formData) {
    let jsonObj = {};
    jQuery.map(formData, function(n, i) {
      jsonObj[n.name] = n.value;
    });
    return jsonObj;
  },

  getSignNumber: function(num) {
    return num && num / Math.abs(num);
  },

  // Converts a number from thousands to k e.g. 1,234 -> 1.2k
  kFormatter: function(num) {
    return Math.abs(num) > 999 ? this.getSignNumber(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : this.getSignNumber(num) * Math.abs(num)
  },

  // Generate random data
  randomScalingFactor: function(multipleFactor) {
    multipleFactor = this.isEmpty(multipleFactor) ? 100 : multipleFactor;
    return Math.round(Math.random() * multipleFactor);
  },

};
