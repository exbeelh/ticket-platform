let sidebarEventUrl = window.location.pathname;
let sidebarEventId = sidebarEventUrl.substring(sidebarEventUrl.lastIndexOf('/') + 1);

$('.sidebar-net-dashboard').attr('href', `${BASE_URL}/Event/Dashboard/${sidebarEventId}`)
$('.sidebar-net-order').attr('href', `${BASE_URL}/Event/Order/${sidebarEventId}`)
$('.sidebar-net-ticket').attr('href', `${BASE_URL}/Event/OrderTicket/${sidebarEventId}`)
$('.sidebar-net-revenue').attr('href', `${BASE_URL}/Event/Revenue/${sidebarEventId}`)
