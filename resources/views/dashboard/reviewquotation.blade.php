<div class="modal fade" id="reviewquotationmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style="height: 90vh;">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-header">
            <h2 class="modal-title">QUOTATION FOR APPROVAL</h2>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            @include('dashboard.customerinformation')
            @include('dashboard.jobdescriptions')
            @include('dashboard.materials')

            <input type="hidden" class="reviewquotationjoId" value="" name="joIdquotation">

                

            <div class="reviewquotationContainer mt-2 text-end">
            </div>
        </div>

        <div class="modal-footer">
            <button id="closereviewquotationBtn" class="btn btn-danger">Close</button>
        </div>
        </div>
    </div>
</div>
  