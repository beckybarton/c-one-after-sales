let modalType = null;
let vat = null;

document.addEventListener('DOMContentLoaded', function() {
    // CREATE JO
    document.getElementById('openModalBtn').addEventListener('click', function() {
        document.getElementById('myModal').classList.remove('hidden'); 
        console.log("ok");
    });


    document.getElementById('closeModalBtn').addEventListener('click', function() {
        document.getElementById('myModal').classList.add('hidden');
    });

    document.getElementById('addTextFieldBtn').addEventListener('click', function() {
        const container = document.getElementById('fieldsContainer');
        
        // Create a new input element
        const newInput = document.createElement('input');
        newInput.type = 'text';
        newInput.name = 'descriptions[]';
        newInput.className = "form-control";
        newInput.style.marginTop = '1rem';
        newInput.style.marginBottom = '1rem'; 
        container.appendChild(newInput);
    });

    // VIEW JO
    $(document).ready(function() {
        $('.view-data').click(function() {
            var jobOrder = $(this).data('joborder');

            const date = new Date(jobOrder.created_at);
            const year = date.getFullYear();
            const formattedId = String(jobOrder.id).padStart(5, '0');

            var joNUmber = "ASJO-" + year +"-" + formattedId;

            $('.id').text(joNUmber);
            $('.joId').val(jobOrder.id);
            $('.userid').text((jobOrder.user.first_name +  " " + jobOrder.user.last_name));
            $('.customername').text(jobOrder.customername);
            $('.unitcode').text(jobOrder.unitcode);
            $('.unitdescription').text(jobOrder.unitdescription);

            var jobDescriptionsList = $('.job-descriptions-list');
            jobDescriptionsList.empty();  // Clear existing items
            jobDescriptionsList.append('<tr><td><strong>' + "JOB DESCRIPTIONS" + '<strong></td></tr>');
            
            jobOrder.job_descriptions.forEach(function(description) {
                jobDescriptionsList.append('<tr><td>' + description.description + '</td></tr>');
            });

            const isApproved = jobOrder.status === ('approved');
            if (isApproved){
                $('#viewmodal .approvejo').hide();
            }
            else{
                $('#viewmodal .approvejo').show();
            }
            
            var viewbuttonscontainer = $('.jodecisionContainer');
            viewbuttonscontainer.empty();  // Clear existing items
            
            var isAdmin = isUserAdmin ? true : false;

            if(isAdmin && jobOrder.status == "pending"){
                let jodecisionContainer = document.getElementById('jodecisionContainer');
                let approveButton = document.createElement('button');
                approveButton.id = 'approveJo';
                approveButton.classList = 'mt-4 bg-green-500 text-white px-4 py-2 rounded approvejo';
                // approveButton.innerText = 'Approve JO';
                approveButton.innerHTML = '<i class="bi bi-check-circle-fill"></i>';
                approveButton.type = 'button';
                approveButton.name = 'action';
                approveButton.value = 'approve';
                approveButton.type = 'submit';

                let rejectButton = document.createElement('button');
                rejectButton.id = 'rejectJo';
                // rejectButton.classList = 'mt-4 bg-red-500 text-white px-4 py-2 rounded approvejo';
                rejectButton.classList = 'mt-4 ml-4 bg-red-500 text-white px-4 py-2 rounded rejectjo';
                // rejectButton.innerText = 'Reject JO';
                rejectButton.innerHTML = '<i class="bi bi-x-circle-fill"></i>';
                rejectButton.type = 'button';
                rejectButton.name = 'action';
                rejectButton.value = 'reject';
                rejectButton.type = 'submit';

                jodecisionContainer.appendChild(approveButton);
                jodecisionContainer.appendChild(rejectButton);
            }
            


            document.getElementById('viewmodal').classList.remove('hidden');  
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
        $('.new-quotation').click(function() {
            var jobOrder = $(this).data('joborder');

            const date = new Date(jobOrder.created_at);
            const year = date.getFullYear();
            const formattedId = String(jobOrder.id).padStart(5, '0');

            var joNUmber = "ASJO-" + year +"-" + formattedId;

            $('.id').text(joNUmber);
            $('.joId').val(jobOrder.id);
            $('.userid').text((jobOrder.user.first_name +  " " + jobOrder.user.last_name));
            $('.customername').text(jobOrder.customername);
            $('.unitcode').text(jobOrder.unitcode);
            $('.unitdescription').text(jobOrder.unitdescription);

            var jobDescriptionsList = document.querySelector('.job-descriptions-list-quotation');
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

                    descriptionamountcell.appendChild(descriptionamountinput);
                    newRow.appendChild(descriptionamountcell);

                    jobDescriptionsList.appendChild(newRow);
                    
                });
            }            

            var materialslist = document.querySelector('.materials-list-quotation');
            while (materialslist.firstChild) {
                materialslist.removeChild(materialslist.firstChild);
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

                    var amountcell = document.createElement('td');
                    var amountinput = document.createElement('input');
                    amountinput.name = 'materialsamounts[]';
                    amountinput.type = 'number';
                    amountinput.placeholder = 'rate';
                    amountinput.classList.add(...'materialamount amount block w-full rounded-md border-2 border-gray-600 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'.split(' '));
                    amountinput.value = material.amount;
                    amountcell.appendChild(amountinput);
                    newRow.appendChild(amountcell);
                    
                    var deleteCell = document.createElement('td');
                    var deleteButton = document.createElement('button');
                    deleteButton.innerHTML = '<i class="bi bi-trash-fill"></i>'; 
                    deleteButton.type = 'button';
                    deleteButton.classList.add('delete-row');

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


                    materialslist.appendChild(newRow);
                    
                });
            }

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
                // var vatCheckedFirst = (sumjobdescription + summaterial) * 0.12;
                
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
            
            
            document.getElementById('newquotationmodal').classList.remove('hidden');  
        });
    });

    document.getElementById('addmaterialsBtn').addEventListener('click', function() {
        
        var materialslist = document.querySelector('.materials-list-quotation');
    
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
            // updateTotal(0);
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

        if (modalType === "reviewmodal") {
            amounts = document.querySelectorAll('.amount');
            totalInput = document.getElementById('reviewtotalInput');
            totalMaterials = document.getElementById('reviewtotalMaterials');
            totalLabor = document.getElementById('reviewtotalLabor');
            subTotal = document.getElementById('reviewsubTotal');
            vatInput = document.getElementById('reviewvatInput');
            descriptionAmounts = document.querySelectorAll('.reviewquotationdescriptionamount');
            materialAmounts = document.querySelectorAll('.reviewmaterialamount');
            vatcheckbox = document.getElementById('reviewvatcheckbox');
        }

        else{
            amounts = document.querySelectorAll('.amount');
            totalInput = document.getElementById('totalInput');
            totalMaterials = document.getElementById('totalMaterials');
            totalLabor = document.getElementById('totalLabor');
            subTotal = document.getElementById('subTotal');
            vatcheckbox = document.getElementById('vatcheckbox');
            descriptionAmounts = document.querySelectorAll('.descriptionamount');
            materialAmounts = document.querySelectorAll('.materialamount');
            vatInput = document.getElementById('vatInput');
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

        console.log(modalType);
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
        const vatCheckbox = document.getElementById('vatcheckbox');
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
        
    }


    $(document).ready(function() {
        $('.review-quotation').click(function(e) { 
            modalType = $(this).data('modaltype');  
            var jobOrder = $(this).data('joborder');
            vat = jobOrder.quotation.vat;

            $('.reviewquotationjoId').val(jobOrder.id);

            const date = new Date(jobOrder.created_at);
            const year = date.getFullYear();
            const formattedId = String(jobOrder.id).padStart(5, '0');

            var joNUmber = "ASJO-" + year +"-" + formattedId;

            $('.reviewquotationid').text(joNUmber);
            $('.reviewquotationjoId').val(jobOrder.id);
            $('.reviewquotationuserid').text((jobOrder.user.first_name +  " " + jobOrder.user.last_name));
            $('.reviewquotationcustomername').text(jobOrder.customername);
            $('.reviewquotationunitcode').text(jobOrder.unitcode);
            $('.reviewquotationunitdescription').text(jobOrder.unitdescription);


            var jobDescriptionsList = $('.reviewquotation-job-descriptions-list');
            jobDescriptionsList.empty();  // Clear existing items
            jobDescriptionsList.append('<tr><td><strong>' + "JOB DESCRIPTIONS" + '<strong></td><td><strong>RATE</strong></td></tr>');
            
            if(jobOrder.job_descriptions.length>0){
                jobOrder.job_descriptions.forEach(function(job_description){
                    var newRow = document.createElement('tr');

                    var jobdescriptionidcell = document.createElement('td');
                    var jobdescriptionidinput = document.createElement('input');
                    jobdescriptionidinput.name = 'reviewquotationjobdescriptionids[]';
                    jobdescriptionidinput.type = 'text';
                    jobdescriptionidinput.readOnly = true;                   
                    jobdescriptionidinput.value = job_description.id;
                    jobdescriptionidinput.classList.add(...'block w-full rounded-md border-2 border-gray-600 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'.split(' '));   
                    jobdescriptionidcell.appendChild(jobdescriptionidinput);
                    jobdescriptionidcell.style.display = 'none'; 
                    newRow.appendChild(jobdescriptionidcell);

                    var jobdescriptioncell = document.createElement('td');
                    var jobdescriptioninput = document.createElement('input');
                    jobdescriptioninput.name = 'reviewquotationjobdescriptions[]';
                    jobdescriptioninput.type = 'text';
                    jobdescriptioninput.readOnly = true;
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

                    var reviewquotationdescriptionamountcell = document.createElement('td');
                    var reviewquotationdescriptionamountinput = document.createElement('input');
                    reviewquotationdescriptionamountinput.name = 'reviewquotationdescriptionamounts[]';
                    reviewquotationdescriptionamountinput.type = 'number';
                    reviewquotationdescriptionamountinput.placeholder = 'rate';
                    reviewquotationdescriptionamountinput.classList.add(...'reviewquotationdescriptionamount reviewamount block w-full rounded-md border-2 border-gray-600 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'.split(' '));
                    if (!reviewquotationdescriptionamountinput.value || reviewquotationdescriptionamountinput.value.trim() === '') {
                        reviewquotationdescriptionamountinput.value = job_description.amount;
                    }
                    reviewquotationdescriptionamountcell.style.display = 'none';



                    reviewquotationdescriptionamountcell.appendChild(reviewquotationdescriptionamountinput);
                    newRow.appendChild(reviewquotationdescriptionamountcell);

                    jobDescriptionsList.append(newRow);
                    
                });
            }            

            var materialslist = $('.reviewquotation-materials-list');
            materialslist.empty();  // Clear existing items
            materialslist.append('<tr><td><strong>' + "ITEM" + '<strong></td><td><strong>RATE</strong></td></tr>');
            while (materialslist.firstChild) {
                materialslist.removeChild(materialslist.firstChild);
            }
            
            if(jobOrder.job_order_materials.length>0){
                jobOrder.job_order_materials.forEach(function(material){
                    
                    var newRow = document.createElement('tr');

                    var materialcell = document.createElement('td');
                    var materialinput = document.createElement('input');
                    materialinput.name = 'materials[]';
                    materialinput.type = 'text';
                    materialinput.readOnly = true;
                    materialinput.placeholder = 'item';
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

                    var amountcell = document.createElement('td');
                    var amountinput = document.createElement('input');
                    amountinput.name = 'materialsamounts[]';
                    amountinput.type = 'number';
                    amountinput.style.display = 'none';
                    amountinput.placeholder = 'rate';
                    amountinput.classList.add(...'reviewmaterialamount reviewamount block w-full rounded-md border-2 border-gray-600 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'.split(' '));
                    if (!amountinput.value || amountinput.value.trim() === '') {
                        let numericValue = parseFloat(amountcurrent.value);
                        amountinput.value = numericValue;
                    }
                    amountcell.appendChild(amountinput);
                    newRow.appendChild(amountcell);

                    materialslist.append(newRow);

                    updateTotal();
                    
                });
            }
            updateTotal();
            var isAdmin = isUserAdmin ? true : false;
            if(isAdmin && jobOrder.quotation.status == "pending"){
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

                reviewquotationContainer.appendChild(approvequotationButton);
                reviewquotationContainer.appendChild(rejectquotationButton);
            }
            
            document.getElementById('reviewquotationmodal').classList.remove('hidden');  
        });
    });

    $(document).ready(function() {
        $('.generate-quotation').on('click', function() {
            const jobId = this.getAttribute('data-jobOrder');
            console.log(jobId);
            window.location.href = `/generate-quotation/${jobId}`;
        });
    });

    $(document).ready(function() {
        setTimeout(function() {
            $(".alert-dismissible").fadeOut('slow');
        }, 5000);
    });
    
});

