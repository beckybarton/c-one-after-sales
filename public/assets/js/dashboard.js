let modalType = null;
let vat = null;
let totalhiddenmaterial = 0;

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('openModalBtn').addEventListener('click', function() {
        document.getElementById('myModal').classList.remove('hidden'); 
    });

    document.getElementById('closeModalBtn').addEventListener('click', function() {
        document.getElementById('myModal').classList.add('hidden');
    });
    
    // NEW JO - ADD JOB DESCRIPTIONS
    document.getElementById('addTextFieldBtn').addEventListener('click', function() {
        const container = document.getElementById('fieldsContainer');
        const inputContainer = document.createElement('div');
        inputContainer.className = 'flex items-center mb-2'; 
        const descriptionInput = document.createElement('input');
        descriptionInput.type = 'text';
        descriptionInput.name = 'descriptions[]';
        descriptionInput.className = 'form-control col-md-6';
        descriptionInput.placeholder = 'Description';
        const amountInput = document.createElement('input');
        amountInput.type = 'number';
        amountInput.name = 'amounts[]';
        amountInput.className = 'form-control col-md-3 ml-2';
        inputContainer.appendChild(descriptionInput);
        inputContainer.appendChild(amountInput);
        
        
        container.appendChild(inputContainer);
    });

    

    // VIEW JO
    $(document).ready(function() {
        $('#closeviewjoBtn').click(function() {
            $('#viewmodal').modal('hide');
        });

        $('.view-data').click(function() {
            var jobOrder = $(this).data('joborder');
            modalType = $(this).data('modaltype');
            fillcustomerinformation(jobOrder);
            filljobdescriptions(jobOrder, modalType);
            fillmaterials(jobOrder,modalType);
            $('.joId').val(jobOrder.id);
            $('#viewmodal').modal('show');

            var viewbuttonscontainer = $('.jodecisionContainer');
            viewbuttonscontainer.empty();

            var userRole = document.getElementById('userRole').getAttribute('data-userRole');
            var jobOrderStatus = jobOrder.status;

            if (jobOrderStatus === "pending" && (userRole == "admin" || userRole == "approver")) {
                let approveButton = $('<button>')
                    .attr('id', 'approveJo')
                    .addClass('mt-4 bg-green-500 text-white px-4 py-2 rounded approvejo')
                    .html('<i class="bi bi-check-circle-fill"></i>')
                    .attr('type', 'submit')
                    .attr('name', 'action')
                    .val('approve');

                let rejectButton = $('<button>')
                    .attr('id', 'rejectJo')
                    .addClass('mt-4 ml-4 bg-red-500 text-white px-4 py-2 rounded rejectjo')
                    .html('<i class="bi bi-x-circle-fill"></i>')
                    .attr('type', 'submit')
                    .attr('name', 'action')
                    .val('reject');

                viewbuttonscontainer.append(approveButton, rejectButton);
            }
        });
    });

    // NEW QUOTATION
    $(document).ready(function() {
        $('.new-quotation').click(function() {
            $('#newquotationmodal').modal('show');
            var jobOrder = $(this).data('joborder');
            modalType = $(this).data('modaltype');

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
                updateVAT();
                updateTotal();
            }
            
        });

        
        $('.closenewquotationbtn').click(function() { 
            $('.newquotationmodal').modal('hide');
        });
    });

    // REVIEW QUOTATION
    $(document).ready(function() {
        $('#closereviewquotationBtn').click(function() { 
            $('#reviewquotationmodal').modal('hide');
        });

        $('.review-quotation').click(function() { 
            // var modalType = $(this).data('modaltype');  
            modalType = $(this).data('modaltype');  
            var jobOrder = $(this).data('joborder');
            vat = jobOrder.quotation.vat;
            $('#reviewquotationmodal').modal('show');

            // console.log(modalType);


            fillcustomerinformation(jobOrder);
            filljobdescriptions(jobOrder, modalType);
            fillmaterials(jobOrder,modalType);
            updateTotal();

            var userRole = document.getElementById('userRole').getAttribute('data-userRole');
            var jobOrderStatus = jobOrder.status;

            if (jobOrderStatus === "pending" && (userRole == "admin" || userRole == "approver")) {
                let reviewquotationContainer = document.getElementById('reviewquotationContainer');
                
                var buttonscontainer = $('.reviewquotationContainer');
                buttonscontainer.empty();  // Clear existing items
                
                let approvequotationButton = document.createElement('button');
                approvequotationButton.id = 'approvequotation';
                approvequotationButton.classList = 'mt-4 bg-green-500 text-white px-4 py-2 rounded approvejo';
                approvequotationButton.innerHTML = '<i class="bi bi-check-circle-fill"></i>';
                approvequotationButton.type = 'button';
                approvequotationButton.name = 'quotationaction';
                approvequotationButton.value = 'approve';
                approvequotationButton.type = 'submit';

                let rejectquotationButton = document.createElement('button');
                rejectquotationButton.id = 'rejectquotation';
                rejectquotationButton.classList = 'mt-4 ml-4 bg-red-500 text-white px-4 py-2 rounded rejectjo';
                rejectquotationButton.innerHTML = '<i class="bi bi-x-circle-fill"></i>';
                rejectquotationButton.type = 'button';
                rejectquotationButton.name = 'quotationaction';
                rejectquotationButton.value = 'reject';
                rejectquotationButton.type = 'submit';

                reviewquotationContainer.append(approvequotationButton);
                reviewquotationContainer.append(rejectquotationButton);
            }
            
        });
    });

    document.getElementById('vatcheckbox').addEventListener('change', updateVAT);

    // ADD MATERIALS
    document.getElementById('addmaterialsBtn').addEventListener('click', function() {
        var materialslist = document.querySelector('.newquotationmodal .materials-list');
    
        var newMaterialRow = document.createElement('tr');

        var materialidcell = document.createElement('td');
        var materialidinput = document.createElement('input');
        materialidinput.name = 'materialids[]';
        materialidinput.type = 'text';
        materialidinput.readOnly = true;
        materialidinput.placeholder = 'item';
        materialidinput.classList.add(...'block w-full rounded-md border-2 border-gray-600 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'.split(' '));
        materialidinput.style.display = 'none';
        materialidcell.appendChild(materialidinput);
        newMaterialRow.appendChild(materialidcell);
    
        var materialcell = document.createElement('td');
        var materialinput = document.createElement('input');
        materialinput.name = 'materials[]';
        materialinput.type = 'text';
        materialinput.placeholder = 'item';
        materialinput.classList.add(...'block w-full rounded-md border-2 border-gray-600 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'.split(' '));

        materialcell.appendChild(materialinput);
        newMaterialRow.appendChild(materialcell);
    
        var amountcell = document.createElement('td');
        var amountinput = document.createElement('input');
        amountinput.name = 'materialsamounts[]';
        amountinput.type = 'number';
        amountinput.placeholder = 'rate';
        amountinput.classList.add(...'materialamount amount block w-full rounded-md border-2 border-gray-600 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'.split(' '));

        amountinput.addEventListener('input', function() {
            updateVAT();
            updateTotal();
        });

        amountcell.appendChild(amountinput);
        newMaterialRow.appendChild(amountcell);
    
        materialslist.appendChild(newMaterialRow);
        updateTotal();
    });


});

