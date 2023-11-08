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
                  <th class="py-2 px-4 text-left uppercase tracking-wider">Billing</th>
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
                  <button class="view-data btn btn-success btn-sm" type="button" data-modaltype="viewjo" data-target="#viewModal" data-jobOrder="{{ $jobOrder }}">
                    <i class="fas fa-eye"></i>
                  </button>
                </td>
                <td class="py-2 px-4 border">
                  @if ($jobOrder->status == "approved")
                    <button class="new-quotation btn btn-success btn-sm" data-modaltype="ratejo" type="button" data-target="#newquotationmodal" data-jobOrder="{{ $jobOrder }}">
                      <i class="fas fa-comment-dollar"></i>
                    </button>
                  @endif
                  @if ($jobOrder->quotation && $jobOrder->quotation->status == "pending" && (auth()->user()->isAdmin() || auth()->user()->isApprover()))
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
                <td class="py-2 px-4 border">
                  @if ($jobOrder->quotation && $jobOrder->quotation->status == "approved")
                    <button class="newbilling btn btn-success btn-sm" id="newbilling" data-target="#newbilling" data-jobOrder="{{ $jobOrder }}">
                      <i class="fas fa-check"></i>
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

    @include('dashboard.create')
    @include('dashboard.viewjo')
    @include('dashboard.reviewquotation')
    @include('dashboard.newquotation')    
    @include('dashboard.billing')


  <script src="{{asset('assets/js/dashboard.js')}}" defer></script>
  <script>
    var isUserAdmin = @json(auth()->user() && auth()->user()->isAdmin());
  </script>

  </main>
@endauth
@include('includes.footer')