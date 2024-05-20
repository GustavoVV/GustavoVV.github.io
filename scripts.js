$(document).ready(function() {
    // Mostrar el modal al cargar la página
    $('#warningModal').modal({
        backdrop: 'static',
        keyboard: false
    });

    // Manejar el clic del botón de aceptar
    $('#acceptButton').on('click', function() {
        $('#warningModal').modal('hide');
    });

    // Mostrar la sección inicial
    showSection('principal');
});

function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    var mainContent = document.getElementById('main-content');
    if (sidebar.style.display === 'none' || sidebar.style.display === '') {
        sidebar.style.display = 'block';
        mainContent.style.marginLeft = '250px';
    } else {
        sidebar.style.display = 'none';
        mainContent.style.marginLeft = '0';
    }
}

function showSection(sectionId) {
    $('.section').removeClass('active');
    $('#' + sectionId).addClass('active');
    toggleSidebar(); // Colapsar el menú después de seleccionar una sección
}