function fillcustomerinformation(jobOrder){
    const date = new Date(jobOrder.created_at);
    const year = date.getFullYear();
    var quotationnumber = null;
    var jonumber = "ASJOv2-" + year +"-" + String(jobOrder.id).padStart(5, '0');

    if(jobOrder.quotation){
        quotationnumber = "ASQv2-" + year +"-" + String(jobOrder.quotation.id).padStart(5, '0');
    }

    $('.joid').text(jonumber);
    $('.quotationid').text(quotationnumber);
    $('.userid').text((jobOrder.user.first_name +  " " + jobOrder.user.last_name));
    $('.customername').text(jobOrder.customername);
    $('.unitcode').text(jobOrder.unitcode);
    $('.unitdescription').text(jobOrder.unitdescription);
}

function filljobdescriptions(jobOrder, modalType){
    var jobDescriptionsList = $('.job-descriptions-list');
    var columns = document.querySelectorAll('.hide-column');
    jobDescriptionsList.empty();

    // console.log(modalType);

    if(modalType == "viewjo" || modalType=="reviewmodal"){
        columns.forEach(function(column) {
            column.style.display = 'none';
        });
        jobOrder.job_descriptions.forEach(function(description) {
            jobDescriptionsList.append('<tr><td>' + description.description + '</td><td>' + description.amount.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2}) + '</td></tr>');
        });
    }
    else{
        columns.forEach(function(column) {
            column.style.display = 'table-cell';
        });
        while (jobDescriptionsList.firstChild) {
            jobDescriptionsList.removeChild(jobDescriptionsList.firstChild);
        }
        if(jobOrder.job_descriptions.length>0){
            jobOrder.job_descriptions.forEach(function(job_description){
                var newRow = document.createElement('tr');

                var jobdescriptionidcell = document.createElement('td');
                var jobdescriptionidinput = document.createElement('input');
                jobdescriptionidinput.name = 'jobdescriptionids[]';
                jobdescriptionidinput.type = 'text';
                jobdescriptionidinput.readOnly = true;                   
                jobdescriptionidinput.value = job_description.id;
                jobdescriptionidinput.classList.add(...'block w-full rounded-md border-2 border-gray-600 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'.split(' '));   
                jobdescriptionidcell.appendChild(jobdescriptionidinput);
                jobdescriptionidcell.style.display = 'none'; 
                newRow.appendChild(jobdescriptionidcell);

                var jobdescriptioncell = document.createElement('td');
                var jobdescriptioninput = document.createElement('input');
                jobdescriptioninput.name = 'jobdescriptions[]';
                jobdescriptioninput.type = 'text';
                jobdescriptioninput.placeholder = 'item';
                jobdescriptioninput.value = job_description.description;
                jobdescriptioninput.classList.add(...'block w-full rounded-md border-2 border-gray-600 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'.split(' '));   
                jobdescriptioncell.appendChild(jobdescriptioninput);
                newRow.appendChild(jobdescriptioncell);
                
                var jobdescriptionamount = Intl.NumberFormat('en-US', {
                    style: 'decimal',
                    minimumFractionDigits: 2,
                    maximumFractionDigits:2
                }).format(job_description.amount);

                var descriptionamountcurrentcell = document.createElement('td');
                var descriptionamountcurrent = document.createElement('input');
                descriptionamountcurrent.type = 'text';
                descriptionamountcurrent.readOnly = true;
                descriptionamountcurrent.value = jobdescriptionamount;
                descriptionamountcurrent.classList.add(...'block w-full rounded-md border-2 border-gray-600 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'.split(' '));
                descriptionamountcurrentcell.appendChild(descriptionamountcurrent);
                newRow.appendChild(descriptionamountcurrentcell);

                var descriptionamountcell = document.createElement('td');
                var descriptionamountinput = document.createElement('input');
                descriptionamountinput.name = 'descriptionamounts[]';
                descriptionamountinput.type = 'number';
                descriptionamountinput.placeholder = 'rate';
                descriptionamountinput.classList.add(...'descriptionamount amount block w-full rounded-md border-2 border-gray-600 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'.split(' '));
                descriptionamountinput.addEventListener('input', function() {
                    updateVAT();
                    updateTotal();
                });
                if (!descriptionamountinput.value || descriptionamountinput.value.trim() === '') {
                    descriptionamountinput.value = job_description.amount;
                }

                if(jobOrder.quotation && jobOrder.quotation.status == "approved"){
                    descriptionamountinput.style = 'display:none';
                }

                descriptionamountcell.appendChild(descriptionamountinput);
                newRow.appendChild(descriptionamountcell);

                jobDescriptionsList.append(newRow);
            });
        }        
    }
    
}

