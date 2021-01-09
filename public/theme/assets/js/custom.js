// Category

$(document).ready(function() {
    $('#datatables01').DataTable();
});
$('#datatables01').on('click', '.button-update', function(){
    let id = $(this).data('id');
    let name = $(this).data('name');
    let nameBank = $(this).data('namebank');
    let nomorRekening = $(this).data('nomorrekening');
    let type = $(this).data('type')
    $('#edit-modal').modal('show');

    $('.idCategory').val(id)
    $('.nameCategory').val(name)
    $('.nameBank').val(nameBank);
    $('.nomorRekening').val(nomorRekening);
    $('.type').val(type);
});

$(document).ready(function(){
    $('#datatables02').DataTable();
})
$('#datatables02').on('click', '.button-update', function(){
    let id = $(this).data('id');
    let name = $(this).data('name');
    let qty = $(this).data('qty');
    
    $('#edit-modal02').modal('show');
    $('.id').val(id);
    $('.name-dual').val(name);
    $('.qty').val(qty); 
});

$(document).ready(function(){
    $('#datatables03').DataTable({
        "bPaginate": false,
        "bLengthChange": false,
        "bFilter": false,
        "bInfo": false,
        "bAutoWidth": false
    });
})