<div id="newbillingmodal" class="newbillingmodal fixed top-0 left-0 w-full h-full overflow-y-auto flex items-center justify-center bg-black bg-opacity-50 hidden  z-50">
      <!-- <div style="width: 75%;" class="bg-white rounded-xl shadow-xl p-8"> -->
    <div style="width: 75%; height: 80vh; overflow-y: auto !important" class="bg-white rounded-xl shadow-xl p-8 overflow-y-auto">
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">After Sales : Billing Statement</h2>
            </div>   
            <div class="modal-body">
                @include('dashboard.customerinformation')
            </div>
            
            <!-- <form class="space-y-6" action="{{ route('joborder.quotationDecision') }}" method="POST">
                @csrf
                <input type="hidden" class="billingjoId" value="" name="billingjoId">
                
                
                <div class="row" style="padding:1%">
                    <div class="col-8 text-right font-weight-bold">TOTAL LABOR:</div>
                    <div class="col-4">
                        <input class="form-control font-weight-bold text-right" id="billingtotalLabor" type="text" readonly>
                    </div>
                </div>

                <div class="row mt-2" style="padding:1%">
                <div class="col-8 text-right font-weight-bold">TOTAL MATERIALS:</div>
                <div class="col-4">
                    <input class="form-control font-weight-bold text-right" id="billingtotalMaterials" type="text" readonly>
                </div>
                </div>

                <div class="row mt-2" style="padding:1%">
                <div class="col-8 text-right font-weight-bold">SUB TOTAL:</div>
                <div class="col-4">
                    <input class="form-control font-weight-bold text-right" id="billingsubTotal" type="text" readonly>
                </div>
                </div>

                <div class="row mt-2" style="padding:1%">
                <div class="col-8 text-right font-weight-bold">VAT:</div>
                <div class="col-2" style="display:none;">
                    <input type="checkbox" name="billingvatcheckbox" id="billingvatcheckbox" class="form-control text-right billingvatcheckbox" aria-label="Checkbox for following text input">
                </div>
                <div class="col-4">
                    <input class="form-control font-weight-bold text-right" id="billingvatInput" name="vat" type="text" readonly>
                </div>
                </div>

                <div class="row mt-2" style="padding:1%">
                <div class="col-8 text-right font-weight-bold">OVERALL TOTAL:</div>
                <div class="col-4">
                    <input class="form-control font-weight-bold text-right" id="billingtotalInput" type="text" readonly>
                </div>
                </div>
                
                <div id="billingquotationContainer" class="billingquotationContainer">
                
                </div>
            </form> -->
            <div class="modal-footer" style="margin-top: 1%;">
                <button id="closebillingBtn" class="mt-4 bg-red-500 text-white px-4 py-2 rounded">Close</button>
            </div>
        </div>
    </div>
</div>