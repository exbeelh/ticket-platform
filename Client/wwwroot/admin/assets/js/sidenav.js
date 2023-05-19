$(document).ready(function() {
  "use strict";

  let minimalSidebarItem = $(".dsh-minimal-aside-wrapper .side-nav .menu-item"),
  closeLeftAsideTrigger = $(".dsh-aside-overlay.dsh-overlay-left"),
  minimalAsideOutter = $(".dsh-minimal-aside-wrapper .dsh-minimal-aside--outter"),
  minimalAsideInner = $(".dsh-minimal-aside-wrapper .dsh-minimal-aside--inner"),
  asideToggler = $(".dsh-aside-toggler");

  // Set the active menu item for left sidebar
  function setActiveMenuItem() {
    let current = location.pathname.split("/").slice(-1)[0].replace(/^\/|\/$/g, '');
    $('.dsh-main-aside .menu-item a').each(function() {
      let $this = $(this);
      if (current === "" || current === "index.html") {
        //for root url
        if ($this.attr('href').indexOf("index.html") !== -1) {
          $(this).addClass('active');
          $(this).parents('.collapse').prev().addClass('active');
          if ($(this).parents('.collapse').length) {
            $(this).closest('.collapse').addClass('show');
          }
        }
      } else {
        //for other url
        if ($this.attr('href').indexOf(current) !== -1) {
          $(this).addClass('active');
          $(this).parents('.collapse').prev().addClass('active');
          if ($(this).parents('.collapse').length) {
            $(this).closest('.menu-item').find('.active').next().addClass('show');
          }
        }
      }
    });
  }

  // Renders the sidenav in it's initial state
  function initialState() {
    minimalSidebarItem.each(function (index) {
      let $this = $(this);

      if ($this.find('a').hasClass("active")) {
        let target = $this.data("target");
        minimalAsideInner.find(target).addClass('active');
      }
    });

    if (DSHUtils.isMobile()) {
      closePrimarySidenav();
      closeSecondarySidenav();
    }

    setActiveMenuItem();
  }

  // Slide the whole sidenav in or out of view
  function closePrimarySidenav(){
    $("body").removeClass('dsh-aside-left-open');
  }

  // Close minimal Inner sidenav
  function closeSecondarySidenav(){
    minimalAsideInner.removeClass('open');
  }

  // Remove active classes from minimal sidenav
  function removeMinimalActive(){
    DSHUtils.removeAllActiveItems($(".dsh-main-aside"), 'active');
    $(".minimal-aside-section").removeClass('active');
  }

  // Open the primary sidenav
  function openPrimarySidenav(){
    $("body").addClass('dsh-aside-left-open');
  }

  // Open the inner sidenav
  function openSecondarySidenav(target){
    minimalAsideInner.addClass('open');
    $(target).addClass('active');
  }

  // Toggle the navigation of the clicked section
  function toggleMinimalSection(elem){
    removeMinimalActive();
    elem.find('a').addClass('active');
    openSecondarySidenav(elem.data('bs-target'));
  }

  minimalSidebarItem.on('click', function(){
    toggleMinimalSection($(this));
  });
  minimalSidebarItem.find('a').on('click', function(e){
    let target = $(this).parent().data('bs-target');
    if(!DSHUtils.isEmpty(target)){
      e.preventDefault();
    }
  });
  closeLeftAsideTrigger.on('click', function(){
    let isMinimal = $('body').hasClass('dsh-minimal-sidebar');
    if(isMinimal){
      removeMinimalActive();
      closeSecondarySidenav();
      return false;
    }
    closePrimarySidenav();

  });
  asideToggler.on('click', function(){
    let isSidenavOutterOpen = $("body").hasClass('dsh-aside-left-open');
    let isSidebarInnerOpen = minimalAsideInner.hasClass("open") && minimalAsideInner.length > 0;

    if(isSidebarInnerOpen){
      closeSecondarySidenav();
      removeMinimalActive();
    } else if (isSidenavOutterOpen) {
      closePrimarySidenav();
    } else if (isSidenavOutterOpen && isSidebarInnerOpen) {
      closePrimarySidenav();
      closeSecondarySidenav();
    } else if (!isSidenavOutterOpen && !isSidebarInnerOpen) {
      removeMinimalActive();
      openPrimarySidenav();
    }
  });

  initialState();

  $(window).on("resize", function (e) {
    if (DSHUtils.isMobile()) {
      closePrimarySidenav();
      closeSecondarySidenav();
    }
  });

});
