@include('includes.header')
@include('includes.layout_header')
@auth
  <header class="bg-white shadow">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
    </div>
  </header>
  <main>
  
    <div style="margin-top: 1%;"  class="flex justify-center">
      <div class="relative w-3/4 bg-white overflow-hidden rounded-lg shadow" style="padding: 1%;">
        <button  id="openModalBtn" class=" top-0 right-0 m-4 bg-green-500 text-white px-4 py-2 rounded-md">Add Job Order</button>
        @if (session('success'))
          <div class="alert alert-success alert-dismissible">
            {{ session('success') }}
          </div>
        @endif
        @if (session('error'))
          <div class="alert alert-danger alert-dismissible">
            {{ session('error') }}
          </div>
        @endif
        <table class="table table-bordered table-hover table-sm">
          <thead class="bg-gray-200 text-gray-600">
              <tr>
                  <th class="py-2 px-4 text-left uppercase tracking-wider">Job Order</th>
                  <th class="py-2 px-4 text-left uppercase tracking-wider">Details</th>
                  <th class="py-2 px-4 text-left uppercase tracking-wider">Job Order</th>
                  <th class="py-2 px-4 text-left uppercase tracking-wider">Quotation</th>
              </tr>
          </thead>
          <tbody>
            @foreach($jobOrders as $jobOrder)
              <tr>
                <td class="py-2 px-4 border">
                  <span class="font-weight-bold">ASJOv2-{{ $jobOrder->created_at->format('Y') }}-{{sprintf('%05d',$jobOrder->id)}}</span><br>
                  <small class="text-muted">JO {{ ucwords($jobOrder->status) }}</small>
                  @if($jobOrder->quotation && $jobOrder->quotation->status == "pending")
                      <span class="text-muted"> || Quotation for Approval</span>
                  @endif
                </td>
                <td class="py-2 px-4 border">
                  <span class="font-weight-bold">{{ ucwords($jobOrder->customername) }}</span><br>
                  <small class="text-muted">{{ ucwords($jobOrder->unitcode) }} | {{ ucwords($jobOrder->unitdescription) }}</small>
                </td>
                <td class="py-2 px-4 border">
                  <button class="view-data btn btn-success btn-sm" type="button" data-target="#viewModal" data-jobOrder="{{ $jobOrder }}">
                    <i class="fas fa-eye"></i>
                  </button>
                </td>
                <td class="py-2 px-4 border">
                  @if ($jobOrder->status == "approved")
                    <button class="new-quotation btn btn-success btn-sm" type="button" data-target="#newquotationmodal" data-jobOrder="{{ $jobOrder }}">
                      <i class="fas fa-comment-dollar"></i>
                    </button>
                  @endif
                  @if ($jobOrder->quotation && $jobOrder->quotation->status == "pending" && auth()->user()->isAdmin())
                    <button class="review-quotation btn btn-success btn-sm" data-modaltype="reviewmodal" data-target="#reviewquotationmodal" data-jobOrder="{{ $jobOrder }}">
                      <i class="fas fa-check"></i>
                    </button>
                  @endif
                    @if ($jobOrder->quotation && $jobOrder->quotation->status == "approved")
                    <button class="generate-quotation btn btn-success btn-sm" data-jobOrder="{{ $jobOrder->id }}" class="generate-quotation" id="generate-quotation">
                      <i class="fas fa-download"></i>
                    </button>
                  @endif
                </td>
              </tr>
            @endforeach
          </tbody>
        </table>

        {{ $jobOrders->links() }}
      </div>
      
    </div>


    <!-- NEW MODAL -->
    <div id="myModal" class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 hidden">
      <div style="width: 75%; max-height: 80vh; overflow-y: auto" class="bg-white rounded-xl shadow-xl p-8">
        <div class="modal-content">
              <div class="modal-header">
                  <h2 class="modal-title">After Sales : New Job Order</h2>
              </div>
              <div class="modal-body">
                  <form action="{{ route('joborder.post') }}" method="POST">
                      @csrf
                      <div class="compact-form">
                        <div class="form-group">
                            <label for="customername">Customer Name</label>
                            <input type="text" class="form-control" name="customername" id="customername" required>
                        </div>

                        <div class="form-group">
                            <label for="customeraddress">Customer Address</label>
                            <input type="text" class="form-control" name="customeraddress" id="customeraddress" required>
                        </div>

                        <div class="form-group">
                            <label for="customercontact">Customer Contact Number</label>
                            <input type="text" class="form-control" name="customercontact" id="customercontact" required>
                        </div>

                        <div class="form-group">
                            <label for="unitcode">Unit Code</label>
                            <input type="text" class="form-control" name="unitcode" id="unitcode" required>
                        </div>

                        <div class="form-group">
                            <label for="unitdescription">Unit Description</label>
                            <input type="text" class="form-control" name="unitdescription" id="unitdescription" required>
                        </div>

                        <div class="form-group">
                            <label for="engine">Engine</label>
                            <input type="text" class="form-control" name="engine" id="engine" required>
                        </div>

                        <div class="form-group">
                            <label for="platenumber">Plate Number</label>
                            <input type="text" class="form-control" name="platenumber" id="platenumber" required>
                        </div>
                      </div>

                      <div id="fieldsContainer" class="my-3">
                          <strong>JOB DESCRIPTIONS</strong>
                      </div>

                      <div class="d-flex justify-content-end mb-3">
                          <button type="button" id="addTextFieldBtn" class="btn btn-primary mr-2">Add Job Descriptions</button>
                          <button type="submit" class="btn btn-success">Save</button>
                      </div>
                  </form>
              </div>
              <div class="modal-footer">
                  <button id="closeModalBtn" type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
              </div>
          </div>
      </div>
    </div>


    <!-- VIEW MODAL -->
    <div id="viewmodal" class="fixed top-0 left-0 w-full h-full overflow-y-auto flex items-center justify-center bg-black bg-opacity-50 hidden z-50">
      <div class="bg-white rounded-xl shadow-xl w-3/4 max-h-80vh p-8 overflow-y-auto">
        <div class="modal-content">
          <div class="modal-header">
              <h2 class="modal-title">After Sales : View Job Order</h2>
          </div>

          <div class="modal-body my-6">
            <div class="mb-4 flex justify-between">
              <label class="font-semibold">JO #</label>
              <div class="text-gray-700 id"></div>
            </div>

            <div class="mb-4 flex justify-between">
              <label class="font-semibold">Customer Name</label>
              <div class="text-gray-700 customername"></div>
            </div>

            <div class="mb-4 flex justify-between">
              <label class="font-semibold">Maker</label>
              <div class="text-gray-700 userid"></div>
            </div>

            <div class="mb-4 flex justify-between">
              <label class="font-semibold">Unit Code</label>
              <div class="text-gray-700 unitcode"></div>
            </div>

            <div class="mb-4 flex justify-between">
              <label class="font-semibold">Unit Description</label>
              <div class="text-gray-700 unitdescription"></div>
            </div>

              <!-- Job Descriptions -->
            <div class="job-descriptions-list mt-4"></div>
          </div>

          <form class="space-y-6" action="{{ route('joborder.approve') }}" method="POST">
            @csrf
            <input type="hidden" class="joId" value="" name="joId">
            <div class="flex justify-end items-center mt-6 space-x-4">
                <div id="jodecisionContainer" class="jodecisionContainer flex space-x-2">
                </div>
            </div>
          </form>
          <div class="modal-footer" style="margin-top: 1%;">
            <button id="closeviewjoBtn" class="btn btn-danger">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!-- END OF VIEW MODAL -->

    <!-- QUOTATION MODAL -->
    <div id="newquotationmodal" class="fixed top-0 left-0 w-full h-full overflow-y-auto flex items-center justify-center bg-black bg-opacity-50 hidden z-50">
      <div style="width: 75%; height: 80vh; overflow-y: auto !important" class="bg-white rounded-xl shadow-xl p-8 overflow-y-auto">
        <h2 class="text-2xl mb-4">Job Order Details</h2>
        
        <div class="modal-body">
        <div class="mb-4 flex justify-between">
          <label class="font-semibold">JO #</label>
          <div class="text-gray-700 id"></div>
          </div>

          <div class="mb-4 flex justify-between">
            <label class="font-semibold">Customer Name</label>
            <div class="text-gray-700 customername"></div>
          </div>

          <div class="mb-4 flex justify-between">
            <label class="font-semibold">Maker</label>
            <div class="text-gray-700 userid"></div>
          </div>

          <div class="mb-4 flex justify-between">
            <label class="font-semibold">Unit Code</label>
            <div class="text-gray-700 unitcode"></div>
          </div>

          <div class="mb-4 flex justify-between">
            <label class="font-semibold">Unit Description</label>
            <div class="text-gray-700 unitdescription"></div>
          </div>
          <form class="space-y-6" id="amountContainer" action="{{ route('joborder.quote') }}" method="POST">
            <input type="hidden" class="joId" value="" name="joId">
            @csrf
            <table class="table table-borderless">
            <tr class="bg-secondary"><td colspan="4"><strong>DESCRIPTIONS</strong></td></tr>
              <tr>
                <td style="display:none"><strong>ID</strong></td>
                <td><strong>DESCRIPTION</strong></td>
                <td><strong>CURRENT RATE</strong></td>
                <td><strong>UPDATE RATE</strong></td>
              </tr>
              <tbody class="job-descriptions-list-quotation">

              </tbody>
            </table>
            <table class="table table-borderless">
              <tr class="bg-secondary"><td colspan="5"><strong>MATERIALS</strong></td></tr>
              <tr>
                <td><strong>ID</strong></td>
                <td><strong>MATERIALS</strong></td>
                <td><strong>CURRENT RATE</strong></td>
                <td><strong>UPDATE RATE</strong></td>
                <td><strong></strong></td>
              </tr>
              <tbody class="materials-list-quotation">

              </tbody>
            </table>
            <button type="button" id="addmaterialsBtn" class=""><i class="bi bi-plus-circle-fill"></i> Add Item</button>
            <div class="row">
              <div class="col-8 text-right font-weight-bold">TOTAL LABOR:</div>
              <div class="col-4">
                  <input class="form-control font-weight-bold text-right" id="totalLabor" type="text" readonly>
              </div>
            </div>

            <div class="row mt-2">
              <div class="col-8 text-right font-weight-bold">TOTAL MATERIALS:</div>
              <div class="col-4">
                  <input class="form-control font-weight-bold text-right" id="totalMaterials" type="text" readonly>
              </div>
            </div>

            <div class="row mt-2">
              <div class="col-8 text-right font-weight-bold">SUB TOTAL:</div>
              <div class="col-4">
                  <input class="form-control font-weight-bold text-right" id="subTotal" type="text" readonly>
              </div>
            </div>

            <div class="row mt-2">
              <div class="col-8 text-right font-weight-bold">VAT:</div>
              <div class="col-2">
                <input type="checkbox" name="vatcheckbox" id="vatcheckbox" class="form-control text-right vatcheckbox" aria-label="Checkbox for following text input">
              </div>
              <div class="col-2">
                  <input class="form-control font-weight-bold text-right" id="vatInput" name="vat" type="text" readonly>
              </div>
            </div>

            <div class="row mt-2">
              <div class="col-8 text-right font-weight-bold">OVERALL TOTAL:</div>
              <div class="col-4">
                  <input class="form-control font-weight-bold text-right" id="totalInput" type="text" readonly>
              </div>
            </div>

            <div class="row mt-2">
            <div class="col-8 text-right font-weight-bold"></div>
              <div class="col-4">
                <div class="text-right font-weight-bold"><button id="quoteJo" type="submit" class="mt-4 bg-green-500 text-white px-4 py-2 rounded quoteJo">Send Quotation</button></div>
              </div>
            </div>
          </form>
        </div>

        <div class="modal-footer" style="margin-top: 1%;">
          <button id="closenewquotationbtn" class="btn btn-danger">Close</button>
        </div>
        <!-- <button id="closenewquotationbtn" class="mt-4 bg-red-500 text-white px-4 py-2 rounded">Close</button> -->
        
      </div>
    </div>
    <!-- END OF QUOTATION MODAL -->

    <!-- QUOTATION FOR APPROVAL -->
    <div id="reviewquotationmodal" class="reviewquotationmodal fixed top-0 left-0 w-full h-full overflow-y-auto flex items-center justify-center bg-black bg-opacity-50 hidden  z-50">
      <!-- <div style="width: 75%;" class="bg-white rounded-xl shadow-xl p-8"> -->
      <div style="width: 75%; height: 80vh; overflow-y: auto !important" class="bg-white rounded-xl shadow-xl p-8 overflow-y-auto">
        <h2 class="text-2xl mb-4">QUOTATION FOR APPROVAL</h2>
        
        <div class="modal-body">
        <table class="table table-borderless">
          <tr>
            <td><strong>JO # </strong></td>
            <td><span class="reviewquotationid uppercase"></span></td>
          </tr>
          <tr>
            <td><strong>CUSTOMER NAME</strong></td>
            <td><span class="reviewquotationcustomername uppercase"></span></td>
          </tr>
          <tr>
            <td><strong>MAKER </strong></td>
            <td><span class="reviewquotationuserid uppercase"></span></td>
          </tr>
          <tr>
            <td><strong>UNIT CODE </strong></td>
            <td><span class="reviewquotationunitcode uppercase"></span></td>
          </tr>
          <tr>
            <td><strong>UNIT DESCRIPTION </strong></td>
            <td><span class="reviewquotationunitdescription uppercase"></span></td>
          </tr>
        </table>
        <table class="table table-borderless reviewquotation-job-descriptions-list">
        
        </table>
        <table class="table table-borderless reviewquotation-materials-list">
        </table>
        </div>
        
        <form class="space-y-6" action="{{ route('joborder.quotationDecision') }}" method="POST">
          @csrf
          <input type="hidden" class="reviewquotationjoId" value="" name="joIdquotation">
          
          
          <div class="row">
              <div class="col-8 text-right font-weight-bold">TOTAL LABOR:</div>
              <div class="col-4">
                  <input class="form-control font-weight-bold text-right" id="reviewtotalLabor" type="text" readonly>
              </div>
          </div>

          <div class="row mt-2">
            <div class="col-8 text-right font-weight-bold">TOTAL MATERIALS:</div>
            <div class="col-4">
                <input class="form-control font-weight-bold text-right" id="reviewtotalMaterials" type="text" readonly>
            </div>
          </div>

          <div class="row mt-2">
            <div class="col-8 text-right font-weight-bold">SUB TOTAL:</div>
            <div class="col-4">
                <input class="form-control font-weight-bold text-right" id="reviewsubTotal" type="text" readonly>
            </div>
          </div>

          <div class="row mt-2">
            <div class="col-8 text-right font-weight-bold">VAT:</div>
            <div class="col-2" style="display:none;">
              <input type="checkbox" name="reviewvatcheckbox" id="reviewvatcheckbox" class="form-control text-right reviewvatcheckbox" aria-label="Checkbox for following text input">
            </div>
            <div class="col-4">
              <input class="form-control font-weight-bold text-right" id="reviewvatInput" name="vat" type="text" readonly>
            </div>
          </div>

          <div class="row mt-2">
            <div class="col-8 text-right font-weight-bold">OVERALL TOTAL:</div>
            <div class="col-4">
                <input class="form-control font-weight-bold text-right" id="reviewtotalInput" type="text" readonly>
            </div>
          </div>
          
          <div id="reviewquotationContainer" class="reviewquotationContainer">
            
          </div>
        </form>
        <div class="modal-footer" style="margin-top: 1%;">
          <button id="closereviewquotationBtn" class="mt-4 bg-red-500 text-white px-4 py-2 rounded">Close</button>
        </div>
        
      </div>
    </div>
    <!-- END OF QUOTATION FOR APPROVAL -->
    
  <script src="{{asset('assets/js/dashboard.js')}}" defer></script>
  <script>
    var isUserAdmin = @json(auth()->user() && auth()->user()->isAdmin());
  </script>

  </main>
@endauth
@include('includes.footer')