function fillmaterials(jobOrder, modalType){
    $('.joId').val(jobOrder.id);

    if(modalType == "ratejo"){
        var materialslist = document.querySelector('#newquotationmodal .materials-list');

        while (materialslist.firstChild) {
            materialslist.removeChild(materialslist.firstChild);
        }
    }
    else{
        // var materialslist = document.querySelector('#reviewquotationmodal .materials-list');
        var materialslist = document.querySelector('#reviewquotationmodal .materials-list');

        while (materialslist.firstChild) {
            materialslist.removeChild(materialslist.firstChild);
        }
    }

    if(jobOrder.job_order_materials.length>0){
        jobOrder.job_order_materials.forEach(function(material){
            if(material.deleted === 1){
                return;
            }
            
            var newRow = document.createElement('tr');

            var materialidcell = document.createElement('td');
            var materialidinput = document.createElement('input');
            materialidinput.name = 'materialids[]';
            materialidinput.type = 'text';
            materialidinput.readOnly = true;
            materialidinput.value = material.id;
            materialidinput.classList.add(...'block w-full rounded-md border-2 border-gray-600 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'.split(' '));   
            materialidcell.appendChild(materialidinput);
            newRow.appendChild(materialidcell);

            var materialcell = document.createElement('td');
            var materialinput = document.createElement('input');
            materialinput.name = 'materials[]';
            materialinput.type = 'text';
            materialinput.placeholder = 'item';
            if( (jobOrder.quotation && jobOrder.quotation.status == "approved") || modalType == "viewjo"){
                materialinput.readOnly = true;
            }
            materialinput.value = material.material;
            materialinput.classList.add(...'block w-full rounded-md border-2 border-gray-600 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'.split(' '));   
            materialcell.appendChild(materialinput);
            newRow.appendChild(materialcell);
            
            var materialamount = Intl.NumberFormat('en-US', {
                style: 'decimal',
                minimumFractionDigits: 2,
                maximumFractionDigits:2
            }).format(material.amount);

            var amountcurrentcell = document.createElement('td');
            var amountcurrent = document.createElement('input');
            amountcurrent.type = 'text';
            amountcurrent.readOnly = true;
            amountcurrent.value = materialamount;
            amountcurrent.classList.add(...'block w-full rounded-md border-2 border-gray-600 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'.split(' '));
            amountcurrentcell.appendChild(amountcurrent);
            newRow.appendChild(amountcurrentcell);

            if(modalType == "ratejo"){
                var amountcell = document.createElement('td');
                var amountinput = document.createElement('input');
                amountinput.name = 'materialsamounts[]';
                amountinput.type = 'number';
                amountinput.placeholder = 'rate';
                amountinput.classList.add(...'materialamount amount block w-full rounded-md border-2 border-gray-600 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'.split(' '));
                amountinput.value = material.amount;
                if(jobOrder.quotation && jobOrder.quotation.status == "approved"){
                    amountinput.style = 'display:none';
                }

                amountinput.addEventListener('input', function() {
                    updateVAT();
                    updateTotal();
                });
                
                amountcell.appendChild(amountinput);
                newRow.appendChild(amountcell);
            }

            
            
            var deleteCell = document.createElement('td');
            var deleteButton = document.createElement('button');
            deleteButton.innerHTML = '<i class="bi bi-trash-fill"></i>'; 
            deleteButton.type = 'button';
            deleteButton.classList.add('delete-row');
            if((jobOrder.quotation && jobOrder.quotation.status == "approved") || modalType != "ratejo"){
                deleteButton.style = 'display:none';
            }
            

            deleteButton.addEventListener('click', function(e) {
                var materialToDelete = e.target.closest('tr');
                var hiddenAmountInput = materialToDelete.querySelector('input[readonly]:not([name="materialids[]"])');
                if (hiddenAmountInput) {
                    var materialAmount = parseFloat(hiddenAmountInput.value.replace(/,/g, ''));
                    totalhiddenmaterial += materialAmount;
                    updateVAT();
                    updateTotal();
                } 
                else {

                }

                materialToDelete.style.display = 'none';
                var hiddenMaterial = document.createElement('input');
                hiddenMaterial.type = 'hidden';
                hiddenMaterial.name = 'materialsToDelete[]';
                hiddenMaterial.value = material.id;
                hiddenMaterial.classList.add(...'deletedamount'.split(' '));
                document.getElementById('amountContainer').appendChild(hiddenMaterial);
            });

            deleteCell.appendChild(deleteButton);
            newRow.appendChild(deleteCell);

            materialslist.append(newRow);
            
        });
    }
}

