let modalType = null;
let vat = null;

document.addEventListener('DOMContentLoaded', function() {
    // CREATE JO
    document.getElementById('openModalBtn').addEventListener('click', function() {
        document.getElementById('myModal').classList.remove('hidden'); 
    });


    document.getElementById('closeModalBtn').addEventListener('click', function() {
        document.getElementById('myModal').classList.add('hidden');
    });
    
    document.getElementById('addTextFieldBtn').addEventListener('click', function() {
        const container = document.getElementById('fieldsContainer');
        
        // Create a div to hold both input fields
        const inputContainer = document.createElement('div');
        inputContainer.className = 'flex items-center mb-2'; // Apply Tailwind CSS classes for flex layout and margin-bottom
        
        // Create a new input element for description
        const descriptionInput = document.createElement('input');
        descriptionInput.type = 'text';
        descriptionInput.name = 'descriptions[]';
        descriptionInput.className = 'form-control col-md-6';
        descriptionInput.placeholder = 'Description'; // Optional: Add a placeholder for the description input
        
        // Create a new input element for amount
        const amountInput = document.createElement('input');
        amountInput.type = 'number';
        amountInput.name = 'amounts[]';
        amountInput.className = 'form-control col-md-3 ml-2'; // Apply margin left using Tailwind CSS class
        amountInput.placeholder = 'Amount'; // Apply margin left using Tailwind CSS class
        
        // Append description and amount inputs to the input container
        inputContainer.appendChild(descriptionInput);
        inputContainer.appendChild(amountInput);
        
        // Append the input container to the main container
        container.appendChild(inputContainer);
    });

    
    document.getElementById('addmaterialsfromCreateBtn').addEventListener('click', function() {
        const container = document.getElementById('materialfieldsContainer');
        
        const inputContainer = document.createElement('div');
        inputContainer.className = 'flex items-center mb-2'; 

        const materialInput = document.createElement('input');
        materialInput.type = 'text';
        materialInput.name = 'materials[]';
        materialInput.className = 'form-control col-md-6';
        materialInput.placeholder = 'Material'; 

        const materialamountInput = document.createElement('input');
        materialamountInput.type = 'number';
        materialamountInput.name = 'materialamounts[]';
        materialamountInput.className = 'form-control col-md-3 ml-2'; 
        materialamountInput.placeholder = 'Amount'; 
        
        inputContainer.appendChild(materialInput);
        inputContainer.appendChild(materialamountInput);
        
        // Append the input container to the main container
        container.appendChild(inputContainer);
    });
    

    // VIEW JO
    $(document).ready(function() {
        $('#closeviewjoBtn').click(function() {
            $('#viewmodal').modal('hide');
        });

        $('.view-data').click(function() {
            var jobOrder = $(this).data('joborder');
            // var modalType = $(this).data('modaltype');
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

    document.getElementById('closeviewjoBtn').addEventListener('click', function() {
        document.getElementById('viewmodal').classList.add('hidden');
    });

    document.getElementById('closereviewquotationBtn').addEventListener('click', function() {
        document.getElementById('reviewquotationmodal').classList.add('hidden');
    });

    let totalhiddenmaterial = 0;
    // QUOTATION MODAL
    
    $(document).ready(function() {
        $('.closenewquotationbtn').click(function() { 
            $('#newquotationmodal').modal('hide');
        });

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
                updateTotal();
            }
            
            if(jobOrder.quotation && jobOrder.quotation.status === "approved"){
                document.getElementById('vatcheckbox').style = "display:none";
            }
            else{
                document.getElementById('vatcheckbox').style = "";
            }
        });
    });

    document.getElementById('addmaterialsBtn').addEventListener('click', function() {
        var materialslist = document.querySelector('.materials-list');
    
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

        amountcell.appendChild(amountinput);
        newMaterialRow.appendChild(amountcell);
    
        materialslist.appendChild(newMaterialRow);
        updateTotal();
    });

    document.getElementById('closenewquotationbtn').addEventListener('click', function() {
        document.getElementById('newquotationmodal').classList.add('hidden');
        totalhiddenmaterial = 0;
    });
    //TOTAL
    document.getElementById('amountContainer').addEventListener('input', function(e) {
        if (e.target.classList.contains('amount')) {
            updateTotal();
        }
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
        // var modalType = $(this).data('modaltype');  
        // if ($('#reviewquotationmodal').hasClass('show')) {
        //     modalType == "reviewmodal"
        // }

        // if (modalType === "reviewmodal") {
        //     amounts = document.querySelectorAll('.amount');
        //     // totalInput = document.getElementById('reviewtotalInput');
        //     totalMaterials = document.getElementById('reviewtotalMaterials');
        //     totalLabor = document.getElementById('reviewtotalLabor');
        //     subTotal = document.getElementById('reviewsubTotal');
        //     vatInput = document.getElementById('reviewvatInput');
        //     descriptionAmounts = document.querySelectorAll('.reviewquotationdescriptionamount');
        //     materialAmounts = document.querySelectorAll('.reviewmaterialamount');
        //     vatcheckbox = document.getElementById('reviewvatcheckbox');
        // }

        if (modalType === "ratejo") {
            amounts = document.querySelectorAll('.newquotationmodal .amount');
            totalInput = document.getElementById('.newquotationmodal totalInput');
            totalMaterials = document.getElementById('.newquotationmodal totalMaterials');
            totalLabor = document.getElementById('.newquotationmodal totalLabor');
            subTotal = document.getElementById('.newquotationmodal subTotal');
            vatcheckbox = document.getElementById('.newquotationmodal vatcheckbox');
            // descriptionAmounts = document.querySelectorAll('.newquotationmodal .descriptionamount');
            // descriptionAmounts = document.querySelectorAll('.newquotationmodal .descriptionamount, .reviewquotationmodal .descriptionamount');
            // descriptionAmounts = document.querySelectorAll('.reviewquotationmodal .descriptionamount');
            descriptionAmounts = document.querySelectorAll('.newquotationmodal .descriptionamount');
            materialAmounts = document.querySelectorAll('.newquotationmodal .materialamount');
            vatInput = document.getElementById('.newquotationmodal vatInput');
        }

        // if(modalType === "")
        
        
        
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

        // console.log(modalType);

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

        // console.log(modalType + " from updatetotal");
        
        totalLabor.value = totaldescriptionamount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        totalMaterials.value = (totalmaterialamount - totalhiddenmaterial).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        subTotal.value = (totaldescriptionamount + totalmaterialamount - totalhiddenmaterial).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        totalInput.value = ((computedvat + totaldescriptionamount + totalmaterialamount - totalhiddenmaterial)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    // document.getElementById('vatcheckbox').addEventListener('change', updateVAT);
    

    function updateVAT() {
        var vatCheckbox;
        // if(modalType == "ratejo"){
            // vatCheckbox = document.getElementById('.newquotationmodal vatcheckbox');
            vatCheckbox = document.getElementById('.newquotationmodal vatcheckbox');
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
            // var isAdmin = isUserAdmin ? true : false;
            // var isApprover = isApprover ? true : false;

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

    $(document).ready(function() {
        $('.generate-quotation').on('click', function() {
            const jobId = this.getAttribute('data-jobOrder');
            window.location.href = `/generate-quotation/${jobId}`;
        });
    });

    $(document).ready(function() {
        setTimeout(function() {
            $(".alert-dismissible").fadeOut('slow');
        }, 5000);
    });

    // document.getElementById('newbilling').addEventListener('click', function() {
    //     document.getElementById('newbillingmodal').classList.remove('hidden'); 
    // });

    document.getElementById('closebillingBtn').addEventListener('click', function() {
        document.getElementById('newbillingmodal').classList.add('hidden');
    });

    $(document).ready(function() {
        $('.newbilling').click(function(e) { 

            // modalType = $(this).data('modaltype');  
            var jobOrder = $(this).data('joborder');
            // vat = jobOrder.quotation.vat;

            fillcustomerinformation(jobOrder);

            
            document.getElementById('newbillingmodal').classList.remove('hidden');  
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

        if(modalType == "viewjo"){
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
            var materialslist = document.querySelector('.materials-list');

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
    
});

