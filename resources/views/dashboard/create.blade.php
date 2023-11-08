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
            <div class="flex items-center mb-2">
                <input type="text" name="descriptions[]" placeholder="Description" required class="form-control col-md-6">
                <input type="number" name="amounts[]" placeholder="Amount" class="form-control col-md-3  ml-2">
            </div>
            </div>
            <div class="d-flex justify-content mb-3">
                <button type="button" id="addTextFieldBtn" class="btn btn-primary mr-2">Add Job Descriptions</button>
            </div>
            <hr>
            <div id="materialfieldsContainer" class="my-3">
            <strong>MATERIALS</strong>
            <div class="flex items-center mb-2">
                <input type="text" name="materials[]" placeholder="Material" class="form-control col-md-6">
                <input type="number" name="materialamounts[]" placeholder="Amount" class="form-control col-md-3  ml-2">
            </div>
            </div>
            <div class="d-flex justify-content mb-3">
                <button type="button" id="addmaterialsfromCreateBtn" class="btn btn-primary mr-2">Add Materials</button>
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-success">Save</button>
                <button id="closeModalBtn" type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
            </form>
          </div>
          {{-- <div class="modal-footer">
            <button type="submit" class="btn btn-success">Save</button>
            <button id="closeModalBtn" type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
          </div> --}}
        </div>
    </div>
  </div>