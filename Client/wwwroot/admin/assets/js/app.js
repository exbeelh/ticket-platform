(function($) {
  'use-strict';

  /* Preloader */
  $(window).on('load', function() {
    $('.dsh-preloader').addClass('hidden');
  });

  // Multilevel dropdown support
  $(".dsh-navbar ul.dropdown-menu [data-bs-toggle='dropdown']").on("click", function(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!$(this).next().hasClass('show')) {
      $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
    }



    return false;
  });

  // Custom Toggle Actions
  $("body").on('click', '.dsh-toggler', function() {

    let target = $(this).data('target');
    let toggleType = $(this).data('toggle');

    switch (toggleType) {

      // Collapse panel
      case 'collapse':
        $(this).find('i').toggleClass('bi bi-chevron-down');
        $(this).closest('.card').find('.card-body').slideToggle();
        break;
        // Block Ui
      case 'block':
        DSHUtils.blockUi(target, 'Processing...', 2000);
        break;
      default:
        return;

    }

  });

  // Init Scrollbar
  $('.dsh-custom-scroll').each(function(e) {
    $(this).slimScroll({
      height: "auto",
      position: "right",
      size: "5px",
      color: "#dcdcdc",
      opacity: 1,
      wheelStep: 5,
      touchScrollStep: 50,
    });
  });

  // Init Tooltips
  $('[data-bs-toggle="tooltip"], .dsh-tooltip').each(function() {
    DSHUtils.formatTooltip($(this));
  });

  // Init Popovers
  $('[data-bs-toggle="popover"], .dsh-popover').each(function() {
    DSHUtils.formatPopover($(this));
  });

  // Init Select2
  $('.dsh-select2').select2();

  /* Initialize Datepickers */
  $('.dsh-datepicker').datepicker({
    clearBtn: true,
  });

  /* Initialize Time Pickers */
  $('.dsh-timepicker').timepicker({
    icons: {
      up: 'bi bi-chevron-up',
      down: 'bi bi-chevron-down'
    }
  });

  /* Initialize Date Range pickers */
  // Default date range
  $('.dsh-daterangepicker').daterangepicker();

  // Date range with time
  $('.dsh-daterangepicker-time').daterangepicker({
    timePicker: true,
    startDate: moment().startOf('hour'),
    endDate: moment().startOf('hour').add(32, 'hour'),
    locale: {
      format: 'M/DD hh:mm A'
    }
  });

  // Date range with predefined values
  $('.dsh-daterangepicker-predefined').daterangepicker({
    startDate: moment().subtract(29, 'days'),
    endDate: moment(),
    ranges: {
      'Today': [moment(), moment()],
      'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Last 7 Days': [moment().subtract(6, 'days'), moment()],
      'Last 30 Days': [moment().subtract(29, 'days'), moment()],
      'This Month': [moment().startOf('month'), moment().endOf('month')],
      'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    }
  });

  /* Star Rating */
  $(".dsh-can-rate i").on('click', function() {
    $(this).prevAll().removeClass('active');
    $(this).addClass('active');
    $(this).nextAll().addClass('active');
  });

  /* Copy/Cut to clipboard */
  $('.dsh-clipboard').on('click', function() {
    let $this = $(this);

    let copyText = $this.parent().prev('input');
    if (DSHUtils.isEmpty(copyText.val())) return alert('Nothing to copy');

    copyText.select();

    if ($this.hasClass('cut')) {
      document.execCommand("cut");
      alert('Cut to clipboard');
      return true;
    }

    document.execCommand("copy");
    alert('Copied to clipboard');

  });

  /* Sets an active class to any element with dsh-can-active class (This is used for toggling 1 active class per list) */
  $(".dsh-active-parent").on('click', '.dsh-can-active', function() {
    let parent = $(this).closest('.dsh-active-parent');

    DSHUtils.removeAllActiveItems(parent);
    $(this).addClass('active');
  });

  /* Sets an active class to any element with dsh-toggle-active class (This is used for toggling multiple active classes per list) */
  $("body").on('click', '.dsh-toggle-active', function() {
    $(this).toggleClass('active');
  });

  /* Trigger file upload by button */
  $("body")
    .on('click', '.dsh-btn-file-upload', function() {
      $(this).closest('.dsh-btn-file-upload-wrapper').find('.dsh-upload-input').click();
    })
    .on('change', '.dsh-upload-input', function() {
      DSHUtils.previewImageUpload(this);
    });

  /* Select All options from list  */
  $(".dsh-select-all").on('click', function() {
    DSHUtils.selectOptions($(this), true);
  });

  /* Deselect All options from list  */
  $(".dsh-deselect-all").on('click', function() {
    DSHUtils.selectOptions($(this), false);
  });

  /* Delete an Item  */
  $("body").on('click', '.delete-trigger', function() {
    let target = $(this).closest('.deletable');
    DSHUtils.blockUi(target, 'Processing...', 2000, function() {
      $(target).fadeOut();
    });
  })

  // Init Form validation
//   function formValidation() {
//     // Fetch all the forms we want to apply custom Bootstrap validation styles to
//     let forms = document.getElementsByClassName('needs-validation');
//     // Loop over them and prevent submission
//     Array.prototype.filter.call(forms, function(form) {
//       form.addEventListener('submit', function(event) {
//         if (form.checkValidity() === false) {
//           event.preventDefault();
//           event.stopPropagation();
//         }
//         form.classList.add('was-validated');
//       }, false);
//     });
//   }
//   formValidation();

    toastr.options = {
        "closeButton": false,
        "debug": false,
        "preventDuplicates": true,
        "progressBar": false,
        "newestOnTop": false,
        "positionClass": "toast-top-right",
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "3000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

})(jQuery);
