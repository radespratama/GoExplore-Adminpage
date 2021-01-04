// Category
$(document).ready(function() {
    $('#datatables01').DataTable();
});
$('#datatables01').on('click', '.button-update', function(){
    let id = $(this).data('id');
    let name = $(this).data('name');
    let nameBank = $(this).data('namebank');
    let nomorRekening = $(this).data('nomorrekening');
    $('#edit-modal').modal('show');

    $('.idCategory').val(id)
    $('.nameCategory').val(name)
    $('.nameBank').val(nameBank);
    $('.nomorRekening').val(nomorRekening);
});