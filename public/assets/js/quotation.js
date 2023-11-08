document.addEventListener('DOMContentLoaded', function() {
    $(document).ready(function() {
        $('.new-quotation').click(function() {
            var jobOrder = $(this).data('joborder');
            // var modalType = $(this).data('modaltype');
            modalType = $(this).data('modaltype');
            // console.log(modalType);

            fillcustomerinformation(jobOrder);
            filljobdescriptions(jobOrder, modalType);   
            fillmaterials(jobOrder,modalType);

            if (jobOrder.quotation && jobOrder.quotation.vat === 1) {
                let totalMaterials = document.getElementById('totalMaterials');
                let totalLabor = document.getElementById('totalLabor');
                let subTotal = document.getElementById('subTotal');
                let vatInput = document.getElementById('vatInput');
                var sumjobdescription = jobOrder.job_descriptions.reduce(function(total, job_description) {
                    return total + job_description.amount;
                }, 0);
                var summaterial = jobOrder.job_order_materials.reduce(function(total, material) {
                    return total + material.amount;
                }, 0);
                
                document.getElementById('vatcheckbox').checked = true;
                totalLabor.value = sumjobdescription.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                totalMaterials.value = (summaterial).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                subTotal.value = (sumjobdescription + summaterial).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                vatInput.value = ((sumjobdescription + summaterial) * 0.12).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                document.getElementById('totalInput').value = ((sumjobdescription + summaterial) * 1.12).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ;                
            }   
            else{
                // updateTotal();
            }
            
            if(jobOrder.quotation && jobOrder.quotation.status === "approved"){
                document.getElementById('vatcheckbox').style = "display:none";
            }
            else{
                document.getElementById('vatcheckbox').style = "";
            }
            
            document.getElementById('newquotationmodal').classList.remove('hidden');  
        });
    });
});

function updateTotal() {
    let amounts = [];
    let totalInput = null;
    let totalMaterials = null;
    let totalLabor = null;
    let subTotal = null;
    let descriptionAmounts = null;
    let materialAmounts = null;
    let vatInput = null;
    let vatcheckbox = null;

    if (modalType === "ratejo") {
        amounts = document.querySelectorAll('.newquotationmodal .amount');
        totalInput = document.getElementById('.newquotationmodal totalInput');
        totalMaterials = document.getElementById('.newquotationmodal totalMaterials');
        totalLabor = document.getElementById('.newquotationmodal totalLabor');
        subTotal = document.getElementById('.newquotationmodal subTotal');
        vatcheckbox = document.getElementById('.newquotationmodal vatcheckbox');
        descriptionAmounts = document.querySelectorAll('.newquotationmodal .descriptionamount');
        materialAmounts = document.querySelectorAll('.newquotationmodal .materialamount');
        vatInput = document.getElementById('.newquotationmodal vatInput');
    }
    
    let total = 0;
    amounts.forEach(amount => {
        total += parseFloat(amount.value) || 0;
    });

    let totaldescriptionamount = 0;
    descriptionAmounts.forEach(input => {
        if (input.value) {
            totaldescriptionamount += parseFloat(input.value);
        }
    });

    let totalmaterialamount = 0;
    materialAmounts.forEach(input => {
        if (input.value) {
            totalmaterialamount += parseFloat(input.value);
        }
    });

    let computedvat = 0;
    if(vatcheckbox.checked){
        computedvat = (totaldescriptionamount + totalmaterialamount - totalhiddenmaterial) * 0.12;
        vatInput.value = (computedvat).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    
    totalLabor.value = totaldescriptionamount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    totalMaterials.value = (totalmaterialamount - totalhiddenmaterial).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    subTotal.value = (totaldescriptionamount + totalmaterialamount - totalhiddenmaterial).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    totalInput.value = ((computedvat + totaldescriptionamount + totalmaterialamount - totalhiddenmaterial)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

document.getElementById('vatcheckbox').addEventListener('change', updateVAT);

function updateVAT() {
    var vatCheckbox;
    // if(modalType == "ratejo"){
        // vatCheckbox = document.getElementById('.newquotationmodal vatcheckbox');
        vatCheckbox = document.getElementById('vatcheckbox');
    // }
    // else{
    //     vatCheckbox = document.getElementById('vatcheckbox');
    // }

    console.log(vatCheckbox.checked);
    // console.log(modalType);
    
    const totalMaterials = parseFloat(document.getElementById('totalMaterials').value.replace(/,/g, ''));
    const totalLabor = parseFloat(document.getElementById('totalLabor').value.replace(/,/g, ''));
    const vatInput = document.getElementById('vatInput'); 
    const vatRate = 0.12; 

    var vatValue = Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format( (totalMaterials + totalLabor) * vatRate);
    
    if (vatCheckbox.checked) {
        vatInput.value = vatValue; 
        updateTotal();
    } 
    
    else {
        vatInput.value = "0.00"; 
        updateTotal();
    }

    // console.log(vatValue);
    
}