function updateVAT(){
    const totalMaterials = parseFloat(document.getElementById('totalMaterials').value.replace(/,/g, ''));
    const totalLabor = parseFloat(document.getElementById('totalLabor').value.replace(/,/g, ''));
    const vatInput = document.getElementById('vatInput'); 
    const vatRate = 0.12; 

    var vatValue = Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format( ((totalMaterials-totalhiddenmaterial) + totalLabor) * vatRate);
    
    if (vatcheckbox.checked) {
        vatInput.value = vatValue; 
        updateTotal();
    } 
    
    else {
        vatInput.value = "0.00"; 
        updateTotal();
    }
}

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
        totalInput = document.querySelector('.newquotationmodal #totalInput');
        totalMaterials = document.querySelector('.newquotationmodal #totalMaterials');
        totalLabor = document.querySelector('.newquotationmodal #totalLabor');
        subTotal = document.querySelector('.newquotationmodal #subTotal');
        vatcheckbox = document.getElementById('.newquotationmodal vatcheckbox');
        descriptionAmounts = document.querySelectorAll('.newquotationmodal .descriptionamount');
        materialAmounts = document.querySelectorAll('.newquotationmodal .materialamount');
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
    var computedvat = parseFloat(document.querySelector('.newquotationmodal #vatInput').value);
    
    totalLabor.value = totaldescriptionamount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    totalMaterials.value = (totalmaterialamount - totalhiddenmaterial).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    subTotal.value = (totaldescriptionamount + totalmaterialamount - totalhiddenmaterial).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    totalInput.value = ((computedvat + totaldescriptionamount + totalmaterialamount - totalhiddenmaterial)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}