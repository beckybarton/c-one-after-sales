<div class="modal fade newquotationmodal" id="newquotationmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style="height: 90vh; padding: 10px;">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content overflow-scroll">
        <div class="modal-header">
            <h2 class="modal-title">After Sales: Create Quotation</h2>
        </div>
        <div class="modal-body">
            @include('dashboard.customerinformation')
            <form class="space-y-6" id="amountContainer" action="{{ route('joborder.quote') }}" method="POST">
                @csrf
                @include('dashboard.jobdescriptions')
                @include('dashboard.materials')
                <button type="button" id="addmaterialsBtn" class=""><i class="bi bi-plus-circle-fill"></i> Add Item</button>
                <div class="row mt-2">
                    <div class="col-8 text-right font-weight-bold"></div>
                        <div class="col-4">
                        
                        </div>
                    </div>
                </div>

                @include('dashboard.summaryamount')
                
                <div class="modal-footer" style="margin-top: 1%;">
                    <button id="quoteJo" type="submit" class="btn btn-success quoteJo">Send Quotation</button>
                    <button type="button" id="closenewquotationbtn" class="btn btn-danger closenewquotationbtn" >Close</button>
                </div>
            </form>
        </div>
        
    </div>
</div>
  