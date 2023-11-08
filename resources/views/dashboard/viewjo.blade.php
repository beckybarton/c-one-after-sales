<div class="modal fade" id="viewmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style="height: 90vh;">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content overflow-scroll">
      <div class="modal-header">
        <h2 class="modal-title">After Sales: View Job Order</h2>
        <button type="button" class="btn-close close-btn" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <button id="closeviewjoBtn" style="position: absolute; top: 10px; right:10px; z-index:2;" type="button" class="btn btn-danger close-btn" data-bs-dismiss="modal">X</button>
      <div class="modal-body">
        @include('dashboard.customerinformation')
        @include('dashboard.jobdescriptions')
        @include('dashboard.materials')
      </div>
      <form action="{{ route('joborder.approve') }}" method="POST">
        @csrf
        <input type="hidden" class="joId" value="" name="joId">
        <div class="modal-footer">
          <div class="jodecisionContainer"></div>
        </div>
      </form>
    </div>
  </div>
</div>
